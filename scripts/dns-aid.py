#!/usr/bin/env python3
"""
DNS-AID (DNS for AI Discovery) Provisioner & Validator for mlhk.in
Draft: draft-mozleywilliams-dnsop-dnsaid / RFC 9460
"""

import sys
import os
import json
import urllib.request
import urllib.error

ZONE_ID = "86707861e89e2d257cb4a31f291752e9"
DOMAIN = "mlhk.in"

RECORDS = [
    {
        "type": "HTTPS",
        "name": f"_index._agents.{DOMAIN}",
        "data": {
            "priority": 1,
            "target": f"{DOMAIN}.",
            "value": 'alpn="h2,h3" port=443 mandatory=alpn,port',
        },
        "comment": "DNS-AID Primary Index (RFC 9460 / draft-mozleywilliams-dnsop-dnsaid)",
        "ttl": 3600,
    },
    {
        "type": "HTTPS",
        "name": f"_a2a._agents.{DOMAIN}",
        "data": {
            "priority": 1,
            "target": f"{DOMAIN}.",
            "value": 'alpn="a2a,h2,h3" port=443 mandatory=alpn,port',
        },
        "comment": "DNS-AID A2A Agent Endpoint (RFC 9460)",
        "ttl": 3600,
    },
    {
        "type": "HTTPS",
        "name": f"_mcp._agents.{DOMAIN}",
        "data": {
            "priority": 1,
            "target": f"{DOMAIN}.",
            "value": 'alpn="mcp,h2,h3" port=443 mandatory=alpn,port',
        },
        "comment": "DNS-AID MCP Agent Endpoint (RFC 9460)",
        "ttl": 3600,
    },
    {
        "type": "TXT",
        "name": f"_index._agents.{DOMAIN}",
        "content": f'"v=dnsaid1 alpn=h2,h3 endpoint=https://{DOMAIN}"',
        "comment": "DNS-AID Fallback Index (TXT)",
        "ttl": 3600,
    },
]

def check_doh(name, rtype):
    url = f"https://cloudflare-dns.com/dns-query?name={name}&type={rtype}&do=1"
    req = urllib.request.Request(url, headers={"Accept": "application/dns-json"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode())
            status = data.get("Status")
            ad = data.get("AD", False)
            answers = data.get("Answer", [])
            return {"status": status, "ad": ad, "answers": answers}
    except Exception as e:
        return {"error": str(e)}

def print_manual_instructions():
    print("=" * 70)
    print("DNS-AID (DNS for AI Discovery) Manual Setup for Cloudflare DNS")
    print("=" * 70)
    print("\nLog in to your Cloudflare Dashboard -> select 'mlhk.in' -> DNS -> Records")
    print("Add the following records:\n")
    
    print("Record 1: Primary Index (HTTPS)")
    print("  Type:     HTTPS")
    print(f"  Name:     _index._agents")
    print("  Priority: 1")
    print(f"  Target:   {DOMAIN}")
    print('  Value:    alpn="h2,h3" port=443 mandatory=alpn,port')
    print("  TTL:      Auto (or 1 hour)\n")

    print("Record 2: A2A Agent Service (HTTPS)")
    print("  Type:     HTTPS")
    print(f"  Name:     _a2a._agents")
    print("  Priority: 1")
    print(f"  Target:   {DOMAIN}")
    print('  Value:    alpn="a2a,h2,h3" port=443 mandatory=alpn,port')
    print("  TTL:      Auto (or 1 hour)\n")

    print("Record 3: MCP Agent Service (HTTPS)")
    print("  Type:     HTTPS")
    print(f"  Name:     _mcp._agents")
    print("  Priority: 1")
    print(f"  Target:   {DOMAIN}")
    print('  Value:    alpn="mcp,h2,h3" port=443 mandatory=alpn,port')
    print("  TTL:      Auto (or 1 hour)\n")

    print("Record 4: Fallback Index (TXT)")
    print("  Type:     TXT")
    print(f"  Name:     _index._agents")
    print(f'  Content:  v=dnsaid1 alpn=h2,h3 endpoint=https://{DOMAIN}')
    print("  TTL:      Auto (or 1 hour)\n")

    print("-" * 70)
    print("DNSSEC Activation:")
    print("1. Go to Cloudflare Dashboard -> 'mlhk.in' -> DNS -> Settings")
    print("2. Scroll to 'DNSSEC' and click 'Enable DNSSEC'")
    print("3. Copy the DS record details provided by Cloudflare into your domain registrar.")
    print("=" * 70)

def provision_cloudflare(token):
    print(f"Provisioning DNS-AID records via Cloudflare API into Zone {ZONE_ID}...")
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }
    
    for rec in RECORDS:
        print(f"\nCreating {rec['type']} record for {rec['name']}...")
        payload = {
            "type": rec["type"],
            "name": rec["name"],
            "ttl": rec["ttl"],
            "comment": rec["comment"],
        }
        if rec["type"] in ("HTTPS", "SVCB"):
            payload["data"] = rec["data"]
        else:
            payload["content"] = rec["content"]

        req = urllib.request.Request(
            f"https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/dns_records",
            data=json.dumps(payload).encode(),
            headers=headers,
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                res = json.loads(resp.read().decode())
                if res.get("success"):
                    print(f"  ✓ Created record ID: {res['result']['id']}")
                else:
                    print(f"  ✗ Cloudflare API returned failure: {res.get('errors')}")
        except urllib.error.HTTPError as e:
            err_body = e.read().decode()
            print(f"  ✗ HTTP {e.code}: {err_body}")

def main():
    token = None
    if len(sys.argv) > 1 and sys.argv[1] == "--provision":
        if len(sys.argv) > 2:
            token = sys.argv[2]
        else:
            token = os.environ.get("CLOUDFLARE_API_TOKEN")
        if not token:
            print("Error: No Cloudflare API token provided.")
            sys.exit(1)
        provision_cloudflare(token)
        return

    print("Checking live DNS-AID DoH status...")
    for qtype in ["HTTPS", "SVCB", "TXT"]:
        res = check_doh(f"_index._agents.{DOMAIN}", qtype)
        print(f"DoH {qtype} _index._agents.{DOMAIN}: Status={res.get('status')} Answers={len(res.get('answers', []))} AD={res.get('ad')}")
    
    print_manual_instructions()

if __name__ == "__main__":
    main()
