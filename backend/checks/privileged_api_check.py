def check_privileged_api(api_calls):
    privileged = []

    for api in api_calls:
        if "admin" in api or "root" in api:
            privileged.append(api)

    if privileged:
        return {
            "check": "privileged_api",
            "status": "warning",
            "issue": f"Privileged APIs exposed: {privileged}"
        }

    return {
        "check": "privileged_api",
        "status": "pass",
        "issue": None
    }