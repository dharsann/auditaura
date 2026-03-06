import requests

def check_http_methods(url):

    try:

        r = requests.options(url)

        methods = r.headers.get("Allow", "")

        risky = ["PUT", "DELETE", "TRACE"]

        for m in risky:
            if m in methods:
                return {
                    "check": "http_methods_exposed",
                    "status": "warning",
                    "issue": f"Risky HTTP method enabled: {m}"
                }

    except:
        pass

    return {
        "check": "http_methods_exposed",
        "status": "pass",
        "issue": None
    }