import ast
import re

def parse_class(content):
    tree = ast.parse(content)
    class_function_dict = {}

    current_class = None

    for node in ast.iter_child_nodes(tree):
        if isinstance(node, ast.ClassDef):
            current_class = node.name
            class_function_dict[current_class] = {}
            for subnode in ast.iter_child_nodes(node):
                if isinstance(subnode, ast.FunctionDef):
                    function_name = subnode.name
                    arguments = [arg.arg for arg in subnode.args.args]
                    code = ast.get_source_segment(content, subnode)
                    class_function_dict[current_class][function_name] = {
                        "name": function_name,
                        "arguments": arguments,
                        "code": code,
                    }

    return class_function_dict

def get_packages(content):
    setup_content = content.split("setup(")[1]
    setup_content = setup_content.split(")")[0]
    setup_content = setup_content.split("\n")

    # find packages argument
    packages = None
    for line in setup_content:
        if "packages" in line:
            packages = line
            break

    # package list
    packages = packages.split("=")[1]
    packages = packages.replace("[", "")
    packages = packages.replace("]", "")
    packages = packages.replace(" ", "")
    packages = packages.replace("'", "")
    packages = packages.replace('"', "")
    packages = packages.split(",")

    return packages[:-1]

# Issue : If multiple classes are imported in one line, only the first class is returned, fix it!
# Issue : Also return which module contains which classes
def get_imported_classes(content):
    REGEX = r"from [.a-zA-Z]* import ([a-zA-Z]*)"

    lines = content.split("\n")
    imported_classes = []
    for line in lines:
        imported_class = re.search(REGEX, line)
        imported_class = imported_class.group(1) if imported_class else None
        if imported_class:
            imported_classes.append(imported_class)

    return imported_classes
