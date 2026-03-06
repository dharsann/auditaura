from compliance.manual_control_engine import get_non_automated_controls
from compliance.evidence_check import check_evidence_for_controls


def evaluate_manual_controls():

    manual_controls = get_non_automated_controls()

    results = check_evidence_for_controls(manual_controls)

    return results