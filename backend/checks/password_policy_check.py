def check_password_policy(pages):

    keywords = ["password", "reset-password", "change-password"]

    detected = []

    for p in pages:
        for k in keywords:
            if k in p.lower():
                detected.append(p)

    if detected:
        return {
            "check": "password_policy",
            "status": "pass",
            "issue": None
        }

    return {
        "check": "password_policy",
        "status": "warning",
        "issue": "Password policy endpoints not detected"
    }