import requests


def check_directory_listing(url):

    try:

        response = requests.get(url)

        if "Index of /" in response.text:

            return {
                "check": "directory_listing",
                "status": "fail",
                "issue": "Directory listing enabled"
            }

    except Exception as e:

        return {
            "check": "directory_listing",
            "status": "error",
            "issue": str(e)
        }

    return {
        "check": "directory_listing",
        "status": "pass",
        "issue": None
    }