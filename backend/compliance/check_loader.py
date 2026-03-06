import importlib

def load_check_function(check_name):

    module = importlib.import_module(f"checks.{check_name}")

    for attr in dir(module):
        if attr.startswith("check_"):
            return getattr(module, attr)

    raise Exception(f"No check function found in {check_name}")