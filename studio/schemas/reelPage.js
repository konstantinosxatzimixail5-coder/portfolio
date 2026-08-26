import { defineField, defineType } from 'sanity';

// The reel page, and the three frames the front page borrows from it.
// Leave the video id empty and both pages fall back to the three frames with a
// note saying the cut is being assembled, so the site is never broken by an
// unfinished edit.
export default defineType({
  name: 'reelPage',
  title: 'Reel',
  type: 'document',
  groups: [
    { name: 'cut', title: 'The cut', default: true },
    { name: 'shots', title: 'Shot list' },
    { name: 'seo', title: 'Search and sharing' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Name of the cut',
      type: 'string',
      group: 'cut',
      description: 'e.g. "Reel 2026, ninety seconds".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      group: 'cut',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'host',
      title: 'Host',
      type: 'string',
      group: 'cut',
      options: {
        list: [
          { title: 'Vimeo', value: 'vimeo' },
          { title: 'YouTube', value: 'youtube' },
        ],
        layout: 'radio',
      },
      initialValue: 'vimeo',
    }),
    defineField({
      name: 'videoId',
      title: 'Video ID',
      type: 'string',
      group: 'cut',
      description:
        'Empty until the cut is uploaded. While it is empty both pages show the three frames below and say the cut is being assembled.',
    }),
    defineField({
      name: 'poster',
      title: 'Poster frame',
      type: 'siteImage',
      group: 'cut',
      description: 'Used once there is a video id. Sits in the player before anyone presses play.',
    }),
    defineField({
      name: 'trio',
      title: 'Three frames',
      type: 'array',
      of: [{ type: 'siteImage' }],
      group: 'cut',
      description:
        'Stands in for the poster while the cut is unhosted, and appears on the front page either way. Three, because the source frames are portrait and one wide still would crop.',
      validation: (Rule) => Rule.length(3).error('Exactly three frames.'),
    }),
    defineField({
      name: 'heading',
      title: 'Page heading',
      type: 'string',
      group: 'cut',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lede',
      title: 'Lede',
      type: 'text',
      rows: 3,
      group: 'cut',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pendingNote',
      title: 'Note while there is no cut',
      type: 'string',
      group: 'cut',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'shotsHeading',
      title: 'Shot list: heading',
      type: 'string',
      group: 'shots',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shotsRail',
      title: 'Shot list: margin label',
      type: 'string',
      group: 'shots',
      description:
        'Printed small down the left edge of the section. Keep it shorter than the heading, since it is set in a narrow column and is there to be scanned, not read.',
      validation: (Rule) => Rule.required().max(24),
    }),
    defineField({
      name: 'shots',
      title: 'Shot list',
      type: 'array',
      group: 'shots',
      description: 'In running order. Client work and spec work are labelled separately.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'time',
              title: 'Timecode',
              type: 'string',
              description: 'e.g. 00:12',
              validation: (R) => R.required(),
            },
            { name: 'piece', title: 'Piece', type: 'string', validation: (R) => R.required() },
            {
              name: 'kind',
              title: 'Paid or self-initiated',
              type: 'string',
              options: {
                list: [
                  { title: 'Client', value: 'Client' },
                  { title: 'Spec, self-initiated', value: 'Spec, self-initiated' },
                ],
                layout: 'radio',
              },
              initialValue: 'Client',
              validation: (R) => R.required(),
            },
            {
              name: 'pipeline',
              title: 'Pipeline',
              type: 'string',
              description: 'Free text, because some of these were made by hand.',
              validation: (R) => R.required(),
            },
            {
              name: 'role',
              title: 'What I did',
              type: 'text',
              rows: 2,
              validation: (R) => R.required(),
            },
          ],
          preview: {
            select: { title: 'piece', subtitle: 'role', time: 'time' },
            prepare: ({ title, subtitle, time }) => ({ title: `${time}  ${title}`, subtitle }),
          },
        },
      ],
    }),

    defineField({
      name: 'seoTitle',
      title: 'Page title',
      type: 'string',
      group: 'seo',
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
  preview: {
    select: { subtitle: 'title', media: 'trio.0' },
    prepare: ({ subtitle, media }) => ({ title: 'Reel', subtitle, media }),
  },
});
