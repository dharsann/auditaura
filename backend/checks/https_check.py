def check_https(url: str):

    if url.startswith("https"):
        return {
            "check": "https_enabled",
            "status": "pass",
            "issue": None
        }

    return {
        "check": "https_enabled",
        "status": "fail",
        "issue": "Application not using HTTPS"
    }