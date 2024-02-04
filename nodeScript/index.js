const GitHubRepoParser = require('github-repo-parser');
const fs = require('fs');

require('dotenv').config({ path: '../.env' });

const parser = new GitHubRepoParser(process.env.GITHUB_TOKEN);

console.log('Initializing GitHubRepoParser...');
const get_repo_raw_urls = async (repo_name) => {
    console.log('Starting data collection for repository:', repo_name);
    const urls = await parser.collectData(repo_name);
    const stringified_urls = JSON.stringify(urls);
    fs.writeFileSync('urls.json', stringified_urls, 'utf-8');
    console.log('Data collection complete!');
}

get_repo_raw_urls("https://github.com/rasbt/LLMs-from-scratch");
