// One place for the things that change without touching a template.

export const site = {
  name: 'Konstantinos Chatzimichail',
  role: 'Writer, director and synthetic media production',
  base: 'Athens, Greece',
  email: 'konstantinos.xatzimixail5@gmail.com',
  cv: '/Konstantinos_Chatzimichail_CV.pdf',
  studio: { label: 'talecrafters.studio', href: 'https://talecrafters.studio/' },
  links: [
    { label: 'Email', href: 'mailto:konstantinos.xatzimixail5@gmail.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/konstantinos-chatzimichail/' },
  ],
};

// The reel. Swap host and id here when the cut is uploaded, and nothing else
// on the site needs editing. Set `id` to an empty string while it is unhosted:
// the poster still renders and the page says the cut is coming.
export const reel = {
  host: 'vimeo' as 'vimeo' | 'youtube',
  id: '',
  poster: 'spec/feral/product-05',
  posterAlt:
    'A frame from the reel: a FERAL Yuzu Static can standing in shallow water with magenta and green vapour behind it.',
  title: 'Reel 2026, ninety seconds',
  duration: '1:30',
};
