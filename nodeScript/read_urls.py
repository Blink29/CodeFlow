from ..utils import read_json
import json
import requests
import ast

import pprint

urls = read_json("urls.json")

def get_py_raw_urls():
    for key in urls.keys():
        if key == 'py':
            return urls[key]

print(get_py_raw_urls())

# for key in urls.keys():
#     if key == 'py':
#         raw_urls = urls[key]

# def parse_class(source_code):
#     tree = ast.parse(source_code)
#     class_function_dict = {}
#     current_class = None

#     for node in ast.iter_child_nodes(tree):
#         if isinstance(node, ast.ClassDef):
#             current_class = node.name
#             class_function_dict[current_class] = {}
#             for subnode in ast.iter_child_nodes(node):
#                 if isinstance(subnode, ast.FunctionDef):
#                     function_name = subnode.name
#                     arguments = [arg.arg for arg in subnode.args.args]
#                     code = ast.get_source_segment(source_code, subnode)
#                     class_function_dict[current_class][function_name] = {
#                         "name": function_name,
#                         "arguments": arguments,
#                         "code": code,
#                     }
#         elif isinstance(node, ast.FunctionDef):
#             function_name = node.name
#             arguments = [arg.arg for arg in node.args.args]
#             code = ast.get_source_segment(source_code, node)
#             class_function_dict[function_name] = {
#                 "name": function_name,
#                 "arguments": arguments,
#                 "code": code,
#             }

#     return class_function_dict

# for url in raw_urls:
#     new_file_name = url.split("/")[-1]
#     response = requests.get(url)
#     with open(new_file_name, "wb") as file:
#         file.write(response.content)
#     with open(new_file_name, "r") as file:
#         souce_code = file.read()
#         parsed_code = parse_class(souce_code)
#         if parsed_code:
#             pprint.pprint(parsed_code)




