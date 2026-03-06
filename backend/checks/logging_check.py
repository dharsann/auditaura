def check_logging(pages):

    log_keywords = ["logs", "audit", "history"]

    detected = []

    for p in pages:
        for k in log_keywords:
            if k in p.lower():
                detected.append(p)

    if detected:
        return {
            "check": "logging_detection",
            "status": "pass",
            "issue": None
        }

    return {
        "check": "logging_detection",
        "status": "warning",
        "issue": "No logging endpoints detected"
    }