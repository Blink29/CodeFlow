import os
import subprocess
from github import Github

class GitHubRepoParser:
    def __init__(self, GITHUB_API_KEY):
        self.GITHUB_API_KEY = GITHUB_API_KEY
        self.g = Github(GITHUB_API_KEY)
        self.rawUrls = {}

    def clone_repository(self, repo_url, local_dir):
        subprocess.run(["git", "clone", repo_url, local_dir])
        self.local_dir = local_dir

    def gather_raw_urls(self, local_dir):
        for root, dirs, files in os.walk(local_dir):
            for file in files:
                file_path = os.path.join(root, file)
                dotIndex = file_path.rfind('.')
                extension = 'Miscellaneous' if '/' in file_path[dotIndex:] else file_path[dotIndex:]
                if extension in self.rawUrls:
                    self.rawUrls[extension].append(file_path)
                else:
                    self.rawUrls[extension] = [file_path]

    def initialize_repo_details(self, url, local_dir):
        self.rawUrls = {}
        self.url = url
        self.owner = url.split('https://github.com/')[1].split('/')[0]
        self.repo_name = url.split('https://github.com/')[1].split('/')[1]
        self.repo = self.g.get_repo(f"{self.owner}/{self.repo_name}")
        self.clone_repository(url, local_dir)

    def collect_data(self, url, local_dir):
        self.initialize_repo_details(url, local_dir)
        self.gather_raw_urls(local_dir)
        return self.rawUrls