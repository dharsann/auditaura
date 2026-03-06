import os

EVIDENCE_FOLDER = "evidence"


def check_evidence_for_controls(controls):

    files = os.listdir(EVIDENCE_FOLDER)

    results = []

    for c in controls:

        evidence_found = False

        for f in files:

            if c["control"].replace(".", "_") in f:

                evidence_found = True

        status = "evidence_uploaded" if evidence_found else "pending_evidence"

        results.append({
            "control": c["control"],
            "title": c["title"],
            "status": status
        })

    return results