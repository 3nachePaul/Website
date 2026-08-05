#!/usr/bin/env python3
"""Build the static data file used by /cybernews.

The script intentionally uses only the Python standard library so it can run
inside GitHub Actions without installing packages. Feed content is treated as
untrusted input and is reduced to plain text before it reaches the site.
"""

from __future__ import annotations

import argparse
import hashlib
import html
import json
import re
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path
from typing import Any
from zoneinfo import ZoneInfo


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "data" / "cybernews.json"
BUCHAREST = ZoneInfo("Europe/Bucharest")
USER_AGENT = "pol-center-cybernews/1.0 (+https://pol-center.com/cybernews/)"
MAX_RESPONSE_BYTES = 4_000_000
MAX_ARTICLES = 54
MAX_PER_SOURCE = 12
ARTICLE_MAX_AGE_DAYS = 21


FEEDS = [
    {
        "name": "CISA Advisories",
        "url": "https://www.cisa.gov/cybersecurity-advisories/all.xml",
        "fetch_hosts": ["cisa.gov"],
        "article_hosts": ["cisa.gov"],
        "kind": "advisory",
        "authority": 24,
    },
    {
        "name": "CERT-EU",
        "url": "https://cert.europa.eu/publications/security-advisories-rss",
        "fetch_hosts": ["cert.europa.eu"],
        "article_hosts": ["cert.europa.eu"],
        "kind": "advisory",
        "authority": 23,
    },
    {
        "name": "Microsoft Security Operations",
        "url": "https://www.microsoft.com/en-us/security/blog/topic/security-operations/feed/",
        "fetch_hosts": ["microsoft.com"],
        "article_hosts": ["microsoft.com"],
        "kind": "research",
        "authority": 18,
    },
    {
        "name": "Microsoft Threat Intelligence",
        "url": "https://www.microsoft.com/en-us/security/blog/topic/threat-intelligence/feed/",
        "fetch_hosts": ["microsoft.com"],
        "article_hosts": ["microsoft.com"],
        "kind": "research",
        "authority": 18,
    },
    {
        "name": "Google Threat Intelligence",
        "url": "https://feeds.feedburner.com/threatintelligence/pvexyqv7v0v",
        "fetch_hosts": ["feedburner.com", "cloud.google.com"],
        "article_hosts": ["cloud.google.com"],
        "kind": "research",
        "authority": 18,
    },
    {
        "name": "SANS Internet Storm Center",
        "url": "https://isc.sans.edu/rssfeed_full.xml",
        "fetch_hosts": ["isc.sans.edu"],
        "article_hosts": ["isc.sans.edu"],
        "kind": "operations",
        "authority": 16,
    },
    {
        "name": "UK NCSC Threat Reports",
        "url": "https://www.ncsc.gov.uk/api/1/services/v1/report-rss-feed.xml",
        "fetch_hosts": ["ncsc.gov.uk"],
        "article_hosts": ["ncsc.gov.uk"],
        "kind": "advisory",
        "authority": 21,
    },
    {
        "name": "BleepingComputer",
        "url": "https://www.bleepingcomputer.com/feed/",
        "fetch_hosts": ["bleepingcomputer.com"],
        "article_hosts": ["bleepingcomputer.com"],
        "kind": "news",
        "authority": 8,
    },
]

KEV_SOURCE = {
    "name": "CISA Known Exploited Vulnerabilities",
    "url": "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json",
    "fetch_hosts": ["cisa.gov"],
    "article_hosts": ["cisa.gov"],
    "kind": "kev",
}


CATEGORY_RULES = [
    (
        "supply-chain",
        ["supply chain", "supply-chain", "npm package", "dependency", "package registry", "extension marketplace"],
    ),
    (
        "phishing",
        ["phishing", "business email compromise", "bec", "malicious email", "social engineering"],
    ),
    (
        "identity",
        [
            "identity",
            "entra",
            "active directory",
            "adfs",
            "oauth",
            "sso",
            "mfa",
            "credential",
            "password",
            "token",
            "account takeover",
        ],
    ),
    (
        "ransomware",
        ["ransomware", "extortion", "encryptor", "data leak site"],
    ),
    (
        "vulnerability",
        [
            "cve-",
            "vulnerability",
            "zero-day",
            "0-day",
            "remote code execution",
            "authentication bypass",
            "security update",
            "patch",
        ],
    ),
    (
        "malware",
        ["malware", "trojan", "backdoor", "infostealer", "loader", "botnet", "rootkit", "webshell"],
    ),
    (
        "cloud",
        ["cloud", "azure", "aws", "google cloud", "kubernetes", "container", "m365", "office 365"],
    ),
    (
        "network",
        ["vpn", "firewall", "router", "network appliance", "dns", "ddos", "cisco", "fortinet", "palo alto"],
    ),
    (
        "endpoint",
        ["windows", "linux", "macos", "endpoint", "edr", "browser", "chrome", "firefox"],
    ),
    (
        "data-breach",
        ["data breach", "breach", "data theft", "leak", "stolen data"],
    ),
]

PLATFORM_RULES = [
    ("windows", ["windows", "active directory", "powershell", "microsoft defender"]),
    ("m365-entra", ["m365", "office 365", "entra", "azure ad", "outlook", "exchange online"]),
    ("linux", ["linux", "ubuntu", "debian", "red hat", "rhel"]),
    ("cloud", ["azure", "aws", "google cloud", "cloud", "kubernetes", "container"]),
    ("network-appliance", ["vpn", "firewall", "router", "cisco", "fortinet", "palo alto", "ivanti"]),
    ("browser", ["chrome", "firefox", "edge", "browser", "webkit"]),
    ("ot-ics", ["ics", "scada", "industrial control", "operational technology"]),
]

TRIAGE = {
    "supply-chain": {
        "why": "A compromised package or update can create alerts across developer endpoints, build systems and production workloads.",
        "checks": [
            "Confirm whether the named package, extension or version exists internally.",
            "Review install time, parent process, outbound traffic and exposed credentials.",
            "Search build logs and peer systems for the same dependency or behavior.",
        ],
        "escalate": "Escalate on confirmed installation, suspicious execution, credential access or a tainted production build.",
    },
    "identity": {
        "why": "Identity activity often becomes the first visible signal before mailbox, cloud or endpoint impact.",
        "checks": [
            "Review risky sign-ins, impossible travel and unfamiliar devices.",
            "Check MFA, password and app-consent changes around the event.",
            "Correlate the account with mailbox, endpoint and token activity.",
        ],
        "escalate": "Escalate on successful anomalous sign-in, MFA reset, suspicious consent or token reuse.",
    },
    "phishing": {
        "why": "This may surface first as a mail alert, user report, malicious click or suspicious sign-in.",
        "checks": [
            "Inspect sender, reply-to, URLs, attachments and authentication results.",
            "Search for other recipients and confirm whether anyone clicked.",
            "Correlate clicks with sign-ins, downloads and endpoint events.",
        ],
        "escalate": "Escalate when a user clicked, entered credentials, opened a payload or similar mail reached others.",
    },
    "ransomware": {
        "why": "Early containment matters; precursor activity can appear before encryption or extortion becomes visible.",
        "checks": [
            "Validate the alert and identify the first affected host and user.",
            "Look for lateral movement, credential access and mass file changes.",
            "Preserve evidence and follow the isolation playbook if impact is confirmed.",
        ],
        "escalate": "Escalate immediately on encryption, lateral movement, disabled controls or confirmed data theft.",
    },
    "vulnerability": {
        "why": "A newly disclosed or exploited flaw can quickly turn into scanning, intrusion and noisy endpoint alerts.",
        "checks": [
            "Confirm whether the affected product and version exist in your environment.",
            "Check patch or mitigation status with the asset owner.",
            "Hunt for exploitation indicators named by the primary source.",
        ],
        "escalate": "Escalate when an exposed affected asset, exploitation evidence or missing urgent mitigation is found.",
    },
    "malware": {
        "why": "Named malware gives you a starting point for validating endpoint, network and identity telemetry.",
        "checks": [
            "Validate detections against process, file, persistence and network context.",
            "Search for the same behavior or indicators across other hosts.",
            "Identify the likely entry point and affected user account.",
        ],
        "escalate": "Escalate on execution, persistence, credential access, command-and-control or spread to another host.",
    },
    "cloud": {
        "why": "Cloud incidents often cross identity, control-plane and workload logs, so isolated alerts can hide scope.",
        "checks": [
            "Review control-plane changes, sign-ins and newly created credentials.",
            "Check public exposure, unusual data access and workload activity.",
            "Correlate the actor, source IP and time across cloud services.",
        ],
        "escalate": "Escalate on unauthorized configuration change, exposed data, new credential or suspicious workload execution.",
    },
    "network": {
        "why": "Edge devices are frequently internet-exposed and may provide the first evidence of scanning or access.",
        "checks": [
            "Identify affected models, versions and internet-facing assets.",
            "Review authentication, configuration and traffic anomalies.",
            "Search for source IPs and paths cited by the advisory.",
        ],
        "escalate": "Escalate on successful access, configuration change, persistence or an exposed unmitigated device.",
    },
    "endpoint": {
        "why": "Endpoint telemetry can confirm whether a public report is relevant to real activity in your estate.",
        "checks": [
            "Review process tree, signer, command line and parent-child relationships.",
            "Correlate file, registry, persistence and outbound network events.",
            "Search for the behavior across peer endpoints.",
        ],
        "escalate": "Escalate on suspicious execution, persistence, defense evasion or confirmed user impact.",
    },
    "data-breach": {
        "why": "Breach reporting can reveal exposed credentials, third-party risk or activity relevant to current alerts.",
        "checks": [
            "Confirm whether your organization, supplier or technology stack is affected.",
            "Monitor for related credential abuse, phishing and data access.",
            "Capture confirmed scope and primary-source statements before escalating.",
        ],
        "escalate": "Escalate on organizational exposure, credential compromise or matching suspicious activity.",
    },
    "threat-intel": {
        "why": "The report can provide context for alerts already in the queue and ideas for targeted hunting.",
        "checks": [
            "Extract only indicators and behaviors supported by the source.",
            "Compare them with recent SIEM, EDR, identity and network alerts.",
            "Record relevant findings without blocking on unverified indicators alone.",
        ],
        "escalate": "Escalate when supported indicators match internal telemetry or the reported behavior appears in your environment.",
    },
}


def url_host_allowed(url: str, allowed_hosts: list[str]) -> bool:
    parsed = urllib.parse.urlsplit(url)
    hostname = (parsed.hostname or "").lower().rstrip(".")
    return (
        parsed.scheme.lower() in {"http", "https"}
        and bool(hostname)
        and any(hostname == allowed or hostname.endswith(f".{allowed}") for allowed in allowed_hosts)
    )


class RestrictedRedirectHandler(urllib.request.HTTPRedirectHandler):
    def __init__(self, allowed_hosts: list[str]) -> None:
        self.allowed_hosts = allowed_hosts

    def redirect_request(
        self,
        request: urllib.request.Request,
        file_pointer: Any,
        code: int,
        message: str,
        headers: Any,
        new_url: str,
    ) -> urllib.request.Request | None:
        resolved_url = urllib.parse.urljoin(request.full_url, new_url)
        if not url_host_allowed(resolved_url, self.allowed_hosts):
            raise ValueError(f"redirected to a disallowed host: {resolved_url}")
        return super().redirect_request(request, file_pointer, code, message, headers, resolved_url)


def fetch_bytes(url: str, allowed_hosts: list[str]) -> bytes:
    if not url_host_allowed(url, allowed_hosts):
        raise ValueError(f"source URL uses a disallowed host: {url}")
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "application/rss+xml, application/atom+xml, application/json, text/xml;q=0.9, */*;q=0.5",
        },
    )
    opener = urllib.request.build_opener(RestrictedRedirectHandler(allowed_hosts))
    with opener.open(request, timeout=25) as response:
        if not url_host_allowed(response.geturl(), allowed_hosts):
            raise ValueError(f"response came from a disallowed host: {response.geturl()}")
        content_length = response.headers.get("Content-Length")
        if content_length and int(content_length) > MAX_RESPONSE_BYTES:
            raise ValueError(f"response too large: {content_length} bytes")
        payload = response.read(MAX_RESPONSE_BYTES + 1)
    if len(payload) > MAX_RESPONSE_BYTES:
        raise ValueError("response exceeded size limit")
    return payload


def clean_text(value: str | None, limit: int = 420) -> str:
    if not value:
        return ""
    value = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", value, flags=re.I | re.S)
    value = re.sub(r"<br\s*/?>", " ", value, flags=re.I)
    value = re.sub(r"<[^>]+>", " ", value)
    value = html.unescape(value)
    value = re.sub(r"\s+", " ", value).strip()
    value = re.sub(r"\s*The post .*? appeared first on .*?\.?$", "", value, flags=re.I)
    value = re.sub(r"\s*\[\s*\.\.\.\s*\]\s*$", "…", value)
    value = re.sub(r"\s*(Read more|Continue reading)\s*.*$", "", value, flags=re.I)
    if len(value) <= limit:
        return value
    shortened = value[: limit + 1].rsplit(" ", 1)[0].rstrip(" ,;:-")
    return f"{shortened}…"


def child_text(node: ET.Element, names: list[str]) -> str:
    for child in node.iter():
        local_name = child.tag.rsplit("}", 1)[-1].lower()
        if local_name in names and child.text:
            return child.text.strip()
    return ""


def parse_datetime(value: str | None) -> datetime:
    if not value:
        return datetime.now(timezone.utc)
    value = value.strip()
    try:
        parsed = parsedate_to_datetime(value)
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=timezone.utc)
        return parsed.astimezone(timezone.utc)
    except (TypeError, ValueError, OverflowError):
        pass
    try:
        parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=timezone.utc)
        return parsed.astimezone(timezone.utc)
    except ValueError:
        return datetime.now(timezone.utc)


def safe_url(value: str | None, allowed_hosts: list[str] | None = None) -> str:
    if not value:
        return ""
    value = html.unescape(value).strip()
    parsed = urllib.parse.urlsplit(value)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        return ""
    if allowed_hosts and not url_host_allowed(value, allowed_hosts):
        return ""
    query = urllib.parse.parse_qsl(parsed.query, keep_blank_values=True)
    query = [
        (key, item)
        for key, item in query
        if not key.lower().startswith("utm_")
        and key.lower() not in {"fbclid", "gclid", "mc_cid", "mc_eid"}
    ]
    return urllib.parse.urlunsplit(
        (parsed.scheme.lower(), parsed.netloc.lower(), parsed.path, urllib.parse.urlencode(query), "")
    )


def entry_link(node: ET.Element, allowed_hosts: list[str]) -> str:
    direct = child_text(node, ["link"])
    if direct:
        return safe_url(direct, allowed_hosts)
    for child in node.iter():
        if child.tag.rsplit("}", 1)[-1].lower() != "link":
            continue
        href = child.attrib.get("href")
        rel = child.attrib.get("rel", "alternate")
        if href and rel in {"alternate", ""}:
            return safe_url(href, allowed_hosts)
    return ""


def parse_feed(source: dict[str, Any]) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    payload = fetch_bytes(source["url"], source["fetch_hosts"])
    upper_payload = payload.upper()
    if b"<!DOCTYPE" in upper_payload or b"<!ENTITY" in upper_payload:
        raise ValueError("feed contains a forbidden XML document type or entity declaration")
    root = ET.fromstring(payload)
    nodes = [node for node in root.iter() if node.tag.rsplit("}", 1)[-1].lower() in {"item", "entry"}]
    articles = []
    for node in nodes[: MAX_PER_SOURCE * 2]:
        title = clean_text(child_text(node, ["title"]), 220)
        url = entry_link(node, source["article_hosts"])
        if not title or not url:
            continue
        if title.lower().startswith("isc stormcast"):
            continue
        summary = clean_text(child_text(node, ["description", "summary", "content", "encoded"]), 420)
        published = parse_datetime(child_text(node, ["pubdate", "published", "updated", "date"]))
        articles.append(
            {
                "title": title,
                "url": url,
                "summary": summary,
                "published_at": published.isoformat().replace("+00:00", "Z"),
                "source": source["name"],
                "source_url": source["url"],
                "source_kind": source["kind"],
                "authority": source["authority"],
                "is_kev": False,
            }
        )
    return articles[:MAX_PER_SOURCE], {
        "name": source["name"],
        "url": source["url"],
        "status": "ok",
        "items": len(articles[:MAX_PER_SOURCE]),
    }


def parse_kev() -> tuple[list[dict[str, Any]], dict[str, Any]]:
    catalog = json.loads(fetch_bytes(KEV_SOURCE["url"], KEV_SOURCE["fetch_hosts"]).decode("utf-8"))
    vulnerabilities = catalog.get("vulnerabilities", [])
    vulnerabilities.sort(key=lambda item: item.get("dateAdded", ""), reverse=True)
    articles = []
    for item in vulnerabilities[:MAX_PER_SOURCE]:
        cve = clean_text(item.get("cveID"), 40)
        vendor = clean_text(item.get("vendorProject"), 80)
        product = clean_text(item.get("product"), 100)
        name = clean_text(item.get("vulnerabilityName"), 180)
        action = clean_text(item.get("requiredAction"), 300)
        date_added = item.get("dateAdded", "")
        try:
            published = datetime.fromisoformat(date_added).replace(tzinfo=timezone.utc)
        except ValueError:
            published = datetime.now(timezone.utc)
        details_url = f"https://www.cisa.gov/known-exploited-vulnerabilities-catalog?search_api_fulltext={urllib.parse.quote(cve)}"
        articles.append(
            {
                "title": f"{cve}: {name}",
                "url": details_url,
                "summary": clean_text(f"{vendor} {product}. CISA required action: {action}", 420),
                "published_at": published.isoformat().replace("+00:00", "Z"),
                "source": KEV_SOURCE["name"],
                "source_url": KEV_SOURCE["url"],
                "source_kind": "kev",
                "authority": 42,
                "is_kev": True,
                "product": f"{vendor} {product}".strip(),
                "due_date": item.get("dueDate", ""),
                "known_ransomware_use": item.get("knownRansomwareCampaignUse", "Unknown"),
                "classification_text": f"{cve} {name} {vendor} {product}",
            }
        )
    return articles, {
        "name": KEV_SOURCE["name"],
        "url": KEV_SOURCE["url"],
        "status": "ok",
        "items": len(articles),
    }


def classify(text: str) -> str:
    lowered = text.lower()
    best = (0, "threat-intel")
    for category, keywords in CATEGORY_RULES:
        score = sum(1 for keyword in keywords if keyword in lowered)
        if score > best[0]:
            best = (score, category)
    return best[1]


def extract_tags(text: str, category: str, is_kev: bool) -> tuple[list[str], list[str]]:
    lowered = text.lower()
    tags = [category]
    evidence = []
    if is_kev:
        tags.extend(["active-exploitation", "patch"])
        evidence.extend(["kev", "observed-in-wild"])
    if any(term in lowered for term in ["actively exploited", "active exploitation", "exploited in the wild"]):
        if "active-exploitation" not in tags:
            tags.append("active-exploitation")
        evidence.append("observed-in-wild")
    if any(term in lowered for term in ["detection", "hunt", "indicator", "ioc", "sigma", "yara"]):
        tags.append("detect-hunt")
        evidence.append("detection-guidance")
    if any(term in lowered for term in ["patch", "update", "mitigation", "workaround"]):
        tags.append("patch")
    platforms = []
    for platform, keywords in PLATFORM_RULES:
        if any(
            re.search(rf"(?<![a-z0-9]){re.escape(keyword)}(?![a-z0-9])", lowered)
            for keyword in keywords
        ):
            platforms.append(platform)
    return list(dict.fromkeys(tags + platforms))[:7], list(dict.fromkeys(evidence))[:4]


def score_article(article: dict[str, Any], now: datetime) -> tuple[int, str]:
    text = f"{article['title']} {article.get('summary', '')}".lower()
    score = 10 + int(article.get("authority", 0))
    if article.get("is_kev"):
        score += 30
    if any(term in text for term in ["actively exploited", "active exploitation", "exploited in the wild"]):
        score += 18
    if any(term in text for term in ["critical", "zero-day", "0-day", "remote code execution", "authentication bypass"]):
        score += 12
    if any(term in text for term in ["ransomware", "credential theft", "supply chain", "internet-facing"]):
        score += 9
    if any(term in text for term in ["detection", "hunting", "indicator", "ioc", "mitigation", "patch", "workaround"]):
        score += 8
    if any(term in text for term in ["windows", "m365", "entra", "vpn", "firewall", "linux", "browser", "cloud"]):
        score += 6

    published = parse_datetime(article.get("published_at"))
    age = now - published
    if age <= timedelta(hours=24):
        score += 8
    elif age <= timedelta(hours=72):
        score += 4

    score = max(0, min(100, score))
    if score >= 75:
        band = "critical"
    elif score >= 55:
        band = "high"
    elif score >= 35:
        band = "watch"
    else:
        band = "context"
    return score, band


def enrich(article: dict[str, Any], now: datetime) -> dict[str, Any]:
    combined = f"{article['title']} {article.get('summary', '')}"
    classification_text = article.get("classification_text") or combined
    category = classify(classification_text)
    tags, evidence = extract_tags(classification_text, category, bool(article.get("is_kev")))
    cves = sorted(set(re.findall(r"\bCVE-\d{4}-\d{4,7}\b", combined, flags=re.I)))[:5]
    cves = [cve.upper() for cve in cves]
    score, priority = score_article(article, now)
    triage = TRIAGE[category]
    story_id = hashlib.sha256(article["url"].encode("utf-8")).hexdigest()[:12]
    published = parse_datetime(article["published_at"])
    age_hours = max(0, round((now - published).total_seconds() / 3600))

    return {
        "id": story_id,
        "title": article["title"],
        "url": article["url"],
        "summary": article.get("summary") or "Open the primary source for the full technical context.",
        "source": article["source"],
        "source_url": article["source_url"],
        "source_kind": article["source_kind"],
        "published_at": published.isoformat().replace("+00:00", "Z"),
        "age_hours": age_hours,
        "category": category,
        "priority": priority,
        "priority_score": score,
        "tags": tags,
        "evidence": evidence,
        "cves": cves,
        "why_l1_cares": triage["why"],
        "first_checks": triage["checks"],
        "escalate_when": triage["escalate"],
        "is_kev": bool(article.get("is_kev")),
        **({"product": article["product"]} if article.get("product") else {}),
        **({"due_date": article["due_date"]} if article.get("due_date") else {}),
        **(
            {"known_ransomware_use": article["known_ransomware_use"]}
            if article.get("known_ransomware_use")
            else {}
        ),
    }


def normalize_title(title: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", title.lower()).strip()


def deduplicate(articles: list[dict[str, Any]]) -> list[dict[str, Any]]:
    unique = []
    seen_urls = set()
    seen_titles = set()
    for article in articles:
        url_key = article["url"].rstrip("/")
        title_key = normalize_title(article["title"])
        if url_key in seen_urls or title_key in seen_titles:
            continue
        seen_urls.add(url_key)
        seen_titles.add(title_key)
        unique.append(article)
    return unique


def load_previous() -> dict[str, Any]:
    if not OUTPUT.exists():
        return {}
    try:
        return json.loads(OUTPUT.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {}


def should_skip_scheduled(previous: dict[str, Any], now_local: datetime) -> str | None:
    if now_local.hour < 8:
        return f"local time is {now_local:%H:%M}; waiting for the 08:00 run"
    generated_at = previous.get("generated_at")
    if generated_at:
        previous_date = parse_datetime(generated_at).astimezone(BUCHAREST).date()
        if previous_date == now_local.date():
            return "today's briefing has already been generated"
    return None


def build(scheduled: bool = False) -> int:
    now = datetime.now(timezone.utc)
    now_local = now.astimezone(BUCHAREST)
    previous = load_previous()

    if scheduled:
        reason = should_skip_scheduled(previous, now_local)
        if reason:
            print(f"Skipping refresh: {reason}.")
            return 0

    raw_articles: list[dict[str, Any]] = []
    source_status: list[dict[str, Any]] = []
    failed_sources: set[str] = set()

    tasks: dict[Any, str] = {}
    with ThreadPoolExecutor(max_workers=5) as executor:
        for source in FEEDS:
            tasks[executor.submit(parse_feed, source)] = source["name"]
        tasks[executor.submit(parse_kev)] = KEV_SOURCE["name"]

        for future in as_completed(tasks):
            source_name = tasks[future]
            try:
                articles, status = future.result()
                raw_articles.extend(articles)
                source_status.append(status)
                print(f"{source_name}: {len(articles)} items")
            except Exception as error:  # noqa: BLE001 - source failures are isolated intentionally
                failed_sources.add(source_name)
                source_status.append(
                    {
                        "name": source_name,
                        "url": next(
                            (
                                source["url"]
                                for source in FEEDS + [KEV_SOURCE]
                                if source["name"] == source_name
                            ),
                            "",
                        ),
                        "status": "error",
                        "items": 0,
                        "error": clean_text(str(error), 140),
                    }
                )
                print(f"{source_name}: failed ({error})", file=sys.stderr)

    if not raw_articles:
        print("All sources failed; preserving the last valid data file.", file=sys.stderr)
        return 1

    cutoff = now - timedelta(days=ARTICLE_MAX_AGE_DAYS)
    if failed_sources:
        for article in previous.get("articles", []):
            if article.get("source") not in failed_sources:
                continue
            if parse_datetime(article.get("published_at")) < cutoff:
                continue
            raw_articles.append(
                {
                    **article,
                    "authority": 0,
                    "is_kev": article.get("is_kev", False),
                }
            )

    enriched = [
        enrich(article, now)
        for article in raw_articles
        if parse_datetime(article.get("published_at")) >= cutoff
    ]
    enriched.sort(
        key=lambda article: (article["priority_score"], article["published_at"]),
        reverse=True,
    )
    enriched = deduplicate(enriched)[:MAX_ARTICLES]

    if not enriched:
        print("No recent articles were produced; preserving the last valid data file.", file=sys.stderr)
        return 1

    counts = {band: 0 for band in ["critical", "high", "watch", "context"]}
    categories: dict[str, int] = {}
    for article in enriched:
        counts[article["priority"]] += 1
        categories[article["category"]] = categories.get(article["category"], 0) + 1

    source_status.sort(key=lambda source: source["name"])
    output = {
        "schema_version": 1,
        "generated_at": now.isoformat().replace("+00:00", "Z"),
        "generated_at_local": now_local.isoformat(timespec="minutes"),
        "timezone": "Europe/Bucharest",
        "schedule": "Daily at 08:00 Europe/Bucharest",
        "stats": {
            "total": len(enriched),
            **counts,
            "categories": dict(sorted(categories.items(), key=lambda item: item[1], reverse=True)),
            "sources_ok": sum(1 for source in source_status if source["status"] == "ok"),
            "sources_total": len(source_status),
        },
        "sources": source_status,
        "articles": enriched,
    }

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    serialized = json.dumps(output, ensure_ascii=False, indent=2) + "\n"
    temporary = OUTPUT.with_suffix(".json.tmp")
    temporary.write_text(serialized, encoding="utf-8")
    temporary.replace(OUTPUT)
    print(f"Wrote {len(enriched)} stories to {OUTPUT.relative_to(ROOT)}")
    return 0


def validate() -> int:
    data = load_previous()
    if not data:
        print("cybernews.json is missing or invalid", file=sys.stderr)
        return 1
    articles = data.get("articles")
    if not isinstance(articles, list) or len(articles) < 8:
        print("cybernews.json contains too few articles", file=sys.stderr)
        return 1
    required = {
        "id",
        "title",
        "url",
        "source",
        "published_at",
        "category",
        "priority",
        "priority_score",
        "why_l1_cares",
        "first_checks",
        "escalate_when",
    }
    for index, article in enumerate(articles):
        missing = required.difference(article)
        if missing:
            print(f"article {index} is missing: {', '.join(sorted(missing))}", file=sys.stderr)
            return 1
        if not safe_url(article.get("url")):
            print(f"article {index} has an unsafe URL", file=sys.stderr)
            return 1
        if not isinstance(article.get("first_checks"), list) or len(article["first_checks"]) != 3:
            print(f"article {index} must contain three first checks", file=sys.stderr)
            return 1
    print(f"Validated {len(articles)} cybernews stories.")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--scheduled",
        action="store_true",
        help="Run only once per Bucharest day, at or shortly after 08:00.",
    )
    parser.add_argument(
        "--validate",
        action="store_true",
        help="Validate the existing JSON without fetching feeds.",
    )
    args = parser.parse_args()
    if args.validate:
        return validate()
    return build(scheduled=args.scheduled)


if __name__ == "__main__":
    raise SystemExit(main())
