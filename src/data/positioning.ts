// The lines at the top of the front page, the caption on the portrait, the
// About paragraph, and one case study title.
//
// These sit in the repository and win over the Studio, which is the opposite of
// the rule everywhere else on this site. The reason is narrow: each one was
// rewritten to order and the dataset could not be written to at the time.
// `npm run seed` pushes them into the Studio; delete this file afterwards and
// the Studio owns them like everything else.

/** Plain paragraphs into the portable text shape RichText renders. */
const blocks = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((paragraph, i) => ({
      _type: 'block' as const,
      _key: `pb${i}`,
      style: 'normal' as const,
      markDefs: [],
      children: [{ _type: 'span' as const, _key: `pb${i}s`, text: paragraph, marks: [] }],
    }));

export const positioning = {
  headline: 'I run the strategy and the production line that answers it.',

  lede: 'Content and growth strategy, marketing pipelines, AI-enabled design and GenAI workflows, and the creative production that turns the plan into films, product sets and ads.',

  // The line under the lede used to end "a marketing team can run without me",
  // which sold the handover and undersold the person doing it.
  note: '',

  seoTitle: 'Konstantinos Chatzimichail, Creative Production & Growth Strategy',
  seoDescription:
    'Content and growth strategy, marketing pipelines, AI-enabled design and GenAI workflows, and the creative production behind them. Films, product sets and creator ads, out of Athens.',

  aboutBody: blocks(
    `Versatile professional bridging business strategy and media fluency, with hands-on experience across marketing, communications, and business development. Driven by curiosity and ambition, I possess an entrepreneurial and creative mindset that thrives on innovation and strategic thinking. I enjoy taking on messy, open-ended challenges and turning them into measurable results. Actively seeking dynamic opportunities to take on ambitious projects and do work that counts.`
  ),
};

/** The caption printed under the portrait on the front page. */
export const portraitLabel = 'Me, Myself and I';

/**
 * Case study titles this repository sets, by slug.
 *
 * One entry. The COCOON page was titled with the client's initials, which says
 * nothing to anybody who has not heard of the consortium, and the engagement was
 * four films rather than the one the old title implied.
 */
export const workTitles: Record<string, string> = {
  cocoon:
    'Four films for a Horizon Europe consortium: a pilot film shot on a Greek solar park, and an attack explainer',
};
