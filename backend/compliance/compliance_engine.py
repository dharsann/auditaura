from checks.https_check import check_https
from checks.headers_check import check_security_headers
from checks.authentication_check import check_authentication
from checks.api_security_check import check_api_security
from checks.cookie_security_check import check_cookie_security

from checks.admin_endpoint_check import check_admin_endpoints
from checks.data_exposure_check import check_sensitive_data
from checks.privileged_api_check import check_privileged_apis
from checks.directory_listing_check import check_directory_listing
from checks.debug_endpoint_check import check_debug_endpoints

from checks.cors_check import check_cors
from checks.logging_check import check_logging
from checks.sensitive_files_check import check_sensitive_files
from checks.session_timeout_check import check_session_timeout
from checks.api_docs_exposure_check import check_api_docs

from checks.password_policy_check import check_password_policy
from checks.backup_detection_check import check_backup_endpoints
from checks.error_leakage_check import check_error_leakage
from checks.rate_limiting_check import check_rate_limiting
from checks.security_txt_check import check_security_txt
from checks.open_redirect_check import check_open_redirect
from checks.server_version_check import check_server_version
from checks.http_methods_check import check_http_methods
from checks.robots_txt_check import check_robots_sensitive
from checks.ssl_certificate_check import check_ssl_certificate


def run_security_checks(url, crawler_result):

    findings = []

    pages = crawler_result.get("pages", [])
    api_calls = crawler_result.get("api_calls", [])

    # --- Basic security checks ---
    findings.append(check_https(url))
    findings.append(check_security_headers(url))
    findings.append(check_cookie_security(url))
    findings.append(check_server_version(url))
    findings.append(check_http_methods(url))

    # --- Access control checks ---
    findings.append(check_authentication(pages))
    findings.append(check_admin_endpoints(pages))
    findings.append(check_debug_endpoints(pages))
    findings.append(check_password_policy(pages))

    # --- API security checks ---
    findings.append(check_api_security(api_calls))
    findings.append(check_privileged_apis(api_calls))
    findings.append(check_api_docs(url))

    # --- Data protection checks ---
    findings.append(check_sensitive_data(url))
    findings.append(check_sensitive_files(url))
    findings.append(check_error_leakage(url))

    # --- Session / authentication checks ---
    findings.append(check_session_timeout(url))

    # --- Network security checks ---
    findings.append(check_cors(url))
    findings.append(check_rate_limiting(url))
    findings.append(check_open_redirect(url))

    # --- Infrastructure / configuration checks ---
    findings.append(check_directory_listing(url))
    findings.append(check_logging(pages))
    findings.append(check_backup_endpoints(pages))
    findings.append(check_robots_sensitive(url))

    # --- Cryptography checks ---
    host = url.replace("https://", "").replace("http://", "").split("/")[0]
    findings.append(check_ssl_certificate(host))

    # --- Incident readiness ---
    findings.append(check_security_txt(url))

    return findings