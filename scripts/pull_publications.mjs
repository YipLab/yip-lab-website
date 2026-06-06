#!/usr/bin/env node
/**
 * pull_publications.mjs
 *
 * Fetches Christopher Yip's publication data from the ORCID public API
 * and writes src/data/publications.json.
 *
 * Usage:  node scripts/pull_publications.mjs
 */

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

// ---- identifiers (extracted from UofT webarchive) ----
const ORCID = '0000-0003-4507-556X';
const GOOGLE_SCHOLAR = 'https://scholar.google.ca/citations?user=9kO_aCYAAAAJ&hl=en';
const RESEARCH_GATE = 'https://www.researchgate.net/profile/Christopher-Yip-2';
const LINKED_IN = 'https://ca.linkedin.com/in/christopher-yip-71b91821';
const PROFILE_URL =
  'https://discover.research.utoronto.ca/3715-christopher-yip/publications';

// ---- helpers ----

function extractDoi(summaryStr) {
  const m = summaryStr.match(/"external-id-value":"(10\.[^"]+)"/);
  return m ? m[1] : null;
}

// ---- fetch works from ORCID API ----

async function fetchOrcidWorks(orcid) {
  const url = `https://pub.orcid.org/v3.0/${orcid}/works`;
  process.stdout.write(`Fetching ${url} ... `);

  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    redirect: 'follow',
  });

  if (!res.ok) {
    throw new Error(`ORCID API returned ${res.status}: ${res.statusText}`);
  }

  const raw = await res.json();
  const groups = raw?.group ?? [];
  console.log(`${groups.length} work groups found`);

  const pubs = [];
  for (const group of groups) {
    const summary = group['work-summary']?.[0];
    if (!summary) continue;

    const title = summary?.title?.title?.value ?? 'Untitled';
    const journal = summary?.['journal-title']?.value ?? null;
    const yearObj = summary?.['publication-date']?.year;
    const year = yearObj?.value ?? null;
    const pubType = summary?.type ?? 'other';
    const doi = extractDoi(JSON.stringify(summary));
    const doiUrl = doi ? `https://doi.org/${doi}` : null;

    pubs.push({ title, journal, year: year ? Number(year) : null, type: pubType, doi, doiUrl });
  }

  // Sort by year descending
  pubs.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  return pubs;
}

// ---- main ----

async function main() {
  console.log('🔬 Yip Lab – Publication Data Generator\n');
  console.log(`   ORCID          : ${ORCID}`);
  console.log(`   Google Scholar : ${GOOGLE_SCHOLAR}`);
  console.log();

  let publications = [];
  let error = null;

  try {
    publications = await fetchOrcidWorks(ORCID);
    console.log(`✅ Fetched ${publications.length} publications from ORCID\n`);
  } catch (err) {
    console.error(`⚠️  Could not fetch from ORCID: ${err.message}`);
    error = err.message;
  }

  const output = {
    orcid: ORCID,
    googleScholar: GOOGLE_SCHOLAR,
    researchGate: RESEARCH_GATE,
    linkedIn: LINKED_IN,
    profileUrl: PROFILE_URL,
    lastUpdated: new Date().toISOString(),
    error,
    count: publications.length,
    publications,
  };

  const outDir = resolve(rootDir, 'src/data');
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  const outPath = resolve(outDir, 'publications.json');
  writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`📄 Wrote ${outPath}`);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
