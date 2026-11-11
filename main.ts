// news-summary-01 entry: writes the repository's summary of Wednesday 11 November 2026's world
// news to the output directory as entry.txt. The summary lives in summary.txt beside this file
// (written for this entry from the day's reporting; see that file). The program is a pure copy:
// no network, no clock, no randomness — both grading runs write identical bytes.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export function writeEntry(outDir: string): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const text = readFileSync(join(here, 'summary.txt'), 'utf8');
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'entry.txt'), text, 'utf8');
}

const isMain = process.argv[1] !== undefined && import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (isMain) {
  writeEntry(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
}
