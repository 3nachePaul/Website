#!/usr/bin/env node
/**
 * TryHackMe Profile Scraper
 * Uses Puppeteer to scrape profile data from TryHackMe (React-based SPA)
 * 
 * Prerequisites: npm install puppeteer
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const THM_USERNAME = 'Pol36';
const PROFILE_URL = `https://tryhackme.com/p/${THM_USERNAME}`;
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'tryhackme-profile.json');

// Ensure data directory exists
const dataDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

async function scrapeProfile() {
    console.log('🔍 Starting TryHackMe profile scraper...\n');
    console.log(`📍 Profile URL: ${PROFILE_URL}\n`);

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // Set a realistic user agent
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        console.log('🌐 Navigating to profile...');
        await page.goto(PROFILE_URL, {
            waitUntil: 'networkidle2',
            timeout: 30000
        });

        // Wait for the profile content to load
        console.log('⏳ Waiting for profile data to load...');
        await page.waitForSelector('[class*="profile"]', { timeout: 15000 }).catch(() => {
            console.log('⚠️ Profile selector not found, continuing anyway...');
        });

        // Give extra time for React to render
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Extract profile data
        console.log('📊 Extracting profile data...');
        const profileData = await page.evaluate(() => {
            const data = {
                username: '',
                rank: '',
                level: '',
                badges: [],
                completedRooms: 0,
                streak: 0,
                skills: [],
                stats: {}
            };

            // Try to extract username
            const usernameEl = document.querySelector('[class*="username"], h1, [class*="name"]');
            if (usernameEl) data.username = usernameEl.textContent.trim();

            // Try to extract rank/level info
            const rankElements = document.querySelectorAll('[class*="rank"], [class*="level"]');
            rankElements.forEach(el => {
                const text = el.textContent.trim();
                if (text.includes('Rank')) data.rank = text;
                if (text.includes('Level')) data.level = text;
            });

            // Try to extract badges
            const badgeElements = document.querySelectorAll('[class*="badge"] img, [class*="Badge"] img');
            badgeElements.forEach(badge => {
                const alt = badge.alt || badge.title || '';
                if (alt) data.badges.push(alt);
            });

            // Try to extract stats (rooms completed, streak, etc.)
            const statElements = document.querySelectorAll('[class*="stat"], [class*="Stat"]');
            statElements.forEach(stat => {
                const text = stat.textContent.trim();
                const numberMatch = text.match(/\d+/);
                if (numberMatch) {
                    if (text.toLowerCase().includes('room')) {
                        data.completedRooms = parseInt(numberMatch[0]);
                    } else if (text.toLowerCase().includes('streak')) {
                        data.streak = parseInt(numberMatch[0]);
                    }
                }
            });

            // Get page text for additional parsing
            data.pageText = document.body.innerText.substring(0, 5000);

            return data;
        });

        // Take a screenshot for reference
        const screenshotPath = path.join(dataDir, 'tryhackme-screenshot.png');
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`📸 Screenshot saved to: ${screenshotPath}`);

        // Parse additional skills from page text
        const skillKeywords = [
            'Penetration Testing', 'Web Security', 'Network Security',
            'Linux', 'Windows', 'Privilege Escalation', 'Enumeration',
            'OWASP Top 10', 'SQL Injection', 'XSS', 'Burp Suite',
            'Metasploit', 'Nmap', 'Wireshark', 'Cryptography',
            'Forensics', 'Malware Analysis', 'Reverse Engineering',
            'Active Directory', 'Red Team', 'Blue Team', 'SOC',
            'Threat Hunting', 'Incident Response'
        ];

        const foundSkills = skillKeywords.filter(skill =>
            profileData.pageText && profileData.pageText.toLowerCase().includes(skill.toLowerCase())
        );
        profileData.skills = [...new Set([...profileData.skills, ...foundSkills])];

        // Clean up page text from output
        delete profileData.pageText;

        // Add metadata
        const output = {
            username: THM_USERNAME,
            profileUrl: PROFILE_URL,
            scrapedAt: new Date().toISOString(),
            ...profileData
        };

        // Save to file
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
        console.log(`\n💾 Saved to: ${OUTPUT_FILE}`);

        // Print summary
        console.log('\n📋 Profile Summary:');
        console.log(`   Username: ${output.username}`);
        console.log(`   Rank: ${output.rank || 'N/A'}`);
        console.log(`   Level: ${output.level || 'N/A'}`);
        console.log(`   Completed Rooms: ${output.completedRooms || 'N/A'}`);
        console.log(`   Badges: ${output.badges.length}`);
        console.log(`   Skills detected: ${output.skills.join(', ') || 'N/A'}`);

        return output;

    } catch (error) {
        console.error('❌ Error:', error.message);

        // Save error info
        const errorOutput = {
            username: THM_USERNAME,
            profileUrl: PROFILE_URL,
            scrapedAt: new Date().toISOString(),
            error: error.message,
            // Provide default skills for TryHackMe users
            suggestedSkills: [
                'Penetration Testing',
                'Network Security',
                'Web Application Security',
                'Linux Security',
                'Privilege Escalation',
                'CTF Challenges'
            ]
        };
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(errorOutput, null, 2));

    } finally {
        await browser.close();
    }
}

// Run if called directly
if (require.main === module) {
    scrapeProfile();
}

module.exports = { scrapeProfile };
