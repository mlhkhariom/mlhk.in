#!/usr/bin/env python3
"""
Google Indexing API Automated Bulk Submitter for mlhk.in
Submits all live website URLs directly to Google's real-time indexing pipeline.
Official API: https://developers.google.com/search/apis/indexing-api/v3/quickstart
"""

import sys
import os
import json
import time
import urllib.request
import urllib.parse
import urllib.error
import xml.etree.ElementTree as ET

# Default key location provided by user
DEFAULT_KEY_PATH = "/home/mlhkhariom/Downloads/mathematics-alliance-eec1fec5c1a8.json"
HOST = "mlhk.in"
SITEMAP_URL = f"https://{HOST}/sitemap.xml"

# Scopes for Google Indexing API
INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing"
TOKEN_URI = "https://oauth2.googleapis.com/token"
PUBLISH_ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"
METADATA_ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications/metadata"

def load_service_account(key_path):
    if not os.path.exists(key_path):
        print(f"Error: Service account file not found at: {key_path}")
        sys.exit(1)
    with open(key_path, "r", encoding="utf-8") as f:
        return json.load(f)

def get_access_token(key_data):
    try:
        import jwt
    except ImportError:
        print("Error: PyJWT library not found. Please install with: pip install pyjwt cryptography")
        sys.exit(1)

    now = int(time.time())
    payload = {
        "iss": key_data["client_email"],
        "scope": INDEXING_SCOPE,
        "aud": TOKEN_URI,
        "exp": now + 3600,
        "iat": now,
    }

    signed_jwt = jwt.encode(payload, key_data["private_key"], algorithm="RS256")
    token_post_data = urllib.parse.urlencode({
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "assertion": signed_jwt,
    }).encode("utf-8")

    req = urllib.request.Request(
        TOKEN_URI,
        data=token_post_data,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data["access_token"]
    except urllib.error.HTTPError as e:
        print(f"Authentication Error from Google OAuth2: {e.code} - {e.read().decode('utf-8')}")
        sys.exit(1)
    except Exception as e:
        print(f"Connection Error during token acquisition: {e}")
        sys.exit(1)

def fetch_all_urls():
    req = urllib.request.Request(SITEMAP_URL, headers={"User-Agent": "Google-Indexing-Batch/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            content = resp.read()
            root = ET.fromstring(content)
            ns = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}
            urls = []
            for loc in root.findall(".//ns:loc", ns):
                if loc.text:
                    urls.append(loc.text.strip())
            if not urls:
                for loc in root.findall(".//loc"):
                    if loc.text:
                        urls.append(loc.text.strip())
            return sorted(list(set(urls)))
    except Exception as e:
        print(f"Notice: Remote sitemap fetch failed ({e}). Using core site URL list.")
        return [
            f"https://{HOST}/",
            f"https://{HOST}/about",
            f"https://{HOST}/services",
            f"https://{HOST}/portfolio",
            f"https://{HOST}/blog",
            f"https://{HOST}/contact",
            f"https://{HOST}/subsidiaries",
            f"https://{HOST}/process",
            f"https://{HOST}/faq",
            f"https://{HOST}/ai-automation",
            f"https://{HOST}/services/web-development",
            f"https://{HOST}/services/mobile-app-development",
            f"https://{HOST}/services/digital-marketing",
            f"https://{HOST}/services/graphics-and-branding",
            f"https://{HOST}/services/support-and-maintenance",
            f"https://{HOST}/services/cybersecurity",
            f"https://{HOST}/services/enterprise-systems",
            f"https://{HOST}/services/ai-automation",
            f"https://{HOST}/subsidiaries/iksc-india",
            f"https://{HOST}/subsidiaries/red-xerox-studio",
            f"https://{HOST}/subsidiaries/erotix-green-energy",
            f"https://{HOST}/subsidiaries/rx-media",
            f"https://{HOST}/subsidiaries/tet-news",
            f"https://{HOST}/privacy-policy",
            f"https://{HOST}/terms-and-conditions",
            f"https://{HOST}/terms-of-service",
            f"https://{HOST}/cancellation-refund-policy",
        ]

def submit_url(url, token, action="URL_UPDATED"):
    payload = json.dumps({"url": url, "type": action}).encode("utf-8")
    req = urllib.request.Request(
        PUBLISH_ENDPOINT,
        data=payload,
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": f"Bearer {token}",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return True, resp.status, data
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode("utf-8", errors="ignore")
        return False, e.code, err_msg
    except Exception as e:
        return False, 500, str(e)

def main():
    key_path = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith("--") else DEFAULT_KEY_PATH
    
    print("=" * 70)
    print(" Google Indexing API — Bulk URL Submitter")
    print(f" Target Site: https://{HOST}")
    print(f" Key File:    {key_path}")
    print("=" * 70)

    key_data = load_service_account(key_path)
    client_email = key_data.get("client_email")
    print(f"\n[1/3] Authenticated Service Account: {client_email}")

    token = get_access_token(key_data)
    print("      ✓ OAuth2 Access Token successfully generated from Google.")

    print(f"\n[2/3] Fetching all website URLs to index...")
    urls = fetch_all_urls()
    print(f"      ✓ Found {len(urls)} URLs ready for submission.")

    print(f"\n[3/3] Submitting all {len(urls)} URLs to Google Indexing API...")
    print("-" * 70)

    success_count = 0
    permission_denied = False

    for idx, u in enumerate(urls, 1):
        ok, status, res = submit_url(u, token)
        if ok:
            print(f" [{idx:02d}/{len(urls):02d}] ✓ HTTP {status} — Submitted: {u}")
            success_count += 1
        else:
            print(f" [{idx:02d}/{len(urls):02d}] ✗ HTTP {status} — Failed: {u}")
            if status == 403 and "Permission denied" in str(res):
                permission_denied = True
                print(f"      Reason: Service Account has not been added as Owner in Google Search Console.")
                break
        time.sleep(0.3)  # Gentle rate limiting

    print("-" * 70)
    if permission_denied:
        print("\n⚠️  ACTION REQUIRED TO ACTIVATE GOOGLE INDEXING API:")
        print(f"1. Open Google Search Console: https://search.google.com/search-console")
        print(f"2. Select Property: mlhk.in (or https://mlhk.in/)")
        print(f"3. Go to: Settings (bottom-left) -> Users and permissions (उपयोगकर्ता और अनुमतियां)")
        print(f"4. Click: 'Add user' (उपयोगकर्ता जोड़ें)")
        print(f"   • Email address: {client_email}")
        print(f"   • Permission:    Owner (मालिक)")
        print(f"5. Click 'Add'. Then re-run this script!")
        print("=" * 70)
        sys.exit(2)
    else:
        print(f"\n🎉 Successfully submitted {success_count}/{len(urls)} URLs to Google!")
        print("Googlebot will prioritize and crawl these pages in real time.")
        print("=" * 70)

if __name__ == "__main__":
    main()
