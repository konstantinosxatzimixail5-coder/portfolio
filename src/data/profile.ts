// Identity, positioning and the ways to reach a person.
//
// Everything else on this site is edited in Sanity. This file is not, and the
// reason is worth writing down: these are the strings that decide how the site
// reads before a visitor has scrolled anything. They change once a year, they
// have to agree with the CV and the LinkedIn headline word for word, and a
// half-saved draft in a Studio is a bad way to find out they disagree.
//
// `composeSettings` in src/lib/content.ts layers this over the siteSettings
// document, so the fields named here win and every other field still comes
// from the CMS.

export interface Contact {
  label: string;
  value: string; // what a reader sees
  href: string; // where it goes
  note?: string;
}

export const profile = {
  // The line above the headline, and the one Google prints under the title.
  role: 'AI-Enabled Marketing Designer, Creative Producer, Content and Growth Strategist',

  // Short enough for the nav strip and the footer, where the full line will not fit.
  roleShort: 'Marketing design, creative production, content and growth',

  // Country only. The work has never depended on which city the desk is in.
  base: 'Based in Greece, working internationally',
  baseShort: 'Greece',

  // One sentence, used in the meta description and in the structured data. It
  // has to survive being read aloud by an assistant with no page around it.
  //
  // GenAI, not the bare two letters. The site style rules out "AI" standing on
  // its own in body copy, and GenAI is the word this sentence was briefed with
  // in the first place. The hyphenated role line above is a fixed label and
  // keeps its own spelling.
  claim:
    'A storyteller at heart who builds GenAI growth systems and generative workflows into creative pipelines and marketing teams.',

  phone: {
    // E.164 for the machines, spaced for the humans, digits only for wa.me.
    e164: '+306946450024',
    display: '+30 694 645 0024',
    whatsapp: '306946450024',
  },

  // What someone is usually trying to say when they open the WhatsApp panel.
  // Offering the reason first is what stops a message box from staying empty.
  whatsappTopics: [
    {
      key: 'project',
      label: 'A project',
      draft:
        'Hello Konstantinos. I have a campaign coming up and I would like to talk about producing it.',
    },
    {
      key: 'pipeline',
      label: 'A pipeline for my team',
      draft:
        'Hello Konstantinos. I would like to talk about building one of your pipelines inside my team.',
    },
    {
      key: 'writing',
      label: 'Writing and scripts',
      draft: 'Hello Konstantinos. I read the writing samples and I would like to talk about a script.',
    },
    {
      key: 'other',
      label: 'Something else',
      draft: 'Hello Konstantinos. I found your portfolio and I would like to ask you something.',
    },
  ],

  // Read as a list, so it stays a fact about a person rather than a paragraph
  // pretending to be a personality.
  offDuty: ['travelling', 'screenwriting', 'training', 'reading'],
} as const;

export type Profile = typeof profile;

// The message a WhatsApp deep link opens with. Encoded here so the panel, the
// plain fallback link and the structured data cannot drift apart.
export const whatsappHref = (draft?: string): string => {
  const base = `https://wa.me/${profile.phone.whatsapp}`;
  return draft ? `${base}?text=${encodeURIComponent(draft)}` : base;
};
