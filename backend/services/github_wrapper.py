import os
from github import Github
from github import Auth
from dotenv import load_dotenv
from services.parser import get_imported_classes

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

auth = Auth.Token(GITHUB_TOKEN)
github = Github(auth=auth)


def get_content(repo, path):
    repo = github.get_repo(repo)
    content = repo.get_contents(path)
    return content.decoded_content.decode("utf-8")


def get_files(repo, path):
    repo = github.get_repo(repo)
    files = repo.get_contents(path)
    return [file.name for file in files]


def get_setup_py(repo):
    setup_py = get_content(repo, "setup.py")
    return setup_py


def get_package_classes(repo, packages=["webscapy"]):
    package_classes = dict()
    for package in packages:
        init_content = get_content(repo, package + "/__init__.py")
        classes = get_imported_classes(init_content)
        package_classes[package] = classes
    return package_classes
