import type { WritingSample } from '../../lib/types';

// Ghostwritten feed posts for a RegTech client, in the client's voice. Reproduced
// here as text rather than as screenshots, because a screenshot of a post is not
// a writing sample, it is a picture of one.
export const linkedinPosts: WritingSample = {
  slug: 'linkedin-posts',
  title: 'Three feed posts in a founder voice',
  category: 'social',
  kind: 'Client work',
  client: 'RegTech and compliance',
  year: '2024',
  format: 'LinkedIn, long-form feed posts written against a brand voice file',
  standfirst:
    'Compliance is a category that punishes anyone who sounds bored by it. These are written to open on the reader, not on the product.',
  meta: [
    { key: 'Sector', value: 'Compliance, trade regulation and screening' },
    { key: 'Brief', value: 'Authority without stiffness. One idea per post, one question at the end' },
    { key: 'Constraint', value: 'Regulated category. Every claim traceable, nothing softened into vagueness' },
  ],
  body: [
    {
      t: 'lead',
      text: 'Three posts from a longer run. Each opens on something the reader already believes, then moves the belief one step, and closes on a question that is answerable rather than rhetorical.',
    },

    { t: 'h', text: 'One. Glossaries, the SEO weapon nobody defends' },
    {
      t: 'p',
      text: 'Most people think a glossary is a pile of words in alphabetical order. Alphabet soup for your website. But a well-built one quietly does two jobs at once, and both of them compound.',
    },
    {
      t: 'list',
      items: [
        'Search visibility, through schema markup and rich snippets',
        'Engagement, through in-content popovers that answer the term where the reader met it',
        'Lean content that targets the long tail without a single thin page',
        'Internal linking that keeps readers, and crawlers, exploring instead of leaving',
      ],
    },
    {
      t: 'p',
      text: 'So how do you build one without it being dull? Structured taxonomies. Filters by category and by letter. A rich question widget. Popovers that actually help rather than interrupt. And a rule that empty terms never publish, because one blank definition teaches a reader that the rest are not worth clicking either.',
    },
    {
      t: 'quote',
      text: 'Your glossary is a feature. Start treating it like one. Definitions should be brilliant, not boring.',
    },

    { t: 'h', text: 'Two. Criminals always find a way' },
    {
      t: 'p',
      text: 'As virtual economies thrive in games like Roblox, Fortnite and CS:GO, something quieter is expanding behind them. What used to be a practice reserved for banks and shell companies has moved into in-game currency, digital goods and loot boxes.',
    },
    {
      t: 'p',
      text: 'The exploited surfaces are the same four every time: in-game currencies, cryptocurrencies and non-fungible tokens, loot-based economies, and third-party marketplaces. They are attractive for the same reason they are fun. They are global, often anonymous, and largely unregulated.',
    },
    {
      t: 'p',
      text: 'In some cases stolen cards buy game currency, which is then sold at a discount to clean it. In others, rare digital goods become the laundering asset and move across platforms until nobody can name the first owner. Platforms are fighting back, but they are fighting a hydra. Restrict trading and two new routes open behind it.',
    },
    {
      t: 'p',
      text: 'The answer is not another feature toggle. It is a coordinated response with developers, regulators, platforms and players in the same room. We went into it properly in a white paper, and the conclusion was hard to avoid: this is no longer a fringe problem.',
    },
    {
      t: 'quote',
      text: 'What should regulation look like for virtual economies, and how do we protect them without ruining the thing people came for?',
    },

    { t: 'h', text: 'Three. Compliance is not about rules any more' },
    {
      t: 'p',
      text: 'For decades compliance officers were the quiet guardians. Keeping the company in check, making sure nobody coloured outside the legal lines. Now they are standing at the crossroads of automation and accountability, and the job description has not caught up.',
    },
    {
      t: 'p',
      text: 'The tooling is genuinely good. It scans thousands of documents in seconds, monitors patterns a person would miss, and flags anomalies before they become headlines. But greater power arrives with greater complexity, and the questions underneath are not technical ones.',
    },
    {
      t: 'list',
      items: [
        'How do we keep algorithmic decisions ethical, and who signs them?',
        'What happens to the human judgement the function has always run on?',
        'Are we training compliance officers for this, or quietly leaving them behind?',
      ],
    },
    {
      t: 'p',
      text: 'Organisations already seeing better risk management did not get it from procurement. They got it because compliance professionals led the change instead of receiving it.',
    },
    {
      t: 'quote',
      text: 'The future is not about replacing compliance officers. It is about redefining them as strategists, ethical stewards and proactive risk architects.',
    },

    {
      t: 'note',
      text: 'Written to a brand voice file: plain declaratives, one idea per paragraph, no hype adjectives, and every figure traceable to a source the client could hand a journalist.',
    },
  ],
};
