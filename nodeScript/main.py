from github_repo_parser import GitHubRepoParser
import os
import json

GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')

parser = GitHubRepoParser(GITHUB_TOKEN)

print('Initializing GitHubRepoParser...')
repo_name = "https://github.com/the-amazing-team/sample-repo"
print('Starting data collection for repository:', repo_name)
urls = parser.collect_data(repo_name)
with open('urls.json', 'w') as f:
    json.dump(urls, f)
print('Data collection complete!')