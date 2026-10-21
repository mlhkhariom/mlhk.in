#!/usr/bin/env python3
"""
IndexNow Instant Submission Script for mlhk.in
Submits all live sitemap URLs to Bing, Yandex, and IndexNow.org engines.
Protocol: https://www.indexnow.org/documentation
"""

import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
import json
import sys

HOST = "mlhk.in"
KEY = "c8d35f963b2149b1a5e128b941de51ab"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
SITEMAP_URL = f"https://{HOST}/sitemap.xml"

ENDPOINTS = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
]

def fetch_sitemap_urls():
    print(f"Fetching sitemap from {SITEMAP_URL}...")
    req = urllib.request.Request(SITEMAP_URL, headers={"User-Agent": "IndexNow-Submitter/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            content = resp.read()
            root = ET.fromstring(content)
            # Handle XML namespace
            ns = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}
            urls = []
            for loc in root.findall(".//ns:loc", ns):
                if loc.text:
                    urls.append(loc.text.strip())
            # Fallback if no namespace
            if not urls:
                for loc in root.findall(".//loc"):
                    if loc.text:
                        urls.append(loc.text.strip())
            return sorted(list(set(urls)))
    except Exception as e:
        print(f"Warning: Failed to parse remote sitemap ({e}). Falling back to hardcoded core URLs.")
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
        ]

def submit_indexnow(urls):
    print(f"\nSubmitting {len(urls)} URLs to IndexNow endpoints...")
    print("=" * 60)
    for u in urls:
        print(f"  • {u}")
    print("=" * 60)

    payload = {
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls,
    }
    data = json.dumps(payload).encode("utf-8")

    success_count = 0
    for endpoint in ENDPOINTS:
        print(f"\nSubmitting to: {endpoint}")
        req = urllib.request.Request(
            endpoint,
            data=data,
            headers={"Content-Type": "application/json; charset=utf-8"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                print(f"  ✓ HTTP {resp.status} ({resp.reason}) — Accepted for immediate crawling!")
                success_count += 1
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8", errors="ignore")
            # IndexNow returns 200 or 202 on success
            if e.code in (200, 202):
                print(f"  ✓ HTTP {e.code} — Accepted!")
                success_count += 1
            else:
                print(f"  ✗ HTTP {e.code}: {body}")
        except Exception as e:
            print(f"  ✗ Connection Error: {e}")

    print("\n" + "=" * 60)
    if success_count > 0:
        print(f"IndexNow Submission Complete! ({success_count}/{len(ENDPOINTS)} endpoints accepted)")
    else:
        print("Warning: All endpoints failed. Verify key verification file.")
    print("=" * 60)

if __name__ == "__main__":
    urls = fetch_sitemap_urls()
    submit_indexnow(urls)

