import json

def read_file(file_name):
    with open(file_name, "r") as f:
        return f.read()
    
def read_json(file_name):
    with open(file_name) as f:
        return json.load(f)
