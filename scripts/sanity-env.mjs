// Shared by the scripts that talk to Sanity from the command line. Astro loads
// .env by itself; a plain node script has to be told.

import { createClient } from '@sanity/client';

try {
  process.loadEnvFile('.env');
} catch {
  // No .env file. The variables may still be set in the shell or by the host.
}

export const projectId = process.env.SANITY_PROJECT_ID;
export const dataset = process.env.SANITY_DATASET || 'production';

export function requireProject() {
  if (!projectId) {
    console.error(
      'SANITY_PROJECT_ID is not set.\n' +
        'Copy .env.example to .env and fill it in, then run this again.'
    );
    process.exit(1);
  }
}

// Read only. Everything that writes to the dataset does it through the Studio,
// which authenticates as whoever is logged in, so no script here needs a token
// that can change content.
export function client() {
  requireProject();
  const token = process.env.SANITY_READ_TOKEN;

  return createClient({
    projectId,
    dataset,
    apiVersion: '2024-10-01',
    token: token || undefined,
    useCdn: false,
    perspective: 'published',
  });
}
