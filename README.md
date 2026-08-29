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

The content already lives in the Sanity dataset, and both example files carry the
project id, so copying them is the whole setup.

```bash
cp .env.example .env                # SANITY_PROJECT_ID, SANITY_DATASET
cp studio/.env.example studio/.env  # SANITY_STUDIO_PROJECT_ID, same value
```

Both copies are gitignored. Neither needs a token while the dataset is public.
The project id is `y9oyffjn` and it is not a secret: it appears in every Studio
URL and in the compiled Studio bundle, and on its own it grants read access to a
dataset whose entire contents are already a public website.

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
| `src/data/films.ts` | The two original shorts: spec rows, beat maps, cast tags, stills and the route | Each is a process document with a fixed shape, and the shot prompts have to be reproducible character for character |
| `src/data/faq.ts` | The questions and answers | Read by the page and by `/llms.txt` and the FAQ schema. One source or three answers that drift |
| `src/data/sections.ts` | Front page order, numbering, the seven navigation labels and the two fixed section titles | Numbering is counted from position; it used to be typed, and the index and the margin had already disagreed once. The bar is here too: seven labels in a fixed order is a constraint with a test attached |

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

### Adding a film

`src/data/films.ts`, then the page renders itself at `/films/<slug>/`. Ten
sections in a fixed order, and each one that depends on the process document
renders only when it has content, so a film with no sheet yet is short and true
instead of long and full of placeholders.

The shot prompts are the reason the page exists. They are transcribed character
for character, including timecodes and reference tags, and they get a copy
control each. A paraphrased prompt is not a prompt.

### Adding a pipeline page

Nothing to do. Every pipeline in `getAllPipelines()` gets a page at
`/pipelines/<slug>/`, whether it is edited in the Studio or transcribed here, and
`/pipelines/` lists all of them. The front page shows exactly one, named by
`HOME_PIPELINE` in `src/data/pipelines.ts`, and fails the build if that slug
matches nothing.

---

## Reading a document in place

`src/components/DocReader.astro` puts a PDF on its own detail page, readable
without leaving the site. It appears on detail pages only; on the front page a
document is a cover and a link.

**No PDF library.** The smallest credible one is several hundred kilobytes, on a
site whose entire shipped script is under two kilobytes. This is an `object` with
an `iframe` fallback and the browser's own viewer, which costs nothing over the
wire and is better than anything that could be shipped. The document itself is
not fetched until somebody presses the control.

What that trade costs, stated plainly: the page count, the zoom and the full
screen come from the viewer's chrome, so they cannot be restyled and they differ
a little between browsers. Measured cost of the component: **1,133 bytes** of
inline JavaScript on a page that renders it, and no library.

Below 760px no viewer mounts at all. A landscape sheet crammed into a phone
viewport is worse than the link that opens it, so the narrow case is the cover, a
line saying what the document is, and two controls. The download link is present
in every state, including failure.

A reader pointing at a missing file is the one thing that must never happen, so
`docExists()` in `src/lib/docs.ts` checks at build time and the section is
omitted until the file is there. Drop a PDF in and the next build grows the
section back.

Where documents go:

| Path | What |
|---|---|
| `public/docs/TwinMoons_Process_TaleCrafters.pdf` | The Twin Moons process document, eleven sheets |
| `public/docs/Skyrunner_Process_TaleCrafters.pdf` | The Skyrunner process document, eleven sheets |
| `public/docs/pipelines/<slug>.pdf` | One KC pipeline sheet, named for the pipeline slug: `voice-vault`, `split-at-source`, `identity-lock`, `multiplier`, `phantom-set`, `continuity-spine`, `operator-stack`. None of these are here yet |

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
**Environment variables:** `SANITY_PROJECT_ID=y9oyffjn` and
`SANITY_DATASET=production`

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

## Adding to the product shelf

In the Studio, **Spec brand**. Each brand is a gallery with a short argument
attached, which is why it is not a case study.

The section is called **AI Product Photography** and lives at `/product`. The old
`/spec` address redirects and should stay redirecting. The rename is the section
heading and the route only: every brand still carries its **SPEC** chip, because
that label is the honesty rule and not the branding, and softening it to make the
shelf read more like client work is the one edit nobody gets to make.

Every brand needs a **What it proves** line saying which control gate it was
built to break. That line is the reason a made up brand is allowed on the site
at all, and the schema requires it. A brand without one is just decoration.

Everything on `/product` is labelled from the **Flag** field on the Spec shelf
document, and it reads "Spec, self-initiated" in both places it appears. That
labelling is not styling, it is the honesty rule.

The lede counts its own numbers. Write `{brands}` and `{count}` and the build
fills in how many brands and how many frames are actually published.

---

## Editing the pipelines

Split across both halves. Three are in the Studio, under **Pipeline**. The other
four are `src/data/pipelines.ts`. `getAllPipelines()` merges them into one list
ordered by sheet number, and every page that lists or looks one up reads that,
so a reader has no reason to care which half a pipeline came from.

Both go through the same `Strip` component. The repository copies carry extra
fields the Studio has no schema for: the discipline, the desire, the objection,
the stack, what lands in the folder, the prompt architecture and the delivery
rhythm. `Strip` ignores anything it was not given, and each page section renders
only when it has content.

One appears on the front page in full, named by `HOME_PIPELINE`. Point it at a
slug nothing matches and the build stops, which is the right outcome: the
alternative is a front page that quietly loses its only diagram.

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
9. **House voice, checked by script.** British spelling. No em dashes. Never the
   bare word "AI" in body copy: write synthetic media, generative video, GenAI
   pipeline, or name the tool. The two section titles are the exception, since
   they are fixed navigation labels. No "not X, but Y". No "rather than". No
   invented metrics and no claims a document does not support. The banned word
   list is in the site update brief and enforced by the check below.

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

Add these now that the site publishes generated files and carries a voice rule:

- Run the voice check over the built output. Banned words, em dashes, American
  spellings, "rather than", "not X, but Y" and any bare "AI" outside the two
  section titles. Zero hits is the only passing score
- Resize the navigation from 320 to 1440 and confirm all seven items are visible
  at every width. It must never scroll sideways: a link behind a gesture nobody
  knows about is a link nobody uses
- Measure the front page height before and after any change that adds a section.
  Anything new is paid for by moving detail onto a detail page

- Fetch `/robots.txt`, `/sitemap.xml` and `/llms.txt` from the built output and
  confirm the absolute URLs in them carry the real domain rather than a
  localhost left over from a fixture build
- Paste one page of each type into a structured data validator. The `@graph`
  either resolves to one Person or it does not
- Open the WhatsApp panel with scripting off. The four topics have to still be
  links that reach WhatsApp with a first line already written

Current state of those checks: 29 pages, 94 images, every one with alt text and
intrinsic dimensions. No contrast failures and no undersized tap target at 390,
768 or 1440 across eleven page types. No sideways scroll from 320 to 2560. Every
interactive element has a visible focus ring, every page carries a valid JSON-LD
graph, and the voice check comes back clean. With JavaScript disabled every
pipeline stage, every shot block, every prompt, every question and every WhatsApp
topic is still reachable, and the copy controls stay hidden instead of lying.

Shipped JavaScript, whole site: **1,242 bytes** at most on any page, and no
external script file. That is the budget. Anything that needs a library needs a
better reason than the feature.

Inline links inside a sentence are under 44px tall. That is the WCAG 2.5.8
inline exception and it is deliberate, so do not go chasing those in an audit.
