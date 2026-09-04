import { defineField, defineType } from 'sanity';

// An invented brand on the spec shelf. Nobody commissioned any of these, which
// is why "what it proves" is required: a fake brand only earns a page if it was
// built to break something specific.
export default defineType({
  name: 'specBrand',
  title: 'Spec brand',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Brand name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Anchor',
      type: 'slug',
      options: { source: 'name', maxLength: 40 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'num',
      title: 'Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.required().integer(),
    }),
    defineField({
      name: 'product',
      title: 'What the product is',
      type: 'string',
      description: 'e.g. "Yuzu Static, canned energy drink".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'proves',
      title: 'What it proves',
      type: 'text',
      rows: 2,
      description:
        'The failure this set was built to break. This is the only reason an invented brand belongs on the site.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'text',
      rows: 6,
      description: 'The longer paragraph under the heading.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pipeline',
      title: 'Runs on',
      type: 'object',
      description:
        'Which pipeline made this set. Leave it empty and the line is left off the page, so a brand can be written before it is decided.',
      // A warning, not an error, so a half-written brand can still be saved and
      // published. The page omits the line when this is empty.
      validation: (Rule) =>
        Rule.custom((v) =>
          !v || (v.label && v.href)
            ? true
            : 'Set both the label and the link, or clear both. A half-filled pair prints "Runs on" with nothing after it.'
        ).warning(),
      fields: [
        { name: 'label', title: 'Label', type: 'string' },
        {
          name: 'href',
          title: 'Link',
          type: 'string',
          description: 'Usually an anchor on the front page, e.g. /#phantom-set',
        },
      ],
    }),
    defineField({
      name: 'shots',
      title: 'Frames',
      type: 'array',
      of: [{ type: 'siteImage' }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'videos',
      title: 'Films',
      type: 'array',
      of: [{ type: 'embeddedVideo' }],
      description:
        'Anything from this set that moves. Two of these brands end on an anamorphic billboard, which is the frame the stills cannot make the argument for.',
    }),
  ],
  orderings: [{ title: 'Site order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'product', media: 'shots.0', num: 'num' },
    prepare: ({ title, subtitle, media, num }) => ({ title: `${num}  ${title}`, subtitle, media }),
  },
});
