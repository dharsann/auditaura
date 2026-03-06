import requests

def check_session_timeout(url):

    try:
        r = requests.get(url)

        cookies = r.cookies

        for cookie in cookies:
            if cookie.expires is None:
                return {
                    "check": "session_timeout",
                    "status": "warning",
                    "issue": "Session cookie without expiry"
                }

    except Exception as e:
        return {"check": "session_timeout", "status": "error", "issue": str(e)}

    return {"check": "session_timeout", "status": "pass", "issue": None}