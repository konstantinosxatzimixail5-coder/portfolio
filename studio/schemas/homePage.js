import { defineField, defineType } from 'sanity';

// Every word on the front page. Grouped in the order they appear down the page,
// so finding the thing you want to change means scrolling to where you saw it.
export default defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  groups: [
    { name: 'open', title: 'Opening', default: true },
    { name: 'contents', title: 'Contents index' },
    { name: 'sections', title: 'Section copy' },
    { name: 'writing', title: 'Writing' },
    { name: 'about', title: 'About' },
    { name: 'seo', title: 'Search and sharing' },
  ],

  fields: [
    // --- opening -----------------------------------------------------------
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'text',
      rows: 2,
      group: 'open',
      description: 'The first thing anyone reads. Around seventeen characters a line, three lines.',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'lede',
      title: 'Lede',
      type: 'text',
      rows: 3,
      group: 'open',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'note',
      title: 'Note under the lede',
      type: 'text',
      rows: 2,
      group: 'open',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'openImage',
      title: 'Opening image',
      type: 'siteImage',
      group: 'open',
      description: 'The tall frame beside the headline. Cropped to 1:2, so use the hotspot.',
      validation: (Rule) => Rule.required(),
    }),

    // --- contents ----------------------------------------------------------
    defineField({
      name: 'contents',
      title: 'Contents index',
      type: 'array',
      group: 'contents',
      description:
        'The numbered list under the opening, which doubles as the second navigation. The order ' +
        'and the numbering come from src/data/sections.ts, so a row here supplies the words for a ' +
        'section rather than deciding whether it exists. A row whose link matches nothing in that ' +
        'file is ignored; a section with no row here falls back to the wording written there.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'num',
              title: 'Number',
              type: 'string',
              description:
                'NOT IN USE. Numbering is counted from the section order in src/data/sections.ts, ' +
                'which is what stopped the index and the margin disagreeing.',
            },
            { name: 'label', title: 'Label', type: 'string', validation: (R) => R.required() },
            {
              name: 'href',
              title: 'Link',
              type: 'string',
              description:
                'The anchor this row supplies words for, e.g. #work or #captures. It has to match ' +
                'a section in src/data/sections.ts or the row is ignored.',
              validation: (R) => R.required(),
            },
            {
              name: 'note',
              title: 'Note',
              type: 'string',
              description:
                'Counted tokens are filled in on build so a figure cannot go stale: {count} is the ' +
                'number of published case studies, {samples} the writing samples, {frames} the ' +
                'captures, {brands} the spec brands and {pipelines} the pipelines.',
              validation: (R) => R.required(),
            },
            {
              name: 'rail',
              title: 'Margin label',
              type: 'string',
              description:
                'The short version printed down the left edge of that section, next to the same number as this row. Leave it empty for a row that points at another page, such as the spec shelf, which has no section here to label.',
            },
          ],
          preview: { select: { title: 'label', subtitle: 'note' } },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),

    // --- section copy ------------------------------------------------------
    defineField({
      name: 'reelHeading',
      title: 'Reel: heading',
      type: 'string',
      group: 'sections',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reelBadgePlay',
      title: 'Reel: button when the cut is up',
      type: 'string',
      group: 'sections',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reelBadgePending',
      title: 'Reel: button while there is no cut',
      type: 'string',
      group: 'sections',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reelNote',
      title: 'Reel: note',
      type: 'text',
      rows: 3,
      group: 'sections',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'workHeading',
      title: 'Work: heading',
      type: 'string',
      group: 'sections',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'workMore',
      title: 'Work: line under the grid',
      type: 'richText',
      group: 'sections',
      description: 'Holds the link across to the spec shelf.',
    }),
    defineField({
      name: 'pipelinesHeading',
      title: 'Pipelines: heading',
      type: 'string',
      group: 'sections',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pipelinesIntro',
      title: 'Pipelines: introduction',
      type: 'text',
      rows: 4,
      group: 'sections',
      description:
        'Write {pipelines} for how many are published. It comes out spelled with a capital, so it can open a sentence: three, four, five.',
      validation: (Rule) => Rule.required(),
    }),

    // --- writing -----------------------------------------------------------
    defineField({
      name: 'writingHeading',
      title: 'Writing: heading',
      type: 'string',
      group: 'writing',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'writingItems',
      title: 'Writing: list',
      type: 'array',
      group: 'writing',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() },
            {
              name: 'note',
              title: 'Note',
              type: 'text',
              rows: 2,
              validation: (R) => R.required(),
            },
          ],
          preview: { select: { title: 'title', subtitle: 'note' } },
        },
      ],
    }),
    defineField({
      name: 'writingMore',
      title: 'Writing: line under the list',
      type: 'string',
      group: 'writing',
    }),

    // --- about -------------------------------------------------------------
    defineField({
      name: 'aboutHeading',
      title: 'About: heading',
      type: 'string',
      group: 'about',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aboutBody',
      title: 'About: body',
      type: 'richText',
      group: 'about',
      description:
        'The contact buttons underneath are built from Site settings, so the email and the CV are edited there, not here.',
      validation: (Rule) => Rule.required(),
    }),

    // --- the blog ----------------------------------------------------------
    defineField({
      name: 'blog',
      title: 'Studio blog block',
      type: 'object',
      group: 'writing',
      description:
        'The one body of writing on this site published somewhere else, so it gets a block under the writing shelf rather than rows that lead nowhere. Clear the link and the block comes off the page.',
      fields: [
        { name: 'flag', title: 'Flag', type: 'string', description: 'The small line above, e.g. Ongoing, published.' },
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'standfirst', title: 'Standfirst', type: 'text', rows: 2, description: 'The one line that sells it.' },
        { name: 'note', title: 'Note', type: 'text', rows: 5 },
        { name: 'href', title: 'Link', type: 'string', description: 'Where Read them goes.' },
        { name: 'linkLabel', title: 'Link label', type: 'string' },
      ],
    }),

    // --- seo ---------------------------------------------------------------
    defineField({
      name: 'seoTitle',
      title: 'Page title',
      type: 'string',
      group: 'seo',
      description: 'Shown in the browser tab and as the headline of a search result.',
      validation: (Rule) => Rule.required().max(70).warning('Over seventy characters gets cut off.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Page description',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (Rule) =>
        Rule.required().max(165).warning('Over about 165 characters gets cut off.'),
    }),
  ],
  preview: { prepare: () => ({ title: 'Home page' }) },
});
