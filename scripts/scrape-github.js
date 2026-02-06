#!/usr/bin/env node
/**
 * GitHub Repository Scraper
 * Fetches public repositories from a GitHub user profile
 * Uses GitHub's public API (no authentication required for public repos)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const GITHUB_USERNAME = '3nachePaul';
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'github-repos.json');

// Ensure data directory exists
const dataDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

/**
 * Make an HTTPS GET request
 */
function httpsGet(url) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Personal Site Scraper)',
                'Accept': 'application/vnd.github.v3+json'
            }
        };

        https.get(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(new Error('Failed to parse JSON response'));
                }
            });
        }).on('error', reject);
    });
}

/**
 * Fetch all public repositories for a user
 */
async function fetchRepos(username) {
    const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
    console.log(`Fetching repos from: ${url}`);

    const repos = await httpsGet(url);

    if (!Array.isArray(repos)) {
        console.error('Unexpected response:', repos);
        throw new Error('Failed to fetch repositories');
    }

    return repos;
}

/**
 * Process and filter relevant project data
 */
function processRepos(repos) {
    // Filter out forks and keep relevant info
    return repos
        .filter(repo => !repo.fork) // Exclude forks
        .map(repo => ({
            name: repo.name,
            displayName: formatRepoName(repo.name),
            description: repo.description || 'No description available',
            url: repo.html_url,
            homepage: repo.homepage || null,
            language: repo.language,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            topics: repo.topics || [],
            createdAt: repo.created_at,
            updatedAt: repo.updated_at,
            isArchived: repo.archived
        }))
        .filter(repo => !repo.isArchived) // Exclude archived repos
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); // Most recent first
}

/**
 * Format repository name for display
 */
function formatRepoName(name) {
    return name
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

/**
 * Categorize projects by type
 */
function categorizeProjects(repos) {
    const categories = {
        security: [],
        web: [],
        mobile: [],
        ai_ml: [],
        other: []
    };

    const securityKeywords = ['security', 'secure', 'vault', 'cyber', 'hack', 'crypt', 'auth'];
    const webKeywords = ['web', 'react', 'vue', 'angular', 'html', 'css', 'javascript', 'node', 'frontend', 'backend'];
    const mobileKeywords = ['android', 'ios', 'mobile', 'app', 'flutter', 'react-native'];
    const aiKeywords = ['ai', 'ml', 'machine', 'learn', 'neural', 'deep', 'detector', 'emotion', 'nlp'];

    repos.forEach(repo => {
        const searchText = `${repo.name} ${repo.description} ${repo.topics.join(' ')}`.toLowerCase();

        if (securityKeywords.some(kw => searchText.includes(kw))) {
            categories.security.push(repo);
        } else if (aiKeywords.some(kw => searchText.includes(kw))) {
            categories.ai_ml.push(repo);
        } else if (webKeywords.some(kw => searchText.includes(kw))) {
            categories.web.push(repo);
        } else if (mobileKeywords.some(kw => searchText.includes(kw))) {
            categories.mobile.push(repo);
        } else {
            categories.other.push(repo);
        }
    });

    return categories;
}

/**
 * Main execution
 */
async function main() {
    console.log('🔍 Starting GitHub repository scraper...\n');

    try {
        // Fetch repositories
        const rawRepos = await fetchRepos(GITHUB_USERNAME);
        console.log(`📦 Found ${rawRepos.length} repositories\n`);

        // Process and filter
        const repos = processRepos(rawRepos);
        console.log(`✅ Processed ${repos.length} non-fork, non-archived repositories\n`);

        // Categorize
        const categorized = categorizeProjects(repos);

        // Output summary
        console.log('📊 Categories:');
        console.log(`   Security: ${categorized.security.length}`);
        console.log(`   Web: ${categorized.web.length}`);
        console.log(`   AI/ML: ${categorized.ai_ml.length}`);
        console.log(`   Mobile: ${categorized.mobile.length}`);
        console.log(`   Other: ${categorized.other.length}`);
        console.log('');

        // Prepare output
        const output = {
            username: GITHUB_USERNAME,
            profileUrl: `https://github.com/${GITHUB_USERNAME}`,
            scrapedAt: new Date().toISOString(),
            totalRepos: repos.length,
            repositories: repos,
            categorized: categorized
        };

        // Save to file
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
        console.log(`💾 Saved to: ${OUTPUT_FILE}`);

        // Print repos for reference
        console.log('\n📋 Repositories:');
        repos.forEach((repo, i) => {
            console.log(`   ${i + 1}. ${repo.displayName}`);
            console.log(`      Language: ${repo.language || 'N/A'} | ⭐ ${repo.stars}`);
            console.log(`      ${repo.description.substring(0, 60)}${repo.description.length > 60 ? '...' : ''}`);
            console.log('');
        });

        return output;

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

main();
