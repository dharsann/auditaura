import requests

def check_cors(url):

    r = requests.get(url)

    cors = r.headers.get("Access-Control-Allow-Origin")

    if cors == "*":
        return {
            "check": "cors_misconfiguration",
            "status": "fail",
            "issue": "Wildcard CORS enabled"
        }

    return {
        "check": "cors_misconfiguration",
        "status": "pass",
        "issue": None
    }