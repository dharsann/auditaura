import requests

def check_backup_detection(url):

    backup_paths = [
        "/backup.zip",
        "/backup.sql",
        "/db_backup",
        "/backup.tar.gz"
    ]

    for path in backup_paths:
        try:
            r = requests.get(url + path)

            if r.status_code == 200:
                return {
                    "check": "backup_detection",
                    "status": "fail",
                    "issue": f"Backup file exposed: {path}"
                }

        except:
            pass

    return {
        "check": "backup_detection",
        "status": "pass",
        "issue": None
    }