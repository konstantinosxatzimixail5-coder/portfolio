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
          'The spine comes back: the argument, the figures underneath it, the four lines worth quoting, and the one idea that deserves a whole video. Unsupported claims are flagged rather than smoothed over.',
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
          'The camera gets driven rather than described: crash zoom, dolly in, orbit, crane, up to three moves stacked in one shot. Genre presets set the pacing before rendering starts.',
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
  },
];
