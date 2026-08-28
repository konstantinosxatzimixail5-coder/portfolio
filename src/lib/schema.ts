// Structured data.
//
// Two audiences read this and neither of them reads the page. A search engine
// wants to know what kind of thing each URL is. An assistant answering "who is
// this and can they do X" wants a set of facts it can state without hedging, and
// if it cannot find them it will infer them, which is the failure this file
// exists to prevent.
//
// The rule is the same as everywhere else on the site: nothing in here is a
// claim the page itself does not already make. Structured data that is more
// generous than the page is how a site ends up with a rich result it cannot
// defend.

import { profile } from '../data/profile';
import { faqs } from '../data/faq';
import type { WritingSample } from './types';

type Json = Record<string, unknown>;

const abs = (domain: string, path: string) => new URL(path, domain).href;

// The one identifier every other node points at, so the graph describes one
// person rather than a fresh anonymous one per page.
export const personId = (domain: string) => `${abs(domain, '/')}#person`;
const siteId = (domain: string) => `${abs(domain, '/')}#website`;

export function person(domain: string, settings: any): Json {
  // Only profiles that are unambiguously this person. A site he built is work,
  // not identity, and putting it in sameAs would say the opposite.
  const sameAs = (settings.links ?? [])
    .map((l: any) => l.href)
    .filter((href: string) => typeof href === 'string' && href.startsWith('http'));

  return {
    '@type': 'Person',
    '@id': personId(domain),
    name: settings.name,
    url: abs(domain, '/'),
    jobTitle: profile.role,
    description: profile.claim,
    email: `mailto:${settings.email}`,
    telephone: profile.phone.e164,
    address: { '@type': 'PostalAddress', addressCountry: 'GR' },
    ...(sameAs.length ? { sameAs } : {}),
    knowsAbout: [
      'Marketing design',
      'Creative production',
      'Content strategy',
      'Growth strategy',
      'Direct response copywriting',
      'Generative media pipelines',
      'Brand voice systems',
      'Video scripting and VSL',
    ],
    knowsLanguage: ['en', 'el'],
  };
}

export function website(domain: string, settings: any): Json {
  return {
    '@type': 'WebSite',
    '@id': siteId(domain),
    url: abs(domain, '/'),
    name: settings.name,
    description: profile.claim,
    inLanguage: 'en',
    publisher: { '@id': personId(domain) },
  };
}

// The questions are already on the page, in the same words. This node exists so
// that an assistant quoting one of them quotes the answer that was written
// rather than a summary of the page it happened to land on.
export function faqPage(domain: string): Json {
  return {
    '@type': 'FAQPage',
    '@id': abs(domain, '/#faq'),
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbs(domain: string, trail: { name: string; path: string }[]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.name,
      item: abs(domain, step.path),
    })),
  };
}

export function writingArticle(domain: string, sample: WritingSample): Json {
  return {
    '@type': 'Article',
    '@id': abs(domain, `/writing/${sample.slug}/#article`),
    headline: sample.title,
    description: sample.standfirst,
    inLanguage: 'en',
    datePublished: sample.year,
    author: { '@id': personId(domain) },
    creator: { '@id': personId(domain) },
    isPartOf: { '@id': siteId(domain) },
    // The label the page carries, carried into the data as well. A spec script
    // described to a machine as client work is the same lie as one described
    // that way to a reader.
    genre: sample.kind,
    about: sample.format,
  };
}

// A case study. `genre` carries the client-or-spec label, for the same reason the
// card does: a spec project described to a machine as client work is the same
// lie as one described that way to a reader.
export function caseStudy(domain: string, w: any): Json {
  return {
    '@type': 'CreativeWork',
    '@id': abs(domain, `/work/${w.slug}/#work`),
    name: w.title,
    headline: w.title,
    description: w.problem,
    url: abs(domain, `/work/${w.slug}/`),
    inLanguage: 'en',
    genre: w.kind,
    ...(w.year ? { dateCreated: String(w.year) } : {}),
    ...(w.client ? { about: w.client } : {}),
    ...(w.stack?.length ? { keywords: w.stack.join(', ') } : {}),
    creator: { '@id': personId(domain) },
    isPartOf: { '@id': siteId(domain) },
  };
}

export function collection(domain: string, path: string, name: string, description: string): Json {
  return {
    '@type': 'CollectionPage',
    '@id': abs(domain, `${path}#page`),
    url: abs(domain, path),
    name,
    description,
    isPartOf: { '@id': siteId(domain) },
    about: { '@id': personId(domain) },
  };
}

// One graph per page rather than a stack of separate script tags. The @id
// references above only resolve inside a single @graph, and resolving is the
// whole point: it is what makes six nodes describe one person.
export const graph = (nodes: Json[]): string =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
