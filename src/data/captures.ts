// Photoreal human captures.
//
// Eight frames, generated, kept for one reason: each of them is hard in a
// specific and nameable way. A gallery of pretty faces proves nothing, because
// a pretty face at rest is the easiest thing these models make. Skin under
// unflattering daylight, hands doing skilled work, two people in one frame with
// a real eyeline between them, wet ground throwing light back up: those are the
// places a generated frame gives itself away, and those are what is on this
// shelf.
//
// Every one of these is labelled as generated wherever it appears. That is not
// modesty, it is the same honesty rule that puts "spec" on the product shelf.
//
// Order matters: the front page shows the first four, so the four hardest frames
// come first and the rest wait on /captures/. The late shift opens because the
// reflection in it is the hardest thing on the shelf and the one a sceptical eye
// goes to first.

export interface Capture {
  key: string; // manifest key
  title: string;
  alt: string;
  // What this frame was built to break. The reason it is on the site.
  proves: string;
  // The register it is imitating, since that is a deliberate choice per frame.
  register: string;
  focus?: string; // object-position when a crop is applied
}

export const captures: Capture[] = [
  {
    key: 'site/capture-late-shift',
    title: 'The late shift',
    alt: 'A woman in a black work fleece with a name badge rests her head against a bus window at night, holding a phone, her face reflected in the glass alongside the traffic and shop lights of the street outside.',
    proves:
      'A reflection that is a second performance. The face in the glass has to be the same face, at the correct angle, over a street that is genuinely behind her.',
    register: 'Night interior, fluorescent overhead, wide and close',
  },
  {
    key: 'site/capture-kitchen',
    title: 'The kitchen',
    alt: 'A man in a navy t-shirt pours from a glass coffee jug into a mug in a cluttered domestic kitchen while a young woman in a grey hoodie stands behind him with her arms folded, mid-sentence, looking at him.',
    proves:
      'Two people in one frame with a real relationship between them. He is not listening, she is not finished, and the eyeline goes somewhere.',
    register: 'Observational drama, practical lamp, handheld',
    focus: '45% 40%',
  },
  {
    key: 'site/capture-runway',
    title: 'Runway',
    alt: 'A model in a long charcoal overcoat walks a white runway in profile, lit hard from overhead trusses, with two banks of seated guests in near darkness on either side and the back of a photographer’s head in the foreground.',
    proves:
      'Depth with people in it. Two rows of a seated crowd falling away into the dark, each face resolved enough to be a person and none of them competing with the subject.',
    register: 'Fashion week, available light, long lens from the pit',
  },
  {
    key: 'site/capture-saddler',
    title: 'The stitch',
    alt: 'Close on two weathered hands at a workbench, one drawing a waxed thread taut and the other steadying folded blue-grey cloth with a thimble on the finger, a brass ring, an anchor tattoo on the forearm, tacks and a pencil scattered on the wood.',
    proves:
      'Hands doing skilled work. Ten fingers, a thimble, a thread under tension, and a grip that would actually hold the material it is holding.',
    register: 'Craft documentary, window light, shallow at f2',
  },
  {
    key: 'site/capture-sunday-league',
    title: 'Sunday league',
    alt: 'A young footballer in a blue kit with a sponsor name across the chest stands with her hands on her hips on an artificial pitch, hair damp with sweat, a grazed knee, a wheelie bin and three parked cars behind the fence.',
    proves:
      'Sponsor type on a moving garment, held legible across the chest, with the fabric creasing under it and the letters creasing with it.',
    register: 'Grassroots sport documentary, harsh midday sun, no fill',
    focus: '55% 35%',
  },
  {
    key: 'site/capture-crossing',
    title: 'The crossing',
    alt: 'A man in a soaked black jacket carrying a thin plastic bag strides across a wet high street at night, mid-splash, looking back over his shoulder, shopfronts and car headlights smeared in reflections across the road.',
    proves:
      'Wet ground at night. Every light source in the street has to appear twice, once above and once below, and the two have to agree.',
    register: 'Night exterior, sodium and shopfront light, 24mm low',
  },
  {
    key: 'site/capture-doorstep',
    title: 'The doorstep',
    alt: 'A woman in a grey t-shirt stands in a doorway holding up a dark supplement jar toward the camera, mid-sentence, with an unmade room and a mirror behind her.',
    proves:
      'The register a creator advert lives in. Unlit skin, a real doorway, and a product held at the angle a person actually holds one, not at the angle a product shot wants.',
    register: 'Creator testimonial, phone camera, no grade',
    focus: '52% 40%',
  },
  {
    key: 'site/capture-bus-stop',
    title: 'The wait',
    alt: 'An older man with grey stubble and a navy fleece stands near a bus shelter in low afternoon sun, looking down the road past the camera, a torn poster in the shelter behind him and two people walking up the pavement in the distance.',
    proves:
      'Age written into a face properly. Sun raking across skin that has weather in it, and a look that is aimed at something outside the frame.',
    register: 'Documentary portrait, late golden hour, 85mm',
  },
];

// A capture with no alt text would fail in Frame anyway, but it would fail at
// the page that used it rather than here, which is a worse place to learn.
{
  const thin = captures.filter((c) => c.alt.trim().length < 20);
  if (thin.length) {
    throw new Error(
      `Captures with missing or too-short alt text: ${thin.map((c) => c.key).join(', ')}`
    );
  }
}
