import requests

def check_sensitive_files(base_url):

    files = [".env", "config.json", "backup.sql"]

    exposed = []

    for f in files:
        try:
            r = requests.get(base_url + "/" + f)
            if r.status_code == 200:
                exposed.append(f)
        except:
            pass

    if exposed:
        return {
            "check": "sensitive_files",
            "status": "fail",
            "issue": f"Sensitive files exposed: {exposed}"
        }

    return {
        "check": "sensitive_files",
        "status": "pass",
        "issue": None
    }