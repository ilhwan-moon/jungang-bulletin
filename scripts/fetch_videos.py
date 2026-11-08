#!/usr/bin/env python3
"""교회 유튜브 채널의 최근 영상 목록을 videos.json으로 저장합니다 (표준 라이브러리만 사용).
1) RSS 피드 (여러 번 재시도)  2) 실패하면 채널의 '라이브' 페이지에서 직접 읽기.
둘 다 실패하면 기존 파일을 그대로 두고 정상 종료합니다."""
import json, re, sys, time, urllib.request, xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone

CHANNEL_ID = "UC3g04WOzL8r_g45tASh3xFw"   # @jbchlacentral
HANDLE = "jbchlacentral"
FEED = f"https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL_ID}"
NS = {"a": "http://www.w3.org/2005/Atom", "yt": "http://www.youtube.com/xml/schemas/2015"}
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"

def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "en-US,en;q=0.8"})
    return urllib.request.urlopen(req, timeout=30).read()

def from_feed():
    for attempt in range(5):
        try:
            root = ET.fromstring(get(FEED))
            out = []
            for e in root.findall("a:entry", NS):
                vid = e.findtext("yt:videoId", namespaces=NS)
                if vid:
                    out.append({"id": vid, "title": (e.findtext("a:title", namespaces=NS) or "").strip(),
                                "published": e.findtext("a:published", namespaces=NS)})
            if out:
                return out
        except Exception as ex:
            print(f"feed attempt {attempt + 1} failed: {ex}", file=sys.stderr)
        time.sleep(5 * (attempt + 1))
    return []

def rel_to_iso(txt):
    """'Streamed 3 hours ago' / '2 days ago' → 대략적인 ISO 시간"""
    m = re.search(r"(\d+)\s+(second|minute|hour|day|week|month|year)s?\s+ago", txt or "")
    if not m:
        return None
    n, unit = int(m.group(1)), m.group(2)
    secs = {"second": 1, "minute": 60, "hour": 3600, "day": 86400, "week": 604800, "month": 2592000, "year": 31536000}[unit]
    return (datetime.now(timezone.utc) - timedelta(seconds=n * secs)).replace(microsecond=0).isoformat()

def from_page():
    out = []
    for tab in ("streams", "videos"):
        try:
            html = get(f"https://www.youtube.com/@{HANDLE}/{tab}").decode("utf-8", "replace")
        except Exception as ex:
            print(f"page {tab} failed: {ex}", file=sys.stderr)
            continue
        for m in re.finditer(r'"videoRenderer":\{"videoId":"([\w-]{11})".*?"title":\{"runs":\[\{"text":"(.*?)"\}\].*?"publishedTimeText":\{"simpleText":"(.*?)"\}', html):
            vid, title, when = m.group(1), json.loads('"' + m.group(2) + '"'), m.group(3)
            iso = rel_to_iso(when)
            if iso and not any(v["id"] == vid for v in out):
                out.append({"id": vid, "title": title, "published": iso, "approx": True})
    out.sort(key=lambda v: v["published"], reverse=True)
    return out[:20]

def main(out="videos.json"):
    try:
        old = json.load(open(out, encoding="utf-8"))
    except Exception:
        old = {"videos": []}
    videos = from_feed()
    source = "feed"
    if not videos:
        videos, source = from_page(), "page"
    if not videos:
        print("could not fetch videos; keeping old file")
        return 0
    # 이전 목록과 합치기: 정확한 시간(피드)이 있으면 그것을 유지
    merged = {v["id"]: v for v in old.get("videos", [])}
    for v in videos:
        if v["id"] in merged and v.get("approx") and not merged[v["id"]].get("approx"):
            continue
        merged[v["id"]] = v
    allv = sorted(merged.values(), key=lambda v: v["published"], reverse=True)[:30]
    if allv == old.get("videos"):
        print(f"unchanged ({source})")
        return 0
    with open(out, "w", encoding="utf-8") as f:
        json.dump({"channel": f"https://www.youtube.com/@{HANDLE}", "videos": allv}, f, ensure_ascii=False, indent=1)
    print(f"saved {len(allv)} videos ({source})")
    return 0

if __name__ == "__main__":
    sys.exit(main(*sys.argv[1:]))
