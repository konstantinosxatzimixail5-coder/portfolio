// Sets the white paper sample as a document: public/docs/Money_Laundering_in_Video_Games.pdf.
//
// Why this exists. Three of the four long-form samples publish the client's own
// PDF underneath the write-up. The fourth had none to publish: the original
// closes on a paragraph selling the client's product, and the note at the foot
// of the piece says that paragraph was left off here. So the paper is set from
// the text on the page instead, and the page says so in the line above the fold.
//
// It reads src/data/writing/video-game-laundering.ts, the same file the page
// renders from, so the document and the page cannot drift: edit a sentence
// there and run this again.
//
// Run by hand, like scripts/build-og.mjs, and commit the result. It needs a
// browser to print with, which a deploy host has no reason to carry:
//
//   npm i --no-save playwright-core
//   CHROMIUM=/path/to/chrome node scripts/whitepaper.mjs
//
// The layout: a dark cover carrying the brief, the sections numbered as they
// come, the three cases as cards, the closing section and the pull quote
// together on a second dark page, and a colophon. Chromium paints the page
// canvas only inside the print margins, so the stock is white and the newsprint
// tone lives on the panels; a tinted body would print as a frame of unpainted
// white around the type area.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const SOURCE = `${ROOT}/src/data/writing/video-game-laundering.ts`;
const OUT = `${ROOT}/public/docs/Money_Laundering_in_Video_Games.pdf`;

// The three lines the document signs off with. They are here and not in
// src/data/profile.ts because that file is typed for the site and this script
// reads plain values; they have to agree with it, and they are checked by eye
// the same way the CV is.
const AUTHOR = 'Konstantinos Chatzimichail';
const CRAFT = 'Marketing design, creative production, content and growth strategy.';
const BASE = 'Based in Greece, working internationally.';
const CONTACT = 'Talk to me about a paper like this one: +30 694 645 0024.';
const CORNER = 'Writing sample';

const chromium = process.env.CHROMIUM;
if (!chromium) {
  throw new Error('Set CHROMIUM to a browser binary. See the note at the top of this file.');
}
const { chromium: browserType } = await import('playwright-core');

// --- read the source of truth ------------------------------------------------
// The data file is TypeScript with one type import and one annotation. Both come
// off in two lines, which is cheaper than adding a transpiler to a script that
// runs by hand a few times a year.
const src = readFileSync(SOURCE, 'utf8')
  .replace(/^import type .*$/m, '')
  .replace('export const videoGameLaundering: WritingSample =', 'export const videoGameLaundering =');
const shim = join(tmpdir(), `vgl-${Date.now()}.mjs`);
writeFileSync(shim, src);
const { videoGameLaundering: sample } = await import(shim);

const esc = (t) =>
  String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// --- shape the blocks into document furniture --------------------------------
// Two shapes are recognised and neither is positional: a list of three or four
// steps is set as a row of steps, and the paragraphs under a "three cases"
// heading are set as numbered cases. Rename the heading upstream and they
// degrade to plain paragraphs, which is the right failure.
const body = sample.body.filter((b) => b.t !== 'note');
const note = sample.body.find((b) => b.t === 'note');

// The last section and the pull quote close the paper together, on one dark
// page. Left in the flow they orphan: the closing section runs four lines and
// the quote takes a page of its own, so the reader gets two thin pages where the
// argument should land hardest.
const lastH = body.map((b) => b.t).lastIndexOf('h');
const flow = body.slice(0, lastH);
const closing = body.slice(lastH);

let section = 0;
let inCases = false;
let caseNo = 0;
const parts = [];

for (const b of flow) {
  if (b.t === 'h') {
    section += 1;
    inCases = /^three cases/i.test(b.text);
    caseNo = 0;
    parts.push(
      `<h2 class="sec"><span class="sec__n">${String(section).padStart(2, '0')}</span>${esc(b.text)}</h2>`
    );
  } else if (b.t === 'lead') {
    parts.push(`<p class="lead">${esc(b.text)}</p>`);
  } else if (b.t === 'p' && inCases) {
    caseNo += 1;
    parts.push(
      `<div class="case"><p class="case__n">Case ${String(caseNo).padStart(2, '0')}</p>` +
        `<p class="case__t">${esc(b.text)}</p></div>`
    );
  } else if (b.t === 'list') {
    parts.push(
      b.items.length <= 4
        ? `<ol class="steps">${b.items
            .map((it) => {
              const [head, ...rest] = String(it).split('. ');
              return `<li><span class="steps__h">${esc(head)}</span><span class="steps__b">${esc(rest.join('. '))}</span></li>`;
            })
            .join('')}</ol>`
        : `<ul class="bullets">${b.items.map((it) => `<li>${esc(it)}</li>`).join('')}</ul>`
    );
  } else {
    parts.push(`<p>${esc(b.text)}</p>`);
  }
}

const close = closing
  .map((b) => {
    if (b.t === 'h') {
      section += 1;
      return `<h2 class="close__h"><span class="sec__n">${String(section).padStart(2, '0')}</span>${esc(b.text)}</h2>`;
    }
    if (b.t === 'quote') return `<blockquote class="pull"><p>${esc(b.text)}</p></blockquote>`;
    return `<p class="close__p">${esc(b.text)}</p>`;
  })
  .join('\n');

const meta = (sample.meta ?? [])
  .map((m) => `<div class="brief__row"><dt>${esc(m.key)}</dt><dd>${esc(m.value)}</dd></div>`)
  .join('');

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${esc(sample.title)}</title>
<style>
@font-face { font-family:'Redaction'; src:url('file://${ROOT}/public/fonts/Redaction-Regular.woff2') format('woff2'); }
@font-face { font-family:'Recursive'; src:url('file://${ROOT}/public/fonts/Recursive_VF-latin.woff2') format('woff2-variations'); font-weight:300 900; }

:root{
  --stock:#ffffff; --paper:#e5e2d8; --paper-dim:#d8d4c8; --tint:#efece3;
  --ink:#131820; --ink-soft:#3d4653; --rule:#bdb8a9; --accent:#b8253c; --deep:#0d1118;
  --display:'Redaction',Georgia,serif; --sans:'Recursive',system-ui,sans-serif;
}
*{box-sizing:border-box;margin:0;}
@page{ size:A4; margin:19mm 17mm 17mm; }
html{ -webkit-print-color-adjust:exact; print-color-adjust:exact; background:var(--stock); }
body{
  font-family:var(--sans); font-variation-settings:'MONO' 0,'CASL' 0,'slnt' 0,'CRSV' 0;
  background:var(--stock); color:var(--ink); font-size:10.4pt; line-height:1.62;
}
.mono{ font-variation-settings:'MONO' 1,'CASL' 0,'slnt' 0,'CRSV' 0; letter-spacing:.09em; text-transform:uppercase; font-size:7.2pt; }

/* --- cover ---------------------------------------------------------------- */
.cover{ background:var(--deep); color:var(--paper); break-after:page;
  height:261mm; padding:16mm 15mm 14mm; display:flex; flex-direction:column; }
.cover__rule{ border-top:2px solid var(--accent); padding-top:5mm; display:flex; justify-content:space-between; }
.cover__rule .mono{ color:var(--paper); }
.cover h1{ font-family:var(--display); font-weight:400; font-size:44pt; line-height:1.04;
  letter-spacing:-.02em; margin-top:auto; max-width:16ch; }
.cover__stand{ font-size:13pt; line-height:1.5; margin-top:7mm; max-width:46ch; color:var(--paper-dim); text-wrap:pretty; }
.cover__format{ margin-top:4mm; color:#9aa3ae; max-width:none; }
.brief{ margin-top:13mm; border-top:1px solid #2b3340; }
.brief__row{ display:grid; grid-template-columns:26mm 1fr; gap:6mm; padding:3.4mm 0; border-bottom:1px solid #2b3340; }
.brief dt{ color:#9aa3ae; font-variation-settings:'MONO' 1; letter-spacing:.09em; text-transform:uppercase; font-size:7pt; padding-top:.9mm; }
.brief dd{ font-size:9.6pt; color:var(--paper-dim); }
.cover__foot{ margin-top:auto; padding-top:12mm; display:flex; justify-content:space-between; align-items:flex-end; gap:8mm; }
.cover__by{ font-size:9pt; color:var(--paper-dim); max-width:60ch; }
.cover__by strong{ font-weight:600; color:var(--paper); }

/* --- body ----------------------------------------------------------------- */
p{ max-width:74ch; margin-top:3.6mm; text-wrap:pretty; }
.lead{ font-size:12.4pt; line-height:1.5; border-left:2px solid var(--accent);
  padding-left:6mm; margin:0 0 9mm; max-width:66ch; }
.sec{ font-family:var(--display); font-weight:400; font-size:19pt; line-height:1.14; letter-spacing:-.015em;
  margin:11mm 0 1mm; padding-top:3mm; border-top:1px solid var(--rule);
  break-after:avoid; display:flex; gap:5mm; align-items:baseline; }
.sec:first-child{ margin-top:0; border-top:0; padding-top:0; }
.sec__n{ font-family:var(--sans); font-variation-settings:'MONO' 1; font-size:8pt; letter-spacing:.1em; color:var(--accent); }
.sec+p, .sec+.steps, .sec+.case{ break-before:avoid; }

.steps{ list-style:none; padding:0; margin:6mm 0 2mm; display:grid; gap:3mm; break-inside:avoid; }
.steps li{ display:grid; grid-template-columns:30mm 1fr; gap:6mm; padding:3.4mm 4mm;
  background:var(--tint); border-left:2px solid var(--accent); }
.steps__h{ font-variation-settings:'MONO' 1; text-transform:uppercase; letter-spacing:.09em; font-size:7.6pt; padding-top:.7mm; }
.steps__b{ font-size:9.8pt; }
.bullets{ margin:4mm 0 0 5mm; }

.case{ break-inside:avoid; margin-top:5mm; padding:4mm 5mm; border:1px solid var(--rule); background:var(--tint); }
.case__n{ font-variation-settings:'MONO' 1; text-transform:uppercase; letter-spacing:.1em; font-size:7pt;
  color:var(--accent); margin:0 0 1.6mm; }
.case__t{ margin:0; font-size:9.9pt; max-width:none; }

/* --- the close ------------------------------------------------------------ */
.close{ break-before:page; height:261mm; padding:16mm 15mm 14mm; background:var(--deep); color:var(--paper);
  display:flex; flex-direction:column; justify-content:center; }
.close__h{ font-family:var(--display); font-weight:400; font-size:22pt; line-height:1.12; letter-spacing:-.015em;
  display:flex; gap:5mm; align-items:baseline; margin-bottom:5mm; }
.close__p{ color:var(--paper-dim); font-size:11pt; max-width:56ch; margin-top:0; }
.pull{ margin:11mm 0 0; padding-top:8mm; border-top:2px solid var(--accent); }
.pull p{ font-family:var(--display); font-size:19pt; line-height:1.26; max-width:34ch; margin:0; color:var(--paper); }

/* --- colophon ------------------------------------------------------------- */
.colophon{ break-before:page; padding-top:5mm; border-top:2px solid var(--accent); }
.colophon h2{ font-family:var(--display); font-weight:400; font-size:15pt; margin-bottom:3mm; }
.colophon p{ font-size:9.6pt; color:var(--ink-soft); }
.colophon .mono{ color:var(--accent); display:block; margin-bottom:4mm; }
.who{ margin-top:11mm; padding-top:5mm; border-top:1px solid var(--rule); display:grid; gap:2mm; }
.who h3{ font-family:var(--display); font-weight:400; font-size:13pt; }
.who p{ margin:0; font-size:9.6pt; color:var(--ink-soft); max-width:56ch; }
.contact{ margin-top:9mm; padding-top:4mm; border-top:1px solid var(--rule); font-size:9.4pt; }
</style></head>
<body>
<section class="cover">
  <div class="cover__rule">
    <span class="mono">White paper</span>
    <span class="mono">${esc(sample.year)} · ${esc(sample.client ?? '')}</span>
  </div>
  <h1>${esc(sample.title)}</h1>
  <p class="cover__stand">${esc(sample.standfirst)}</p>
  <p class="cover__format mono">${esc(sample.format)}</p>
  <dl class="brief">${meta}</dl>
  <div class="cover__foot">
    <p class="cover__by">Written by <strong>${esc(AUTHOR)}</strong>. ${esc(CRAFT)}</p>
    <span class="mono">${esc(CORNER)}</span>
  </div>
</section>

<main>
${parts.join('\n')}
<section class="close">${close}</section>
${
  note
    ? `<section class="colophon"><span class="mono">A note on this edition</span><h2>About the text</h2>
  <p>${esc(note.text)}</p>
  <div class="who"><h3>${esc(AUTHOR)}</h3><p>${esc(CRAFT)}</p><p>${esc(BASE)}</p></div>
  <p class="contact">${esc(CONTACT)}</p></section>`
    : ''
}
</main>
</body></html>`;

const page_html = join(tmpdir(), `whitepaper-${Date.now()}.html`);
writeFileSync(page_html, html);

const browser = await browserType.launch({ executablePath: chromium, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.goto(`file://${page_html}`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
mkdirSync(`${ROOT}/public/docs`, { recursive: true });
await page.pdf({
  path: OUT,
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate:
    `<div style="width:100%;font-family:system-ui;font-size:6.5pt;letter-spacing:.09em;text-transform:uppercase;color:#7c8494;padding:0 17mm;display:flex;justify-content:space-between;">` +
    `<span>${esc(sample.title)}</span><span class="pageNumber"></span></div>`,
  margin: { top: '19mm', bottom: '17mm', left: '17mm', right: '17mm' },
});
await browser.close();
console.log(`wrote ${OUT}`);
