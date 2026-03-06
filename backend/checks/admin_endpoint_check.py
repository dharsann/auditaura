def check_admin_endpoints(pages):

    admin_keywords = ["admin", "administrator", "manage", "backend"]

    exposed_admin = []

    for page in pages:

        for keyword in admin_keywords:

            if keyword in page.lower():

                exposed_admin.append(page)

    if exposed_admin:

        return {
            "check": "admin_endpoint_exposure",
            "status": "warning",
            "issue": f"Admin endpoints detected: {exposed_admin}"
        }

    return {
        "check": "admin_endpoint_exposure",
        "status": "pass",
        "issue": None
    }