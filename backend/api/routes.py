from fastapi import APIRouter
from crawler.crawl_app import crawl_application
from compliance.dynamic_compliance_engine import run_automated_checks
from compliance.manual_audit_engine import evaluate_manual_controls
import asyncio

router = APIRouter()


@router.get("/crawl")
async def crawl_target(url: str, username: str = None, password: str = None):
    result = await asyncio.to_thread(
    crawl_application,
    url,
    username,
    password
    )
    return {
        "status": "success",
        "crawler_result": result
    }


@router.get("/scan")
async def run_security_scan(url: str, username: str = None, password: str = None):
    crawler_result = await asyncio.to_thread(
    crawl_application,
    url,
    username,
    password
    )
    findings = run_automated_checks(url, crawler_result)
    return {
        "status": "scan_complete",
        "findings": findings
    }


@router.get("/manual-controls")
def manual_controls():
    results = evaluate_manual_controls()
    return {
        "status": "manual_controls",
        "controls": results
    }


@router.get("/audit")
async def run_full_audit(url: str, username: str = None, password: str = None):
    crawler_result = await asyncio.to_thread(
    crawl_application,
    url,
    username,
    password
    )
    automated = run_automated_checks(url, crawler_result)
    manual = evaluate_manual_controls()
    return {
        "framework": "ISO27001",
        "automated_results": automated,
        "manual_controls": manual
    }