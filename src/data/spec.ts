// The spec shelf. Every brand here is invented. Nobody commissioned any of it,
// nobody paid for it, and none of these products exist. Each entry says what it
// was built to prove, because that is the only reason a fake brand earns a page.

export interface SpecShot {
  src: string;
  alt: string;
  label: string;
}

export interface SpecBrand {
  id: string;
  num: string;
  name: string;
  product: string;
  proves: string;
  note: string;
  pipeline: { label: string; href: string };
  shots: SpecShot[];
}

export const specBrands: SpecBrand[] = [
  {
    id: 'feral',
    num: '01',
    name: 'FERAL',
    product: 'Yuzu Static, canned energy drink',
    proves: 'One label held across five sets, then one creator held across three rooms',
    note: 'The wordmark on this can is a halftone build with a magenta offset behind green type, and a small black box under it reading YUZU STATIC. That is a lot of small structure to keep identical while the light, the surface and the room change underneath it. Five frames, five sets, one plate. The creator frames run the other line: one trained face, a corner shop, a car park and a bathroom mirror, all lit by whatever was in the room.',
    pipeline: { label: 'Phantom Set and Identity Lock', href: '/#pipelines' },
    shots: [
      {
        src: 'spec/feral/product-05',
        alt: 'A FERAL Yuzu Static can standing in shallow water, beaded with condensation, magenta and green vapour behind it and a splash around the base.',
        label: 'hero, water set',
      },
      {
        src: 'spec/feral/product-01',
        alt: 'The same FERAL can on a dark reflective surface with green smoke behind it and a ripple around the base.',
        label: 'same plate, smoke set',
      },
      {
        src: 'spec/feral/product-02',
        alt: 'The same FERAL can on cracked black floor tiles in a corridor of school lockers, lit hard from one side, a cigarette and a bottle cap on the floor beside it.',
        label: 'same plate, lockers',
      },
      {
        src: 'spec/feral/product-03',
        alt: 'The same FERAL can angled in a metal tray of crushed ice with dried lemon slices around it.',
        label: 'same plate, ice tray',
      },
      {
        src: 'spec/feral/product-04',
        alt: 'A square crop of the FERAL can in the ice tray, shot closer and lit with green light from behind.',
        label: 'same plate, square crop',
      },
      {
        src: 'spec/feral/ugc-01',
        alt: 'A man with bleached green hair in a black tracksuit reading the side of a FERAL can in front of a lit shop fridge, carrier bags in his other hand.',
        label: 'creator, corner shop',
      },
      {
        src: 'spec/feral/ugc-02',
        alt: 'The same man sitting on a kerb in a strip-lit car park at night, a FERAL can on the ground beside his neon trainers.',
        label: 'creator, car park',
      },
      {
        src: 'spec/feral/ugc-04',
        alt: 'The same man holding a FERAL can up in a bathroom mirror selfie, flash on, pink strip light above the cracked mirror.',
        label: 'creator, mirror',
      },
    ],
  },
  {
    id: 'knuckle',
    num: '02',
    name: 'KNUCKLE',
    product: 'Energy chews, four flavours',
    proves: 'The hardest label test on this shelf: a box, four wrappers and four moulded names',
    note: 'Four flavour names, four wrapper colours, a carton with three lines of small copy across it, and the flavour word moulded into the sweet itself. Every one of those has to read at full zoom, and none of it can be typed back in afterwards. Anything that fails the label gate goes back to the plate.',
    pipeline: { label: 'Phantom Set', href: '/#phantom-set' },
    shots: [
      {
        src: 'spec/knuckle/product-02',
        alt: 'A KNUCKLE Energy Chews carton standing behind four flavour wrappers, JAB in yellow, CROSS in orange, HOOK in red and KNOCKOUT in purple, each with a matching four-hole moulded sweet beside it.',
        label: 'range, full label test',
      },
      {
        src: 'spec/knuckle/product-01',
        alt: 'A single amber KNUCKLE chew sliding out of a black leather sleeve on a dark gritty surface, the flavour names stamped into each of its four holes.',
        label: 'hero, macro',
      },
      {
        src: 'spec/knuckle/fighter',
        alt: 'A boxer in a black vest and wraps standing in a dark warehouse, lit from behind by a warm practical.',
        label: 'campaign frame',
      },
    ],
  },
  {
    id: 'slab',
    num: '03',
    name: 'SLAB',
    product: 'Protein blocks in a blister tray',
    proves: 'A pack claim that has to stay readable, and two people in one frame',
    note: 'The pack is a pill tray with twelve protein blocks in it and a claim printed on the card: twenty grams of protein, twelve doses. A claim on a pack is the one thing a model will happily invent, so the claim gate applies here as hard as the label gate. The creator frames put two faces and four hands in the same shot, which is where most generated sets fall over.',
    pipeline: { label: 'Phantom Set and Identity Lock', href: '/#pipelines' },
    shots: [
      {
        src: 'spec/slab/product-01',
        alt: 'A close crop of the SLAB tray, pale protein blocks in foil wells, some sealed and some torn open, numbered along the card.',
        label: 'plate, macro',
      },
      {
        src: 'spec/slab/ugc-01',
        alt: 'A woman in a car park eating a SLAB block, holding the yellow tray up to camera with the pack claim facing forward.',
        label: 'creator, pack claim held to camera',
      },
      {
        src: 'spec/slab/ugc-03',
        alt: 'Two people in a car holding a SLAB tray between them, both mid-laugh, faces close together.',
        label: 'creator, two in frame',
      },
    ],
  },
  {
    id: 'grain-01',
    num: '04',
    name: 'GRAIN 01',
    product: 'Compact digital camera',
    proves: 'One face across three light sources: a bedroom, a club and a rooftop at sunset',
    note: 'This set exists to test drift. The same creator appears in warm string lights, in red club light with a flash, and in low sun on a roof. Nothing about the face is allowed to move between them, and the camera she is holding has to stay the same object in all three. Stack the frames, flick through at speed, and the jaw is where a fail shows first.',
    pipeline: { label: 'Identity Lock', href: '/#identity-lock' },
    shots: [
      {
        src: 'spec/grain-01/ugc-02',
        alt: 'A woman taking a mirror selfie in a bedroom strung with fairy lights, holding a small compact camera on an orange wrist strap.',
        label: 'bedroom, warm practicals',
      },
      {
        src: 'spec/grain-01/ugc-03',
        alt: 'The same woman laughing in a dark club stairwell, raising the compact camera to her eye, red light behind her.',
        label: 'club, flash and red spill',
      },
      {
        src: 'spec/grain-01/ugc-04',
        alt: 'The same woman on a rooftop at sunset, camera to her eye, city and air conditioning units behind her.',
        label: 'rooftop, low sun',
      },
    ],
  },
];
