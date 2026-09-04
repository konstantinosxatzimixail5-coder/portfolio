import { defineField, defineType } from 'sanity';

// A case study. The five body sections are all required, which is the whole
// point of the skeleton: brief, constraint, what was built, how, where it
// landed. A project that cannot fill in the constraint has not been thought
// about yet, so the schema refuses to publish it.
export default defineType({
  name: 'work',
  title: 'Case study',
  type: 'document',
  groups: [
    { name: 'meta', title: 'Details', default: true },
    { name: 'skeleton', title: 'The five sections' },
    { name: 'media', title: 'Media' },
    { name: 'extras', title: 'Stack and links' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'meta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      group: 'meta',
      options: { source: 'title', maxLength: 60 },
      description: 'Sets the address: /work/<slug>/. Changing it breaks any existing link.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      group: 'meta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Paid or self-initiated',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          { title: 'Client', value: 'Client' },
          { title: 'Spec, self-initiated', value: 'Spec, self-initiated' },
        ],
        layout: 'radio',
      },
      initialValue: 'Client',
      description:
        'This label appears on the card and at the top of the page. Work nobody commissioned has to say so.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      group: 'meta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'place', title: 'Place', type: 'string', group: 'meta' }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      group: 'meta',
      description: 'Low numbers first, on the home page grid and in the previous/next links.',
      validation: (Rule) => Rule.required().integer(),
    }),
    defineField({
      name: 'problem',
      title: 'The problem, in one line',
      type: 'text',
      rows: 2,
      group: 'meta',
      description:
        'Shown on the home page card and used as the page description in search results. One sentence.',
      validation: (Rule) => Rule.required().max(200),
    }),

    // --- the skeleton ------------------------------------------------------
    defineField({
      name: 'brief',
      title: '01 Brief',
      type: 'richText',
      group: 'skeleton',
      description: 'What was asked for.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'constraint',
      title: '02 Constraint',
      type: 'richText',
      group: 'skeleton',
      description:
        'The line that matters most on the page. What made this hard: the budget, the deadline, the thing that could not be shot.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'built',
      title: '03 What I built',
      type: 'richText',
      group: 'skeleton',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'how',
      title: '04 How I built it',
      type: 'richText',
      group: 'skeleton',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'landed',
      title: '05 Where it landed',
      type: 'richText',
      group: 'skeleton',
      description: 'No invented numbers. If there is no metric, say what shipped and where.',
      validation: (Rule) => Rule.required(),
    }),

    // --- media -------------------------------------------------------------
    defineField({
      name: 'hero',
      title: 'Lead image',
      type: 'siteImage',
      group: 'media',
      description: 'Runs full width at the top of the page, and crops square on the home card.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'siteImage' }],
      group: 'media',
      description:
        'Sits inside "What I built". Cropped square, so drag the hotspot onto anything near an edge.',
    }),
    defineField({
      name: 'video',
      title: 'Video (single, older field)',
      type: 'embeddedVideo',
      group: 'media',
      description:
        'The original one-film field. Anything in it still plays, first, above the list below. New films go in the list.',
    }),
    defineField({
      name: 'videos',
      title: 'Films',
      type: 'array',
      of: [{ type: 'embeddedVideo' }],
      group: 'media',
      description:
        'The films from this engagement that a reader can actually watch. Every player on this site is a facade, so nothing loads until somebody clicks and the count is not a page-weight problem. A film nobody can play is worse than no film, so leave one out until it is public.',
    }),

    // --- extras ------------------------------------------------------------
    defineField({
      name: 'stack',
      title: 'Stack, stage by stage',
      type: 'array',
      group: 'extras',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'stage', title: 'Stage', type: 'string', validation: (R) => R.required() },
            { name: 'tool', title: 'Tool or model', type: 'string', validation: (R) => R.required() },
          ],
          preview: { select: { title: 'stage', subtitle: 'tool' } },
        },
      ],
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      group: 'extras',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: (R) => R.required() },
            { name: 'href', title: 'URL', type: 'url', validation: (R) => R.required() },
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        },
      ],
    }),
    defineField({
      name: 'draft',
      title: 'Hide from the site',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
      description: 'On means the page is not built and the card does not appear.',
    }),
  ],
  orderings: [
    { title: 'Site order', name: 'order', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', client: 'client', kind: 'kind', order: 'order', media: 'hero' },
    prepare: ({ title, client, kind, order, media }) => ({
      title: `${String(order ?? '·').padStart(2, '0')}  ${title}`,
      subtitle: kind === 'Client' ? client : `${client} · spec`,
      media,
    }),
  },
});
