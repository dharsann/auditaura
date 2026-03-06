import requests

def check_api_docs(base_url):

    paths = ["/swagger", "/docs", "/openapi.json"]

    exposed = []

    for p in paths:
        try:
            r = requests.get(base_url + p)
            if r.status_code == 200:
                exposed.append(p)
        except:
            pass

    if exposed:
        return {
            "check": "api_docs_exposure",
            "status": "warning",
            "issue": f"API documentation exposed: {exposed}"
        }

    return {
        "check": "api_docs_exposure",
        "status": "pass",
        "issue": None
    }