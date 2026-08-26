import { defineField, defineType } from 'sanity';

// The header of the spec shelf. The brands themselves are separate documents.
export default defineType({
  name: 'specPage',
  title: 'Spec shelf',
  type: 'document',
  fields: [
    defineField({
      name: 'flag',
      title: 'Flag',
      type: 'string',
      description: 'The gold line above the title. This is the honesty label, so keep it plain.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lede',
      title: 'Lede',
      type: 'text',
      rows: 3,
      description:
        'Write {count} for the total number of frames on the shelf and {brands} for the number of brands. Both are counted at build time, so neither can drift. {count} comes out as a figure and {brands} comes out spelled with a capital, for the start of a sentence.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seoTitle',
      title: 'Page title',
      type: 'string',
      validation: (Rule) => Rule.required().max(70).warning('Over seventy characters gets cut off.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Page description',
      type: 'text',
      rows: 3,
      validation: (Rule) =>
        Rule.required().max(165).warning('Over about 165 characters gets cut off.'),
    }),
  ],
  preview: { prepare: () => ({ title: 'Spec shelf' }) },
});
