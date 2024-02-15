const express = require('express');
const GitHubRepoParser = require('github-repo-parser');
const fs = require('fs');

require('dotenv').config({ path: '../.env' });

const app = express();
const parser = new GitHubRepoParser(process.env.GITHUB_TOKEN);

app.get('/repo-urls', async (req, res) => {
    const repo_name = req.query.repo;
    if (!repo_name) {
        return res.status(400).send('Missing repo query parameter');
    }

    console.log('Starting data collection for repository:', repo_name);
    const urls = await parser.collectData(repo_name);
    res.send(urls);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});