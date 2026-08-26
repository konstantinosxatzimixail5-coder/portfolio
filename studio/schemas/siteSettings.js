import { defineField, defineType } from 'sanity';

// The details that appear in more than one place: the name in the nav, the
// address in the footer, the email behind every contact button. Edited once here.
export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role line',
      type: 'string',
      description: 'The small line above the headline, e.g. "Writer, director and ...".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'base',
      title: 'Based in',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'cv',
      title: 'CV',
      type: 'file',
      description: 'The PDF behind the download button. Upload a new one to replace it.',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'studio',
      title: 'Studio',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'href', title: 'URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'links',
      title: 'Footer links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: (R) => R.required() },
            {
              name: 'href',
              title: 'URL',
              type: 'url',
              validation: (R) => R.required().uri({ scheme: ['http', 'https', 'mailto'] }),
            },
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        },
      ],
    }),
    defineField({
      name: 'monogram',
      title: 'Monogram',
      type: 'string',
      description: 'The two letters in the top left and in the footer, split by a slash. e.g. K/C',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation',
      type: 'array',
      description: 'The bar across the top of every page. The Reel button is added automatically.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: (R) => R.required() },
            {
              name: 'href',
              title: 'Link',
              type: 'string',
              description: 'An anchor such as /#work, or a path such as /spec/.',
              validation: (R) => R.required(),
            },
            {
              name: 'key',
              title: 'Key',
              type: 'string',
              description:
                'Marks this link as the current page. Use work, pipelines, spec, writing or about.',
            },
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'footerNote',
      title: 'Footer line',
      type: 'string',
      description: 'The credits line. The copyright and the year sit beside it and update themselves.',
    }),
    defineField({
      name: 'domain',
      title: 'Domain',
      type: 'url',
      description:
        'The address the site lives at, with https and no trailing slash. This builds every canonical URL and every link preview, so a wrong value here points social cards at a host that does not exist.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});
