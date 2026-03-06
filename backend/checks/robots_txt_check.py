import requests

def check_robots_sensitive(url):

    try:

        r = requests.get(url + "/robots.txt")

        if r.status_code == 200:

            content = r.text.lower()

            if "admin" in content or "private" in content:
                return {
                    "check": "robots_sensitive_paths",
                    "status": "warning",
                    "issue": "Sensitive paths listed in robots.txt"
                }

    except:
        pass

    return {
        "check": "robots_sensitive_paths",
        "status": "pass",
        "issue": None
    }