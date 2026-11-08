#!/usr/bin/env python3
"""교회 유튜브 채널 RSS에서 최근 영상 목록을 받아 videos.json으로 저장합니다 (표준 라이브러리만 사용)."""
import json, re, sys, urllib.request, xml.etree.ElementTree as ET

CHANNEL_ID = "UC3g04WOzL8r_g45tASh3xFw"   # @jbchlacentral
URL = f"https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL_ID}"
NS = {"a": "http://www.w3.org/2005/Atom", "yt": "http://www.youtube.com/xml/schemas/2015"}

def main(out="videos.json"):
    req = urllib.request.Request(URL, headers={"User-Agent": "Mozilla/5.0 (church-bulletin)"})
    xml = urllib.request.urlopen(req, timeout=30).read()
    root = ET.fromstring(xml)
    videos = []
    for e in root.findall("a:entry", NS):
        vid = e.findtext("yt:videoId", namespaces=NS)
        if not vid:
            continue
        videos.append({
            "id": vid,
            "title": (e.findtext("a:title", namespaces=NS) or "").strip(),
            "published": e.findtext("a:published", namespaces=NS),
        })
    if not videos:
        print("no videos parsed; keep old file", file=sys.stderr)
        return 1
    data = {"channel": "https://www.youtube.com/@jbchlacentral", "videos": videos}
    try:
        old = json.load(open(out, encoding="utf-8"))
    except Exception:
        old = None
    if old and old.get("videos") == videos:
        print("unchanged")
        return 0
    with open(out, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    print(f"saved {len(videos)} videos")
    return 0

if __name__ == "__main__":
    sys.exit(main(*sys.argv[1:]))
