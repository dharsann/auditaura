import json

DATASET_PATH = "regulations\iso27001_controls_2022.json"


def load_all_controls():

    with open(DATASET_PATH, "r") as f:
        data = json.load(f)

    return data["controls"]