# kc-portfolio

Portfolio and reel site for Konstantinos Chatzimichail. Astro, static output, plain
CSS. No component library and no client framework. The only JavaScript that
ships is a small progressive enhancement for the pipeline strip and the section
index, and both of those work with scripting turned off.

Most of the words and most of the pictures are edited in Sanity. The Studio is a
second app in `studio/`, and it never touches the public site: the build reads
the dataset once, downloads the images, and writes plain HTML. Nothing about the
CMS reaches the browser.

The exceptions are in `src/data/`, and they are exceptions on purpose. See
[What lives in the repository instead](#what-lives-in-the-repository-instead).

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
npm run dev         # http://localhost:4321
npm run studio      # http://localhost:3333
```

### Without credentials

A checkout with no project id cannot read a single string and therefore cannot
render a single page, which makes the CSS unworkable for anyone who has not been
added to the dataset. So there is a fixture:

```bash
SANITY_FIXTURE=1 npm run dev
SANITY_FIXTURE=1 npx astro build     # note: astro build, not npm run build
```

`src/lib/fixture.ts` answers the real queries with the real shapes and
deliberately flat prose, over real committed pictures, so a page that renders
against it renders against production. Use `npx astro build` rather than
`npm run build`, because the `prebuild` image pass talks to Sanity and has
nothing to talk to.

It is opt-in and it fails closed. With the variable unset the build still refuses
to start without `SANITY_PROJECT_ID`, which is what a deploy host needs: a
deploy that has lost its environment variables must stop rather than quietly
publish placeholder prose that looks almost like the real thing.

To edit the content you also need to be logged in, once per machine:

```bash
npx sanity login
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve `dist/` as it will be served in production |
| `npm run top-up` | Fetch and build only the pictures missing from this repo. Runs on its own before `dev` and `build` |
| `npm run content` | `sync`, then `images`. The full pass, and the only one that deletes |
| `npm run sync` | Download every image in the dataset into `source-assets/cms/` |
| `npm run images` | Rebuild AVIF and WebP derivatives from `source-assets/cms/` |
| `npm run studio` | The Sanity Studio, locally |
| `npm run studio:deploy` | Put the Studio on a sanity.studio address |

### Changing a picture

Publish in the Studio. That is the whole requirement, for words and for
pictures both.

The AVIF and WebP versions are committed to this repository, so a deploy does
not download and convert sixty-four images to put out a one-word change. What
keeps that from turning into a manual step is `top-up`, which runs before every
build: it asks the dataset which pictures are in use, and fetches and converts
only the ones this repository does not already have. A build that needs nothing
adds about a second. Each genuinely new picture costs about another second.

So a new picture is live on the next deploy either way. It is still worth
running the full pass locally afterwards, because otherwise every future deploy
re-fetches the same pictures:

```bash
npm run content
git add public/img src/image-manifest.json
git commit -m "New frames for the spec shelf"
```

`top-up` only ever adds. Deleting a picture in the Studio leaves its files here
until `npm run content` prunes them, which costs a few unused files in a deploy
and never costs a broken page. Pruning on the host would mean a build that
cannot reach Sanity deletes the pictures it cannot currently see.

The dataset was first filled by a migration script that read the markdown and
TypeScript files this site used to keep its content in. Both the script and
those files were deleted once it had run, since the dataset is now the only
version anyone should edit. They are in the history at `bc48d3a` if the
provenance of a sentence is ever in question.


---

## What lives in the repository instead

Four kinds of content are edited here rather than in the Studio. The reason is
the same each time: they are documents with a shape, not fields with a value,
and a rich text box loses the thing that made them one.

| Where | What | Why not the CMS |
|---|---|---|
| `src/data/profile.ts` | Role line, location, phone, WhatsApp drafts, off-duty list | These have to agree with a CV and a LinkedIn headline word for word. Two editable copies of one sentence is how that stops being true |
| `src/data/pipelines.ts` | The four pipelines not on the front page | Each is a transcription of a sheet with a revision number on it. The honest version changes when the sheet changes |
| `src/data/writing/` | Every writing sample | A script has a direction column. Retyping one into a rich text box throws away the only thing that makes it a script rather than an essay |
| `src/data/captures.ts` | The photoreal captures, their alt text and what each proves | The pictures are committed here, so the words about them belong beside them |
| `src/data/faq.ts` | The questions and answers | Read by the page and by `/llms.txt` and the FAQ schema. One source or three answers that drift |
| `src/data/sections.ts` | Front page order, numbering, and the nav merge | Numbering is counted from position. It used to be typed, and the index and the margin had already disagreed once |

`src/lib/content.ts` composes the two. The CMS still owns the name, the
monogram, the domain, the footer, the navigation order, the case studies, the
reel, the spec shelf and the three pipelines on the front page. Where the two
overlap, the repository wins for exactly the fields listed above and the Studio
fields say so in their own descriptions, so nobody edits a box that does
nothing.

### Adding a writing sample

Write it as a module in `src/data/writing/`, then add it to the array in
`src/data/writing/index.ts`. The block types are in `src/lib/types.ts` and
`Prose.astro` throws on one it cannot set, so a typo in a block name fails the
build instead of quietly dropping a paragraph.

Two fields decide how a sample is presented and neither is decoration:

- **`kind`** is `Client work` or `Spec, self-initiated`, and it prints on the
  card, in the header and in the structured data. All three, every time.
- **`extractOnly`** prints a label saying the document belongs to the client.
  Set it on anything you are describing rather than reproducing.

Marking a sample `featured` puts it on the front page. Keep that to two. A front
page listing eight samples has stopped recommending anything.

### Adding a picture the CMS does not own

Drop the master in `source-assets/site/`, reference it as `site/<filename>`, and
run:

```bash
npm run images
```

Both image passes read that folder alongside `source-assets/cms/`. The one
difference is staleness: a Sanity key is a digest of the file, so a derivative
already on disk can be trusted, while a key like `site/capture-runway` is a name
somebody chose and the file behind it can change without the name changing.
`derive()` is told which it is and compares timestamps for the second kind, so
replacing a master rebuilds it rather than serving last week's frame under this
week's name.

---

## Being found, and being quoted

Two audiences read this site without ever loading its CSS.

- **`/robots.txt`** allows everything, including the crawlers that train models,
  and names each one individually rather than leaving it to the wildcard. That
  is a deliberate position: blocking training while allowing search is coherent
  for a publisher selling subscriptions and incoherent for a portfolio whose
  whole problem is that not enough people know the work exists. The next crawler
  to appear should have to be added on purpose.
- **`/llms.txt`** is a written index: the facts first, the links second, and the
  FAQ answers in full at the bottom. It is a community convention rather than a
  standard, and Google has said plainly that its own generative features do not
  read it. It earns its place in the agent layer instead, where a tool pointed
  at this URL fetches it, and where the failure it prevents is a model inferring
  the facts it could not find and stating the inference as confidently as a
  fact.
- **`/sitemap.xml`** is enumerated from the same sources the pages are built
  from, so it cannot be wrong by the second case study.
- **JSON-LD** is one `@graph` per page, built in `src/lib/schema.ts`. One graph
  rather than a stack of script tags, because the `@id` references only resolve
  inside a single graph and resolving is the point: it is what makes six nodes
  describe one person instead of six anonymous ones.

`public/og.jpg` is the link preview. It is generated by `scripts/build-og.mjs`
and committed, because that script renders text and needs Redaction and
Recursive installed as system fonts, which a deploy host does not have. Rebuild
it by hand when the role line changes and at no other time.

---

## Deploying

The build is a folder of static files. Any host that serves a directory will do.

**Build command:** `npm run build`
**Publish directory:** `dist`
**Node version:** 22 or newer
**Environment variables:** `SANITY_PROJECT_ID` and `SANITY_DATASET`

Both of those are public values. The project id is in every Studio URL and the
dataset name is printed on the front of the Sanity dashboard. No token belongs
on the host. A read token is only needed if you make the dataset private, and
nothing in this repository writes to it.

The domain is not in `astro.config.mjs`. It is the **Domain** field in Site
settings in the Studio, and it builds every canonical URL and every link preview
tag. Set it before the first deploy or social cards will point at a host that
does not exist.

Content edits do not redeploy by themselves. Publishing in the Studio changes
the dataset; it does not push to git, and the host only builds on a push.

To close that gap, make a Deploy Hook on the host (on Vercel: Settings, Git,
Deploy Hooks, branch `main`) and paste the URL it gives you into
`sanity.io/manage`, under API, Webhooks. Trigger on create, update and delete,
and set the filter to:

```
!(_id in path("drafts.**"))
```

That filter is the part not to skip. Without it every keystroke autosaving a
draft starts a build.

The hook URL is a secret in the sense that anyone holding it can start builds on
your account. It cannot read anything.

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

Split across both halves, and which half depends on where the pipeline appears.

The three on the front page are in the Studio, under **Pipeline**. The other
four are `src/data/pipelines.ts` and render on `/pipelines/`. Both go through
the same `Strip` component, so they are the same object with the same rules; the
repository copies simply carry five extra fields the front page has no room for
(the discipline, the desire, the objection, the stack and what lands in the
folder), and `Strip` ignores anything it was not given.

The front page counts what it shows, so moving one from the second list into the
Studio updates the sentence that says how many there are.

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
6. **Generated frames are labelled generated.** The captures shelf says so in
   its flag, in its opening, and in the line under the last frame. That
   labelling is the argument the shelf is making, not a disclaimer attached to
   it.
7. **A client's document is described, not republished.** The long-form samples
   on `/writing/` set `extractOnly`, which prints a label saying the document
   belongs to the client. Their performance figures stay theirs and are never
   restated as results of this site's author.
8. **Structured data never says more than the page.** `src/lib/schema.ts` only
   emits claims the visible page already makes. A rich result you cannot defend
   is worse than no rich result.

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

Add three to that list now that the site publishes generated files:

- Fetch `/robots.txt`, `/sitemap.xml` and `/llms.txt` from the built output and
  confirm the absolute URLs in them carry the real domain rather than a
  localhost left over from a fixture build
- Paste one page of each type into a structured data validator. The `@graph`
  either resolves to one Person or it does not
- Open the WhatsApp panel with scripting off. The four topics have to still be
  links that reach WhatsApp with a first line already written

Current state of those checks: 20 pages, 72 images, every one with alt text and
intrinsic dimensions. No contrast failures, no sideways scroll and no undersized
tap target at 320, 390, 768 or 1920, on the front page and on all four page
types added since. Every interactive element has a visible focus ring, every
page carries a valid JSON-LD graph, and with JavaScript disabled every pipeline
stage detail, every FAQ answer and every WhatsApp topic is still reachable.

Inline links inside a sentence are under 44px tall. That is the WCAG 2.5.8
inline exception and it is deliberate, so do not go chasing those in an audit.
