// one-sentence-apology — entry program for the make.fun competition
// u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0
//
// Reads the chosen apology from entry.txt sitting next to this file,
// checks it against the competition gate (one sentence, one line,
// 1-200 characters, not only white space), and writes it to
// $MAKEFUN_OUTPUT_DIR/entry.txt, defaulting to /output when the
// variable is unset. Written in TypeScript; Node 22.18+ runs it as-is.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourceFile = join(here, "entry.txt");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputFile = join(outputDir, "entry.txt");

// The gate allows 1 to 200 characters; a sentence has to end with a
// single terminal mark and contain no other one.
const MAX_LENGTH = 200;
const SENTENCE_END = /[.!?]$/;

function readEntry(): string {
  let text = readFileSync(sourceFile, "utf8");
  // A stray byte-order mark or a trailing newline from an editor must
  // never sneak into the judged text, so strip both before validating.
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  text = text.replace(/\r?\n$/, "");
  return text;
}

function fail(message: string): never {
  throw new Error(`entry rejected: ${message}`);
}

function validateEntry(text: string): void {
  if (text.length === 0 || text.trim().length === 0) {
    fail("the entry is empty or only white space");
  }
  if (text.length > MAX_LENGTH) {
    fail(`the entry is ${text.length} characters, over the ${MAX_LENGTH} limit`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    fail("the entry must fit on a single line");
  }
  if (!SENTENCE_END.test(text)) {
    fail("the entry must end with a sentence terminator");
  }
  // Exactly one sentence: only the final character may be a terminator.
  const body = text.slice(0, -1);
  if (/[.!?]/.test(body)) {
    fail("the entry must be exactly one sentence");
  }
  // On-brief: the line has to read as an apology, not just any sentence.
  if (!/\bsorr(y|ies)\b|\bapolog/i.test(text)) {
    fail("the entry must read as an apology");
  }
}

const entry = readEntry();
validateEntry(entry);

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputFile, entry, "utf8");

// Read the file back and refuse to claim success unless the bytes on
// disk are exactly the line that passed validation.
const written = readFileSync(outputFile, "utf8");
if (written !== entry) {
  fail("round-trip check failed: output does not match the validated entry");
}

console.log(entry);
console.log(`wrote ${outputFile} (${entry.length} characters)`);
