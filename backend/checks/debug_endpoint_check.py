def check_debug_endpoints(pages):

    debug_keywords = ["debug", "test", "dev", "staging"]

    found = []

    for page in pages:

        for keyword in debug_keywords:

            if keyword in page.lower():

                found.append(page)

    if found:

        return {
            "check": "debug_endpoint",
            "status": "warning",
            "issue": f"Debug endpoints detected: {found}"
        }

    return {
        "check": "debug_endpoint",
        "status": "pass",
        "issue": None
    }