import requests

def check_data_exposure(url):
    try:
        r = requests.get(url)

        if "password" in r.text.lower() or "token" in r.text.lower():
            return {
                "check": "data_exposure",
                "status": "fail",
                "issue": "Sensitive data exposed in response"
            }

    except Exception as e:
        return {"check": "data_exposure", "status": "error", "issue": str(e)}

    return {"check": "data_exposure", "status": "pass", "issue": None}