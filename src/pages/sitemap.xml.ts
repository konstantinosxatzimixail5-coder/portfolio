import type { APIRoute } from 'astro';
import { getSettings, getWork, writingSamples, films, getAllPipelines } from '../lib/content';

// Every URL the site publishes, enumerated from the same sources the pages are
// built from. A sitemap typed by hand is a sitemap that is wrong by the second
// case study, and a wrong one is worse than none: it teaches a crawler that this
// host returns 404s.

export const GET: APIRoute = async () => {
  const [site, work, pipelines] = await Promise.all([
    getSettings(),
    getWork(),
    getAllPipelines(),
  ]);

  // Priority is a hint and engines mostly ignore it. It is set anyway, because
  // where it is read it should say what this site thinks the front door is.
  const routes: { path: string; priority: string }[] = [
    { path: '/', priority: '1.0' },
    { path: '/reel/', priority: '0.8' },
    { path: '/writing/', priority: '0.8' },
    { path: '/product/', priority: '0.7' },
    { path: '/pipelines/', priority: '0.7' },
    { path: '/captures/', priority: '0.7' },
    ...films.map((f) => ({ path: `/films/${f.slug}/`, priority: '0.8' })),
    ...pipelines.map((p: any) => ({ path: `/pipelines/${p.id}/`, priority: '0.6' })),
    ...work.map((w: any) => ({ path: `/work/${w.slug}/`, priority: '0.6' })),
    ...writingSamples.map((s) => ({ path: `/writing/${s.slug}/`, priority: '0.6' })),
  ];

  // The build date, which is the only date a static file can honestly claim to
  // know something about.
  const lastmod = new Date().toISOString().slice(0, 10);

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    routes
      .map(
        (r) =>
          `  <url>\n` +
          `    <loc>${new URL(r.path, site.domain).href}</loc>\n` +
          `    <lastmod>${lastmod}</lastmod>\n` +
          `    <priority>${r.priority}</priority>\n` +
          `  </url>\n`
      )
      .join('') +
    `</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
