import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Every case study carries the same skeleton. The five section fields are
// required, so the structure cannot be skipped by forgetting to write one.
const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    kind: z.enum(['Client', 'Spec, self-initiated']),
    year: z.string(),
    place: z.string().optional(),
    order: z.number(),
    // one line for the card on the home page: what the problem was
    problem: z.string(),
    // the skeleton
    brief: z.string(),
    constraint: z.string(),
    built: z.string(),
    how: z.string(),
    landed: z.string(),
    // media
    hero: z.string(),
    heroAlt: z.string(),
    gallery: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          label: z.string().optional(),
          // object-position for the square crop, when centre loses the subject
          focus: z.string().optional(),
        })
      )
      .default([]),
    video: z
      .object({
        host: z.enum(['vimeo', 'youtube']),
        id: z.string(),
        poster: z.string(),
        alt: z.string(),
        title: z.string(),
        duration: z.string().optional(),
      })
      .optional(),
    // named tools and models, stage by stage
    stack: z.array(z.object({ stage: z.string(), tool: z.string() })).default([]),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work };
