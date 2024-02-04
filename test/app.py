import requests

url = "https://raw.githubusercontent.com/rasbt/LLMs-from-scratch/main/appendix-A/02_installing-python-libraries/python_environment_check.py"

new_file_name = url.split("/")[-1]

response = requests.get(url)

with open(new_file_name, "wb") as file:
    file.write(response.content)

print("Done")