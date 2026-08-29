import type { WritingSample } from '../../lib/types';

// Client work, written for the Mariposa case study. The review figures on screen
// are the restaurant's own public numbers at the time of writing, not estimates.
export const mariposaVsl: WritingSample = {
  slug: 'mariposa-vsl',
  title: 'Mariposa, The Truck',
  category: 'scripts',
  kind: 'Client work',
  client: 'Mariposa, Theologos, Rhodes',
  year: '2026',
  format: '90-second VSL, plus a continuous voiceover script for the booth',
  standfirst:
    'A restaurant film that opens on a delivery lorry, because the argument is supply and everything warm has to be earned first.',
  meta: [
    { key: 'Register', value: 'Two worlds. Cold and procedural before 0:32, gold and slow after it' },
    { key: 'Length', value: '203 spoken words, with roughly fifteen seconds of deliberate silence' },
    { key: 'Call to action', value: 'WhatsApp, because that is already how the restaurant takes bookings' },
  ],
  body: [
    {
      t: 'lead',
      text: 'Everything before thirty-two seconds is cold, blue and procedural, shot like a documentary about supply chains. Everything after warms into gold and green and slows down. The voice is dry and unbothered throughout, warming only in the final third. Nobody in this film sounds like they need you to come.',
    },
    {
      t: 'beats',
      rows: [
        {
          time: '0:00 – 0:08 · Hook',
          spoken: 'At six this morning one truck stopped at eleven kitchens on this coast. Same crates. Same octopus. That’s your dinner tonight.',
          visual:
            'Dawn. Grey-blue, flat, no sun yet. Coast road. A refrigerated lorry pulls in, roller door up. Polystyrene crates through a back door. Then another door. Then another. Handheld, distant, procedural. Audio: the door, the engine, a trolley on concrete. No music. Hard cut on “tonight”.',
        },
        {
          time: '0:08 – 0:18 · Agitation',
          spoken: 'You booked eleven days. That’s twenty-two dinners. You’ll remember two of them.',
          visual:
            'The buffet at seven. Heat lamp. Sneeze guard. Tongs going back into a tray. A queue moving without urgency. Hold one beat past comfortable. Then a laminated menu on a strip table, sun-bleached, photographs of the food, four languages, a corner peeling. Nobody speaks. Room tone only.',
        },
        {
          time: '0:18 – 0:28 · The turn',
          spoken: 'Twenty-five minutes inland there’s a village called Theologos. No beach. No sign on the main road. The road goes up. Most people don’t.',
          visual:
            'From the back seat, over a shoulder. Tarmac narrowing, pine and olive closing in, the sea dropping away behind and to the left. Late light strobing through the trees. The grade begins to warm here and keeps warming for the rest of the film. The car slows at an unmarked turn and takes it.',
        },
        {
          time: '0:28 – 0:42 · The garden',
          spoken: 'Despoina was in her garden at the same six o’clock. She picks what she needs the morning she cooks it. Bed to pan is nine steps. Nobody on the coast road can say that.',
          visual:
            'Same dawn hour, entirely different world. Green, wet, low sun through leaves. Her hands in the beds, herbs cut and gathered into an apron. One continuous handheld shot from the bed to the kitchen door, a step counter ticking in the corner. It stops at nine as her hand sets the tomatoes on the board. One take, no cuts. A knife enters frame.',
        },
        {
          time: '0:42 – 0:54 · The menu',
          spoken: 'The menu is short and it changes. Which means we can’t promise you the dish you read about online. Every place with a laminated menu can. Ask yourself how.',
          visual:
            'Cut back to the laminated tourist menu, now in unforgiving daylight. Push in until the photographs go soft and slightly grotesque. Snap to a small handwritten card on a wooden table. Six lines on it, today’s date at the top in her handwriting. Then the walk-in of a normal kitchen, boxes stacked and labelled, and a beat of silence over it.',
        },
        {
          time: '0:54 – 1:06 · The kitchen',
          spoken: 'Salvatore came from Sicily. He rolls the pasta, and the bread leaves his oven every morning. Octopus over the coals. Zucchini from the beds, ten metres away, with crab.',
          visual:
            'Flour on a wooden bench. Hands working dough, not performing for camera. Bread out of the oven, steam, crust cracking as it lands. Octopus over open coals, close, the char taking. Then the plate: charred tentacle laid onto silken split-pea fava. Zucchini balls going into oil and coming out gold. Saffron risotto turning under scampi. First music enters here, one instrument.',
        },
        {
          time: '1:06 – 1:16 · Proof',
          spoken: 'Two hundred and eighty-eight people have written about this place. The word they keep using is gem.',
          visual:
            'The terrace filling as the light goes. Vine canopy overhead, lanterns coming on, plants pressing in on the tables. Guests mid-meal, unposed. Someone laughing with their head back. A hand refilling a glass. Screen text, plain and small, no starburst.',
        },
        {
          time: '1:16 – 1:22 · The occasion',
          spoken: 'People drive up here to ask a question, after the plates are cleared. They tend to hear yes.',
          visual:
            'Dusk. Wide, across the terrace, slightly too far away, as though you shouldn’t be watching. One table, two people. He’s talking. She’s listening. We never go closer. Cut on the moment his hand moves toward his pocket.',
        },
        {
          time: '1:22 – 1:30 · Tagline',
          spoken: 'Grown here. Cooked here. Gone by tomorrow. WhatsApp us the day you want. We set only a handful of tables each night, and dinner goes first.',
          visual:
            'Black. Then one still, held: the empty terrace at last light, lanterns lit, every table laid, nobody there yet. The tagline sets under the frame, then the logo. Music resolves and stops. Cut to black on the last frame. No fade.',
        },
      ],
    },

    { t: 'h', text: 'Why the tagline holds' },
    { t: 'quote', text: 'Grown here. Cooked here. Gone by tomorrow.' },
    {
      t: 'p',
      text: 'The third clause is what makes it work. Grown here and cooked here are claims any restaurant on the island will make. Gone by tomorrow is the one nobody else can, because it admits a limitation only a kitchen cooking from its own garden could survive admitting.',
    },

    { t: 'h', text: 'Why the call to action is a message and not a booking form' },
    {
      t: 'p',
      text: 'The scarcity is real and not manufactured, and the restaurant already takes bookings this way. The viewer is on a sun lounger holding the phone the message would be sent from, which puts the action one tap away instead of behind a form, a confirmation email and a decision to make later.',
    },
    {
      t: 'note',
      text: 'The silence works as hard as the copy. Most of it sits in the buffet hold at twelve seconds and on the terrace at seventy-eight, and both were written in, never found in the edit.',
    },
  ],
};
