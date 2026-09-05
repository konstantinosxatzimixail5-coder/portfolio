// The front page in order, the navigation, and the section titles that are
// fixed labels rather than editable copy.
//
// Numbering is counted from position. It used to be typed into the CMS, and the
// index and the left margin had already disagreed once because of it.
//
// The navigation is defined here rather than in the Studio. The seven labels and
// their order are a design constraint with a test attached (seven items, no wrap
// between 320px and 1440px), and a bar that any editor can add an eighth item to
// is a bar that fails that test on a Tuesday afternoon with nobody watching.

export interface SectionDef {
  href: string; // the anchor, and the key a CMS row is matched on
  label: string;
  rail: string; // the slug set sideways down the left margin
  note: string; // may carry {count} and friends, filled at render
  // Sections whose heading is a fixed navigation label own it here. The CMS
  // still supplies the lede and the note underneath.
  heading?: string;
  // The same argument, applied to the index note. Four of these rows state a
  // fact the repository is the only thing that knows: how many projects are on
  // the shelf, how many pipelines are written out, how many writing samples
  // there are, and whether the reel is a ninety-second cut. The Studio kept
  // printing the old answer to all four long after the site had changed, so
  // those rows own their note here and the rest still come off the CMS.
  //
  // `npm run seed` writes these into the Studio as well, so the two agree
  // rather than one silently covering the other. Drop the flag once they do.
  ownNote?: true;
}

export const sections: SectionDef[] = [
  {
    // The cut plays here now, so the section is the reel rather than a link to
    // it, and the heading is the word itself. It used to say Ninety seconds,
    // which the cut is not.
    href: '#reel',
    label: 'Reel',
    rail: 'Reel',
    note: 'One cut, and what my hand did on each piece of it',
    heading: 'Reel',
    ownNote: true,
  },
  {
    href: '#work',
    label: 'Selected work',
    rail: 'Selected work',
    note: '{count} projects, brief to delivery',
    ownNote: true,
  },
  {
    href: '#films',
    label: 'AI Filmmaking Workflows',
    rail: 'Films',
    note: 'Three original shorts, with the sheets and the cuts behind them',
    heading: 'AI Filmmaking Workflows',
  },
  {
    href: '#product',
    label: 'Synthetic Product Ad Shoots',
    rail: 'Product',
    note: 'Invented brands, shot as ad campaigns, labelled as spec throughout',
    heading: 'Synthetic Product Ad Shoots',
  },
  {
    href: '#captures',
    label: 'Photoreal captures',
    rail: 'Captures',
    note: '{frames} generated human frames, and what each one was built to break',
  },
  {
    // The navigation says Pipelines, because seven short labels are what fits
    // across a phone. The section says what they are, the same way the films and
    // the product shelf do.
    href: '#pipelines',
    label: 'AI Creative Pipelines',
    rail: 'Pipelines',
    note: '{pipelines} of them, stage by stage, with the gates that stop a frame',
    heading: 'AI Creative Pipelines',
    ownNote: true,
  },
  {
    href: '#writing',
    label: 'Writing',
    rail: 'Writing',
    note: '{samples} samples in full, plus the studio blog',
    ownNote: true,
  },
  {
    href: '#about',
    label: 'About and contact',
    rail: 'About',
    note: 'The CV, the phone, and the fastest way to reach me',
  },
  {
    href: '#faq',
    label: 'Questions',
    rail: 'Questions',
    note: 'The eight that get asked before the first call',
  },
];

// Seven links, and the Reel button the header adds on its own. Writing and
// Product point at pages; the rest are sections of the front page.
export const navLinks = [
  { label: 'Work', href: '/#work', key: 'work' },
  { label: 'Films', href: '/#films', key: 'films' },
  { label: 'Captures', href: '/#captures', key: 'captures' },
  { label: 'Pipelines', href: '/pipelines/', key: 'pipelines' },
  { label: 'Product', href: '/product/', key: 'product' },
  { label: 'Writing', href: '/writing/', key: 'writing' },
  { label: 'About', href: '/#about', key: 'about' },
];

// Compose the front page index: repo order and repo numbering, CMS words where
// the CMS has any. A row in the Studio for a section that no longer exists is
// ignored rather than fatal, because deleting a section from this file should
// not require a Studio edit before the site will build again.
export function composeSections(
  fromCms: any[] | null | undefined
): (SectionDef & { num: string })[] {
  const rows = new Map<string, any>((fromCms ?? []).map((c: any) => [c.href, c]));
  return sections.map((s, i) => {
    const row = rows.get(s.href);
    return {
      ...s,
      // A section that owns its heading owns the index entry too. Letting the
      // Studio rename one of the two is how the contents list and the heading
      // twelve screens down end up disagreeing.
      label: s.heading ?? row?.label ?? s.label,
      rail: row?.rail || row?.label || s.rail,
      note: s.ownNote ? s.note : row?.note || s.note,
      num: String(i + 1).padStart(2, '0'),
    };
  });
}

// The heading a section prints above itself. A section that owns its heading
// keeps it whatever the CMS says. The navigation keeps its own short label: the
// bar has to hold seven of them across a phone, and "AI Creative Pipelines" is
// not a word that fits there.
export const headingFor = (href: string, fallback: string): string =>
  sections.find((s) => s.href === href)?.heading ?? fallback;
