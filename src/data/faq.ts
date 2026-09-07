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
    q: 'What does a GenAI marketing designer do?',
    a: 'I design the campaign, produce the assets and build the working system behind them. That can cover the angle, script, visual direction, film, stills and copy. I also document the process so a team can run the next piece without me in the room.',
  },
  {
    q: 'Do you replace a creative team, or work inside one?',
    a: 'I work inside creative teams and can also take ownership of a defined production. The documented stages and control checks make handover clear. A person still signs off the brief and final cut at every volume.',
  },
  {
    q: 'Are the images on this site photographed or generated?',
    a: 'The site contains client photography and generated frames. Each image says which, and every self-initiated project carries a spec label on its card and page.',
  },
  {
    q: 'How do you stop generated work from looking generic?',
    a: 'I begin with a source: a brand voice file, trained identity, master product plate or series bible. Written checks then decide which frames stay in the job. The rejected work goes back to its source plate.',
  },
  {
    q: 'What do you build with?',
    a: 'Claude Skills and Claude Code handle the operating layer. Higgsfield, Seedance, Veo and Kling cover motion; Nano Banana Pro and GPT Image 2 cover stills. I use ElevenLabs for voice and Figma Make for client-facing tools.',
  },
  {
    q: 'Do you write, or only produce?',
    a: 'I write direct-response and VSL scripts, hook batteries, long-form editorial and posts in a founder’s voice. The writing shelf publishes a full sample of each format.',
  },
  {
    q: 'Where are you based, and do you work with teams elsewhere?',
    a: `I work from ${profile.baseShort} with clients in several countries. The production systems support asynchronous reviews, shared source files and clear approval points.`,
  },
  {
    q: 'How does an engagement usually start?',
    a: 'We start with the brief, the constraint and the person who signs off the work. From there I can scope a single production or map a repeatable pipeline for your team. Send me a message with the job and its deadline.',
  },
];
