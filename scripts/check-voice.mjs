import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));

const rules = [
  ['contrast phrase', /\brather than\b/i],
  ['contrast phrase', /\bas opposed to\b/i],
  ['filler word', /\bactually\b/i],
  ['em dash', /—/],
  ['excess word', /\badditionally\b/i],
  ['excess word', /\bconsequently\b/i],
  ['excess word', /\bsubsequently\b/i],
  ['excess word', /\bdelv(?:e|es|ing)\b/i],
  ['excess word', /\bunderscores?\b/i],
  ['excess word', /\bshowcasing\b/i],
  ['excess word', /\bintricate\b/i],
  ['excess word', /\bmeticulous(?:ly)?\b/i],
  ['excess word', /\brealm\b/i],
  ['excess word', /\bgarnered\b/i],
  ['excess word', /\bencompassing\b/i],
  ['excess word', /\bemphasi[sz](?:e|es|ing)\b/i],
  ['excess word', /\bnotably\b/i],
  ['excess word', /\bcrucial\b/i],
  ['excess word', /\bcomprehensive\b/i],
  ['excess word', /\bvaluable\b/i],
  ['excess word', /\bcompelling\b/i],
  ['excess word', /\binnovative\b/i],
  ['excess word', /\blandscape\b/i],
  ['excess word', /\bseamless(?:ly)?\b/i],
  ['excess word', /\belevat(?:e|es|ed|ing)\b/i],
  ['excess word', /\bsubstantial\b/i],
  ['corporate phrase', /\bmeaningful impact\b/i],
  ['corporate phrase', /\bmeaningful engagement\b/i],
  ['corporate phrase', /\bholistic approach\b/i],
  ['corporate phrase', /\bin today(?:'|’)s world\b/i],
];

const decode = (value) =>
  value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');

const visibleText = (html) =>
  decode(
    html
      .replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<!--([\s\S]*?)-->/g, ' ')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/\s+/g, ' ').trim();

async function collect(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await collect(path)));
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(path);
  }
  return files;
}

const failures = [];
for (const file of await collect(root)) {
  const text = visibleText(await readFile(file, 'utf8'));
  for (const [name, pattern] of rules) {
    const match = pattern.exec(text);
    if (!match) continue;
    const start = Math.max(0, match.index - 70);
    const end = Math.min(text.length, match.index + match[0].length + 70);
    failures.push({
      file: relative(root, file),
      name,
      excerpt: text.slice(start, end),
    });
  }
}

if (failures.length) {
  console.error('Visible copy failed the voice check:\n');
  for (const failure of failures) {
    console.error(`${failure.file} [${failure.name}] ${failure.excerpt}`);
  }
  process.exit(1);
}

console.log('Visible copy passed the voice check.');
