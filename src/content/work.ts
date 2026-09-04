// Case studies this repository owns, and the films and fixes it adds to the ones
// the Studio owns.
//
// Two lists, and the difference between them matters. `added` is whole case
// studies that have no document in Sanity yet. `patch` is a set of fields laid
// over a case study that does, keyed by slug: the films it can now play, a
// sharper index line, a typo that has been on the page for a while.
//
// Nothing here deletes. A field this file does not name comes off the dataset
// untouched, so publishing in the Studio still wins for everything it covers.
// See src/lib/content.ts for the merge, and the README, under "The overlay",
// for the way out: retype this in the Studio, delete it from here, and the
// dataset is the only version of the site again.

import { blocks } from './blocks';
import { cms, local, type Film } from './video';
import type { CmsImage } from '../lib/sanity';

export interface Case {
  slug: string;
  title: string;
  client: string;
  /** 'Client' turns the label cyan. Anything else turns it gold. */
  kind: string;
  year: string;
  place?: string;
  /** The line on the card on the front page. One sentence, no wind-up. */
  problem: string;
  brief: string;
  constraint: string;
  built: string;
  how: string;
  landed: string;
  hero: CmsImage;
  gallery: CmsImage[];
  stack: { stage: string; tool: string }[];
  links: { label: string; href: string }[];
  films: Film[];
}

/** A patch is any subset of a case study, plus the films to hang off it. */
export type Patch = Partial<Omit<Case, 'slug'>>;

/* ------------------------------------------------------------------ added -- */

export const added: Case[] = [
  {
    slug: 'talecrafters',
    title: 'The studio I had to build before I could sell it',
    client: 'TaleCrafters',
    kind: 'My own studio',
    year: '2026',
    place: 'London and Athens',
    problem:
      'I needed a studio that could be checked rather than believed, so I built the site as the evidence.',
    brief: blocks(`TaleCrafters is my studio. Synthetic media and creative systems: generative films, campaigns and visual worlds, the automated lines that produce them, and our own originals. Registered in London, run mostly out of Athens.

The site is the pitch, and it is also the product demo. Anyone deciding whether to hand a campaign to a studio that generates its footage is really asking one question, and it is not about taste. It is whether the work can be repeated on a Tuesday when the deadline is Friday.

So the brief I wrote for myself was to answer that question in public, at length, and in a form a sceptic could audit without talking to me first.`),
    constraint: blocks(`A studio site that shows a reel and says trust us is asking for the sale before it has earned the meeting.

The constraint was that every claim on the site had to come with the method that produced it. No capability list without the pipeline under it. No spec frame without the gate it was built to break. No film without the stack that made it, named tool by tool, including the ones that failed first.

That rules out the shortest version of this site, which is a showreel and a contact form. It also rules out the version I would rather write, where the difficult parts are left slightly vague.`),
    built: blocks(`A Next.js site on Sanity, and the body of writing that sits inside it. Case studies, a concept-project shelf, three filmmaking workflows written out stage by stage with the control gates that stop a frame shipping, and a reference layer: a glossary running past a hundred terms, thirty-eight camera moves written as prompts, twelve animation registers, and downloadable tools that work on paper without me in the room.

Under that, twelve solution pages for the things people actually search for, a blog, film pages for the three originals with their beat sheets published, and the legal and disclosure pages a synthetic-media studio has no excuse for skipping.

The frames below are the studio's own shelf, which is the same shelf on this site. One body of work, published twice, held identical in both places.`),
    how: blocks(`Operator Stack, run on myself. The site is the ledger layer of my own pipeline, which is the only honest way to sell one.

Content lives in Sanity so it can be edited without a deploy, and the schema enforces the shape rather than trusting me to remember it: alt text has a character floor, a case study cannot publish without its constraint section, a concept brand cannot publish without the line saying what it was built to prove. Everything renders on the server and ships as HTML. The video players are facades, so nothing from YouTube loads until a visitor asks for it.

The part I would defend hardest is the disclosure. Every invented brand on that site says it is invented, on the page, near the pictures. A studio arguing that generated work can be trusted cannot be caught being coy about which of its own work is real.`),
    landed: blocks(`Live at talecrafters.studio, and it is where the client conversations start now. The reference layer does most of that: people arrive looking up a term or a camera move and stay to read a case.

It also doubles as the reason this portfolio can be short. The long version of any argument here is over there, with the gates written out.`),
    // The mark is square and the lead frame on a case study runs the full
    // column, so the square file is set on a wide ground rather than cropped.
    // Cropping a logo to 16:9 removes the half of it that makes it a logo.
    hero: local(
      'talecrafters/mark-wide',
      'The TaleCrafters mark on a near-black ground: two white eyes over a wide grin made of film-strip perforations, with a cyan edge under it.',
      'the mark'
    ),
    gallery: [
      local(
        'spec/feral/billboard',
        'A night-city billboard for FERAL Yuzu Static, the can breaking out of the board in front of the artwork with lime slices and green liquid crossing the frame.',
        'concept shelf, FERAL'
      ),
      local(
        'spec/grain-01/billboard',
        'A daylight city billboard for GRAIN 01 on an acid-green ground, the translucent camera bursting through the board under the line SHOOT OUTSIDE THE FRAME.',
        'concept shelf, GRAIN 01'
      ),
      local(
        'films/mars-drop/md-strip',
        'A four frame contact strip from Mars Drop: the wide two-shot on the colony floor, the chef mid-line under the water tower, the executive at the booster, and the chef addressing camera.',
        'originals, Mars Drop'
      ),
      cms(
        'c5243aef344b12e76daa5e888c410732ec9f085b',
        'A KNUCKLE Energy Chews carton behind four flavour wrappers, JAB in yellow, CROSS in orange, HOOK in red and KNOCKOUT in purple, each with a matching moulded sweet beside it.',
        'concept shelf, KNUCKLE'
      ),
      cms(
        '19b0bbe6e0ee6f46fba2679ce80132ef9db96914',
        'A SOIE Petal Veil serum bottle on a travertine plinth in front of a linen curtain, rose petals at its base and hard window light on the wall behind.',
        'concept shelf, SOIE'
      ),
      cms(
        '634548ee8cb159250b59514fc13a9a91542c77dd',
        'A GRAIN 01 cutaway diagram: the camera drawn in exploded technical form with the internal board, battery, lens path and flash unit called out in small labelled type.',
        'concept shelf, GRAIN 01 cutaway'
      ),
    ],
    stack: [
      { stage: 'Site', tool: 'Next.js, React, Tailwind' },
      { stage: 'Content', tool: 'Sanity, schema-enforced' },
      { stage: 'Build and host', tool: 'Vercel' },
      { stage: 'Design', tool: 'Figma' },
      { stage: 'The boring half', tool: 'Claude Code, MCP, skills' },
    ],
    links: [{ label: 'talecrafters.studio', href: 'https://talecrafters.studio/' }],
    films: [],
  },

  {
    slug: 'mars-drop',
    title: 'Two men on Mars, working out that they are a demo',
    client: 'TaleCrafters',
    kind: 'Spec, self-initiated',
    year: '2026',
    problem:
      'I wanted to know whether a generated pipeline can hold a scene with no action in it, so I removed every escape route and shot a conversation.',
    brief: blocks(`Generative video gets judged on spectacle, because spectacle is what it does easily. A dragon, a chase, a city from orbit. All of that hides the thing that actually breaks, which is two people standing still and talking.

Timing. Listening. The beat before a line lands.

So I wrote the brief against myself. Two characters, one location, no action, one hundred and seven seconds, and a joke that only works if both performances are alive.`),
    constraint: blocks(`A dialogue two-hander has nowhere to hide. There is no explosion to cut to when a shot is not working, and every weakness in the pipeline lands on a face that is being looked at.

The other constraint was the parody. Both figures are caricatures of public figures, so the piece had to be unmistakably comedy about my own tooling and never about a real person's words. Nothing either of them says is presented as something anybody said.`),
    built: blocks(`One hundred and seven seconds, written, cast, animated and cut. Two stranded men on a Mars colony, each convinced the other one is responsible, slowly working out that they are inside a demonstration and that the person running it is watching.

Then they start giving that person notes. Better set, snappier dialogue, an actual plot. Which is the honest way to end a spec piece: the comedy is at the pipeline's expense, so every weakness in the pipeline reads as the bit rather than as a fault, and the work is left to be judged on the only thing still exposed, which is whether the two of them are really listening to each other.

Published with the beat sheet and the stack open, because a film like this is an argument and an argument should show its working.`),
    how: blocks(`Seven stages, and only two of them are generation. That ratio is the finding.

The scene was written first, in full, all eleven exchanges, before a frame existed. A dialogue scene assembled out of whatever the model happened to produce is a montage with subtitles. Then the four beats were fixed, each with one camera position it keeps, so the cutting pattern was decided before the first render instead of in the edit. Then both character designs were locked as reference sheets, and after that stage no prompt describes either man in words.

Showrunner carries the scene and the continuity across the four beats, which is what makes this a scene rather than four clips. Higgsfield runs the performance passes, directed at the listener rather than the speaker: the reaction is generated first and the line is timed to it. ElevenLabs carries both voices, cut last, against picture, because a line that arrives on the gesture instead of just after it reads as a puppet.

Three failures were worth writing down. The listener freezing into a held pose for the length of the other man's line, fixed by generating the reaction first. Both figures losing proportion between the wide and the singles, fixed by the reference sheets and by banning verbal description afterwards. And the two singles facing the same way, which stopped the conversation reading as a conversation, fixed by assigning each camera position a side and shooting nothing else.`),
    landed: blocks(`Spec. Nobody commissioned it and no brand is attached to it. It is published as the third of my filmmaking workflows, with the beats and the stack written up beside it.

What I took from it: on a piece with no action, the work moves out of the render and into the writing, the casting and the timing. Which is exactly where it sits on a live-action two-hander.`),
    hero: local(
      'films/mars-drop/md-poster',
      'A wide animated frame of a Mars colony: two figures standing apart in front of a landed rocket and a domed habitat, orange rock formations behind them and a blue sky above.',
      'the wide it opens and closes on'
    ),
    gallery: [
      local(
        'films/mars-drop/md-hero',
        'An animated frame of the man in a blue flight suit standing at the foot of a booster, arms open, mid-line, with red rock and two moons behind him.',
        'single, the realisation'
      ),
      local(
        'films/mars-drop/md-b-natural',
        'An animated frame of the man in a black suit and tie in front of a water tower on the colony, one hand raised.',
        'single, act natural'
      ),
      local(
        'films/mars-drop/md-d-address',
        'An animated frame of the man in the black suit, hands on hips, delivering a line straight past the camera with a burned-in subtitle under it.',
        'the note to the operator'
      ),
      local(
        'films/mars-drop/md-strip',
        'A four frame contact strip from the film: the wide two-shot, the suited man mid-line, the other at the booster, and the suited man addressing camera.',
        'contact strip'
      ),
    ],
    stack: [
      { stage: 'Scene', tool: 'Written first, in full' },
      { stage: 'Episodic engine', tool: 'Showrunner' },
      { stage: 'Design', tool: 'Nano Banana 2, ChatGPT Image 2' },
      { stage: 'Motion', tool: 'Higgsfield' },
      { stage: 'Voice', tool: 'ElevenLabs' },
      { stage: 'Cut', tool: 'CapCut' },
    ],
    links: [
      { label: 'The full process sheet', href: 'https://talecrafters.studio/films/mars-drop' },
    ],
    films: [
      {
        host: 'youtube',
        videoId: 'SjxaPMoyBSo',
        title: 'Mars Drop, the film',
        note: 'One hundred and seven seconds, two characters, one location, no action. Watch the one who is not talking.',
        duration: '1:47',
        ratio: '16:9',
        poster: local(
          'films/mars-drop/md-poster',
          'The wide Mars colony frame: two figures in front of a landed rocket and a domed habitat.'
        ),
      },
    ],
  },

  {
    slug: 'feral',
    title: 'A can that walks off the billboard',
    client: 'FERAL',
    kind: 'Spec, self-initiated',
    year: '2026',
    problem:
      'I invented an energy drink so the label would have nowhere to hide, then gave it the hardest delivery I could think of.',
    brief: blocks(`Product photography is where generated work gets caught. Not on the lighting, which models are good at, but on the four square centimetres of printed label a buyer holds up to their face.

FERAL is the hard version of that on purpose. The wordmark is a halftone build with a magenta offset behind green type, repeated down the body, with a small black box under it reading YUZU STATIC. Getting that right once is luck. Getting it right across five sets, a night city, a creator's hand and an animated billboard is a pipeline.

Nobody asked for any of it, which is the point. There was no client to soften the test.`),
    constraint: blocks(`Build the can once and never build it again.

One master plate carries the label, the finish and the proportions, and every later frame is generated from that file rather than from a fresh prompt. Nothing gets retyped in post. If a word on the can stops being readable, the frame goes back to the plate, not to a retouching tool.`),
    built: blocks(`A master plate of the can, label-locked and handed over as a reusable file. Five product sets generated from it: water, smoke, school lockers, an ice tray and a square crop. Creator frames carrying one trained face through a corner shop, a car park, a night tram and a bathroom mirror.

Then the exam: an anamorphic billboard where the can breaks the frame of the board it is printed on, over a wet night city, with liquid and cut fruit crossing the edge.

A break-out board is the format that punishes any wobble in the object, because the viewer is being asked to read the same can as flat artwork and as a solid thing in the same second.`),
    how: blocks(`Phantom Set for the can, Identity Lock for the creator, run as two separate lines that meet only where a hand touches the product.

The plate is made first and nothing after that stage is generated from a text description of the can. The billboard is built the other way round: the board is set as a flat surface in a night street, the can is composited as the object breaking out of it, and the light on the street has to agree with the light on the can or the illusion dies inside a second.

Three gates. The label gate: zoom to full resolution and read every printed word, the wordmark, the halftone offset behind it and the YUZU STATIC box. The break-out gate: the part of the can that leaves the board has to cast and receive light from the street rather than from the artwork, or it reads as a sticker and the frame is dead. The drift gate: stack the five sets, flick through them, and the proportions, the finish and the type position have to sit still while everything around them changes.`),
    landed: blocks(`Spec, and labelled as spec everywhere it appears. Nobody paid for it and the brand does not exist.

It sits in this list because it states its own test and then submits to it: read every printed word on the can, at full resolution, in five sets and in a billboard pretending to be a physical object.`),
    hero: local(
      'spec/feral/billboard',
      'A night-city billboard for FERAL Yuzu Static: the can breaking out of the board in front of the artwork, lime slices and green liquid crossing the frame, graffiti reading STAY WILD on the hoarding below and lit towers behind.',
      'the billboard spot, key frame'
    ),
    gallery: [
      cms(
        'cdcf40829aaa3d81629c866aacd344791aabdb36',
        'A FERAL Yuzu Static can standing in shallow water, beaded with condensation, magenta and green vapour behind it and a splash around the base.',
        'hero, water set'
      ),
      cms(
        '0b866c88780206a2b34ef70dc067b3e281445771',
        'The same FERAL can on cracked black floor tiles in a corridor of school lockers, lit hard from one side.',
        'same plate, lockers'
      ),
      cms(
        '3f09923fd3ed63753c8bc2f1465e36a886af3849',
        'A square crop of the FERAL can in a metal tray of crushed ice, shot closer and lit with green light from behind.',
        'same plate, ice tray'
      ),
      cms(
        '1d9d6efc2d133c3fee2ab3e681ac9cb4b4399563',
        'A man with bleached green hair in a black tracksuit reading the side of a FERAL can in front of a lit shop fridge, carrier bags in his other hand.',
        'creator, corner shop'
      ),
      cms(
        '36cbc26761dbab17a4b33d43da469983380cf706',
        'The same man sitting on a kerb in a strip-lit car park at night, a FERAL can on the ground beside his neon trainers.',
        'creator, car park'
      ),
      cms(
        '739860636a8b8a6ca658b31c70984631d8c9a5ed',
        'The same man sprawled across a night tram seat with a FERAL can between his feet, neon strip lighting down the carriage behind him.',
        'creator, night tram'
      ),
      cms(
        '0dddc7fb93b0a4e2e43d77023faa323591d1179f',
        'The same man holding a FERAL can up in a bathroom mirror selfie, flash on, pink strip light above the cracked mirror.',
        'creator, mirror'
      ),
    ],
    stack: [
      { stage: 'Master plate', tool: 'Nano Banana Pro' },
      { stage: 'Sets', tool: 'Nano Banana 2, image to image from the plate' },
      { stage: 'Creator identity', tool: 'Higgsfield Soul ID' },
      { stage: 'Motion', tool: 'Higgsfield Cinema Studio' },
      { stage: 'Cut', tool: 'CapCut' },
    ],
    links: [{ label: 'The full FERAL shelf', href: '/spec/#feral' }],
    films: [
      {
        host: 'youtube',
        videoId: '5VgtoylYaFw',
        title: 'FERAL, anamorphic billboard',
        note: 'The can leaving the board over a wet night street, liquid and cut fruit crossing the frame. Same locked plate as the five product sets, which is the only reason the wordmark survives being read as artwork and as a solid object in the same shot.',
        duration: '0:08',
        ratio: '16:9',
        poster: local(
          'spec/feral/billboard',
          'The FERAL Yuzu Static can breaking out of a lit billboard over a wet night street.'
        ),
      },
    ],
  },
];

/* ------------------------------------------------------------------ order -- */

/**
 * The running order on the front page, by slug.
 *
 * The studio goes first because it is the thing every other row belongs to.
 * After that the client work keeps the order it already had, and the two
 * self-initiated pieces close the list, where the label change reads as a
 * change of section rather than as an interruption.
 *
 * A slug missing from this list is not dropped: it lands on the end, in the
 * order the dataset gave it. Adding a case study in the Studio therefore works
 * without editing this file.
 */
export const order = [
  'talecrafters',
  'mariposa',
  'ib-nl',
  'bike-barn',
  'bbda',
  'amino-alliance',
  'cocoon',
  'jarfis-property-group',
  'feral',
  'mars-drop',
];

/* ---------------------------------------------------------------- patches -- */

export const patch: Record<string, Patch> = {
  mariposa: {
    problem:
      'A restaurant on Rhodes needed a site, a film and photographs of dishes the camera never reached, and every plate had to survive being put in front of the person who ordered it.',
    landed: blocks(`Live at mariposa.restaurant, site and film together.

Every generated plate was signed off by somebody who cooks it before it shipped. That was the gate I cared about most, and it is the one no model can pass on my behalf.`),
    films: [
      {
        host: 'youtube',
        videoId: 'wr1CA07EN_o',
        title: '360 plate, built from one photograph',
        note: 'Grilled octopus over fava, shot once on the terrace at night. The camera in this clip never existed: the orbit is generated from that single still, which is the test the master plate has to pass before any of the menu work starts.',
        duration: '0:05',
        ratio: '9:16',
        poster: local(
          'mariposa/plate-360',
          'A frame from the 360 plate move: grilled octopus curled over yellow fava in a stone bowl on the terrace at night, a glass of white wine and lit planting behind it.'
        ),
      },
      {
        host: 'youtube',
        videoId: 'Ql-5EMhXTZQ',
        title: 'Restaurant showcase, from the room as it stands',
        note: 'The terrace at dusk, built out of the restaurant’s own photography and its map imagery rather than a set. The tables, the decking and the olive tree in the middle are where they actually are, so a diner who has eaten there recognises the room.',
        duration: '0:15',
        ratio: '9:16',
        poster: local(
          'mariposa/showcase',
          'A frame from the showcase: the Mariposa terrace from above at dusk, laid tables on dark decking around a mature olive tree.'
        ),
      },
    ],
  },

  'ib-nl': {
    problem:
      'A Dutch consultancy had to say it works out of the Netherlands and operates worldwide, with no voiceover and no cut.',
  },

  'bike-barn': {
    problem:
      'A dealership wanted hero films for two motorcycles without a location, a rider, a night permit or a rain machine.',
    brief: blocks(`Bike Barn sells motorcycles and needed hero pieces for two machines in particular. Something that would stop a thumb in a feed and still read as the actual bike on the actual floor.

The bikes are the product. Everything else in frame is set dressing, and set dressing is the part a dealership never has budget for.`),
    films: [
      {
        host: 'youtube',
        videoId: 'ijdaD3ktY8E',
        title: 'Indian Elite showcase, studio cut',
        note: 'A slow orbit of the Elite on a black studio floor. No studio was hired and no bike was moved. The badge, the gold pinstripe, the pannier lettering and the spoke count are the plate, held frame to frame while the light travels around it.',
        duration: '0:10',
        ratio: '16:9',
        poster: local(
          'bike-barn/showcase-poster',
          'The green and black Indian Elite on a dark reflective studio floor, three-quarter rear view, gold pinstriping and the ELITE lettering on the pannier catching a single overhead light.'
        ),
      },
    ],
  },

  bbda: {
    problem:
      'A data school needed a run of adverts that shared no visual language, week after week, without the brand dissolving in the process.',
    brief: blocks(`Big Blue Data Academy teaches data science to people changing careers. The audience is on a phone, mid-scroll, and has already learned to skip anything shaped like a course advert.

I ran their social strategy and their paid media, from the brainstorm to the finished creative. The ask was volume: not one film with a long approval cycle, but a run of short pieces that could go out week after week and keep working.`),
    built: blocks(`A content calendar that put pop culture next to data education, and the creative to fill it: promo films, LinkedIn and Meta posts, and the paid ad creative underneath both.

The frames below are from across the run. No two of them are trying to look like each other, which was the whole instruction.`),
    landed: blocks(`Delivered as a running programme rather than a campaign, and it outlasted the calendar it started on.`),
  },

  'amino-alliance': {
    problem:
      'A supplement brand needed creator ads and product stills at volume, with the same faces available again next month.',
    films: [
      {
        host: 'youtube',
        videoId: 'WJ3o7--M7f8',
        title: 'Consultant, testimonial cut',
        note: 'The office opening: a working professional, her own room, the pouch held where the label reads. Cut for the audience that wants the product explained by somebody who sounds like their colleague.',
        duration: '0:15',
        ratio: '9:16',
        poster: local(
          'amino-alliance/presenter-01',
          'A woman in a tan blazer holding an Amino Alliance pouch to camera in a bright office.'
        ),
      },
      {
        host: 'youtube',
        videoId: '7DNBe1uYHkY',
        title: 'Amsterdam, street cut',
        note: 'The same product, a different city and a different register. To camera on a canal, handheld, so the ad reads as a person who happens to be outside rather than a set that happens to be a canal.',
        duration: '0:14',
        ratio: '9:16',
        poster: local(
          'amino-alliance/presenter-02',
          'A man in a navy overcoat and grey scarf holding an Amino Alliance pouch to camera on an Amsterdam canal.'
        ),
      },
      {
        host: 'youtube',
        videoId: 'IDGUGwGrUCo',
        title: 'Athlete, park cut',
        note: 'The performance angle, mid-session, shaker in hand on a winter path. Same identity discipline, a different audience and a different ask at the end.',
        duration: '0:13',
        ratio: '9:16',
        poster: local(
          'amino-alliance/presenter-03',
          'A man in a charcoal running top holding an Amino Alliance shaker on a park path in winter.'
        ),
      },
    ],
  },

  cocoon: {
    problem:
      'A grid cyberattack that has never happened had to be explained to people who do not work on grids, from a grant document and nothing else.',
    films: [
      {
        host: 'youtube',
        videoId: 'xPn8yF-_3KY',
        title: 'Secure Energy Communities, pilot film',
        note: 'The objectives and the two milestones set as cards over the array, then a site tour framed inside a solar cell: the van, the drive to Halkidiki, the gate, the control cabin, the inverter and the logging kit, closing on the researcher in front of the rows. The one piece on this engagement built from footage rather than from the grant document.',
        duration: '1:48',
        ratio: '16:9',
        poster: local(
          'selene-cc/pilot-poster',
          'A technician in hi-vis working along a row of photovoltaic panels, with the Pilot Objectives card typed over the picture.'
        ),
      },
    ],
  },

  'jarfis-property-group': {
    // `place` in the dataset reads "7", which is the order field typed into the
    // wrong box. Bali is where the villas are and it is what the line is for.
    place: 'Bali, sold from the Netherlands',
    problem:
      'A property group needed a spokesperson who sounds like the person an investor speaks to next week, and two villas filmed that nobody was flying to.',
    built: blocks(`A set of vertical spots with a presenter talking straight to the viewer, and one short film cut around two real listings. The voice is cloned from his own recordings and carries every piece, so the delivery on screen matches the person on the call.`),
    landed: blocks(`Used across their international client base and as paid ad creative, where they outperformed the listing photography they were built from.`),
    films: [
      {
        host: 'youtube',
        videoId: 'xDGt2MejwJA',
        title: 'Spokesperson ad, vertical cut',
        note: 'To camera at a listed villa, phone on a tripod in shot, cloned voice on the read. The villa behind him is reconstructed from the stills already on the client’s own site, which is why the grade matches the listing photography instead of sitting a stop off it.',
        duration: '0:10',
        ratio: '9:16',
        poster: local(
          'jarfis/ugc-poster',
          'The presenter in a cream linen shirt speaking to camera beside a villa pool, a phone on a tripod set up facing him and planting up the wall behind.'
        ),
      },
    ],
  },
};
