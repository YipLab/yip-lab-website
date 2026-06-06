#!/usr/bin/env node

/**
 * pull_repos.mjs
 *
 * Pulls repositories listed in extern_repo_list.md into extern_repos/,
 * extracts READMEs and submodule readmes, rewrites image URLs to point at
 * raw.githubusercontent.com, and writes a repos.json data file consumed
 * by the React app.
 *
 * Images are NOT copied locally — they are served directly from GitHub's
 * raw CDN, so they stay up-to-date with the source repos.
 *
 * Usage:  node scripts/pull_repos.mjs
 * After:  npm run dev / npm run build  (picks up the generated data)
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// ---------------------------------------------------------------------------
// Paths (relative to repo root)
// ---------------------------------------------------------------------------
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const EXTERN_REPOS_DIR = join(ROOT, 'extern_repos');
const DATA_DIR = join(ROOT, 'src', 'data');

const RAW_BASE = 'https://raw.githubusercontent.com';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Parse the markdown list in extern_repo_list.md into [{ displayName, repoName, url }] */
function parseRepoList(mdContent) {
  const regex = /\[([^\]]+)\]\(https:\/\/github\.com\/(YipLab\/[^)]+)\)/g;
  const repos = [];
  let match;
  while ((match = regex.exec(mdContent)) !== null) {
    repos.push({
      displayName: match[1].trim(),
      repoName: match[2].split('/')[1],
      owner: match[2].split('/')[0],
      url: `https://github.com/${match[2]}`,
    });
  }
  return repos;
}

/** Clone or update a repository */
function syncRepo(repoName, url) {
  const repoDir = join(EXTERN_REPOS_DIR, repoName);
  if (existsSync(join(repoDir, '.git'))) {
    console.log(`  ↻ Updating ${repoName}...`);
    execSync('git fetch --depth=1 && git reset --hard origin/HEAD', {
      cwd: repoDir,
      stdio: 'pipe',
    });
  } else {
    console.log(`  ↓ Cloning ${repoName}...`);
    execSync(`git clone --depth=1 "${url}" "${repoDir}"`, { stdio: 'pipe' });
  }
  return repoDir;
}

/** Get the default branch name of a cloned repo */
function getDefaultBranch(repoDir) {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', {
      cwd: repoDir,
      stdio: 'pipe',
    })
      .toString()
      .trim();
  } catch {
    return 'main'; // fallback
  }
}

/** Lowercase, replace non-alphanumeric with hyphens, collapse runs, trim */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

/**
 * Extract a short description: first plain-text sentence or line,
 * max ~150 chars, for home-page cards.
 */
function extractDescription(mdContent) {
  let cleaned = mdContent
    .replace(/#{1,6}\s.*/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/\[!\[[^\]]*\]\([^)]+\)\]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^={2,}\s*$/gm, '')
    .replace(/^\s*$/gm, '')
    .trim();

  const lines = cleaned.split('\n');
  for (const line of lines) {
    const text = line.replace(/\s+/g, ' ').trim();
    if (text.length > 10) {
      if (text.length > 150) {
        const truncated = text.slice(0, 150);
        const lastSpace = truncated.lastIndexOf(' ');
        return (lastSpace > 100 ? truncated.slice(0, lastSpace) : truncated) + '...';
      }
      return text;
    }
  }
  return '';
}

/**
 * Resolve a relative image path against the README's directory.
 *   README at:      ""  (repo root)
 *     /images/foo.png  → images/foo.png
 *     images/foo.png   → images/foo.png
 *   README at:      "Software/"  (submodule dir)
 *     ../images/foo.png  → images/foo.png   (up one level from Software/)
 *     images/foo.png     → Software/images/foo.png
 *     /images/foo.png    → images/foo.png   (absolute from repo root)
 */
function resolveRelPath(rawPath, readmeDir) {
  let p = rawPath.trim();

  // Absolute from repo root
  if (p.startsWith('/')) {
    return p.slice(1);
  }

  // Resolve relative to the README's directory, then simplify ./..
  const segments = [];
  // Start from the README directory
  if (readmeDir) {
    segments.push(...readmeDir.replace(/\/$/, '').split('/'));
  }

  for (const seg of p.split('/')) {
    if (seg === '..') {
      segments.pop();
    } else if (seg !== '.' && seg !== '') {
      segments.push(seg);
    }
  }

  return segments.join('/');
}

/**
 * Build a raw.githubusercontent.com URL for an image.
 *   owner/repo  = "YipLab/IX83-Modules"
 *   branch      = "main"
 *   relPath     = "images/schematic.png"  (repo-root-relative, no leading /)
 */
function rawUrl(owner, repoName, branch, relPath) {
  return `${RAW_BASE}/${owner}/${repoName}/${branch}/${relPath}`;
}

/**
 * Find all local image references in markdown/HTML.
 * readmeDir = the directory containing the README, relative to repo root
 *   ("" for toplevel, "Software/" for a submodule).
 * Returns [{ fullMatch: "![...](...)" | "<img ...>", url: resolvedRelativePath }]
 */
function extractImageRefs(mdContent, readmeDir) {
  const refs = [];
  const seen = new Set();

  // Markdown: ![alt](path)
  const mdRegex = /!\[[^\]]*\]\(([^)]+)\)/g;
  let match;
  while ((match = mdRegex.exec(mdContent)) !== null) {
    const url = match[1].trim();
    if (url && !url.startsWith('http') && !seen.has(url)) {
      seen.add(url);
      refs.push({ fullMatch: match[0], url: resolveRelPath(url, readmeDir) });
    }
  }

  // HTML: <img src="path" ...>
  const htmlRegex = /<img\s[^>]*?src\s*=\s*["']([^"']+)["'][^>]*?>/gi;
  while ((match = htmlRegex.exec(mdContent)) !== null) {
    const url = match[1].trim();
    if (url && !url.startsWith('http') && !seen.has(url)) {
      seen.add(url);
      refs.push({ fullMatch: match[0], url: resolveRelPath(url, readmeDir) });
    }
  }

  return refs;
}

/**
 * Process a README: rewrite all local image URLs → raw.githubusercontent.com.
 * readmeDir = directory containing this README relative to repo root
 *   ("" for toplevel, "Software/" for submodules).
 * Returns { readme, description, previewImage, images[] }
 */
function processReadme(readmeRaw, owner, repoName, branch, readmeDir) {
  const imageRefs = extractImageRefs(readmeRaw, readmeDir);
  let rewritten = readmeRaw;
  const images = [];

  for (const ref of imageRefs) {
    const newUrl = rawUrl(owner, repoName, branch, ref.url);
    images.push(newUrl);

    // Replace the URL portion within the matched tag
    const urlMatch =
      ref.fullMatch.match(/\(([^)]+)\)/) ||
      ref.fullMatch.match(/src=["']([^"']+)["']/i);
    if (urlMatch) {
      rewritten = rewritten.split(urlMatch[1]).join(newUrl);
    }
  }

  const description = extractDescription(readmeRaw);
  const previewImage = images.length > 0 ? images[0] : '';

  return { readme: rewritten, description, previewImage, images };
}

/** Find sub-directories that contain their own README.md */
function discoverSubmodules(repoDir, owner, repoName, branch) {
  const submodules = [];
  let entries;
  try {
    entries = readdirSync(repoDir, { withFileTypes: true });
  } catch {
    return submodules;
  }

  for (const entry of entries) {
    if (
      !entry.isDirectory() ||
      entry.name.startsWith('.') ||
      entry.name === 'node_modules'
    )
      continue;

    const subDir = join(repoDir, entry.name);
    const readmePath = join(subDir, 'README.md');
    if (!existsSync(readmePath)) continue;

    const readmeRaw = readFileSync(readmePath, 'utf-8');
    const processed = processReadme(readmeRaw, owner, repoName, branch, entry.name + '/');

    submodules.push({
      name: entry.name,
      title: entry.name,
      slug: slugify(entry.name),
      readme: processed.readme,
      description: processed.description,
      images: processed.images,
    });
  }
  return submodules;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const repoListPath = join(ROOT, 'extern_repo_list.md');
  if (!existsSync(repoListPath)) {
    console.error('✗ extern_repo_list.md not found');
    process.exit(1);
  }
  const repoListMd = readFileSync(repoListPath, 'utf-8');
  const repos = parseRepoList(repoListMd);
  console.log(`Found ${repos.length} repositories in extern_repo_list.md\n`);

  mkdirSync(EXTERN_REPOS_DIR, { recursive: true });
  mkdirSync(DATA_DIR, { recursive: true });

  const results = [];
  for (const repo of repos) {
    console.log(`── ${repo.displayName} (${repo.repoName})`);

    const repoDir = syncRepo(repo.repoName, repo.url);
    const branch = getDefaultBranch(repoDir);

    const readmePath = join(repoDir, 'README.md');

    let readme = '';
    let description = '';
    let previewImage = '';
    let images = [];

    if (existsSync(readmePath)) {
      const readmeRaw = readFileSync(readmePath, 'utf-8');
      const processed = processReadme(readmeRaw, repo.owner, repo.repoName, branch, '');
      readme = processed.readme;
      description = processed.description;
      previewImage = processed.previewImage;
      images = processed.images;
      console.log(`  ✓ README: ${readmeRaw.length} chars, ${images.length} images`);
    } else {
      console.log(`  ⚠ No README.md found`);
    }

    const submodules = discoverSubmodules(repoDir, repo.owner, repo.repoName, branch);
    if (submodules.length) {
      console.log(`  ✓ Submodules: ${submodules.length}`);
    }

    results.push({
      id: repo.repoName,
      title: repo.displayName,
      slug: slugify(repo.displayName),
      repoUrl: repo.url,
      repoName: repo.repoName,
      readme,
      description,
      previewImage,
      images,
      submodules,
    });
  }

  const outPath = join(DATA_DIR, 'repos.json');
  writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\n✓ Written ${results.length} entries → src/data/repos.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
