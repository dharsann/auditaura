def map_findings_to_iso(findings):

    iso_mapping = {

        "https_enabled": {
            "control": "A.8.24",
            "control_name": "Use of Cryptography"
        },

        "security_headers": {
            "control": "A.8.20",
            "control_name": "Network Security"
        },

        "authentication_protection": {
            "control": "A.5.15",
            "control_name": "Access Control"
        },

        "api_security": {
            "control": "A.8.21",
            "control_name": "Security of Network Services"
        },

        "cookie_security": {
            "control": "A.8.2",
            "control_name": "Privileged Access Rights"
        },

        "server_version_disclosure": {
            "control": "A.8.9",
            "control_name": "Configuration Management"
        },

        "data_exposure": {
            "control": "A.8.12",
            "control_name": "Data Leakage Prevention"
        },

        "backup_detection": {
            "control": "A.8.13",
            "control_name": "Information Backup"
        },

        "logging_detection": {
            "control": "A.8.15",
            "control_name": "Logging"
        },

        "open_redirect": {
            "control": "A.8.21",
            "control_name": "Security of Network Services"
        }

    }

    iso_results = []

    for finding in findings:

        check_name = finding.get("check")

        if check_name in iso_mapping:

            control_info = iso_mapping[check_name]

            iso_results.append({

                "control": control_info["control"],
                "control_name": control_info["control_name"],
                "status": finding.get("status"),
                "issue": finding.get("issue")

            })

    return iso_results