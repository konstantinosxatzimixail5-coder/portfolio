import { defineField, defineType } from 'sanity';

// Every image on the site goes through this object. Alt text is required at the
// schema level, so an image cannot be published without a description. That rule
// lives here rather than in a checklist, because a checklist gets skipped.
export default defineType({
  name: 'siteImage',
  title: 'Image',
  type: 'image',
  options: {
    // The hotspot becomes the CSS object-position when a square crop would
    // otherwise cut the subject out. Drag the circle onto the thing that matters.
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'text',
      rows: 3,
      description:
        'Describe what is in the picture, for someone who cannot see it. Say what is there, not what it is for. No "image of".',
      validation: (Rule) =>
        Rule.required()
          .min(20)
          .error('Alt text is required, and twenty characters is the floor for a real description.')
          .max(300)
          .warning('Over three hundred characters is usually a caption in disguise.'),
    }),
    defineField({
      name: 'label',
      title: 'Caption slug',
      type: 'string',
      description:
        'The small mono line under the frame, lower case. Optional. e.g. "same plate, smoke set".',
    }),
  ],
  preview: {
    select: { media: 'asset', title: 'alt', subtitle: 'label' },
  },
});
