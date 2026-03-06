def check_api_security(api_calls):

    risky_apis = []

    sensitive_keywords = ["users", "admin", "accounts"]

    for api in api_calls:

        url = api.get("url", "")

        for keyword in sensitive_keywords:

            if keyword in url.lower():
                risky_apis.append(url)

    if risky_apis:

        return {
            "check": "api_security",
            "status": "warning",
            "issue": f"Sensitive APIs detected: {risky_apis}"
        }

    return {
        "check": "api_security",
        "status": "pass",
        "issue": None
    }