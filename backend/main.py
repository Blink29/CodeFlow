from github_repo_parser import GitHubRepoParser
import os
import json

GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')

parser = GitHubRepoParser(GITHUB_TOKEN)

def get_repo_raw_urls(repo_name):
    urls = parser.collect_data(repo_name)
    with open('urls.json', 'w') as f:
        json.dump(urls, f)

    return urls
