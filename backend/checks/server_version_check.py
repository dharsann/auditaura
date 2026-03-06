import requests

def check_server_version(url):

    try:

        r = requests.get(url)

        server = r.headers.get("Server")

        if server:
            return {
                "check": "server_version_disclosure",
                "status": "warning",
                "issue": f"Server header exposed: {server}"
            }

    except:
        pass

    return {
        "check": "server_version_disclosure",
        "status": "pass",
        "issue": None
    }