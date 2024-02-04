from services.summerizer import summerize_parsed_code
from services.parser import parse_class
from utils import read_file
from pprint import pprint

sample_code = read_file("sample.py")
parsed_code = parse_class(sample_code)
parsed_code = summerize_parsed_code(parsed_code)
pprint(parsed_code)

with open("sample.py", "r") as sample_file:
    sample_code = sample_file.read()

for class_name, class_data in parsed_code.items():
    for function_name, function_data in class_data.items():
        if function_name != '__init__' and 'summary' in function_data:
            summary = function_data['summary'].replace('"', "'")
            docstring = f'      """{summary}"""'
            function_signature = f'def {function_name}('
            function_start = sample_code.find(function_signature)
            if function_start != -1:
                function_end = sample_code.find(":", function_start) + 1
                sample_code = sample_code[:function_end] + '\n' + docstring + '\n' + sample_code[function_end:]

with open('sample.py', 'w') as sample_file:
    sample_file.write(sample_code)





# for class_name, class_data in parsed_code.items():
#     for function_name, function_data in class_data.items():
#         if function_name != '__init__' and 'summary' in function_data:
#             summary = function_data['summary']
#             docstring = f'        """{summary}"""\n'
#             function_signature = f'def {function_name}('
#             function_start = sample_code.find(function_signature)
#             if function_start != -1:
#                 function_end = sample_code.find(":", function_start) + 1
#                 existing_docstring = sample_code[function_end:]
#                 if '"""' in existing_docstring:
#                     end_of_existing_docstring = existing_docstring.find('"""', existing_docstring.find('"""') + 3) + 3
#                     existing_docstring = existing_docstring[end_of_existing_docstring:]
#                 sample_code = sample_code[:function_end] + '\n' + docstring + existing_docstring
