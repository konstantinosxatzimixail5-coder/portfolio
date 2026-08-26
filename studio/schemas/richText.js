import { defineArrayMember, defineType } from 'sanity';

// Body copy. Deliberately narrow: paragraphs, bold, italic and links, and
// nothing else. There are no headings here because the page templates own the
// heading levels, and a stray H2 typed into a body field breaks the outline
// that screen readers navigate by.
export default defineType({
  name: 'richText',
  title: 'Body copy',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{ title: 'Paragraph', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (Rule) =>
                  Rule.required().uri({
                    scheme: ['http', 'https', 'mailto'],
                    allowRelative: true,
                  }),
              },
            ],
          },
        ],
      },
    }),
  ],
});
