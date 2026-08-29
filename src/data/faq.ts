import { profile } from './profile';

// The questions that actually get asked, in the words they get asked in.
//
// This section exists twice over. It answers the reader who has scrolled the
// whole page and still has one thing outstanding, and it answers the assistant
// that has been asked "who is this person and can they do X", which increasingly
// arrives before the reader does. Both want the same thing: a direct answer in
// the first sentence, with the qualification after it rather than before.
//
// Rules for adding one. Ask it the way a client asks it, not the way a brochure
// asks it. Answer it in under eighty words. Never answer with a question, and
// never answer with a promise that has no mechanism behind it.

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: 'What does an AI-enabled marketing designer actually do?',
    a: 'Three things, usually in this order. Design the campaign, which means the angle, the script and the look. Produce it, which means the stills, the film and the copy that carry it. Then build the line that makes the next one cheaper than the last, so a team can run the work without me in the room.',
  },
  {
    q: 'Do you replace a creative team, or work inside one?',
    a: 'Inside one. The pipelines on this site are built to be handed over, and the control gates in them exist so that somebody else can run the line and know when to stop it. A person signs off the brief and the final cut at any volume, which is the one rule none of the seven pipelines is allowed to skip.',
  },
  {
    q: 'Are the images on this site photographed or generated?',
    a: 'Both, and each one says which. Generated frames are labelled as generated, spec work is labelled as spec on the card and in the header, and client photography is labelled as client photography. The labelling is the argument, not a disclaimer attached to it.',
  },
  {
    q: 'How do you stop generated work from looking generic?',
    a: 'By never starting from an empty prompt. Every line loads something first: a brand voice file, a trained identity, a master product plate, a series bible. And every line ends at a gate that can reject the output, which is the part most workflows leave out and the reason theirs drift.',
  },
  {
    q: 'What do you build with?',
    a: 'Claude Skills and Claude Code for the operating layer, connected through MCP servers to whatever the client already runs. Higgsfield, Seedance, Veo and Kling for motion. Nano Banana Pro and GPT Image 2 for stills. ElevenLabs for voice. Figma Make when a pipeline has to become something a client can operate.',
  },
  {
    q: 'Do you write, or only produce?',
    a: 'Write first. Direct response and VSL scripts, hook batteries, long-form editorial and ghostwritten posts in a founder’s voice. Samples of each are published on this site in full. Nothing here is offered on request.',
  },
  {
    q: 'Where are you based, and do you work with teams elsewhere?',
    a: `${profile.baseShort}, and yes. The work has never depended on which city the desk is in: the clients on this site are spread across several countries, and the pipelines were built to run asynchronously because that is the condition they were built under.`,
  },
  {
    q: 'How does an engagement usually start?',
    a: 'With a conversation about the constraint. The deliverable comes out of that. Then either a single piece of work with a fixed scope, or a mapping session that ends in a pipeline your team owns. Both start the same way, and the fastest route to one is a message.',
  },
];
