import requests

def check_error_leakage(url):

    try:
        r = requests.get(url + "/nonexistentpage")

        if "stack trace" in r.text.lower():
            return {
                "check": "error_leakage",
                "status": "fail",
                "issue": "Stack trace exposed"
            }

    except:
        pass

    return {
        "check": "error_leakage",
        "status": "pass",
        "issue": None
    }