import requests

def check_headers(url):

    required_headers = [
        "Content-Security-Policy",
        "X-Frame-Options",
        "X-Content-Type-Options"
    ]

    r = requests.get(url)

    missing = []

    for h in required_headers:
        if h not in r.headers:
            missing.append(h)

    if missing:
        return {
            "check": "security_headers",
            "status": "warning",
            "issue": f"Missing headers: {missing}"
        }

    return {
        "check": "security_headers",
        "status": "pass",
        "issue": None
    }