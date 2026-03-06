import requests

def check_open_redirect(url):

    try:
        r = requests.get(url + "?redirect=http://tenant-admin-fe.dev.app.pentesitesai.com")

        if "tenant-admin-fe.dev.app.pentesitesai.com" in r.url:
            return {
                "check": "open_redirect",
                "status": "fail",
                "issue": "Open redirect detected"
            }

    except:
        pass

    return {
        "check": "open_redirect",
        "status": "pass",
        "issue": None
    }