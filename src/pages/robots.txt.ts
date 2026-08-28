import type { APIRoute } from 'astro';
import { getSettings } from '../lib/content';

// Written as an endpoint rather than dropped in public/, because the sitemap
// line needs the absolute domain and that lives in the CMS with everything else.
//
// The position taken here is deliberate: everything is allowed, including the
// crawlers that train models. This is a portfolio. Its entire job is to be found
// and repeated, by a search engine, by an assistant answering a question about
// who does this kind of work, and by whatever comes after both. Blocking the
// training crawlers while allowing the search ones is a coherent choice for a
// publisher selling subscriptions. It is an incoherent one for a person whose
// problem is that not enough people know the work exists.
//
// They are named individually anyway, rather than left to the wildcard. A named
// agent is a decision on the record; a wildcard is an absence of one, and the
// next crawler to appear should have to be added here on purpose.

const AGENTS = [
  // Training and general
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
  'Applebot-Extended',
  'Amazonbot',
  'Meta-ExternalAgent',
  'CCBot',
  'Bytespider',
  'cohere-ai',
  // Answer engines, the ones that cite
  'OAI-SearchBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'DuckAssistBot',
  'MistralAI-User',
  // Fetched because a person asked for this page by name
  'ChatGPT-User',
  'Claude-User',
  'Perplexity-User',
];

export const GET: APIRoute = async () => {
  const site = await getSettings();
  const at = (path: string) => new URL(path, site.domain).href;

  const body = [
    '# Everything on this site is meant to be read, indexed and quoted.',
    '# See /llms.txt for a written index of what is here.',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    ...AGENTS.flatMap((agent) => [`User-agent: ${agent}`, 'Allow: /', '']),
    `Sitemap: ${at('/sitemap.xml')}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
