// Repository-owned copy for the five case studies used as proof of commercial
// and production work. Sanity still owns the media, order, links and stack.
// Keeping these lines here makes each number reviewable in the same commit as
// the component that prints it.

export interface CaseFigure {
  value: string;
  label: string;
  note: string;
}

export interface CaseStudyCopy {
  title?: string;
  year?: string;
  place?: string;
  problem: string;
  cardProblem: string;
  brief: string[];
  constraint: string[];
  built: string[];
  how: string[];
  landed: string[];
  figureLabel: 'Results' | 'Project figures';
  figures: CaseFigure[];
}

const blocks = (paragraphs: string[]) =>
  paragraphs.map((text, i) => ({
    _type: 'block' as const,
    _key: `copy-${i}`,
    style: 'normal' as const,
    markDefs: [],
    children: [{ _type: 'span' as const, _key: `copy-${i}-span`, text, marks: [] }],
  }));

export const caseStudyCopy: Record<string, CaseStudyCopy> = {
  bbda: {
    year: '2025',
    problem:
      'I ran paid social and content for a data school, using seven visual registers across one campaign system.',
    cardProblem:
      'Paid-media spend fell by 60%. Followers grew 10% in three months, and user acquisition rose 20%.',
    brief: [
      'Big Blue Data Academy teaches data science to people changing careers. Its feed had to sell courses to an audience that can spot a course advert in half a second.',
      'The job covered the content calendar, Meta and LinkedIn campaigns, copy, and production from first idea through delivery.',
    ],
    constraint: [
      'A weekly schedule can flatten every idea into the same house template. I set seven visual registers, then kept the logo, blue and course message fixed across all of them.',
    ],
    built: [
      'Promo films, Meta adverts, LinkedIn posts, carousels and short character-led pieces. Each brief started with an audience objection or course promise, followed by the format that could carry it.',
    ],
    how: [
      'I wrote the register list first: photoreal, 3D cartoon, storybook illustration, live-action pastiche and three other treatments. Each one received its own plate set and prompt vocabulary.',
      'The logo, blue and lock-up stayed fixed. I composited the mark in the cut and checked any lettering inside the frame character by character. Held objects went through a separate anatomy check.',
    ],
    landed: [
      'The programme ran across paid and organic social during the period I managed the account. The campaign figures appear above.',
    ],
    figureLabel: 'Results',
    figures: [
      { value: '−60%', label: 'Paid-media spend', note: 'during the account period' },
      { value: '+10%', label: 'Follower growth', note: 'within three months' },
      { value: '+20%', label: 'User acquisition', note: 'during the same programme' },
    ],
  },

  'jarfis-property-group': {
    place: 'Bali / Netherlands',
    problem:
      'A property group needed presenter ads and a homepage film built from two existing Bali listings.',
    cardProblem:
      'Two Bali listings, one cloned client voice and a ten-second public vertical cut.',
    brief: [
      'Jarfis Property Group sells Bali real estate to Dutch and international investors. I received the listing stills and the client’s recordings, then turned them into social pieces and a longer brand film.',
    ],
    constraint: [
      'The villas were in Bali, the business operated from the Netherlands, and I worked from Greece. The entire job had to come from source photography already on the website. The presenter also had to sound like the person an investor would meet on a call.',
    ],
    built: [
      'Vertical presenter adverts, one synthetic hero film and two reconstructed property sequences. I used the client’s recorded voice across the spoken pieces.',
    ],
    how: [
      'The source images came first. I cleaned and upscaled each one, mapped camera moves to the room geometry, and kept the walls, windows and pool edges fixed across motion.',
      'I trained a voice model from the supplied recordings, timed the read to the performance, then matched the final grade to the listing photography.',
    ],
    landed: [
      'The client used the vertical films with its international investor audience. The public cut on this page shows the spokesperson format.',
    ],
    figureLabel: 'Project figures',
    figures: [
      { value: '2', label: 'Bali listings', note: 'rebuilt from client photography' },
      { value: '1', label: 'Cloned client voice', note: 'trained from supplied recordings' },
      { value: '0:10', label: 'Public vertical cut', note: 'spokesperson format' },
    ],
  },

  'amino-alliance': {
    problem:
      'A supplement brand needed reusable presenter adverts and product stills with every line on the pouch intact.',
    cardProblem: 'Three public cuts, two reusable presenters and 42 seconds of finished vertical video.',
    brief: [
      'Amino Alliance needed creator-style paid social for a real printed pouch. The brief called for different speakers, several environments and a product that stayed readable at arm’s length.',
      'The setup also had to carry into the next offer without recasting or rebuilding the pack.',
    ],
    constraint: [
      'The pouch carries a logo, product name and small type. Soft lettering makes the frame look fabricated. The presenters also needed to hold their faces across separate sessions.',
    ],
    built: [
      'Three public vertical cuts and product frames for static placements. Two reusable presenters carry the set across office, street and training scenes.',
    ],
    how: [
      'Each presenter started with twenty or more reference stills at varied angles. I built the scene plates after the face held across the set, then wrote separate openings for the office, street and training contexts.',
      'The pouch came from one approved master plate. I checked its front panel at full resolution and froze every frame where fingers touched the packaging.',
    ],
    landed: [
      'Delivered for paid social with the reusable identity files and approved product plate included.',
    ],
    figureLabel: 'Project figures',
    figures: [
      { value: '3', label: 'Public vertical cuts', note: 'office, street and training' },
      { value: '2', label: 'Reusable presenters', note: 'held across separate sessions' },
      { value: '0:42', label: 'Combined runtime', note: 'across the published adverts' },
    ],
  },

  'bike-barn': {
    problem:
      'A motorcycle dealership commissioned two hero films from showroom photography.',
    cardProblem: 'Two hero films, four model checks and a ten-second public studio cut.',
    brief: [
      'Bike Barn wanted two motorcycles to feel like campaign subjects. The showroom plates had to become a studio orbit and a wet night street while every model-specific detail stayed intact.',
    ],
    constraint: [
      'Motorcycles carry details that riders know by sight. A badge, tank graphic, headlamp cluster or spoke count drifting between frames breaks the film.',
      'The brief included a wet cobbled street at night. There was no location shoot, rain machine or rider.',
    ],
    built: [
      'Two hero films for the selected motorcycles. The Indian Elite cut published here follows the bike through a slow studio orbit built from one locked plate.',
    ],
    how: [
      'I isolated the motorcycle first, then locked the badge, fairing and wheels. A written set specification fixed the floor, key light and reflection pattern for every generated frame.',
      'Each render was laid over the plate at forty per cent opacity. Any shift in the tank outline or spoke pattern sent the frame back for another pass.',
    ],
    landed: [
      'Delivered as hero assets with a reusable plate for later crops and motion tests.',
    ],
    figureLabel: 'Project figures',
    figures: [
      { value: '2', label: 'Hero films', note: 'built from showroom material' },
      { value: '4', label: 'Model checks', note: 'badge, stripe, lettering and spokes' },
      { value: '0:10', label: 'Public studio cut', note: 'Indian Elite' },
    ],
  },

  mariposa: {
    problem:
      'One restaurant brief covered a live website, a ninety-second script, dish frames and short social films.',
    cardProblem: 'One live website, a ninety-second VSL and two public vertical films.',
    brief: [
      'Mariposa needed a website and the material that would run beside it: a film, scripts, social cuts and stills for dishes the original shoot had missed.',
      'A diner had to recognise the room and the plate when they arrived at the restaurant.',
    ],
    constraint: [
      'The restaurant already had photography shot on its terrace under real light. That work set the reference for the crockery, plating and colour of every generated dish.',
      'Each synthetic plate had to match something the kitchen could serve. The kitchen team held the final say.',
    ],
    built: [
      'A Next.js website, a ninety-second VSL script, two public vertical films and stills for the missing dishes. The drawn film used the room’s warm palette and carried the day from the garden to the table.',
    ],
    how: [
      'I locked one master plate per dish, covering the crockery, garnish, light and camera angle. Every later frame started from that approved image.',
      'Full-resolution checks covered printed details and plate outlines. The kitchen reviewed each dish against the food served on site.',
    ],
    landed: [
      'The website and films are live at mariposa.restaurant. The site, script and moving pieces shipped as one restaurant system.',
    ],
    figureLabel: 'Project figures',
    figures: [
      { value: '1', label: 'Live website', note: 'design, build and copy' },
      { value: '90 sec', label: 'VSL script', note: 'written for the restaurant' },
      { value: '2', label: 'Public vertical films', note: 'plate move and venue film' },
    ],
  },
};

export const applyCaseStudyCopy = (work: any) => {
  const copy = caseStudyCopy[work.slug];
  if (!copy) return work;
  return {
    ...work,
    ...copy,
    brief: blocks(copy.brief),
    constraint: blocks(copy.constraint),
    built: blocks(copy.built),
    how: blocks(copy.how),
    landed: blocks(copy.landed),
  };
};

export const figuresFor = (slug: string) => caseStudyCopy[slug]?.figures ?? [];
