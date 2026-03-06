def check_authentication(pages):

    risky_pages = []

    sensitive_keywords = ["admin", "dashboard", "settings"]

    for p in pages:

        for keyword in sensitive_keywords:

            if keyword in p.lower():
                risky_pages.append(p)

    if risky_pages:

        return {
            "check": "authentication_protection",
            "status": "warning",
            "issue": f"Sensitive pages detected: {risky_pages}"
        }

    return {
        "check": "authentication_protection",
        "status": "pass",
        "issue": None
    }