import requests


def check_cookie_security(url):

    try:

        response = requests.get(url)

        cookies = response.cookies

        insecure_cookies = []

        for cookie in cookies:

            if not cookie.secure:
                insecure_cookies.append(cookie.name)

        if insecure_cookies:

            return {
                "check": "cookie_security",
                "status": "fail",
                "issue": f"Insecure cookies detected: {insecure_cookies}"
            }

        return {
            "check": "cookie_security",
            "status": "pass",
            "issue": None
        }

    except Exception as e:

        return {
            "check": "cookie_security",
            "status": "error",
            "issue": str(e)
        }