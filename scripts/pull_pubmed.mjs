#!/usr/bin/env node
/**
 * pull_pubmed.mjs
 *
 * Searches PubMed for "yip christopher m", fetches article details via the
 * NCBI E-utilities API (esearch + esummary in JSON), merges with the
 * existing ORCID publications.json (deduplicating by DOI and title), and
 * writes the combined result to src/data/publications.json.
 *
 * Usage:  node scripts/pull_pubmed.mjs
 */

import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

// ---- identifiers (kept from pull_publications.mjs) ----
const ORCID = '0000-0003-4507-556X';
const GOOGLE_SCHOLAR = 'https://scholar.google.ca/citations?user=9kO_aCYAAAAJ&hl=en';
const RESEARCH_GATE = 'https://www.researchgate.net/profile/Christopher-Yip-2';
const LINKED_IN = 'https://ca.linkedin.com/in/christopher-yip-71b91821';
const PROFILE_URL = 'https://discover.research.utoronto.ca/3715-christopher-yip/publications';

// ---- NCBI E-utilities endpoints ----
const ESEARCH = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi';
const ESUMMARY = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi';
const SEARCH_TERM = 'yip christopher m';

// Respect NCBI rate limit: 3 req/sec without API key (use 350 ms gap)
const DELAY_MS = 400;

// ---- helpers ----

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Strip punctuation / casing for fuzzy title matching.
 */
function normalizeTitle(t) {
  return (t ?? '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Extract a DOI from an elocationid string like "doi: 10.1038/ncomms11714".
 */
function parseDoi(elocationid) {
  if (!elocationid) return null;
  const m = elocationid.match(/doi:\s*(10\.[^\s]+)/i);
  return m ? m[1] : null;
}

/**
 * Pull the first 4-digit year out of a pubdate string
 * (e.g. "2000 Jan 1", "2000 Jan-Feb", "Summer 2000").
 */
function parseYear(pubdate) {
  if (!pubdate) return null;
  const m = pubdate.match(/\b(\d{4})\b/);
  return m ? parseInt(m[1], 10) : null;
}

// ---- PubMed API ----

/**
 * Search PubMed and return the list of PMIDs.
 */
async function searchPubMed(term, retmax = 10000) {
  const url = `${ESEARCH}?db=pubmed&term=${encodeURIComponent(term)}&sort=date&retmax=${retmax}&retmode=json`;
  process.stdout.write(`Searching PubMed: ${url} ... `);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`esearch returned ${res.status}`);
  const data = await res.json();
  const ids = data?.esearchresult?.idlist ?? [];
  const count = parseInt(data?.esearchresult?.count ?? '0', 10);
  console.log(`${count} total hits, ${ids.length} IDs retrieved`);
  return { ids, count };
}

/**
 * Fetch esummary JSON for a batch of PMIDs (max ~200 per call).
 */
async function fetchSummaries(pmids) {
  const url = `${ESUMMARY}?db=pubmed&id=${pmids.join(',')}&retmode=json`;
  process.stdout.write(`  Fetching ${pmids.length} summaries... `);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`esummary returned ${res.status}`);
  const data = await res.json();
  const result = data?.result ?? {};
  const uids = result.uids ?? [];
  console.log(`got ${uids.length}`);
  return result;
}

/**
 * Format PubMed author list into a comma-separated string.
 * e.g. "Yip CM, Smith J, Doe AB"
 */
function formatAuthors(authors) {
  if (!Array.isArray(authors) || authors.length === 0) return null;
  return authors.map((a) => a.name).join(', ');
}

/**
 * Parse an esummary result entry into our publication shape.
 */
function parsePubEntry(pmid, entry) {
  if (!entry) return null;
  const doi = parseDoi(entry.elocationid);
  // Prefer full journal name over abbreviated source
  const journal = entry.fulljournalname || entry.source || null;
  const year = parseYear(entry.pubdate || entry.sortpubdate);
  const authors = formatAuthors(entry.authors);
  return {
    title: entry.title ?? 'Untitled',
    authors,
    journal,
    year,
    type: 'journal-article',
    doi,
    doiUrl: doi ? `https://doi.org/${doi}` : null,
    pmid,
  };
}

// ---- main ----

async function main() {
  console.log('Yip Lab – PubMed Publication Data Generator\n');

  // -------------------------------------------------------
  // 1. Read existing publications.json (ORCID baseline)
  // -------------------------------------------------------
  const dataPath = resolve(rootDir, 'src/data/publications.json');
  let existingPubs = [];
  let existingMeta = {};

  if (existsSync(dataPath)) {
    const raw = JSON.parse(readFileSync(dataPath, 'utf-8'));
    existingPubs = raw.publications ?? [];
    existingMeta = raw;
    console.log(`Read ${existingPubs.length} existing publications from ${dataPath}\n`);
  } else {
    console.log('No existing publications.json found – will create from scratch.\n');
  }

  // -------------------------------------------------------
  // 2. Search PubMed
  // -------------------------------------------------------
  const { ids } = await searchPubMed(SEARCH_TERM);
  if (ids.length === 0) {
    console.log('No PubMed results found for search term.');
  }

  // -------------------------------------------------------
  // 3. Batch-fetch summaries
  // -------------------------------------------------------
  const BATCH_SIZE = 150;
  const allEntries = {};

  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    const batch = ids.slice(i, i + BATCH_SIZE);
    const result = await fetchSummaries(batch);
    // result contains keys "uids" (array) and each PMID => entry
    for (const key of Object.keys(result)) {
      if (key === 'uids') continue;
      allEntries[key] = result[key];
    }
    if (i + BATCH_SIZE < ids.length) await sleep(DELAY_MS);
  }

  // -------------------------------------------------------
  // 4. Parse PubMed entries into publication objects
  // -------------------------------------------------------
  const pubmedPubs = [];
  for (const pmid of ids) {
    const entry = allEntries[pmid];
    const pub = parsePubEntry(pmid, entry);
    if (pub) pubmedPubs.push(pub);
  }
  console.log(`\nParsed ${pubmedPubs.length} publications from PubMed search\n`);

  // -------------------------------------------------------
  // 5. Merge – enrich existing entries, add new ones from PubMed
  //     Deduplicate by DOI first, then by normalized title.
  // -------------------------------------------------------

  // Build lookup maps for existing publications
  const doiToIndex = new Map();
  const titleToIndex = new Map();
  for (let i = 0; i < existingPubs.length; i++) {
    const p = existingPubs[i];
    if (p.doi) doiToIndex.set(p.doi.toLowerCase(), i);
    titleToIndex.set(normalizeTitle(p.title), i);
  }

  let enrichedCount = 0;
  const newFromPubMed = [];

  for (const pubMedPub of pubmedPubs) {
    // Try DOI match first
    let matchIdx = -1;
    if (pubMedPub.doi) {
      matchIdx = doiToIndex.get(pubMedPub.doi.toLowerCase()) ?? -1;
    }
    // Fall back to title match
    if (matchIdx === -1) {
      matchIdx = titleToIndex.get(normalizeTitle(pubMedPub.title)) ?? -1;
    }

    if (matchIdx !== -1) {
      // Enrich existing entry with PubMed data (authors, pmid)
      if (pubMedPub.authors && !existingPubs[matchIdx].authors) {
        existingPubs[matchIdx].authors = pubMedPub.authors;
      }
      if (pubMedPub.pmid && !existingPubs[matchIdx].pmid) {
        existingPubs[matchIdx].pmid = pubMedPub.pmid;
      }
      enrichedCount++;
    } else {
      newFromPubMed.push(pubMedPub);
    }
  }

  console.log(`Enriched ${enrichedCount} existing entries with PubMed author data`);
  console.log(`${newFromPubMed.length} new publications from PubMed (not in existing data)`);
  if (newFromPubMed.length > 0) {
    console.log('New additions:');
    for (const p of newFromPubMed) {
      console.log(`  - ${p.title} (${p.year})`);
    }
  }

  const merged = [...existingPubs, ...newFromPubMed];
  merged.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  // -------------------------------------------------------
  // 6. Filter by minimum year
  // -------------------------------------------------------
  const MIN_YEAR = 1999;
  const filtered = merged.filter((p) => p.year == null || p.year >= MIN_YEAR);
  const skipped = merged.length - filtered.length;
  if (skipped > 0) {
    console.log(`Filtered out ${skipped} publications before ${MIN_YEAR}`);
  }

  // -------------------------------------------------------
  // 7. Write
  // -------------------------------------------------------
  const output = {
    orcid: existingMeta.orcid ?? ORCID,
    googleScholar: existingMeta.googleScholar ?? GOOGLE_SCHOLAR,
    researchGate: existingMeta.researchGate ?? RESEARCH_GATE,
    linkedIn: existingMeta.linkedIn ?? LINKED_IN,
    profileUrl: existingMeta.profileUrl ?? PROFILE_URL,
    pubmedSearchTerm: SEARCH_TERM,
    lastUpdated: new Date().toISOString(),
    error: null,
    count: filtered.length,
    publications: filtered,
  };

  const outDir = resolve(rootDir, 'src/data');
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  writeFileSync(dataPath, JSON.stringify(output, null, 2));
  console.log(`\nWrote ${dataPath} (${filtered.length} total publications)`);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
