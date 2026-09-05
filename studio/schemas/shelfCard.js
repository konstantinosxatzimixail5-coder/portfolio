import { defineField, defineType } from 'sanity';

// A card on the Selected work shelf that is not a case study.
//
// Three pieces belong on that shelf and already have a better home than a case
// study would give them: the studio has a live site, FERAL has the whole product
// shelf, and the animation has a film page with its beat map on it. Each gets a
// card, and the card points at where the work actually is. Writing a fourth
// version of any of them would be the same argument printed twice, and the two
// copies would drift.
//
// Place decides which side of the case studies it lands on. Everything else is
// what a card prints.
export default defineType({
  name: 'shelfCard',
  title: 'Shelf card',
  type: 'document',
  fields: [
    defineField({
      name: 'client',
      title: 'Name',
      type: 'string',
      description: 'Printed in the meta line, e.g. TaleCrafters, FERAL, Mars Drop.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description:
        'Where the card goes. A path on this site (/films/mars-drop/) or a full address (https://talecrafters.studio/).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Label',
      type: 'string',
      description:
        'Printed as written. Anything containing "spec" or "original" prints gold, the way the product shelf and the film section do; everything else prints cyan.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year or runtime',
      type: 'string',
      description: 'The last thing on the meta line. A year for work, a running time for a film.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'problem',
      title: 'The line',
      type: 'text',
      rows: 3,
      description: 'One sentence under the card. No wind-up.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Picture',
      type: 'siteImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ratio',
      title: 'Crop',
      type: 'string',
      options: {
        list: [
          { title: 'Landscape, 4:3', value: '4 / 3' },
          { title: 'Wide, 16:9', value: '16 / 9' },
        ],
        layout: 'radio',
      },
      initialValue: '4 / 3',
      description:
        'The shelf crops to 4:3 so the rows line up. A film poster or a billboard keeps its own shape.',
    }),
    defineField({
      name: 'place',
      title: 'Where it sits',
      type: 'string',
      options: {
        list: [
          { title: 'Before the case studies', value: 'lead' },
          { title: 'After them', value: 'tail' },
        ],
        layout: 'radio',
      },
      initialValue: 'tail',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Within its side of the shelf, low first.',
      validation: (Rule) => Rule.required().integer(),
    }),
  ],
  orderings: [{ title: 'Site order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'client', subtitle: 'kind', media: 'image', place: 'place' },
    prepare: ({ title, subtitle, media, place }) => ({
      title,
      subtitle: `${place === 'lead' ? 'before' : 'after'} · ${subtitle ?? ''}`,
      media,
    }),
  },
});
