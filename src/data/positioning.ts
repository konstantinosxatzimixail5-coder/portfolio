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
  headline: 'I handle the strategy, the production and the line between them.',

  lede: 'My work covers content and growth, creative production and GenAI workflows. The output includes films, product sets, adverts and websites.',

  // The line under the lede used to end "a marketing team can run without me",
  // which sold the handover and undersold the person doing it.
  note: '',

  seoTitle: 'Konstantinos Chatzimichail, Creative Production and Growth Strategy',
  seoDescription:
    'Marketing design, content and growth strategy, GenAI workflows and creative production. Films, product sets, adverts and websites from Greece.',

  aboutBody: blocks(
    `My background covers marketing, communications, business development and filmmaking. I am happiest with a loose brief, a difficult production problem and responsibility for the finished piece.

I am looking for a role where I can own the work from first idea through delivery, learn from a sharp team and keep building things that people can watch, read or use.`
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
