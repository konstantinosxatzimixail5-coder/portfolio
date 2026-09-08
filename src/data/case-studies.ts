// Repository-owned copy for the case studies used as proof of commercial
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
      'I ran the content calendar and paid media for a data school, producing seven visual registers in one fortnight.',
    cardProblem:
      'Paid-media spend fell by 60%. Followers grew 10% in three months, and user acquisition rose 20%.',
    brief: [
      'Big Blue Data Academy teaches data science to people changing careers. Its feed had to sell courses to an audience that can spot a course advert in half a second.',
      'I handled the content calendar, Meta and LinkedIn campaigns, copy and production from the first brainstorm through delivery. The schedule needed enough material to run week after week without a long approval cycle attached to every post.',
    ],
    constraint: [
      'A weekly schedule can flatten every idea into one house template. I fixed seven separate visual registers, then kept the logo, Big Blue blue and course message consistent across the run.',
    ],
    built: [
      'I made promo films, Meta adverts, LinkedIn posts, carousels and short character-led pieces. The work included a photoreal data punk, a 3D cartoon detective, a storybook snake, a country singer and three further treatments.',
      'Every brief began with an audience objection or course promise. I chose the format after the message, then cut the finished work in 9:16 for feeds and 16:9 for wider placements.',
    ],
    how: [
      'I wrote the full register list before generating a frame. Each treatment received its own lighting model, edge quality, plate set and prompt vocabulary, which stopped the styles from drifting back towards one another under deadline.',
      'Nano Banana Pro handled the separate plates. I used Higgsfield Cinema Studio and Google Veo 3 for motion, then assembled each cut in CapCut.',
      'I composited the logo by hand and checked every piece of lettering character by character. Frames with guitars, magnifiers or clipboards went through a separate anatomy check before they entered the edit.',
    ],
    landed: [
      'The pieces ran across paid and organic social while I managed the account. Paid-media spend fell by 60%, followers grew 10% within three months and user acquisition rose 20%.',
    ],
    figureLabel: 'Results',
    figures: [
      { value: '−60%', label: 'Paid-media spend', note: 'during the account period' },
      { value: '+10%', label: 'Follower growth', note: 'within three months' },
      { value: '+20%', label: 'User acquisition', note: 'during the same programme' },
    ],
  },

  cocoon: {
    problem:
      'I produced four films for a Horizon Europe consortium, combining footage from a Greek solar park with an illustrated cyberattack sequence.',
    cardProblem:
      'Four consortium films, one solar-park shoot and an illustrated attack sequence for an unfilmable event chain.',
    brief: [
      'SEleNe CC needed to explain the COCOON project to engineers, reviewers, policy staff and the public. The project had a physical photovoltaic park, a control cabin and an operator, while the cyberattack itself existed only in grant text and technical diagrams.',
      'I had to show the field work, explain the digital chain and keep every scientific claim inside wording the consortium could approve.',
    ],
    constraint: [
      'The physical pilot and the cyber event came from different source material. I gave them one visual system, then used colour to separate normal operation, intrusion and physical effect without rewriting the technical vocabulary.',
    ],
    built: [
      'I made a pilot film at the Halkidiki solar park, a second pilot piece, a promotional cut and a vector attack explainer. The site production followed the van through the gate, across the array and into the control cabin before ending with the HEDNO researcher.',
      'For the illustrated film, I translated the documents into a clear event chain covering entry, lateral movement, control and the physical consequence. I also prepared a vertical site edit, storyboard and reusable diagram language.',
    ],
    how: [
      'I wrote the pilot around the consortium wording and the locations available on the shoot day. The objectives and milestones sat over footage of the array, inverter, logging equipment and project team.',
      'I built the explainer from the approved grant material and diagrams. Nano Banana Pro supplied key environments, Higgsfield handled motion and CapCut carried the edit.',
      'Three checks governed delivery. The claim check kept each statement inside the evidence, the vocabulary review preserved the engineering terms, and the site pass confirmed that every physical detail matched the installation.',
    ],
    landed: [
      'The four films documented two project milestones, including real-time supervision and control of photovoltaic parks by HEDNO and the first real-world execution of Ancillary Services in Greece.',
    ],
    figureLabel: 'Project figures',
    figures: [],
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
    cardProblem: 'Three public cuts, three reusable presenters and 42 seconds of finished vertical video.',
    brief: [
      'Amino Alliance needed creator-style paid social for a real printed pouch. The brief called for three speakers, separate environments and a product that stayed readable at arm’s length.',
      'I built the identities and master product plate for reuse, so a later offer could return to the cast without another booking.',
    ],
    constraint: [
      'The pouch carries a logo, product name and small type. Soft lettering makes the frame look fabricated. Each presenter also needed to hold their face across separate sessions and camera angles.',
    ],
    built: [
      'I made three vertical adverts, product stills and a reusable identity for each presenter. The settings covered a consultant’s office, an Amsterdam canal and a winter training route.',
    ],
    how: [
      'I cast each creator from a written brief, then generated more than twenty reference stills per face across varied angles. Higgsfield Soul ID turned those selections into three trained identities.',
      'I cloned a voice for each person and timed the read to the motion. Nano Banana Pro and ChatGPT Image 2 supplied the stills, while Veo 3.1 and Kling handled the moving shots.',
      'The pouch came from one approved master plate. I checked its front panel at full resolution and reviewed every frame where a hand touched the packaging before finishing the cuts in CapCut.',
    ],
    landed: [
      'I delivered the three paid-social adverts with the trained identity files, still frames and approved pouch plate.',
    ],
    figureLabel: 'Project figures',
    figures: [
      { value: '3', label: 'Public vertical cuts', note: 'office, street and training' },
      { value: '3', label: 'Reusable presenters', note: 'trained for later production' },
      { value: '0:42', label: 'Combined runtime', note: 'across the published adverts' },
    ],
  },

  'bike-barn': {
    problem:
      'A motorcycle dealership commissioned two hero films from showroom photography.',
    cardProblem: 'Two hero films, four model checks and a ten-second public studio cut.',
    brief: [
      'Bike Barn wanted two motorcycles to carry their own hero films. I received showroom photography, then built a studio orbit and a wet Amsterdam night around the bikes.',
    ],
    constraint: [
      'Riders know the model from its badge, tank graphic, headlamp cluster and spoke pattern. I had to preserve those details while changing the setting, lighting and camera movement.',
      'The night sequence called for wet cobbles, canal houses, lamplight and a rider. I created the entire setting from the showroom source material.',
    ],
    built: [
      'I produced two hero films. One placed the Indian Elite on a black studio floor for a slow orbit; the second took the motorcycle onto a rain-darkened street.',
    ],
    how: [
      'I isolated the motorcycle and approved one master plate before starting motion. The badge, fairing, wheel count and gold pinstripe became the fixed reference for every later frame.',
      'A written set specification held the street, canal houses, wet cobbles and lamplight across the night film. Nano Banana Pro made the plates, Kling supplied motion and CapCut carried the edit.',
      'I laid each render over the source at forty per cent opacity. A shift in the tank outline, lettering or spoke pattern sent the shot back for another pass.',
    ],
    landed: [
      'I delivered both hero assets and the locked plate for later crops. The Indian Elite studio cut plays on this page.',
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
      'I built the website, ran one film shoot and made more than ten AI social adverts for a restaurant whose photography covered only part of the menu.',
    cardProblem: 'One live website, one film shoot and more than ten social adverts.',
    brief: [
      'Mariposa needed a search-ready website, a brand film, short social pieces and stills for dishes the original photography had missed. I handled the site, copy and moving work as one commission.',
      'A diner had to recognise both the terrace and the food on arrival. The generated material therefore had to stay close to the room, the crockery and the plates served by the kitchen.',
    ],
    constraint: [
      'The restaurant already had photographs taken on its terrace under real light, though the archive covered only part of the menu. Those frames set the reference for crockery, plating, colour and camera angle.',
      'Each generated dish had to match something the kitchen could serve. The chefs approved the final plate masters.',
    ],
    built: [
      'I designed and built the Next.js website, wrote a ninety-second VSL and ran one on-location film shoot. I also made more than ten social adverts, an illustrated brand piece with short vertical cuts, and stills for the missing dishes.',
    ],
    how: [
      'I began with the real terrace photography and grouped it by light, lens position and service time. The shoot filled the live-action gaps; the approved room references then guided the site and social work.',
      'For each missing dish, I locked one master plate covering the crockery, garnish, lighting and viewpoint. Nano Banana Pro, Nano Banana 2 and ChatGPT Image 2 supplied the stills, while Higgsfield handled motion.',
      'I checked printed words at full resolution and laid every generated plate outline over its reference at forty per cent opacity. The kitchen reviewed the food before I finished the films in CapCut and shipped the site through Vercel.',
    ],
    landed: [
      'The website is live at mariposa.restaurant. I delivered the film shoot, VSL, dish masters and social campaign beside it.',
    ],
    figureLabel: 'Project figures',
    figures: [
      { value: '1', label: 'Live website', note: 'design, build and copy' },
      { value: '1', label: 'Film shoot', note: 'planned and filmed on location' },
      { value: '10+', label: 'Social adverts', note: 'made across the campaign' },
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
