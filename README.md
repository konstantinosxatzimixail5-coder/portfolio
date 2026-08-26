# kc-portfolio

Portfolio and reel site for Konstantinos Chatzimichail. Astro, static output, plain
CSS. No component library and no client framework. The only JavaScript that
ships is a small progressive enhancement for the pipeline strip and the section
index, and both of those work with scripting turned off.

Every word and every picture is edited in Sanity. The Studio is a second app in
`studio/`, and it never touches the public site: the build reads the dataset
once, downloads the images, and writes plain HTML. Nothing about the CMS reaches
the browser.

---

## First run

The content already lives in the Sanity dataset. All a fresh checkout needs is
the project id.

```bash
cp .env.example .env                # SANITY_PROJECT_ID, SANITY_DATASET
cp studio/.env.example studio/.env  # SANITY_STUDIO_PROJECT_ID, same value
```

Both files are gitignored. Neither needs a token while the dataset is public.

```bash
npm install
npm run sync        # downloads every image in the dataset
npm run images      # AVIF and WebP derivatives
npm run dev         # http://localhost:4321
npm run studio      # http://localhost:3333
```

To edit the content you also need to be logged in, once per machine:

```bash
npx sanity login
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | `sync`, then `images`, then a static build into `dist/` |
| `npm run preview` | Serve `dist/` as it will be served in production |
| `npm run sync` | Download every image in the dataset into `source-assets/cms/` |
| `npm run images` | Rebuild AVIF and WebP derivatives from `source-assets/cms/` |
| `npm run studio` | The Sanity Studio, locally |
| `npm run studio:deploy` | Put the Studio on a sanity.studio address |

The dataset was first filled by a migration script that read the markdown and
TypeScript files this site used to keep its content in. Both the script and
those files were deleted once it had run, since the dataset is now the only
version anyone should edit. They are in the history at `bc48d3a` if the
provenance of a sentence is ever in question.

---

## Deploying

The build is a folder of static files. Any host that serves a directory will do.

**Build command:** `npm run build`
**Publish directory:** `dist`
**Node version:** 22 or newer
**Environment variables:** `SANITY_PROJECT_ID` and `SANITY_DATASET`

Both of those are public values. The project id is in every Studio URL and the
dataset name is printed on the front of the Sanity dashboard. Neither token
belongs on the host: the read token is only needed if you make the dataset
private, and the write token is only for the seed.

The domain is not in `astro.config.mjs`. It is the **Domain** field in Site
settings in the Studio, and it builds every canonical URL and every link preview
tag. Set it before the first deploy or social cards will point at a host that
does not exist.

Content edits do not redeploy by themselves. Add a webhook in `sanity.io/manage`
pointing at the host's build hook if you want publishing in the Studio to put
the change live.

---

## Where to swap the reel link

The Studio, under **Reel**. Set **Video ID** and **Host**, and add a poster frame.

While the video id is empty the site does not pretend the cut exists. `/reel`
shows three frames from it and the running order underneath, and the home page
links through to that page instead of embedding a player.

Fill the id in and two things happen on their own: `/reel` renders a click to
play facade, and the home page badge changes to read "Play the cut". Nothing in
this repo needs editing.

The facade never loads the player until somebody clicks it. YouTube goes through
`youtube-nocookie`, Vimeo through `dnt=1`. That is deliberate and it is why the
page weight does not move when the reel goes live.

**Video budget: three embeds site wide, four at the outside.** Every embed is a
third party script and a tracking surface. If you are about to add a fifth, take
one out first. Nothing in the Studio stops you, so this one is on you.

---

## Adding a case study

In the Studio, **Case study**, New. The slug becomes the URL, so `new-client`
lands at `/work/new-client/`.

The five body sections are all required: Brief, Constraint, What I built, How I
built it, Where it landed. That shape is the same on every page and the schema
will not let you publish without all five. **Constraint** is the one that
matters. A case study without it reads as a portfolio; with it, it reads as work.

Alt text is required on every image, with twenty characters as the floor. That is
enforced in the schema, not by anyone remembering.

Then, locally:

```bash
npm run sync && npm run images
```

`sync` downloads anything new into `source-assets/cms/`, `images` writes AVIF and
WebP at 480, 960 and 1600 wide into `public/img/` and records the intrinsic width
and height of every source in `src/image-manifest.json`. That manifest is what
keeps the layout from jumping while images load, so it is generated, never edited
by hand. Both run automatically as part of `npm run build`, so a deploy picks up
new pictures on its own.

Both scripts prune. Remove an image in the Studio and the next sync deletes the
source and the derivatives with it.

### Check the crops

Gallery frames are cropped square so the rows line up. A square crop takes the
middle of a wide frame and throws the sides away, which is fine until the thing
that matters is at an edge. On this site that has already happened three times:
a wordmark cut to half a word, a painted sign cropped out of a saloon, and two
presenters cut across the eyeline.

Every image field in the Studio has a **hotspot**. Open the image, drag the
circle onto the thing that has to survive, and the crop holds it. That is the
same control the front page opener needs, since it is cropped to 1:2.

Look at each square frame before calling a case study done. If a logo, a face or
a line of type is clipped, move the hotspot. A site whose whole argument is that
labels survive cannot ship a cut label.

---

## Adding to the spec shelf

In the Studio, **Spec brand**. Each brand is a gallery with a short argument
attached, which is why it is not a case study.

Every brand needs a **What it proves** line saying which control gate it was
built to break. That line is the reason a made up brand is allowed on the site
at all, and the schema requires it. A brand without one is just decoration.

Everything on `/spec` is labelled from the **Flag** field on the Spec shelf
document, and it reads "Spec, self-initiated" in both places it appears. That
labelling is not styling, it is the honesty rule, and it should not be softened
to make the shelf read more like client work.

The lede counts its own numbers. Write `{brands}` and `{count}` and the build
fills in how many brands and how many frames are actually published.

---

## Editing the pipelines

In the Studio, **Pipeline**. Three of the seven are on the site in full, and the
front page counts them, so adding a fourth updates the sentence that says how
many there are.

Each one has stages and gates. A stage says what runs it, what gets fixed there
and how long it takes. A gate says what the test is and what happens on a fail.
The schema will not accept a pipeline with no gates. Keep the failure modes in.
A pipeline diagram with no failure modes is a sales chart.

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
   not a filename and not a keyword list. The schema enforces the length. It
   cannot enforce that the sentence is true, so read it against the picture.
4. **Client photography is labelled as client photography.** The Mariposa
   reference plates say `reference plate, shot on site` because that is what
   they are.
5. **Three embedded videos, four at the outside.** Every embed is a third party
   script and a tracking surface. Nothing in the Studio counts them for you.

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
