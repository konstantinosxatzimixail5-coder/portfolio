// The films that are actually watchable, wherever they appear on the site.
//
// One list, keyed by what the clip belongs to, because a film on a case study
// and a film on the product shelf have the same duties: a poster the page can
// paint before anything loads, a running time a reader can see before
// committing, and an id nobody has to paste a full URL for.
//
// This adds to the CMS rather than standing in for it. A case study can still
// carry its own video in the Studio; anything here is played after it.
//
// Every player on the site is a facade. Nothing is requested from YouTube until
// somebody clicks, which is a performance decision and a consent one at once: an
// embed that runs on page load sets cookies for a visitor who never asked to
// watch anything. So the count here is an editorial limit, not a weight one, and
// the rule is the same as the writing shelf: a clip earns its place by carrying
// a line saying what it was for.

export interface Clip {
  host: 'youtube' | 'vimeo';
  /** The id, not a URL. */
  videoId: string;
  title: string;
  /** One or two sentences under the player. A clip without one is a showreel. */
  note?: string;
  /** Human running time, printed on the play button. */
  duration?: string;
  /** How it was cut. A vertical clip is held to a phone's width. */
  ratio?: '16:9' | '9:16';
  /** Manifest key and its alt text, same pair Frame takes everywhere else. */
  poster: string;
  posterAlt: string;
}

/**
 * Keyed by owner. `work:<slug>` matches a case study, `brand:<id>` a shelf
 * brand, `film:<slug>` an original, and `reel` is the cut itself.
 *
 * A key nobody looks up costs nothing and a lookup with no key renders no
 * player, so neither half has to know about the other.
 */
export const clips: Record<string, Clip[]> = {
  'work:mariposa': [
    {
      host: 'youtube',
      videoId: 'wr1CA07EN_o',
      title: '360 plate, built from one photograph',
      note: 'Grilled octopus over fava, shot once on the terrace at night. The camera in this clip never existed: the orbit is generated from that single still, which is the test the master plate has to pass before any of the menu work starts.',
      duration: '0:05',
      ratio: '9:16',
      poster: 'site/video/mariposa-plate-360',
      posterAlt:
        'A frame from the 360 plate move: grilled octopus curled over yellow fava in a stone bowl on the terrace at night, a glass of white wine and lit planting behind it.',
    },
    {
      host: 'youtube',
      videoId: 'Ql-5EMhXTZQ',
      title: 'Restaurant showcase, from the room as it stands',
      note: 'The terrace at dusk, built out of the restaurant’s own photography and its map imagery rather than a set. The tables, the decking and the olive tree in the middle are where they actually are, so a diner who has eaten there recognises the room.',
      duration: '0:15',
      ratio: '9:16',
      poster: 'site/video/mariposa-showcase',
      posterAlt:
        'A frame from the showcase: the Mariposa terrace from above at dusk, laid tables on dark decking around a mature olive tree.',
    },
  ],

  'work:bike-barn': [
    {
      host: 'youtube',
      videoId: 'ijdaD3ktY8E',
      title: 'Indian Elite showcase, studio cut',
      note: 'A slow orbit of the Elite on a black studio floor. No studio was hired and no bike was moved. The badge, the gold pinstripe, the pannier lettering and the spoke count are the plate, held frame to frame while the light travels around it.',
      duration: '0:10',
      ratio: '16:9',
      poster: 'site/video/bike-barn-showcase',
      posterAlt:
        'The green and black Indian Elite on a dark reflective studio floor, three-quarter rear view, gold pinstriping and the ELITE lettering on the pannier catching a single overhead light.',
    },
  ],

  'work:amino-alliance': [
    {
      host: 'youtube',
      videoId: 'WJ3o7--M7f8',
      title: 'Consultant, testimonial cut',
      note: 'The office opening: a working professional, her own room, the pouch held where the label reads. Cut for the audience that wants the product explained by somebody who sounds like their colleague.',
      duration: '0:15',
      ratio: '9:16',
      poster: 'site/video/amino-01',
      posterAlt: 'A woman in a tan blazer holding an Amino Alliance pouch to camera in a bright office.',
    },
    {
      host: 'youtube',
      videoId: '7DNBe1uYHkY',
      title: 'Amsterdam, street cut',
      note: 'The same product, a different city and a different register. To camera on a canal, handheld, so the ad reads as a person who happens to be outside rather than a set that happens to be a canal.',
      duration: '0:14',
      ratio: '9:16',
      poster: 'site/video/amino-02',
      posterAlt:
        'A man in a navy overcoat and grey scarf holding an Amino Alliance pouch to camera on an Amsterdam canal.',
    },
    {
      host: 'youtube',
      videoId: 'IDGUGwGrUCo',
      title: 'Athlete, park cut',
      note: 'The performance angle, mid-session, shaker in hand on a winter path. Same trained identity, a different audience and a different ask at the end.',
      duration: '0:13',
      ratio: '9:16',
      poster: 'site/video/amino-03',
      posterAlt: 'A man in a charcoal running top holding an Amino Alliance shaker on a park path in winter.',
    },
  ],

  'work:cocoon': [
    {
      host: 'youtube',
      videoId: 'xPn8yF-_3KY',
      title: 'Secure Energy Communities, pilot film',
      note: 'The objectives and the two milestones set as cards over the array, then a site tour framed inside a solar cell: the van, the drive to Halkidiki, the gate, the control cabin, the inverter and the logging kit, closing on the researcher in front of the rows. The one piece on this engagement built from footage rather than from the grant document.',
      duration: '1:48',
      ratio: '16:9',
      poster: 'site/video/cocoon-pilot',
      posterAlt:
        'A technician in hi-vis working along a row of photovoltaic panels, with the Pilot Objectives card typed over the picture.',
    },
  ],

  'work:jarfis-property-group': [
    {
      host: 'youtube',
      videoId: 'xDGt2MejwJA',
      title: 'Spokesperson ad, vertical cut',
      note: 'To camera at a listed villa, phone on a tripod in shot, cloned voice on the read. The villa behind him is reconstructed from the stills already on the client’s own site, which is why the grade matches the listing photography instead of sitting a stop off it.',
      duration: '0:10',
      ratio: '9:16',
      poster: 'site/video/jarfis-ugc',
      posterAlt:
        'The presenter in a cream linen shirt speaking to camera beside a villa pool, a phone on a tripod set up facing him and planting up the wall behind.',
    },
  ],

  'brand:feral': [
    {
      host: 'youtube',
      videoId: '5VgtoylYaFw',
      title: 'Anamorphic billboard',
      note: 'The hardest delivery for this can. A break-out board asks the viewer to read the same object as flat artwork and as a solid thing in the same second, so any wobble in the label or the light shows immediately. Same locked plate as the product sets above.',
      duration: '0:08',
      ratio: '16:9',
      poster: 'site/product/feral-billboard',
      posterAlt: 'The FERAL Yuzu Static can breaking out of a lit billboard over a wet night street.',
    },
  ],

  'brand:grain-01': [
    {
      host: 'youtube',
      videoId: 'laoB3HnoxHs',
      title: 'Anamorphic billboard',
      note: 'The camera coming through the board in daylight, which is the unforgiving version: no night city to hide the seam, and a translucent body with a visible circuit board and lens barrel that has to stay the same object as it crosses the edge.',
      duration: '0:08',
      ratio: '16:9',
      poster: 'site/product/grain01-billboard',
      posterAlt:
        'The GRAIN 01 camera bursting out of an acid-green city billboard in daylight under the line SHOOT OUTSIDE THE FRAME.',
    },
  ],

  'film:mars-drop': [
    {
      host: 'youtube',
      videoId: 'SjxaPMoyBSo',
      title: 'Mars Drop',
      note: 'One hundred and seven seconds, two characters, one location, no action. Watch the one who is not talking.',
      duration: '1:47',
      ratio: '16:9',
      poster: 'site/mars-drop/md-poster',
      posterAlt:
        'The wide Mars colony frame: two figures in front of a landed rocket and a domed habitat.',
    },
  ],

  reel: [
    {
      host: 'youtube',
      videoId: '96fsW49yKuo',
      title: 'Reel',
      // No duration on purpose. It was published as 1:30 and it is not that
      // length; rather than swap one guess for another, the play button says
      // nothing about it. Put the real figure in the Studio and it prints.
      ratio: '16:9',
      poster: 'site/reel-cover',
      posterAlt:
        'The showreel cover: an illustrated portrait of me pointing at camera over a night city, surrounded by an edit timeline, a clapperboard, a camera body and a growth chart, under the word SHOWREEL in yellow brush type.',
    },
  ],
};

export const clipsFor = (key: string): Clip[] => clips[key] ?? [];

/** The one clip a page shows on its own, if it has one. */
export const clipFor = (key: string): Clip | undefined => clips[key]?.[0];
