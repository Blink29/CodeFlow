import json
import re
import requests
import ast
import os

def read_urls_from_file(file_path):
    with open(file_path, "r") as file:
        return json.load(file)

def get_py_raw_urls(urls_data):
    return urls_data.get('py', [])

def parse_class(source_code):
    tree = ast.parse(source_code)
    class_function_dict = {}
    class_function_array = []
    current_class = None
    imports = []

    for node in ast.iter_child_nodes(tree):
        # if isinstance(node, ast.Import):
        #     for alias in node.names:
        #         imports.append(alias.name)
        # elif isinstance(node, ast.ImportFrom):
        #     for alias in node.names:
        #         imports.append(f"{node.module}.{alias.name}")
        # elif isinstance(node, ast.ClassDef):
        #     current_class = node.name
        #     class_function_dict[current_class] = {}
        #     for subnode in ast.iter_child_nodes(node):
        #         if isinstance(subnode, ast.FunctionDef):
        #             function_name = subnode.name
        #             arguments = [arg.arg for arg in subnode.args.args]
        #             code = ast.get_source_segment(source_code, subnode)
        #             class_function_dict[current_class][function_name] = {
        #                 "name": function_name,
        #                 "arguments": arguments,
        #                 "code": code,
        #             }
        if isinstance(node, ast.FunctionDef):
            function_name = node.name
            arguments = [arg.arg for arg in node.args.args]
            code = ast.get_source_segment(source_code, node)
            class_function_dict = {
                "name": function_name,
                "arguments": arguments,
                "code": code,
            }
            class_function_array.append(class_function_dict)

    return class_function_array

def process_url(url):
    new_file_name = url.split("/")[-1]
    response = requests.get(url)
    with open(new_file_name, "wb") as file:
        file.write(response.content)
    with open(new_file_name, "r") as file:
        source_code = file.read()
        parsed_code = parse_class(source_code)
        # os.remove(new_file_name)
        if parsed_code:
            results = []
            for function_dict in parsed_code:
                results.append({
                    "file_name": new_file_name,
                    "file_path": url,
                    "function_name": function_dict["name"],
                    "arguments": function_dict["arguments"],
                    "code": function_dict["code"]
                })
            return results
        else:
            return None

def write_output_to_json(output_data, output_file):
    with open(output_file, "w") as file:
        json.dump(output_data, file, indent=2)

def main():
    urls_data = read_urls_from_file("urls.json")
    raw_urls = get_py_raw_urls(urls_data)

    output_data = []

    for url in raw_urls:
        result = process_url(url)
        if result:
            output_data.extend(result)

    write_output_to_json(output_data, "output.json")

# if __name__ == "__main__":
#     main()

REGEX = r'([a-zA-Z0-9\_]+)\s*\([a-zA-Z0-9\_ ,]*\)'

def extract_function_calls(code):
    # Find all function calls in the code
    calls = re.findall(REGEX, code)

    # Filter out 'range'
    function_calls = [call for call in calls if call != 'range']

    return function_calls

def read_code_from_output():
    with open('output.json', 'r') as f:
        data = json.load(f)

    for item in data:
        # Extract the code
        code = item['code']

        # Extract the function calls
        called_functions = extract_function_calls(code)

        # If there are any function calls, print them
        if called_functions:
            print(f"In the code: \n{code}\nThe following functions are called: {called_functions}\n")
        else:
            print(f"In the code: \n{code}\nNo functions are called.\n")

read_code_from_output()