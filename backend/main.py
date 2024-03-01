import os
import shutil
import json
import re
from rating import calculate_function_ratings
from read_urls import parse_class 

REGEX = r'([a-zA-Z_]\w*)\s*\('
function_id = 1

def clone_repo(repo_url, local_path):
    os.system(f"git clone {repo_url} {local_path}")

def process_local_files(local_path):
    results = []
    global function_id
    
    for root, dirs, files in os.walk(local_path):
        for file_name in files:
            if file_name.endswith('.py'):  
                file_path = os.path.join(root, file_name)
                with open(file_path, "r") as file:
                    source_code = file.read()
                    parsed_code = parse_class(source_code)
                if parsed_code:
                    common_suffix = os.path.commonpath([local_path, file_path])
                    repo_url = "https://github.com/allrod5/pycollect"
                    relative_path = os.path.relpath(file_path, common_suffix)
                    file_path = f"{repo_url.rstrip('/')}/raw/master/{relative_path.replace(os.sep, '/')}"
                    
                    for function_dict in parsed_code:
                        results.append({
                            "id": function_id,
                            "file_name": file_name,
                            "file_path": file_path,
                            "class_name": function_dict["class_name"],
                            "function_name": function_dict["name"],
                            "arguments": function_dict["arguments"],
                            "code": function_dict["code"]
                        })
                        function_id += 1

    return results

def write_output_to_json(output_data, output_file):
    with open(output_file, "w") as file:
        json.dump(output_data, file, indent=2)

def extract_function_calls(code):
    calls = re.findall(REGEX, code)
    function_calls = [call for call in calls if call != 'range']
    return function_calls

def generate_called_function_ids():
    with open('parsed_data.json', 'r') as f:
        data = json.load(f)

    function_ids = {item['id']: item['function_name'] for item in data}

    for item in data:
        code = item['code']
        called_functions = extract_function_calls(code)
        called_function_ids = [id for id, func in function_ids.items() if func in called_functions and id != item['id']]
        item['functions_called'] = called_function_ids

    with open('parsed_data.json', 'w') as f:
        json.dump(data, f, indent=2)

def generated_function_ratings():
    with open('parsed_data.json', 'r') as f:
        data = json.load(f)

    function_ratings = calculate_function_ratings(data)

    for entry in data:
        function_id = entry["id"]
        entry["function_rating"] = function_ratings.get(function_id, 0)

    def write_output_to_json(output_data, output_file):
        with open(output_file, "w") as file:
            json.dump(output_data, file, indent=2)

    write_output_to_json(data, "parsed_data.json")

def remove_cloned_dir(local_path):
    shutil.rmtree(local_path)

def get_repo_data(repo_url, local_path):
    clone_repo(repo_url, local_path)
    data = process_local_files(local_path)
    with open('parsed_data.json', 'w') as f:
        json.dump(data, f)
    generate_called_function_ids()
    generated_function_ratings()
    remove_cloned_dir(local_path)

if __name__ == "__main__":
    repo_url = "https://github.com/allrod5/pycollect"  
    local_path = "/Users/paurushkumar/Desktop/CodeFlow/empty" 
    data = get_repo_data(repo_url, local_path)

    with open('parsed_data.json', 'w') as f:
        json.dump(data, f)
    
    generate_called_function_ids()
    generated_function_ratings()

