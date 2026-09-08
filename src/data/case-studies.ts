// Repository-owned copy for the case studies used as proof of commercial
// and production work. Sanity still owns the media, order, links and stack.
// Keeping these lines here makes each number reviewable in the same commit as
// the component that prints it.

export interface CaseFigure {
  value: string;
  label: string;
  note: string;
}

export interface CaseArtefact {
  label: string;
  value: string;
}

export interface CaseGate {
  name: string;
  test: string;
}

export interface CaseStackRow {
  stage: string;
  tool: string;
}

export interface CaseStudyCopy {
  title?: string;
  caseTitle?: string;
  year?: string;
  place?: string;
  problem: string;
  cardProblem: string;
  brief: string[];
  constraint: string[];
  built: string[];
  how: string[];
  landed: string[];
  problemBody?: string[];
  idea?: string[];
  made?: string[];
  result?: string[];
  artefacts?: CaseArtefact[];
  gates?: CaseGate[];
  stackOverride?: CaseStackRow[];
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
    title: 'Big Blue Data Academy',
    caseTitle: 'The Unconventional Social Strategy That Became Mainstream',
    year: '2025',
    problem:
      'An unconventional content calendar that put pop culture next to data education and lifted the brand image with it.',
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
      'Operator Stack is my pipeline for work where the value sits in the run across every film. I chose the registers first and wrote them down as a list before making a frame, so two briefs could not drift into the same look under deadline. A register is a decision about lighting model, edge quality and how much the world is allowed to be wrong. Each received its own plate set and prompt vocabulary. I reused nothing between them, because reuse produces the sameness this job was built to avoid.',
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
    problemBody: [
      'Big Blue Data Academy teaches data science to career changers. The audience is on a phone, mid-scroll, and has already learned to skip anything shaped like a course advert. The ask was volume: a run of short pieces that could go out week after week and keep working, with no long approval cycle attached to any of them. I ran the social strategy and the paid media campaigns, from the brainstorm to the final cut.',
    ],
    idea: [
      'I inverted the house style. Volume and sameness normally arrive together: a house style makes the second piece cheap and the fifth piece invisible, because by then the audience has learned its shape. I set the constraint the other way. Every piece had to look as if it came from a different production company, and the brand had to survive all of them.',
    ],
    made: [
      'Promo adverts, LinkedIn and Meta posts, and ad creatives.',
      'A photoreal punk figure in a dark office, with a head made of a pie chart and a mohawk made of bars.',
      'A 3D cartoon detective in a paper-flooded room, holding a magnifier over a stack of reports.',
      'A country singer in a blue Stetson under a saloon sign, playing a song about data.',
      'Three more registers in the same fortnight, cut 9:16 for feed and 16:9 for wide.',
    ],
    result: [
      'I delivered a run of social pieces for the school: seven registers, one brand and one fortnight. During the account period, paid-media spend fell by 60%, follower numbers grew 10% within three months and user acquisition rose 20%.',
    ],
    artefacts: [
      { label: 'Films', value: '7 pieces, 9:16 and 16:9 cuts' },
      { label: 'Register list', value: 'Fixed before any frame, seven entries' },
      { label: 'Plate sets', value: 'One per register, nothing reused between them' },
    ],
    gates: [
      {
        name: 'Brand gate',
        test: 'The mark, the blue and the lockup survive a register change without being redrawn. I composite the mark by hand: a model asked to draw a logo gets it nearly right, and nearly right on a logo is the version everybody notices.',
      },
      {
        name: 'Anatomy gate',
        test: 'I check every frame with a held object before it enters a cut. Cartoon registers fail here first: a magnifier, a guitar neck or a clipboard held by something with no thumbs.',
      },
    ],
    stackOverride: [
      { stage: 'Register list', tool: 'Fixed before any frame' },
      { stage: 'Plates', tool: 'Nano Banana Pro, separate set per register' },
      { stage: 'Motion', tool: 'Higgsfield Cinema Studio' },
      { stage: 'Mark', tool: 'Composited in the cut, by hand' },
      { stage: 'Cut', tool: 'CapCut' },
      { stage: 'Implementation', tool: 'Google Veo 3' },
      { stage: 'Creative ideation', tool: 'Canva' },
    ],
  },

  cocoon: {
    caseTitle: 'A live grid pilot and the cyberattack against it, both made watchable',
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
      'This one ran on the writing. On the pilot film, the footage is real and the words had to survive review by the people who ran the trial. Every objective and milestone card therefore uses the consortium’s own language, set on screen a clause at a time, with nothing paraphrased. On the explainer, generation covered environments, establishing shots and the abstracted grid. I sent every technical claim back to the consortium before placing it in a render.',
    ],
    landed: [
      'The four films documented two project milestones, including real-time supervision and control of photovoltaic parks by HEDNO and the first real-world execution of Ancillary Services in Greece.',
    ],
    figureLabel: 'Project figures',
    figures: [],
    problemBody: [
      'COCOON is a Horizon Europe project on cooperative cyber protection for modern power grids, run across a consortium. It has two halves that pull in opposite directions. One half is physical: a photovoltaic park in Halkidiki, a control cabin, an operator on a laptop, and the first time the Greek distribution operator supervised and controlled PV parks in real time. The other half has never happened and cannot be filmed, because it is an attack on equipment that is still running. The audience is mixed in the same way: engineers on one side, reviewers, policy people and the public on the other, all needing the same story without the vocabulary.',
    ],
    idea: [
      'I filmed what existed and wrote what did not, then held both to one visual system. The pilot film goes to the site and stays there. Objectives and milestones sit as typed cards over the array, then the film hands over to a vertical phone frame inside a solar cell. The van, drive, gate, contractor’s sign, control cabin, inverter and logging kit appear one by one, ending on the HEDNO researcher in front of the rows he has described.',
      'The explainer does the opposite job. None of it could be shot, so I read the grant text and technical diagrams down into a single chain of events: entry point, lateral move, control layer and physical effect. I agreed one diagram vocabulary before drawing anything. Colour carries state and nothing else, so a partner can point at a frame and identify the stage that is wrong.',
    ],
    made: [
      'A pilot film for the Secure Energy Communities demonstrator, shot at the photovoltaic park in Halkidiki with the pilot leader.',
      'A second pilot film and a project promo.',
      'A vector attack explainer that walks an intrusion through a grid, one hop at a time. It holds one visual system from the first frame to the last, so a viewer who does not know what a substation is can still follow which box went dark and why.',
    ],
    result: [
      'I delivered four films to SEleNe CC for the COCOON consortium. The pilot film carries the two milestones the project needed on record: real-time supervision and control of PV parks by HEDNO for the first time, and the first execution of Ancillary Services in a real-world environment in Greece. The project is publicly documented under Horizon Europe grant agreement 101120221.',
    ],
    artefacts: [
      { label: 'Films', value: 'Promo, two pilot films, one explainer' },
      { label: 'Site cut', value: 'Vertical park tour, captioned, framed in a solar cell' },
      { label: 'Storyboard', value: 'One event chain, written then boarded by hand' },
      { label: 'Diagram system', value: 'One vocabulary across four pieces, colour as state' },
    ],
    gates: [
      {
        name: 'Claim gate',
        test: 'Nothing appears on screen that the grant text does not support. On the pilot film, that extends to the milestones: I call a first a first only when the consortium will sign the sentence.',
      },
      {
        name: 'Vocabulary gate',
        test: 'One diagram system runs across all four pieces. A new shape needs a new meaning, or I do not draw it.',
      },
      {
        name: 'Site gate',
        test: 'I did not re-stage anything at the park for the camera. What the phone sees is what the engineers were doing.',
      },
    ],
    stackOverride: [
      { stage: 'Source', tool: 'Grant text, consortium diagrams, site footage' },
      { stage: 'Storyboard', tool: 'Written, then boarded by hand' },
      { stage: 'Frames', tool: 'Nano Banana Pro' },
      { stage: 'Motion and assembly', tool: 'Higgsfield, CapCut' },
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
    caseTitle: 'Three creators who never have to be rebooked',
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
      'I used Identity Lock for the presenters and Phantom Set for the pouch. The two lines meet at the frame where a hand touches the packaging. I wrote the casting brief first, then made more than twenty stills of each face at varied angles under even light. The selected frames formed a trained identity that carries across sessions without another reference upload. I cloned a voice for each presenter and timed it to the performance, because three people who share one read are three people nobody believes.',
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
    problemBody: [
      'Amino Alliance sells a supplement in a printed pouch and needed creator-style video adverts for paid social. The requirement underneath that is volume and range at once. A paid test burns through creative: it wants the consultant, the runner and the man on a canal in Amsterdam saying different things to different audiences, then wants all three again next month when the offer moves. Booking three creators for that brings a shoot, a schedule and a reshoot fee.',
    ],
    idea: [
      'I cast once, then treated the cast as an asset. I trained three presenters from stills sheets and reused them across the run, so the fifth advert costs what the first one did and the tenth is a rewrite. Each person is cast for a different audience and kept in a place that suits them: a consultant in her office, a man in his fifties on a canal in Amsterdam, and a runner on a park path in bare winter light.',
      'The pouch runs on a separate line. It is a printed object with a real mark, a product name and a block of small type down the front. None of that can be approximated in a presenter’s hand at arm’s length in daylight.',
    ],
    made: [
      'Three creator video adverts for paid social, presenter to camera, product in hand.',
      'Product frames for the still placements.',
      'Three trained presenter identities and one product plate, handed over.',
    ],
    result: [
      'I delivered three creator video adverts for paid social, with the trained presenters and product plate handed over as reusable files. A new offer is a new script against the same three faces.',
    ],
    artefacts: [
      { label: 'Video adverts', value: 'Three creator pieces, 9:16, presenter to camera' },
      { label: 'Stills', value: 'Product frames for still placements' },
      { label: 'Identities', value: 'Three trained presenters, reusable across sessions' },
      { label: 'Product plate', value: 'Master plate of the pouch, label-locked' },
    ],
    gates: [
      {
        name: 'Label gate',
        test: 'I zoom to full resolution and read every word on the front of the pouch. A failed frame returns to the plate. There is no retouching pass.',
      },
      {
        name: 'Hand gate',
        test: 'I freeze and check every frame where fingers touch the pouch. A bad one is rerolled or cropped above the wrist.',
      },
      {
        name: 'Consent gate',
        test: 'The signed releases for voice and likeness reference sit in the folder before anything renders.',
      },
      {
        name: 'Disclosure gate',
        test: 'These presenters are synthetic and the adverts state that. A creator advert that hides what it is fails here first.',
      },
    ],
    stackOverride: [
      { stage: 'Presenter identity', tool: 'Higgsfield Soul ID' },
      { stage: 'Identity sheet', tool: 'Nano Banana Pro, GPT Image 2' },
      { stage: 'Product plate', tool: 'GPT Image 2' },
      { stage: 'Scene plates', tool: 'Popcorn' },
      { stage: 'Motion', tool: 'Veo 3.1, Kling' },
      { stage: 'Voice', tool: 'ElevenLabs' },
      { stage: 'Cut', tool: 'CapCut' },
    ],
  },

  'bike-barn': {
    title: 'Bike Barn',
    caseTitle: 'Indian Elite Models',
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
      'I used Phantom Set with the gates turned up. The plate came first: the bike alone, with the correct badge, fairing and wheel count, and nothing else in the picture.',
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
    problemBody: [
      'A dealership wanted two hero films for its motorcycles without taking them out of the showroom. The bikes are the product; everything else in frame is set dressing, and set dressing is the part a dealership seldom has budget for.',
    ],
    idea: [
      'I built the set once and never rebuilt it. A motorcycle is the worst possible subject for a generated frame: badge, tank graphic, headlamp cluster that riders know by heart, and spokes, which fall apart the moment a model starts inventing detail. I locked the machine into a master plate before any environment existed, then wrote the street, canal houses, wet cobbles and reflected lamplight once as a set specification and reused it across every frame.',
    ],
    made: [
      'Two hero films for the dealership, including an Indian Elite cut in 9:16.',
      'A locked master plate of the machine, handed over as a reusable file.',
    ],
    result: [
      'I delivered both hero films for the models, with the plate handed over so the next production starts from a correct bike.',
    ],
    artefacts: [
      { label: 'Films', value: 'Two hero cuts, including the Indian Elite in 9:16' },
      { label: 'Master plate', value: 'The machine alone, correct badge, fairing and wheel count' },
      { label: 'Set specification', value: 'Street, weather and lamplight, written once' },
    ],
    gates: [
      {
        name: 'Silhouette gate',
        test: 'I overlay the render on the plate at 40% opacity. Any change in the outline of the tank or fairing kills the frame.',
      },
      {
        name: 'Spoke rule',
        test: 'If the spoke count changes between frames, the shot returns to the plate. There is no retouching pass.',
      },
      {
        name: 'Rights gate',
        test: 'Two earlier pieces for this client leaned on licensed characters. I have kept them off this site for that reason.',
      },
    ],
    stackOverride: [
      { stage: 'Master plate', tool: 'Nano Banana Pro' },
      { stage: 'Set specification', tool: 'Written once, reused per frame' },
      { stage: 'Motion', tool: 'Kling, image to video' },
      { stage: 'Cut', tool: 'CapCut' },
    ],
  },

  mariposa: {
    caseTitle: 'A restaurant that had never been photographed',
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
      'I used Phantom Set, the pipeline for any subject a person can hold up against the picture. I locked one master plate per dish first: crockery, garnish, light and angle. Every later frame came from that plate, so the plating could not wander between shots.',
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
    problemBody: [
      'A restaurant on Rhodes needed a fully SEO- and AIO-optimised site, a film, realistic dish photos from several angles and synthetic social content. Its own photography covered part of the menu, shot honestly on the terrace under real light, and stopped there. The realism standard was high: everything had to survive a customer sitting down and being handed the real plate.',
    ],
    idea: [
      'I did not invent the plates. A generated dish the kitchen cannot serve is a lie a diner catches when the food arrives, so I locked the still work to the restaurant’s own reference frames. The film went the other way entirely: openly illustrated, with a garden, a fire and a long day by the water, all in the warm palette the room already has. An illustrated film does not pretend to be the room. A photoreal version is tested against it every second it runs.',
    ],
    made: [
      'A Next.js site, designed and shipped.',
      'A ninety-second VSL script.',
      'One on-location film shoot.',
      'An illustrated brand film, plus short vertical cuts for social.',
      'More than ten synthetic social adverts across the campaign.',
      'Generated plate stills covering the dishes the camera never reached.',
    ],
    result: [
      'The website is live at mariposa.restaurant, with the site and film working together. Someone from the kitchen signed off every generated plate before I shipped it.',
    ],
    artefacts: [
      { label: 'Website', value: 'Next.js build, live' },
      { label: 'Film', value: 'Illustrated, plus vertical cutdowns' },
      { label: 'Shoot', value: 'One production day on location' },
      { label: 'Script', value: '90-second VSL' },
      { label: 'Social adverts', value: 'More than ten pieces across the campaign' },
      { label: 'Stills', value: 'Plate set, master-plate locked per dish' },
    ],
    gates: [
      {
        name: 'Label gate',
        test: 'I zoom to full resolution and read every printed word in frame. A failed frame returns to the master plate. There is no retouching tool.',
      },
      {
        name: 'Silhouette gate',
        test: 'I lay the render over the master plate at 40% opacity. Any shift in the outline of the plate kills the frame.',
      },
      {
        name: 'Kitchen gate',
        test: 'Somebody who cooks the dish looks at it and confirms that it is theirs.',
      },
    ],
    stackOverride: [
      { stage: 'Master plate', tool: 'Nano Banana Pro' },
      { stage: 'Variations', tool: 'Nano Banana 2, image to image from the plate, ChatGPT Image 2' },
      { stage: 'Motion', tool: 'Higgsfield Cinema Studio' },
      { stage: 'Cut', tool: 'CapCut' },
      { stage: 'Site', tool: 'Vercel, Figma, Claude Code, Sanity' },
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
    problemBody: copy.problemBody ? blocks(copy.problemBody) : undefined,
    idea: copy.idea ? blocks(copy.idea) : undefined,
    result: copy.result ? blocks(copy.result) : undefined,
    stack: copy.stackOverride ?? work.stack,
  };
};

export const figuresFor = (slug: string) => caseStudyCopy[slug]?.figures ?? [];
