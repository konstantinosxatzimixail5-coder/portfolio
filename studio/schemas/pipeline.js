import { defineField, defineType } from 'sanity';

// One production line, written out stage by stage with the gates that stop a
// frame from shipping. A pipeline with stages but no gates is just a tool list,
// so both arrays have a minimum length.
export default defineType({
  name: 'pipeline',
  title: 'Pipeline',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The plain-language name, e.g. "Ninety frames before lunch".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Anchor',
      type: 'slug',
      options: { source: 'mechanism', maxLength: 40 },
      description: 'The #anchor other pages link to, e.g. phantom-set.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'num',
      title: 'Number',
      type: 'string',
      description: 'Two digits, as printed on the sheet. Seven exist, three are published.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.required().integer(),
    }),
    defineField({
      name: 'mechanism',
      title: 'Mechanism',
      type: 'string',
      description: 'The one thing that makes it work, e.g. "The master plate".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'What the client gets, in their words.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'loop',
      title: 'The loop',
      type: 'text',
      rows: 3,
      description: 'How long a round takes and what lands at the end of it.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stages',
      title: 'Stages',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Stage', type: 'string', validation: (R) => R.required() },
            {
              name: 'model',
              title: 'What runs it',
              type: 'string',
              description: 'Name the tool or the model. "A whiteboard" is a valid answer.',
              validation: (R) => R.required(),
            },
            {
              name: 'fixes',
              title: 'What it fixes',
              type: 'text',
              rows: 4,
              validation: (R) => R.required(),
            },
            { name: 'time', title: 'Time', type: 'string', validation: (R) => R.required() },
          ],
          preview: { select: { title: 'name', subtitle: 'model' } },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'gates',
      title: 'Control gates',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Gate', type: 'string', validation: (R) => R.required() },
            {
              name: 'test',
              title: 'The test',
              type: 'text',
              rows: 3,
              description: 'How you check. Has to be something a person can actually do.',
              validation: (R) => R.required(),
            },
            {
              name: 'fail',
              title: 'On failure',
              type: 'text',
              rows: 3,
              description: 'What happens when it fails.',
              validation: (R) => R.required(),
            },
          ],
          preview: { select: { title: 'name', subtitle: 'test' } },
        },
      ],
      description: 'The gates are the reason anyone believes the rest of it. Do not leave them out.',
      validation: (Rule) => Rule.min(1).error('A pipeline without a gate is just a tool list.'),
    }),
  ],
  orderings: [{ title: 'Site order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'mechanism', num: 'num' },
    prepare: ({ title, subtitle, num }) => ({ title: `${num}  ${title}`, subtitle }),
  },
});
