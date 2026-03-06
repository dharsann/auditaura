import requests

def check_security_txt(url):

    try:

        r = requests.get(url + "/.well-known/security.txt")

        if r.status_code == 200:
            return {
                "check": "security_txt",
                "status": "pass",
                "issue": None
            }

    except:
        pass

    return {
        "check": "security_txt",
        "status": "warning",
        "issue": "security.txt missing"
    }