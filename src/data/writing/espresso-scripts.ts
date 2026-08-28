import type { WritingSample } from '../../lib/types';

// Spec. One product, three angles, written so a test reads on the angle and on
// nothing else. The borrowed structures are named because a borrowed structure
// only works if you know exactly what you are borrowing and why it worked then.
export const espressoScripts: WritingSample = {
  slug: 'three-espresso-scripts',
  title: 'Three ninety-second scripts for one espresso machine',
  category: 'scripts',
  kind: 'Spec, self-initiated',
  year: '2026',
  format: '3 × 90 seconds, 9:16, captions burned in, 15s and 6s cutdowns marked',
  standfirst:
    'One product, three audiences, three borrowed structures. Written to be tested against each other, with only the angle changing.',
  featured: true,
  meta: [
    { key: 'Product', value: 'Mid-range home espresso machine, direct to consumer' },
    { key: 'Channels', value: 'Meta and TikTok primary, YouTube Shorts secondary' },
    { key: 'Objective', value: 'Purchase. Hook rate and hold rate as the early reads' },
    { key: 'Constraint', value: 'High category sophistication. No claim about café quality at home' },
  ],
  body: [
    {
      t: 'lead',
      text: 'Three scripts, one offer card, one price treatment, one end frame. Everything is held constant except the argument, so when the numbers come back they are telling you about the angle and not about the edit.',
    },

    { t: 'h', text: 'Script one, The Slap' },
    {
      t: 'spec',
      rows: [
        { key: 'Borrowed from', value: 'Tango, Orange Man, 1992. A physical metaphor stands in for the taste. Banned after children copied it, and sales rose by more than a third anyway.' },
        { key: 'Audience', value: 'Instant and pod drinkers, 28 to 45' },
        { key: 'Desire', value: 'To feel something at six in the morning' },
        { key: 'State', value: 'Problem aware' },
        { key: 'Mechanism', value: 'Sensory shock' },
      ],
    },
    {
      t: 'beats',
      rows: [
        {
          time: '0:00',
          spoken: 'You’ve never actually been woken up. You’ve only ever been warmed up.',
          visual: 'Hard cut in. Man mid-forties, kitchen, six in the morning, dark, holding a mug of instant. Dead eyes. No music.',
        },
        {
          time: '0:04',
          spoken: 'Eleven years of this. Brown water at body temperature. And I kept calling it coffee.',
          visual: 'He sips. Nothing happens on his face. The clock on the oven reads 06:04.',
        },
        {
          time: '0:11',
          spoken: 'Then somebody put this in my kitchen.',
          visual: 'Same kitchen, daylight. The machine on the counter. The portafilter locks in with a hard mechanical clunk, mic’d loud. The clunk carries the cut. No score.',
        },
        {
          time: '0:18',
          spoken: 'Silence, except the pump and the pour.',
          visual: 'Extreme close on the spouts. Extraction starts. Tiger-striping, steam. Held for six full seconds with no cut.',
        },
        {
          time: '0:25',
          spoken: 'Christ.',
          visual: 'He drinks. Beat. His eyes widen and he swears under his breath, half laughing.',
        },
        {
          time: '0:30',
          spoken:
            'That’s not a nice cup of coffee. That’s an assault. Nine bars of pressure through eighteen grams in twenty-six seconds. Your pod machine does four bars and calls it espresso.',
          visual: 'Straight to camera, machine visible behind him.',
        },
        {
          time: '0:44',
          spoken:
            'Nine bars. Ninety-three degrees. Twenty-six seconds. That’s the whole feature list. No app. No forty-one buttons. A pump and a grudge.',
          visual: 'Text stamp on screen carrying the three numbers. Product cut fast beneath it.',
        },
        {
          time: '0:56',
          spoken: 'You’ve been paying fifty cents a pod for the privilege of drinking a printer cartridge.',
          visual: 'Side by side: the pod puck, then the espresso puck knocked out. The difference is obvious with sound off.',
        },
        {
          time: '1:06',
          spoken: 'Free shipping. Sixty nights to send it back, and nobody ever has.',
          visual: 'Offer card. Price large. Free shipping, sixty-night return.',
        },
        {
          time: '1:18',
          spoken: 'Go and be unpleasant in the mornings. Link’s below.',
          visual: 'Back to him, mug up, small nod. Cut to black on the logo.',
        },
      ],
    },
    { t: 'note', text: 'Tagline: nine bars, no mercy. Fifteen-second cut is the opening, the extraction hold and the offer card. Six-second cut is the extraction hold, the swear, and the price.' },

    { t: 'h', text: 'Script two, Where’s the Crema?' },
    {
      t: 'spec',
      rows: [
        { key: 'Borrowed from', value: 'Wendy’s, Where’s the beef, 1984. An outraged elderly woman demands the substance she was promised. The line reached a televised presidential debate that year.' },
        { key: 'Audience', value: 'Disappointed owners of a cheap machine' },
        { key: 'Desire', value: 'Competence, and vindication' },
        { key: 'State', value: 'Solution aware' },
        { key: 'Mechanism', value: 'Comic authority' },
      ],
    },
    {
      t: 'beats',
      rows: [
        {
          time: '0:00',
          spoken: 'Where’s the crema?',
          visual: 'Yiayia, late seventies, glasses on a chain, holding a pod-machine cup at arm’s length like evidence. Kitchen table.',
        },
        {
          time: '0:04',
          spoken: 'Forty years I make coffee. This is a puddle. Who sold you this?',
          visual: 'She tilts the cup toward camera. Thin, pale, flat surface. A slight ring of bubbles.',
        },
        {
          time: '0:11',
          spoken: 'Grandson: the beans are really good though, they’re from — Yiayia: it’s not the beans.',
          visual: 'Cut to the grandson, thirties, defensive, holding a bag of expensive single-origin.',
        },
        {
          time: '0:19',
          spoken:
            'It’s never been the beans. Your machine cannot hold its temperature. It drops eight degrees the second the water hits.',
          visual: 'She puts the cup down and pushes his machine two inches away with one finger. Deadpan.',
        },
        {
          time: '0:30',
          spoken: 'Eighty-three degrees is not espresso. It’s tea with ambitions.',
          visual: 'Thermometer overlay on the cheap machine, falling. Then on the product, steady.',
        },
        {
          time: '0:40',
          spoken: 'This one holds ninety-three. That’s the whole difference. That’s the secret nobody sells you, because they can’t.',
          visual: 'She loads the portafilter herself, competently, without being shown how. Locks it in.',
        },
        {
          time: '0:52',
          spoken: 'Pump only.',
          visual: 'Extraction. Thick, dark, tiger-striped. Held five seconds.',
        },
        {
          time: '0:59',
          spoken: 'There. That’s crema. You could stand a spoon in it.',
          visual: 'She holds the new cup up beside the old one. Crema visible with sound off. The grandson stares.',
        },
        {
          time: '1:08',
          spoken: 'Grandson: Yiayia — Yiayia: it was never the beans.',
          visual: 'She drinks it. Nods once. Pushes the cheap machine off the edge of the table. It lands off screen.',
        },
        {
          time: '1:18',
          spoken: 'Sixty nights to send it back. Buy your grandmother a real one.',
          visual: 'Offer card, Yiayia in frame beside it, arms folded.',
        },
      ],
    },
    { t: 'note', text: 'Tagline: it was never the beans. Casting matters most here. The comedy only works if the woman is genuinely authoritative, and a performance that reads as cute kills it.' },

    { t: 'h', text: 'Script three, The Warning' },
    {
      t: 'spec',
      rows: [
        { key: 'Structure', value: 'A benefit delivered as a risk, so the seller appears to argue against themselves and the claim gets waved through.' },
        { key: 'Audience', value: 'People who already pay for good coffee out' },
        { key: 'Desire', value: 'Superiority, dressed as taste' },
        { key: 'State', value: 'Unaware. Thinks the café already solves this' },
        { key: 'Mechanism', value: 'Redefinition' },
      ],
    },
    {
      t: 'beats',
      rows: [
        {
          time: '0:00',
          spoken: 'Silence.',
          visual: 'Black frame. White text stamp, held in total silence for a full second: WARNING.',
        },
        {
          time: '0:01',
          spoken: 'Warning: side effects include hating every café you ever loved.',
          visual: 'Text completes across the frame. Hard cut to a man standing outside a café, holding a takeaway cup.',
        },
        {
          time: '0:06',
          spoken: 'I came here every morning for six years. I knew the staff’s names. I had a usual.',
          visual: 'He sips. Long pause. His face does almost nothing, which reads as worse than a reaction.',
        },
        {
          time: '0:15',
          spoken: 'Then I bought this thing, and now I can taste the machine they use. I can taste that the grinder’s been sat hot since eleven.',
          visual: 'He looks at the cup, then at the café, then puts the cup down on a windowsill and walks out of frame.',
        },
        {
          time: '0:26',
          spoken: 'Nobody warned me. So I’m warning you.',
          visual: 'His kitchen. Product on the counter. He is much calmer here. Portafilter, tamp, lock.',
        },
        {
          time: '0:33',
          spoken:
            'Nine bars. Ninety-three degrees, held the whole shot. Twenty-six seconds. Your café hits that number in the morning and drifts off it by lunch, because they’re pulling four hundred shots and nobody’s watching the gauge.',
          visual: 'Extraction, held. Then the text stamp with the three numbers.',
        },
        {
          time: '0:50',
          spoken: 'That’s a flat white at four in the afternoon. And that’s this, in my kitchen, for about thirty cents.',
          visual: 'Split screen: the café’s afternoon shot pale and thin, his shot thick and striped.',
        },
        {
          time: '1:00',
          spoken: 'I’ve saved a fair amount this year. That’s the boring part. The real part is I stopped settling.',
          visual: 'He sits down. Slightly rueful. Genuine.',
        },
        {
          time: '1:10',
          spoken: 'Free shipping. Sixty nights to change your mind, though you won’t.',
          visual: 'Offer card.',
        },
        {
          time: '1:20',
          spoken: 'Don’t say nobody told you.',
          visual: 'Back to black. The warning stamp returns, then the logo. Cut.',
        },
      ],
    },
    { t: 'note', text: 'Tagline: you can’t go back.' },

    { t: 'h', text: 'How the three get tested' },
    {
      t: 'list',
      items: [
        'Sound off first. All three carry meaning through the visual alone: the puck comparison, the two cups, the split screen. Captions burned in at 32px minimum, kept clear of the platform’s own interface.',
        'One variable per test. Same offer card, same price treatment, same end frame across all three, so the read is on the angle and nothing else.',
        'Budget split. Where’s the Crema takes the largest share, because that audience is already in market and currently failing. The Slap runs second for volume. The Warning gets the smallest share and the longest window, because an unaware audience converts slowly.',
        'Fatigue plan. When The Warning tires, keep the audience and switch register to overheard: other people complaining about the person who bought one.',
        'Claim check. The pressure, temperature and time figures are the only hard claims in any of the three, and they have to hold up under test before a single one runs.',
      ],
    },
    {
      t: 'note',
      text: 'Spec work. Product and pricing are illustrative. Written for vertical paid social at ninety seconds, with fifteen and six second cutdowns marked in each script.',
    },
  ],
};
