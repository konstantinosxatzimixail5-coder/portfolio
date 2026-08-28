import type { WritingSample } from '../../lib/types';

// Long-form client documents. These are the client's property and run to well
// over a hundred designed pages each, so they are described and quoted rather
// than republished. `extractOnly` is what makes the page say so out loud.

export const complianceEbook: WritingSample = {
  slug: 'compliance-ebook',
  title: 'An ebook about a subject nobody volunteers to read about',
  category: 'longform',
  kind: 'Client work',
  client: 'RegTech and compliance',
  year: '2024',
  format: 'Long-form ebook, designed spreads, for a trade compliance platform',
  extractOnly: true,
  standfirst:
    'Export controls, sanctions screening and dual-use classification, written so a freight forwarder finishes it.',
  meta: [
    { key: 'Sector', value: 'International trade and transport compliance' },
    { key: 'Reader', value: 'Freight forwarders, carriers, customs teams, compliance leads' },
    { key: 'Job of the piece', value: 'Make an unloved obligation legible, then make the platform the obvious relief' },
  ],
  body: [
    {
      t: 'lead',
      text: 'Compliance writing fails in a specific way. It states the obligation, states the penalty, and never once describes the reader’s actual afternoon. This one was built the other way round: start with the afternoon, and let the obligation arrive as an explanation of why the afternoon is like that.',
    },
    {
      t: 'p',
      text: 'The structural problem was that international trade compliance is not one topic. It is at least eight, and every one of them has its own vocabulary: growing rule volume, sanctions and export controls, import controls, national and regional variation, documentation, licences and permits, the cost of getting it wrong, and a landscape that moves whenever international relations do. Presented as a list, it reads as a wall. The fix was to give each one a page of its own and a single governing sentence, so a reader can stop after any page and still have gained something.',
    },
    {
      t: 'h', text: 'The two ideas the document is built on',
    },
    {
      t: 'p',
      text: 'The first is that a single cargo generates multiple data streams, and that the work is not the checking, it is the cross-referencing. Special cargo, dual-use items, temporary embargoes and operator-specific rules each pull from a different source, and the risk is not that any one of them is hard. It is that there are eleven of them and one person.',
    },
    {
      t: 'p',
      text: 'The second is silos. Fragmented data and fragmented process make a complete view of compliance activity impossible, which is where the real exposure sits: not in a missed rule, but in nobody being able to see that the rule was missed. That framing let a legacy-systems section do actual work rather than read as a vendor complaining about incumbents.',
    },
    {
      t: 'quote',
      text: 'Compliance is not merely a legal requirement. It shapes a company’s reputation and its relationships with customers, suppliers and governments.',
    },
    {
      t: 'p',
      text: 'The commercial section was the one that needed the most discipline. Savings arguments in this category tend to be asserted. This one was built from named parameters with their sources printed beside them, so a reader could disagree with an assumption instead of having to disbelieve a conclusion. That is a slower page and a more persuasive one.',
    },
    {
      t: 'note',
      text: 'Client property. Described here rather than reproduced. The figures in the original are the client’s and their sources are printed in the document itself.',
    },
  ],
};

export const knowledgeAssistantBrochure: WritingSample = {
  slug: 'knowledge-assistant-brochure',
  title: 'A product brochure for a customs knowledge assistant',
  category: 'longform',
  kind: 'Client work',
  client: 'RegTech and compliance',
  year: '2025',
  format: 'Product brochure for a retrieval-augmented assistant, co-funded programme',
  extractOnly: true,
  standfirst:
    'Selling a conversational assistant to an audience professionally trained to distrust confident answers.',
  meta: [
    { key: 'Product', value: 'Retrieval-augmented knowledge assistant for customs and trade regulation' },
    { key: 'Reader', value: 'Customs authorities, authorised economic operators, trade finance teams' },
    { key: 'Constraint', value: 'A regulated reader who has to be able to check the answer' },
  ],
  body: [
    {
      t: 'lead',
      text: 'The hard part of this brochure was not explaining what the product does. It was writing for a reader whose entire professional instinct is to distrust a confident answer with no citation behind it.',
    },
    {
      t: 'p',
      text: 'So the argument never leads on capability. It leads on the shape of the current day: manual search across databases, websites and documents; hours spent filtering; accuracy that depends on how good the searcher’s keywords happen to be; and updates that arrive by newsletter, if they arrive. Every claim about the assistant is then written as the same row on the other side of that comparison, which lets a sceptical reader audit the promise line by line instead of taking it whole.',
    },
    {
      t: 'h', text: 'Where the writing had to be careful' },
    {
      t: 'p',
      text: 'Two places. The first is interpretation. Saying an assistant interprets regulation is a claim a compliance officer will not accept and should not. The section was rewritten so the assistant explains regulation in plain language for a practitioner to apply, and the practitioner stays the one applying it. The retrieval framework and the human in the loop are named as architecture, not as reassurance.',
    },
    {
      t: 'p',
      text: 'The second is the cost case. It is built from stated parameters, hours per analyst per week and cost per review, so it reads as arithmetic rather than as a promise. A reader who disputes the hours can substitute their own and still follow the page.',
    },
    {
      t: 'quote',
      text: 'Eliminate the need to navigate complex systems. Everything in one place, with conversational simplicity.',
    },
    {
      t: 'p',
      text: 'The pilot section is deliberately unglamorous: kick-off, scope, set-up, training, testing, evaluation, with a duration against each. In a category where the buyer’s real fear is a project that never ends, a short honest timeline is more persuasive than another benefit.',
    },
    {
      t: 'note',
      text: 'Client property, produced under a co-funded programme. Described here rather than reproduced.',
    },
  ],
};

export const caseStudyBrochure: WritingSample = {
  slug: 'compliance-case-study',
  title: 'A case study brochure for a logistics compliance rollout',
  category: 'longform',
  kind: 'Client work',
  client: 'RegTech and compliance',
  year: '2024',
  format: 'Case study brochure, seven outcome sections plus a commitments page',
  extractOnly: true,
  standfirst:
    'Seven outcomes, each one written as a mechanism first and a result second, so the result is checkable.',
  meta: [
    { key: 'Subject', value: 'A global logistics operator adopting an automated compliance platform' },
    { key: 'Structure', value: 'Seven outcomes, then the commitments the platform makes' },
    { key: 'Rule', value: 'No outcome appears without the mechanism that produced it' },
  ],
  body: [
    {
      t: 'lead',
      text: 'Most case studies are a results list with a logo on top. The reader cannot tell whether the number came from the product or from the fact that the client also hired eleven people that year, so they discount all of it.',
    },
    {
      t: 'p',
      text: 'This one is written under a single rule: every outcome section opens with the mechanism and closes with the result. Automated routine checks and policy-based assessment come first, and the efficiency figure follows from them. Transaction-based pricing comes first, and the cost figure follows from that. The reader is given the causal chain before the claim, which is the only way a number in this category earns anything.',
    },
    {
      t: 'h', text: 'The sections that carry it' },
    {
      t: 'list',
      items: [
        'Operational efficiency, through automated checks and dynamic risk profiling that lets low-risk transactions clear themselves',
        'Compliance cost, through a pricing model that does not charge per screening across a transaction lifecycle',
        'Accuracy, through goods and party matching that cuts the false positives staff were spending their week clearing',
        'Regulatory responsiveness, through a platform that absorbs a new restricted party list without a system overhaul',
        'Audit readiness, through trails and electronic dossiers that produce a regulator-ready report on demand',
        'Risk management, through beneficial ownership and adverse media screening that surfaces a problem before it escalates',
        'Customer satisfaction, as the downstream effect of shipments that stop being held up',
      ],
    },
    {
      t: 'p',
      text: 'The commitments page is the other half of the argument and it is written in a flatter register on purpose. After seven sections of narrative, a plain grid of what the platform undertakes to do reads as candour rather than as another sales page.',
    },
    {
      t: 'note',
      text: 'Client property, and the performance figures in it are the client’s own. They are described here as the structure of the document, and are not reproduced as results of mine.',
    },
  ],
};
