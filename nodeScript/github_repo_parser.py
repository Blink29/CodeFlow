from github import Github

class GitHubRepoParser:
    def __init__(self, GITHUB_API_KEY):
        self.GITHUB_API_KEY = GITHUB_API_KEY
        self.g = Github(GITHUB_API_KEY)
        self.rawUrls = {}

    def get_contents_url(self, repo, path):
        contents = repo.get_contents(path)
        return contents

    def gather_raw_urls(self, listOfFiles, level):
        print(f"Collecting Level #{level + 1} files.")
        for file in listOfFiles:
            if file.type == "file":
                dotIndex = file.download_url.rfind('.')
                extension = 'Miscellaneous' if '/' in file.download_url[dotIndex:] else file.download_url[dotIndex:]
                if extension in self.rawUrls:
                    self.rawUrls[extension].append(file.download_url)
                else:
                    self.rawUrls[extension] = [file.download_url]
        dirs = [file for file in listOfFiles if file.type == "dir"]
        if not dirs:
            return
        else:
            for dir in dirs:
                self.gather_raw_urls(self.get_contents_url(self.repo, dir.path), level + 1)

    def initialize_repo_details(self, url):
        self.rawUrls = {}
        self.url = url
        self.owner = url.split('https://github.com/')[1].split('/')[0]
        self.repo_name = url.split('https://github.com/')[1].split('/')[1]
        self.repo = self.g.get_repo(f"{self.owner}/{self.repo_name}")

    def collect_data(self, url):
        self.initialize_repo_details(url)
        contents_url = self.repo.get_contents("")
        self.gather_raw_urls(contents_url, 0)
        return self.rawUrls