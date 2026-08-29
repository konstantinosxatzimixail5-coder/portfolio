// The four pipelines that are not on the front page.
//
// Three of the seven are in Sanity and render in full under the headline,
// because three is as many as a visitor will read standing up. The other four
// are transcribed here from the sheets, exactly as the sheets have them: the
// stage line, what runs each stage, the control gates, and the objection the
// line was built to answer.
//
// They live in the repository rather than the Studio for one reason. A sheet is
// a document with a revision number on it, and the honest version of "here is
// how the work runs" is the one that changes when the sheet changes, not the
// one somebody retyped into a form at half past six.
//
// Source: KC pipeline sheets 01, 02, 04 and 06, rev 2026.08.

import type { Pipeline } from '../lib/types';

// The one pipeline the front page carries in full. It is the product photography
// line, because the front page now runs it directly above the section it
// produces and the two argue for each other when they sit together. Every other
// pipeline is one row and one click away.
export const HOME_PIPELINE = 'phantom-set';

export const morePipelines: Pipeline[] = [
  {
    id: 'voice-vault',
    num: '01',
    title: 'Your voice, bottled',
    discipline: 'Content production, brand voice at volume',
    mechanism: 'The brief lock',
    summary:
      'Most studios sell posts by the batch. This sells the machine that makes them, with the founder’s voice written into a file every job loads before a word gets drafted.',
    loop:
      'Brand file and thirty ranked angles inside five working days. After that the calendar fills weekly and the rules sharpen themselves from what performed.',
    desire:
      'Founders want a queue that never empties, written in a voice that still sounds like the person who built the business.',
    objection:
      'Generated copy reads generic. The voice file, real customer phrasing and a human edit before anything ships are what break that pattern.',
    stack: ['Claude Skills', 'Claude Code', 'Nano Banana Pro', 'GPT Image 2', 'Figma Make', 'Higgsfield', 'Drive MCP', 'Zapier'],
    delivers: [
      'A brand voice skill, the directory and its rules, owned by the client',
      'An angle bank of thirty, ranked by how badly the buyer wants the outcome',
      'An editorial calendar mapped ninety days out',
      'Articles, feed posts, advert copy and hero visuals every week',
      'A monthly read on what the audience opened, saved and bought from',
    ],
    stages: [
      {
        name: 'Intake',
        model: 'Two hours with the founder',
        fixes:
          'A teardown of the offer, the buyer, the objections and every competitor advert running this quarter. All of it goes into one brand file.',
        time: 'Week one',
      },
      {
        name: 'Skill build',
        model: 'Claude Skills',
        fixes:
          'The brand file becomes a directory holding voice rules, banned words, proof points and formats. It loads on demand, so job forty sounds like job one.',
        time: 'Week one',
      },
      {
        name: 'Angle mine',
        model: 'Customer language',
        fixes:
          'Angles come out of reviews, sales calls, support threads and search queries. Thirty of them, ranked by desire strength, no two leaning on the same phrase.',
        time: 'Week two',
      },
      {
        name: 'Draft',
        model: 'The loaded rules, never an empty prompt',
        fixes:
          'Long-form for search and authority, short-form for the feed, tight copy for paid. Every claim earns its proof point within two sentences.',
        time: 'Week two',
      },
      {
        name: 'Visuals',
        model: 'Nano Banana Pro, GPT Image 2, Figma Make',
        fixes:
          'Nano Banana Pro takes diagrams and anything needing legible type. GPT Image 2 takes photoreal frames and dense layouts. The strongest become working pages.',
        time: 'Week two, then weekly',
      },
      {
        name: 'Ship and read',
        model: 'Calendar, UTM tags, a weekly read',
        fixes:
          'Hooks that performed go back into the voice rules, so the line sharpens itself without anyone writing a fresh brief.',
        time: 'Weekly, then monthly',
      },
    ],
    gates: [
      {
        name: 'Voice pass',
        test: 'Read against the banned list and the founder’s own writing samples.',
        fail: 'Rewrite, then log the miss so the rules improve.',
      },
      {
        name: 'Fact pass',
        test: 'Every figure traced to a source the client could hand a journalist.',
        fail: 'Cut the figure, or find the source.',
      },
      {
        name: 'Claim pass',
        test: 'Regulated wording checked against the client’s legal position.',
        fail: 'Soften it or drop it, before scheduling.',
      },
      {
        name: 'Swap test',
        test: 'Put a competitor logo on the piece. Does it still make sense?',
        fail: 'Kill it and rebuild from the customer phrase.',
      },
    ],
    prompts: [
      {
        num: '01',
        name: 'The brand skill, loaded before every job',
        body: `---
name: acme-voice
description: Voice, proof and format rules for ACME. Load before any
  copy, caption, script or landing page written for this brand.
---
VOICE: plain declaratives, British spelling, no hype adjectives
BANNED: [the 40 words the founder cannot stand]
PROOF: [three numbers we can defend] + [two named customers]
BUYER: [role] who fears [risk] and is measured on [metric]
FORMATS: post 90-120 words / article 900-1200 / advert 45 max`,
      },
      {
        num: '02',
        name: 'Angle mining, run once per quarter',
        body: `The brand file is loaded. Read the 40 reviews and 12 support threads
attached. Return 30 angles in a table: the angle, the exact customer
phrase behind it, the desire it channels, the awareness state (1-5),
and the single proof point that makes it credible.
Rank by desire strength. No two angles may lean on the same phrase.`,
      },
      {
        num: '03',
        name: 'The draft call',
        body: `Write [format] on angle [n]. Open on the customer phrase, never on
the category. One idea per paragraph. Each claim earns its proof point
within two sentences. Delete any line that could sit inside a
competitor's copy with only the logo swapped.`,
      },
    ],
    rhythm: [
      { key: 'Week one', value: 'Intake, teardown, brand file, skill built and tested' },
      { key: 'Week two', value: 'Angle bank, calendar, first drafts and first visuals' },
      { key: 'Weekly', value: 'Three long-form pieces, fifteen posts, ten visuals' },
      { key: 'Monthly', value: 'Performance read, rules updated, angles refreshed' },
      { key: 'Handover', value: 'The skill directory belongs to the client and runs without me' },
    ],
  },

  {
    id: 'split-at-source',
    num: '02',
    title: 'Fluent in three feeds',
    discipline: 'Social production for LinkedIn, Instagram and TikTok',
    mechanism: 'The three-voice split',
    summary:
      'The same post pasted across three platforms dies in two of them. Here the idea splits at the source, so each feed receives something built for its own audience and its own scroll speed.',
    loop:
      'Angle to scheduled assets in forty-eight hours. Three LinkedIn, five Instagram and seven TikTok a week, all of them out of one angle bank.',
    desire: 'Founders want a presence on three platforms without hiring three specialists to feed them.',
    objection:
      'Cross-posting looks lazy because it is. Splitting at the idea stage costs an extra hour and returns three assets that belong where they land.',
    stack: ['Claude Skills', 'Higgsfield Soul ID', 'Nano Banana Pro', 'GPT Image 2', 'Figma Make', 'ElevenLabs', 'Cinema Studio', 'Claude Code'],
    delivers: [
      'A weekly asset pack sorted by platform and ready to schedule',
      'A hook bank with three openings per asset',
      'Hashtag tiers, broad, niche and brand, refreshed monthly',
      'Cover frames, captions and alt text',
      'A monthly read with the winners queued for reuse',
    ],
    stages: [
      {
        name: 'Idea bank',
        model: 'One angle, one customer phrase',
        fixes:
          'The angle enters carrying its proof point and the desire underneath it, so all three versions argue the same case in three accents.',
        time: 'Monday',
      },
      {
        name: 'Split',
        model: 'Three native briefs',
        fixes:
          'LinkedIn receives the argument and the number. Instagram receives the frame and the craft. TikTok receives the opening second and a reason to stay for the next twelve.',
        time: 'Monday',
      },
      {
        name: 'Assets',
        model: 'Nano Banana Pro, Figma Make, Higgsfield',
        fixes:
          'Carousels through the still tools, vertical video through Higgsfield, with a trained identity holding the same face across every clip in the set.',
        time: 'Tuesday and Wednesday',
      },
      {
        name: 'Hooks',
        model: 'Three openings each',
        fixes:
          'One for the buyer who knows the category, one for the buyer who only knows the problem, one for the buyer who has never named either.',
        time: 'Wednesday',
      },
      {
        name: 'Schedule',
        model: 'Cadence, tiers and alt text',
        fixes:
          'Posting rhythm per platform, hashtags in three tiers, captions written for the surface they appear on and never pasted sideways.',
        time: 'Thursday',
      },
      {
        name: 'Read',
        model: 'Saves, watch time, replies',
        fixes:
          'Saves and sends on LinkedIn, watch time and rewatches on TikTok, profile taps on Instagram. Winners come back six weeks later under a new opening.',
        time: 'Friday',
      },
    ],
    gates: [
      {
        name: 'Native check',
        test: 'Read it inside the app on a phone, before it reaches a scheduler.',
        fail: 'Rebuild for that platform. Never trim the same file.',
      },
      {
        name: 'Hook test',
        test: 'The first two lines on LinkedIn, the first second and a half on TikTok.',
        fail: 'Rewrite the opening and keep the body.',
      },
      {
        name: 'Face check',
        test: 'One identity and one wardrobe rule across the whole set.',
        fail: 'Regenerate from the trained identity.',
      },
      {
        name: 'Sound check',
        test: 'Commercially cleared audio only, licence noted in the tracker.',
        fail: 'Swap it from the commercial library before upload.',
      },
    ],
    prompts: [
      {
        num: '01',
        name: 'LinkedIn carousel',
        body: `SLIDES: 9. Slide 1 is the hook, slide 9 is the ask.
OPENING: two lines maximum, since the rest sits behind the fold
SLIDE RULE: one idea, six words of headline, one supporting line
PROOF: [number] on slide 4, sourced on slide 9
DESIGN: 4:5, house palette, geometric sans, no stock imagery
CAPTION: the argument in 90 words, question at the end
TAGS: #b2bmarketing #contentstrategy #creativedirection`,
      },
      {
        num: '02',
        name: 'TikTok script skeleton',
        body: `0.0-1.5s HOOK: [the number or contradiction nobody expects]
1.5-4s STAKE: what it costs to get this wrong
4-9s PROOF: one demo, one screen, one face
9-14s TURN: deliver the thing they came for, early
14-18s ASK: [single verb] + [where]
SHOOT: 9:16, handheld preset, caption on every beat,
  brand mark held back until second 10
TAGS: #smallbusiness #adcreative #behindthescenes`,
      },
      {
        num: '03',
        name: 'Instagram caption and hashtag tiers',
        body: `LINE 1: the customer phrase, exactly as they said it
LINES 2-4: context, then one question worth answering
TIER 1 broad (2): #marketing #creativestudio
TIER 2 niche (4): #generativevideo #brandfilm #productphotography
  #ugccreator
TIER 3 brand (2): [house tag] [campaign tag]
ALT TEXT: describe the frame for someone who cannot see it`,
      },
    ],
    rhythm: [
      { key: 'Monday', value: 'Angle chosen, three briefs written and approved' },
      { key: 'Tuesday', value: 'Stills, carousels and character plates generated' },
      { key: 'Wednesday', value: 'Video renders, captions, hook variants' },
      { key: 'Thursday', value: 'Approval, scheduling, tags and alt text' },
      { key: 'Friday', value: 'Last week read, winners queued for a second run' },
    ],
  },

  {
    id: 'multiplier',
    num: '04',
    title: 'Nine lives for one article',
    discipline: 'Repurposing, one article into nine assets',
    mechanism: 'The single source split',
    summary:
      'The article found its readers and stopped. Those same twelve hundred words carry a motion infographic, a podcast episode, three shorts and a carousel, every one of them pointing home.',
    loop:
      'Three working days per source piece. Four source pieces a month, and the beat sheets stay live so a rewritten article re-runs instead of restarting.',
    desire:
      'Marketing leads sitting on an idle library want reach out of work the business already paid for once.',
    objection:
      'Repurposing usually means the same text inside a different box. A beat sheet, motion and a real voice turn it into a different piece with the same argument.',
    stack: ['Claude Skills', 'Nano Banana Pro', 'GPT Image 2', 'Higgsfield', 'ElevenLabs', 'Figma Make', 'Kling', 'Claude Code'],
    delivers: [
      'A motion infographic of two to three minutes, in 16:9 and 9:16',
      'A podcast episode of eight to fifteen minutes, with cover art',
      'Three vertical shorts cut from the strongest beats',
      'A carousel, a thread, a newsletter block and four quote cards',
      'The beat sheet, kept on file and reusable when the article is updated',
    ],
    stages: [
      {
        name: 'Extract',
        model: 'Claims, figures, quotes',
        fixes:
          'The spine comes back: the argument, the figures underneath it, the four lines worth quoting, and the one idea that deserves a whole video. Unsupported claims get flagged, never smoothed over.',
        time: 'Day one',
      },
      {
        name: 'Board',
        model: 'Eight to twelve beats',
        fixes:
          'Each beat carries a visual instruction. One statistic per beat, and no beat repeating the shape of the last.',
        time: 'Day one',
      },
      {
        name: 'Frames',
        model: 'Nano Banana Pro',
        fixes:
          'The infographic frames, because this is the tool that holds legible type at 4K. Every figure is checked against the source before it moves on, since a data frame is exactly where a model misreads.',
        time: 'Day two',
      },
      {
        name: 'Motion',
        model: 'Image to video, through Higgsfield',
        fixes:
          'Parallax, counters and reveals. The cut sits at reading pace, so the viewer can finish each frame instead of chasing it.',
        time: 'Day two',
      },
      {
        name: 'Audio',
        model: 'ElevenLabs',
        fixes:
          'The podcast version runs as a two-voice conversation, or as a single narrator in the founder’s own cloned voice. Same spine, different register.',
        time: 'Day two',
      },
      {
        name: 'Cutdowns',
        model: 'Shorts, carousel, thread',
        fixes:
          'Three vertical shorts from the strongest beats, one carousel, one newsletter section, one thread and four quote cards. Each links back to the original.',
        time: 'Day three',
      },
    ],
    gates: [
      {
        name: 'Figure gate',
        test: 'Every number on screen traced back to its sentence in the article.',
        fail: 'Pull the frame and re-render with the checked value.',
      },
      {
        name: 'Read gate',
        test: 'Play it at one and a half speed on a phone. Can you still finish every frame?',
        fail: 'Cut the text by a third and hold two beats longer.',
      },
      {
        name: 'Voice gate',
        test: 'Cloned voice cleared, consent filed, disclosure in the show notes.',
        fail: 'Nothing publishes until the paperwork exists.',
      },
      {
        name: 'Link gate',
        test: 'Every asset points back at the source article.',
        fail: 'Add the link before scheduling.',
      },
    ],
    prompts: [
      {
        num: '01',
        name: 'Extraction call',
        body: `Read the attached article and return, in this order:
1. The single argument, in one sentence a stranger could repeat
2. Every figure, quoted with the sentence it came from
3. Four lines that stand up on their own
4. Ten beats: [beat] / [what is on screen] / [one line of voice]
Flag any claim the article never supports. Invent no figures.`,
      },
      {
        num: '02',
        name: 'Infographic frame',
        body: `Editorial infographic frame, 16:9, flat vector, three colours:
[ink] [bone] [signal orange]
HEADLINE: "[eight words maximum]"
DATA: [label] [value] drawn as [bar | ring | stacked block]
TYPE: geometric sans, tight tracking, no shadow, no gradient
LAYOUT: headline top left, data centred, source line bottom right
RULE: render the figures exactly as supplied, no rounding
OUTPUT: 4K, plus the same frame on a transparent background`,
      },
      {
        num: '03',
        name: 'Podcast dialogue',
        body: `Turn the beat sheet into a two-host script, nine minutes read aloud.
HOST A [warm, asks the obvious question deliberately]
HOST B [the practitioner, answers with the figure]
Open mid-argument. No welcome, no housekeeping, no sign-off.
Every ninety seconds, one of them disagrees with the other.`,
      },
    ],
    rhythm: [
      { key: 'Day one', value: 'Extraction, beat sheet, script approved' },
      { key: 'Day two', value: 'Frames rendered, motion built, audio recorded' },
      { key: 'Day three', value: 'Assembly, cutdowns, upload pack delivered' },
      { key: 'Monthly', value: 'Four source pieces, thirty-six assets' },
      { key: 'Archive', value: 'Beat sheets stay live and re-run when the article changes' },
    ],
  },

  {
    id: 'continuity-spine',
    num: '06',
    title: 'The cast that never melts',
    discipline: 'Narrative production, episodic and short film',
    mechanism: 'The series bible',
    summary:
      'Anyone can generate one beautiful shot. Holding a character, a room and a lens grammar across forty of them is the difficult part, and it is the part audiences notice first.',
    loop:
      'One episode every two to three weeks, sustainably. Five to ten minutes, forty to seventy shots, and the cast carries into the next season at no build cost.',
    desire: 'A creator wants a series people follow, with a cast recognisable from the thumbnail alone.',
    objection:
      'Generated series lose their cast somewhere around episode three. A written bible, trained identities and saved rooms are the repair.',
    stack: ['Higgsfield Soul ID', 'Popcorn', 'Cinema Studio', 'Seedance 2.5', 'Veo 3.1', 'Kling 3.0', 'Nano Banana Pro', 'ElevenLabs', 'CapCut'],
    delivers: [
      'A series bible with cast pages, locations and palette',
      'A trained cast that carries forward at no extra build cost',
      'A shot list with continuity notes against every frame',
      'An episode master in 16:9, a vertical cut and audio stems',
      'A thumbnail set and title cards built from the series plates',
    ],
    stages: [
      {
        name: 'Bible',
        model: 'Written by hand',
        fixes:
          'Each lead gets a page: face, build, wardrobe rules, three expressions and the way they stand. Locations get the same treatment, and so does the palette.',
        time: 'Pre-production, five days',
      },
      {
        name: 'Identity',
        model: 'Higgsfield Soul ID',
        fixes:
          'One trained identity per character, built from a twenty-frame sheet. Environments and props go in as saved references, so a room from episode one returns correctly in episode six.',
        time: 'Pre-production, five days',
      },
      {
        name: 'Board',
        model: 'Popcorn',
        fixes:
          'The look carries across a sequence while shot size, framing and what changed since the previous frame are recorded. That board becomes the shot list.',
        time: 'Pre-production, five days',
      },
      {
        name: 'Plates',
        model: 'First and last frame pairs',
        fixes:
          'A pair for anything involving movement. The pair is what stops a generated shot wandering away from its blocking.',
        time: 'Build, six to nine days',
      },
      {
        name: 'Motion',
        model: 'Cinema Studio',
        fixes:
          'The camera gets driven, never described: crash zoom, dolly in, orbit, crane, up to three moves stacked in one shot. Genre presets set the pacing before rendering starts.',
        time: 'Build, six to nine days',
      },
      {
        name: 'Finish',
        model: 'Upscale, grade, ElevenLabs, CapCut',
        fixes:
          'Reframe for the vertical cut, grade to the series palette, one voice per character, then dubbing for the second market from the same performance.',
        time: 'Finish, three days',
      },
    ],
    gates: [
      {
        name: 'Continuity gate',
        test: 'Check against the bible page before rendering, and against the previous episode afterwards.',
        fail: 'Rebuild the plate. Never repair it in the grade.',
      },
      {
        name: 'Blocking gate',
        test: 'A first and last frame pair supplied for any moving shot.',
        fail: 'The shot goes back to plate stage.',
      },
      {
        name: 'Audio gate',
        test: 'One stored voice per character, across the whole series.',
        fail: 'Re-render the line using the saved settings.',
      },
      {
        name: 'Cut gate',
        test: 'Watch the episode on mute. Does the story survive?',
        fail: 'Rebuild the beats that only work with dialogue.',
      },
    ],
    prompts: [
      {
        num: '01',
        name: 'Character sheet entry',
        body: `CHARACTER: [name], [age], [build]
FACE: [three fixed features that must never move]
WARDROBE: [garment], [colour], [wear state] for episodes 1-4
EXPRESSIONS: neutral / suppressed anger / the smile she uses to lie
BLOCKING: weight on the left leg, hands still, chin slightly down
NEVER: sunglasses, hats, hair worn down, a changed earring`,
      },
      {
        num: '02',
        name: 'Shot prompt',
        body: `SHOT 14
SIZE: medium close
LENS: 50mm
MOVE: slow dolly in
SUBJECT: [character] at the window, rain outside, a practical lamp
  camera left as the only warm source in the room
CONTINUITY: same coat as shot 09, the cut on her left cheek still
  open, rain has not stopped since shot 06
GRADE: series palette, cold ambient, warm practical, crushed blacks
LENGTH: 6s, no cut inside the shot
NEGATIVE: face drift, extra fingers, burned-in subtitles, lens flare`,
      },
      {
        num: '03',
        name: 'Voice and dub',
        body: `VOICE [character]: [age], [register], [accent], speaks in
  short bursts, breathes before the last word of a sentence
PER LINE: [emotion tag] + [pace] + [what she is hiding]
DUB: same performance in the second language, timing matched to
  the locked cut, no reflow of the picture`,
      },
    ],
    rhythm: [
      { key: 'Pre-production', value: 'Bible, cast training and board: five working days' },
      { key: 'Build', value: 'Plates and renders: six to nine days per episode' },
      { key: 'Finish', value: 'Sound, grade, versions: three days' },
      { key: 'Cadence', value: 'One episode every two to three weeks, sustainable' },
      { key: 'Library', value: 'Cast and locations carry into the next season for free' },
    ],
  },
];
