import ssl
import socket

def check_ssl_certificate(host):

    try:

        context = ssl.create_default_context()

        with socket.create_connection((host, 443)) as sock:

            with context.wrap_socket(sock, server_hostname=host) as ssock:

                cert = ssock.getpeercert()

                if cert:
                    return {
                        "check": "ssl_certificate_valid",
                        "status": "pass",
                        "issue": None
                    }

    except Exception as e:
        return {
            "check": "ssl_certificate_valid",
            "status": "fail",
            "issue": str(e)
        }