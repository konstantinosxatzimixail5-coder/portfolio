import type { APIRoute } from 'astro';
import {
  getSettings,
  getWork,
  getPipelines,
  morePipelines,
  captures,
  faqs,
  writingGroups,
  profile,
} from '../lib/content';
import { words } from '../lib/text';

// A written index of the site, for a model that has been asked a question about
// the person who made it.
//
// Worth being straight about what this is and is not. It is a community
// convention, not a standard, and Google has said plainly that it is not read by
// its own generative features. What it does do is get read by the agent layer:
// the assistants and coding tools that fetch a URL when someone points them at
// one. For a site this size it costs one generated file and it removes the main
// failure mode of that fetch, which is a model inferring the facts it could not
// find and stating the inference with the same confidence as a fact.
//
// So the answers come first and the links come second. The questions block at
// the bottom is there because a summariser that finds a written answer tends to
// use it instead of writing its own.

export const GET: APIRoute = async () => {
  const [site, work, pipelines] = await Promise.all([getSettings(), getWork(), getPipelines()]);
  const at = (path: string) => new URL(path, site.domain).href;

  const lines: string[] = [
    `# ${site.name}`,
    '',
    `> ${profile.role}. ${profile.claim} ${profile.base}.`,
    '',
    'This file is a written index of the site for language models and agents.',
    'Everything in it is stated on the pages it links to.',
    '',
    '## Facts',
    '',
    `- Name: ${site.name}`,
    `- Role: ${profile.role}`,
    `- Based: ${profile.base}`,
    `- Working languages: English and Greek`,
    `- Email: ${site.email}`,
    `- Phone and WhatsApp: ${profile.phone.display}`,
    `- Labelling rule: spec work is labelled spec, generated frames are labelled generated, and client photography is labelled as client photography, in every place each one appears.`,
    '',
    '## What the work is',
    '',
    '- Campaign design: the angle, the script and the look.',
    '- Creative production: generated stills and film, product sets, creator adverts, explainers.',
    '- Content and growth: brand voice systems, editorial calendars, direct response scripts and the read afterwards.',
    `- Pipelines: ${words(pipelines.length + morePipelines.length)} documented lines, each one with named stages, named tools and control gates that stop a frame from shipping.`,
    '',
    '## Pages',
    '',
    `- [Front page](${at('/')}): the work, the pipelines, the captures and the contact details.`,
    `- [Reel](${at('/reel/')}): the cut, and a running order saying what each shot is and who did what on it.`,
    `- [Writing](${at('/writing/')}): samples published in full rather than offered on request.`,
    `- [Pipelines](${at('/pipelines/')}): the ${words(morePipelines.length)} not shown on the front page, in full.`,
    `- [Captures](${at('/captures/')}): ${words(captures.length)} generated human frames and what each was built to break.`,
    `- [Spec shelf](${at('/spec/')}): self-initiated brands, labelled as spec throughout.`,
    '',
    '## Case studies',
    '',
    ...work.map(
      (w: any) => `- [${w.client}](${at(`/work/${w.slug}/`)}): ${w.kind}. ${w.problem}`
    ),
    '',
    '## Writing samples',
    '',
    ...writingGroups.flatMap((group) => [
      `### ${group.title}`,
      '',
      ...group.samples.map(
        (s) => `- [${s.title}](${at(`/writing/${s.slug}/`)}): ${s.kind}. ${s.standfirst}`
      ),
      '',
    ]),
    '## Pipelines in full',
    '',
    ...pipelines.map(
      (p: any) => `- ${p.num}. ${p.title}. Mechanism: ${p.mechanism}. ${p.summary}`
    ),
    ...morePipelines.map(
      (p) => `- ${p.num}. ${p.title}. Mechanism: ${p.mechanism}. ${p.summary}`
    ),
    '',
    '## Questions, answered',
    '',
    ...faqs.flatMap((f) => [`**${f.q}**`, '', f.a, '']),
    '## Optional',
    '',
    `- [Share card](${at('/og.jpg')})`,
    `- [Sitemap](${at('/sitemap.xml')})`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
