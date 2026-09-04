import { defineField, defineType } from 'sanity';

// A hosted video. The site never loads a player until someone clicks, so a
// poster image and its alt text are as required here as the video id itself.
export default defineType({
  name: 'embeddedVideo',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'host',
      title: 'Host',
      type: 'string',
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
      description:
        'Just the id, not the whole address. vimeo.com/123456789 means the id is 123456789. Leave it empty and the page shows the poster with a note saying the cut is coming.',
    }),
    defineField({
      name: 'poster',
      title: 'Poster frame',
      type: 'siteImage',
      description: 'What sits in the player before anyone presses play.',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Read out by screen readers as the name of the player.',
    }),
    defineField({ name: 'duration', title: 'Duration', type: 'string', description: 'e.g. 1:30' }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'text',
      rows: 3,
      description:
        'One or two sentences under the player saying what this film was for. A player without one is a showreel clip; a player with one is evidence.',
    }),
    defineField({
      name: 'ratio',
      title: 'Shape',
      type: 'string',
      options: {
        list: [
          { title: 'Wide, 16:9', value: '16:9' },
          { title: 'Vertical, 9:16', value: '9:16' },
        ],
        layout: 'radio',
      },
      initialValue: '16:9',
      description: 'A vertical cut is held to a phone’s width rather than filling the column.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'videoId', media: 'poster' },
  },
});
