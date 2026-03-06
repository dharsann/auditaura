from compliance.load_controls import load_all_controls


def get_non_automated_controls():

    controls = load_all_controls()

    manual_controls = []

    for c in controls:

        if c.get("automation") != "automated":

            manual_controls.append({
                "control": c["id"],
                "title": c["title"],
                "category": c["category"],
                "type": c.get("automation", "manual"),
                "status": "pending_review"
            })

    return manual_controls