// The front page in order, and the navigation that has to agree with it.
//
// The contents index used to be a list in the CMS, numbered by hand, and the
// numbering had already drifted once: the index said 05 Writing while the margin
// said 04. Numbering from position removes that failure mode entirely, so the
// `num` field in the Studio is no longer read.
//
// The CMS still owns the words. If Home page, Contents index has a row for a
// section, its label and its note win. These are the defaults for the sections
// that have no row yet, which is how a new section can ship without waiting for
// somebody to open a Studio.

export interface SectionDef {
  href: string; // the anchor, and the key the CMS row is matched on
  label: string;
  rail: string; // the slug set sideways down the left margin
  note: string; // may carry {count} and friends, filled at render
}

export const sections: SectionDef[] = [
  {
    href: '#reel',
    label: 'Reel',
    rail: 'Reel',
    note: 'Ninety seconds, and what my hand did on each piece',
  },
  {
    href: '#work',
    label: 'Selected work',
    rail: 'Selected work',
    note: '{count} client projects, brief to delivery',
  },
  {
    href: '#spec',
    label: 'Spec shelf',
    rail: 'Spec shelf',
    note: 'Invented brands, product sets and creator ads, labelled as spec',
  },
  {
    href: '#pipelines',
    label: 'Pipelines',
    rail: 'Pipelines',
    note: 'Seven of them, stage by stage, with the gates that stop a frame',
  },
  {
    href: '#captures',
    label: 'Captures',
    rail: 'Captures',
    note: 'Photoreal human frames, and what each one was built to break',
  },
  {
    href: '#writing',
    label: 'Writing',
    rail: 'Writing',
    note: '{samples} samples in full: scripts, feed writing and long form',
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

// The one destination the front page index cannot offer, because it is a page
// rather than a section of one. /pipelines/ and /captures/ are deliberately not
// here: both are linked from their own section on the front page, and a bar with
// eight items in it has stopped being navigation.
export const navExtras = [{ label: 'Writing', href: '/writing/', key: 'writing' }];

// Merge the two, keeping the order the Studio put its own links in.
//
// Matched on the label rather than on the href, because the collision that
// actually happens is one label pointing at two addresses: the Studio has
// Writing at /#writing and this file has it at /writing/. Comparing hrefs calls
// those different links and puts Writing in the bar twice, which is worse than
// either of them being the one that wins.
export function mergeNav(fromCms: any[] | null | undefined): any[] {
  const cms = fromCms ?? [];
  const seen = new Set(cms.map((l: any) => String(l?.label ?? '').trim().toLowerCase()));
  return [...cms, ...navExtras.filter((l) => !seen.has(l.label.toLowerCase()))];
}

// Compose the front page index: repo order and repo numbering, CMS words where
// the CMS has any. A row in the Studio for a section that no longer exists is
// ignored rather than fatal, because deleting a section from this file should
// not require a Studio edit before the site will build again.
export function composeSections(fromCms: any[] | null | undefined): Required<SectionDef & { num: string }>[] {
  const rows = new Map<string, any>((fromCms ?? []).map((c: any) => [c.href, c]));
  return sections.map((s, i) => {
    const row = rows.get(s.href);
    return {
      ...s,
      label: row?.label || s.label,
      rail: row?.rail || row?.label || s.rail,
      note: row?.note || s.note,
      num: String(i + 1).padStart(2, '0'),
    };
  });
}
