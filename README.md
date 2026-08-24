# kc-portfolio

Portfolio and reel site for Konstantinos Chatzimichail. Astro, static output, plain
CSS. No component library, no CMS, no client framework. The only JavaScript that
ships is a small progressive enhancement for the pipeline strip and the section
index, and both of those work with scripting turned off.

---

## Running it

```bash
nvm use            # if you have a .nvmrc set up
npm install
npm run dev        # http://localhost:4321
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve `dist/` as it will be served in production |
| `npm run images` | Rebuild AVIF and WebP derivatives from `source-assets/` |

---

## Deploying

The build is a folder of static files. Any host that serves a directory will do.

**Build command:** `npm run build`
**Publish directory:** `dist`
**Node version:** 20 or newer

On Netlify or Vercel, point the project at the repo and those three settings are
the whole configuration. On Cloudflare Pages, same three. There is no server, no
environment variable and no runtime.

Before the first deploy, set the real domain in `astro.config.mjs`:

```js
site: 'https://konstantinoschatzimichail.com',
```

That value builds the canonical URLs and the Open Graph tags, so it has to be
right or previews will link to the wrong host.

---

## Where to swap the reel link

One file: `src/data/site.ts`.

```ts
export const reel = {
  host: 'vimeo',        // 'vimeo' or 'youtube'
  id: '',               // the video id, nothing else
  poster: 'spec/feral/product-05',
  posterAlt: '...',
  title: 'Reel 2026, ninety seconds',
  duration: '1:30',
};
```

While `id` is an empty string the site does not pretend the cut exists. `/reel`
shows three frames from it and the running order underneath, and the home page
links through to that page instead of embedding a player.

Fill `id` in and two things happen on their own: `/reel` renders a click to play
facade, and the home page badge changes to read "Play the cut". Nothing else
needs editing.

The facade never loads the player until somebody clicks it. YouTube goes through
`youtube-nocookie`, Vimeo through `dnt=1`. That is deliberate and it is why the
page weight does not move when the reel goes live.

**Video budget: three embeds site wide, four at the outside.** Every embed is a
third party script and a tracking surface. If you are about to add a fifth, take
one out first.

---

## Adding a case study

Two steps, and the second one is optional if the images are already in.

### 1. Drop the images in

Put the source files anywhere under `source-assets/`, in a folder named after
the client:

```
source-assets/
  new-client/
    hero.jpg
    frame-01.jpg
```

Then run:

```bash
npm run images
```

That writes AVIF and WebP at 480, 960 and 1600 wide into `public/img/`, and
records the intrinsic width and height of every source in
`src/image-manifest.json`. The manifest is what keeps the layout from jumping
while images load, so it is generated, never edited by hand.

The manifest key is the path without the extension: `new-client/hero`.

> The script does not prune. If you delete a source file, delete its key from
> `src/image-manifest.json` too, or the site will keep asking for a file that
> is no longer built.

### 2. Write the markdown

Create `src/content/work/new-client.md`. The filename becomes the URL, so this
one lands at `/work/new-client/`.

```markdown
---
title: The piece
client: New Client
kind: Client            # "Client" or "Spec, self-initiated"
year: '2026'
place: Athens, Greece
order: 5                # lower numbers sort first on the home page
problem: One line. This is what shows on the card.

brief: |
  What they needed and who it was for.

constraint: |
  What made it hard. This is the section that matters most.

built: |
  What was delivered.

how: |
  Which pipeline, which gates, which tools. Name the failure modes.

landed: |
  Where it went.

hero: new-client/hero
heroAlt: A full sentence describing the picture for somebody who cannot see it.

gallery:
  - src: new-client/frame-01
    alt: Another full sentence.
    label: short slug under the frame
    focus: 50% 20%        # optional, see below

stack:
  - stage: Master plate
    tool: Nano Banana Pro

links:
  - label: example.com
    href: https://example.com/
---
```

Every field above is required except `gallery`, `links` and `place`. The schema
lives in `src/content.config.ts` and the build fails loudly if something is
missing, which is the intended behaviour.

**Two things that will break the build, both on purpose:**

- An `alt` containing a colon followed by a space has to be quoted, because YAML
  reads it as a key. Wrap the whole line in single quotes.
- A `hero` or `src` that is not in the manifest throws with the message telling
  you to run `npm run images`.

### 3. Check the crops

Gallery frames are cropped square so the rows line up. A square crop takes the
middle of a wide frame and throws the sides away, which is fine until the thing
that matters is at an edge. On this site that has already happened three times:
a wordmark cut to half a word, a painted sign cropped out of a saloon, and two
presenters cut across the eyeline.

The `focus` field on a gallery entry sets `object-position` for that one frame.
It takes the same two values CSS does, horizontal then vertical.

```yaml
focus: 90% 50%    # hold the right edge, e.g. a wordmark sitting off to one side
focus: 50% 20%    # pull the crop up, e.g. faces near the top of the frame
```

Open every new case study and look at each square frame before calling it done.
If a logo, a face or a line of type is clipped, set `focus` until it is not. A
site whose whole argument is that labels survive cannot ship a cut label.

---

## Adding to the spec shelf

The spec brands are not markdown. They live in `src/data/spec.ts`, because they
are galleries with a short argument attached and not case studies.

Each brand needs a `proves` line saying which control gate it was built to break.
That line is the reason a made up brand is allowed on the site at all. A brand
without one is just decoration.

Everything on `/spec` is labelled **Spec, self-initiated**, on the card and in
the header. That labelling is not styling, it is the honesty rule, and it should
not be removed to make the shelf read more like client work.

---

## Editing the pipelines

`src/data/pipelines.ts`. Three of the seven are on the site in full.

Each one has `stages` and `gates`. A stage says what runs it, what gets fixed
there and how long it takes. A gate says what the test is and what happens on a
fail. Keep the failure modes in. A pipeline diagram with no failure modes is a
sales chart.

---

## How the layout works

Four primitives in `src/styles/global.css` do most of the work:

- `.shell`, the page gutter and maximum width
- `.spread`, two columns, a narrow rail and the content
- `.rail`, the number and the vertical slug down the left
- `.section`, vertical rhythm and the rule above

Design tokens are in `src/styles/tokens.css`. Colour, type scale and spacing all
come from there.

`--fg-faint` is the dimmest text token on the site and it is set where it is
because it has to clear 4.5:1 against both `--ink` and `--ink-sunk`. Every mono
label, caption and rail slug uses it at eleven or twelve pixels. Darkening it
fails contrast across the whole site at once.

Type is two families, both self hosted and subset, both preloaded:

- **Redaction** for display
- **Recursive** for everything else. Its `MONO` axis is what gives the mono
  labels their cut, so the sans and the mono are one file, not two.

Neither family covers Greek. Greek text falls back to the system stack, which is
fine for the small amount of it on the site but is worth knowing before writing
a whole page in Greek.

---

## The rules this site is built on

These are not style preferences. They are the reason the site is credible.

1. **Spec work is labelled spec.** On the card, in the header, in the case
   study. Every time.
2. **No invented numbers.** No metrics, awards, budgets, team sizes or
   timelines that did not happen.
3. **Every image has real alt text.** A full sentence describing the picture,
   not a filename and not a keyword list.
4. **Client photography is labelled as client photography.** The Mariposa
   reference plates say `reference plate, shot on site` because that is what
   they are.
5. **Three embedded videos, four at the outside.**

---

## Checks worth running before a deploy

```bash
npm run build
npx serve dist          # or npm run preview
```

Then, on the built output:

- Resize from 320 to 2560 and confirm nothing scrolls sideways
- Tab through every page and confirm the focus ring is always visible
- Turn JavaScript off and confirm the pipeline strip and the section index still
  read top to bottom
- Look at every square gallery frame and confirm nothing important is cropped
- Zoom into the top left corner of every new source image and check for a
  watermark. Two got through on earlier passes, both from client video exports
- Read every alt string against the picture it describes. Counting characters
  catches an empty alt, it does not catch a wrong one
- Search the built HTML for the banned words, for em dashes and for the bare
  term AI. Zero hits is the only passing score
- Run Lighthouse on mobile

Current state of those checks: 9 pages, 60 images, every one with alt text and
intrinsic dimensions. No contrast failures, no sideways scroll and no undersized
tap target at 320, 768 or 1920. Every interactive element has a visible focus
ring. Lighthouse desktop is 100 across the board; mobile performance runs 92 to
99 with accessibility, best practices and SEO at 100 on every page.

Inline links inside a sentence are under 44px tall. That is the WCAG 2.5.8
inline exception and it is deliberate, so do not go chasing those in an audit.
