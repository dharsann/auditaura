import requests

def check_rate_limiting(url):

    try:

        for _ in range(20):
            r = requests.get(url)

        if r.status_code == 429:
            return {
                "check": "rate_limiting",
                "status": "pass",
                "issue": None
            }

    except:
        pass

    return {
        "check": "rate_limiting",
        "status": "warning",
        "issue": "Rate limiting not detected"
    }