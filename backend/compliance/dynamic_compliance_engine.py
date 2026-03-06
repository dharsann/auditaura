import json
from compliance.check_loader import load_check_function

DATASET = "regulations/iso27001_controls_2022.json"


def run_automated_checks(url, crawler_result):

    with open(DATASET) as f:
        controls = json.load(f)["controls"]

    findings = []

    pages = crawler_result.get("pages", [])
    api_calls = crawler_result.get("api_calls", [])

    for control in controls:

        if control.get("automation") != "automated":
            continue

        check_name = control.get("check")

        try:

            check_function = load_check_function(check_name)

            # choose input automatically
            if "api" in check_name:
                result = check_function(api_calls)

            elif "endpoint" in check_name or "auth" in check_name or "password" in check_name:
                result = check_function(pages)

            else:
                result = check_function(url)

            findings.append({
                "control": control["id"],
                "title": control["title"],
                "check": check_name,
                "result": result
            })

        except Exception as e:

            findings.append({
                "control": control["id"],
                "check": check_name,
                "error": str(e)
            })

    return findings