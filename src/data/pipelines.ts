// The three pipelines that go on the site, transcribed from the sheets.
// Numbers 03, 05 and 07 of seven. The other four stay private.

export interface Stage {
  name: string;
  model: string;
  fixes: string;
  time: string;
}

export interface Gate {
  name: string;
  test: string;
  fail: string;
}

export interface Pipeline {
  id: string;
  num: string;
  title: string;
  mechanism: string;
  summary: string;
  loop: string;
  stages: Stage[];
  gates: Gate[];
}

export const pipelines: Pipeline[] = [
  {
    id: 'identity-lock',
    num: '03',
    title: 'Cast once, run forty',
    mechanism: 'The trained face',
    summary:
      'Train the face once. After that, forty advert variants arrive carrying the same creator, the same voice and the same energy at three in the morning on a bank holiday.',
    loop: 'Four days from casting brief to nine finished variants. Variant forty costs what variant ten did, because the cast already exists.',
    stages: [
      {
        name: 'Casting',
        model: 'Written by hand',
        fixes:
          'The persona gets written as a casting brief: age band, build, wardrobe, room, accent, energy, and the two things this person would never say on camera.',
        time: 'Half a day',
      },
      {
        name: 'Identity sheet',
        model: 'Nano Banana Pro, GPT Image 2',
        fixes:
          'Twenty or more stills of one face. Varied angles and expressions, one full-height frame, even lighting, no sunglasses and no crop through the jaw.',
        time: 'Two hours',
      },
      {
        name: 'Soul ID',
        model: 'Higgsfield Soul ID',
        fixes:
          'The sheet trains into an identity in about five minutes. It then carries across sessions, models and formats with no reference re-upload.',
        time: 'Five minutes',
      },
      {
        name: 'Plates',
        model: 'Popcorn',
        fixes:
          'The scene set gets built: kitchen, car, gym, desk. Backgrounds and outfits move while the likeness holds from frame to frame.',
        time: 'One day',
      },
      {
        name: 'Motion',
        model: 'Sora 2, Veo 3.1 or Kling',
        fixes:
          'Image to video inside one workspace. Handheld and phone-look presets keep the register believable, and Cinema Studio moves stay reserved for the hero cut.',
        time: 'One day',
      },
      {
        name: 'Voice',
        model: 'ElevenLabs IVC and PVC',
        fixes:
          'An instant clone needs one to three minutes of clean mono audio. The professional clone trains on thirty minutes at minimum, two to three hours for the strongest result, and holds emotional range far better.',
        time: 'One day, or two for the trained clone',
      },
    ],
    gates: [
      {
        name: 'Likeness gate',
        test: 'Stack the frames and flick through at speed. Drift in the jaw, eyes or hairline shows up immediately.',
        fail: 'Regenerate from the identity sheet. Never patch by inpainting.',
      },
      {
        name: 'Hand gate',
        test: 'Freeze every frame where fingers touch the product.',
        fail: 'Reroll the shot, or crop above the wrist.',
      },
      {
        name: 'Consent gate',
        test: 'Signed release for the voice and for the likeness reference.',
        fail: 'Nothing renders until both sit in the folder.',
      },
      {
        name: 'Disclosure gate',
        test: 'Synthetic creator labelled to platform policy and to client legal.',
        fail: 'Add the label, then release.',
      },
    ],
  },
  {
    id: 'phantom-set',
    num: '05',
    title: 'Ninety frames before lunch',
    mechanism: 'The master plate',
    summary:
      'Every frame lit the way you asked for, packaging type still readable at full zoom, and nobody had to book a stylist, a retoucher or a room with a cyclorama.',
    loop: 'Two rounds. Thirty frames for selection, then ninety frames and six clips. Layered files land in two working days.',
    stages: [
      {
        name: 'Plate',
        model: 'GPT Image 2, or a phone against white',
        fixes:
          'One clean product frame on a transparent background. Everything downstream references this file, so the bottle keeps its shape.',
        time: 'One hour',
      },
      {
        name: 'Label lock',
        model: 'GPT Image 2',
        fixes:
          'Small type, logos and packaging text hold through edits, written out as transparent PNGs, so the label stays readable while the set changes around it.',
        time: 'One hour',
      },
      {
        name: 'Set',
        model: 'Written as a specification',
        fixes:
          'Surface, backdrop, props and lighting get specified once and reused, never improvised per frame: one key, one fill, one practical, one stated colour temperature.',
        time: 'Half a day',
      },
      {
        name: 'Angles',
        model: 'Nano Banana Pro, GPT Image 2',
        fixes:
          'Hero three-quarter, macro texture, flat lay, in-hand, lifestyle and splash. One set, one lighting rig, six crops for six placements.',
        time: 'One day',
      },
      {
        name: 'Motion',
        model: 'Kling, Veo 3.1',
        fixes:
          'Image to video for the pour, the orbit, the lid lift and the cap reveal. Eight seconds each, cut down to two for paid.',
        time: 'Half a day',
      },
      {
        name: 'Formats',
        model: 'Photoshop, Figma Make',
        fixes:
          'Crop matrix per placement: 1:1 for the grid, 4:5 for the feed, 9:16 for Reels and TikTok, 16:9 for the site header, plus the marketplace sizes.',
        time: 'Two hours',
      },
    ],
    gates: [
      {
        name: 'Label gate',
        test: 'Zoom to full resolution and read every word on the packaging.',
        fail: 'Reroll from the master plate. Never retype in post.',
      },
      {
        name: 'Silhouette gate',
        test: 'Overlay the render on the master plate at forty per cent opacity.',
        fail: 'Any shift in outline kills the frame.',
      },
      {
        name: 'Light gate',
        test: 'One key direction and one shadow direction across the whole set.',
        fail: 'Regenerate the odd frame so the set stays honest.',
      },
      {
        name: 'Claim gate',
        test: 'No invented certification marks, awards or ingredient wording.',
        fail: 'Remove it, then render again.',
      },
    ],
  },
  {
    id: 'operator-stack',
    num: '07',
    title: 'The boring half that pays',
    mechanism: 'The ledger layer',
    summary:
      'Prompting is the easy part. What earns its keep is the directory structure, the skills, the connectors and the ledger telling you what every accepted asset actually cost.',
    loop: 'Half a day mapping how the work runs today, one to two weeks building, then a live walkthrough. Everything sits inside the client accounts.',
    stages: [
      {
        name: 'Map',
        model: 'A whiteboard and an owner per step',
        fixes:
          'Every step gets written down with an owner: what a person decides, what a model drafts, what a script handles alone at four in the morning.',
        time: 'Half a day',
      },
      {
        name: 'Skills',
        model: 'Claude Skills',
        fixes:
          'A skill is a directory holding a SKILL.md file plus references, templates and scripts. Its description stays in context and the body loads only when a task matches, so instruction sets stay out of the way until needed.',
        time: 'Two days',
      },
      {
        name: 'Code',
        model: 'Claude Code',
        fixes:
          'The repetitive end: batch renaming, render queues, spreadsheet updates, site copy edits and the client-facing pages themselves.',
        time: 'Three days',
      },
      {
        name: 'Connect',
        model: 'MCP servers',
        fixes:
          'The studio gets wired to the tools already in use: Higgsfield for generation, Drive for assets, Sheets for the tracker, Slack for approvals.',
        time: 'One day',
      },
      {
        name: 'Interface',
        model: 'Figma Make',
        fixes:
          'A pipeline turns into something the client can operate. React and Tailwind underneath, so a prototype can graduate into the real product.',
        time: 'Two days',
      },
      {
        name: 'Ledger',
        model: 'Sheets, a run log',
        fixes:
          'Naming convention, version tags, run log and cost per accepted asset. This is the part that makes a creative studio explainable to a finance team.',
        time: 'Ongoing',
      },
    ],
    gates: [
      {
        name: 'Human gate',
        test: 'A person signs off the brief and the final cut, at any volume.',
        fail: 'No exception has ever been worth it.',
      },
      {
        name: 'Rights gate',
        test: 'Model licence checked for commercial use under the client terms.',
        fail: 'Swap the model before rendering, never after.',
      },
      {
        name: 'Secret gate',
        test: 'No keys, client data or unreleased assets inside a prompt.',
        fail: 'Rotate the key and route through the connector.',
      },
      {
        name: 'Cost gate',
        test: 'Credit ceiling per asset agreed before a batch starts.',
        fail: 'The job halts and asks for a decision.',
      },
    ],
  },
];
