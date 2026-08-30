// The two original shorts.
//
// Every field below that the brief marks "verbatim from the PDF" was extracted
// from the process document with pypdf and reflowed by script, then proofread
// block by block against the page. Nothing here was retyped, which is the only
// way fourteen prompts arrive with their timecodes and reference tags intact.
//
// Sources: TwinMoons_Process_TaleCrafters.pdf and Skyrunner_Process_TaleCrafters.pdf,
// eleven sheets each, both committed under public/docs/.

export interface Beat {
  letter: string;
  time: string; // where the block starts, for the beat map
  span: string; // the full range as the sheet prints it
  name: string;
  image: string; // manifest key
  alt: string;
  note: string; // the line the sheet sets under the block title
  prompt: string; // as written for Seedance 2.0
}

export interface DesignSheet {
  tag: string;
  name: string;
  note?: string;
  image?: string;
  alt?: string;
}

export interface Film {
  slug: string;
  title: string;
  runtime: string;
  strapline: string; // the line under the title on sheet 01
  standfirst: string; // the card line on the home page
  logline: string;
  hero: string;
  heroAlt: string;
  // The key art. It leads the film's card on the front page, where a four frame
  // contact strip was too small to carry a title and read as a decoration
  // instead of as a film.
  poster: string;
  posterAlt: string;
  strip: string;
  stripAlt: string;
  closing: string;
  closingAlt: string;
  spec: { key: string; value: string }[];
  delivery: { key: string; value: string }[];
  spine: { key: string; value: string }[];
  spineNote: string;
  beats: Beat[];
  castIntro: string;
  castNote: string;
  cast: DesignSheet[];
  pipeline: { num: string; name: string; tool: string; body: string }[];
  pipelineNote: string;
  tools: { name: string; role: string; body: string }[];
  skills: { name: string; role: string; body: string }[];
  stackNote: string;
  look: { key: string; lines: string[] }[];
  lookNote: string;
  locks: { name: string; symptom: string; lock: string }[];
  route?: {
    image: string;
    alt: string;
    caption: string;
    why: string[];
    positionReference: string;
    waypoints: { num: string; name: string; cue: string }[];
    locks: string[];
    result: string;
  };
  doc: { path: string; title: string; summary: string };
}

export const films: Film[] = [
  {
    slug: 'twin-moons',
    title: 'Twin Moons',
    runtime: '0:35',
    strapline: 'Two moons, one wet rooftop, and nobody left standing between them.',
    standfirst:
      'A rooftop arena under two moons, a bladesman clearing it, and a phase assassin arriving on a burning wing.',
    logline:
      'A red-armoured bladesman clears a rooftop arena of engineered predators while a phase assassin cuts his way off a burning strike deck above the same city. The two survivors meet on wet metal under twin moons, and the rain does the talking.',
    poster: 'site/twin-moons/tm-poster',
    posterAlt:
      'The Twin Moons key art: two swordsmen facing each other across a wet neon platform in the rain, one hooded with a magenta blade and one in red armour with a cyan blade, two moons and a burning wreck behind them over a dark city, the title set between them.',
    hero: 'site/twin-moons/tm-hero',
    heroAlt:
      'A red-armoured bladesman in silhouette holds a glowing katana level while an enormous orange fireball fills the sky behind him, a hooded figure with a violet blade below him at the edge of frame.',
    strip: 'site/twin-moons/tm-strip',
    stripAlt:
      'A four frame contact strip from Twin Moons: a pale creature struck by a blue blade, the bladesman standing on a mound of corpses against the moon, two figures squaring up with drawn swords, and a leaping figure against a fireball.',
    closing: 'site/twin-moons/tm-final',
    closingAlt:
      'The two survivors circle each other on a wet, glowing arena floor between the bodies of pale predators, one carrying a violet blade and one a cyan blade.',
    spec: [
      { key: 'Runtime', value: '0:35' },
      { key: 'Format', value: '1920 x 1080 / 30 fps / 16:9' },
      { key: 'Blocks', value: '8 generation blocks, 18 internal cuts' },
      { key: 'Video model', value: 'Seedance 2.0' },
      { key: 'Design', value: 'ChatGPT Image 2' },
      { key: 'Control layer', value: 'Claude x Higgsfield MCP' },
      { key: 'Skills', value: 'tig-scene-engine, tig-acting-task, cinedance' },
    ],
    delivery: [
      {
        key: 'Runtime',
        value: '0:35',
      },
      {
        key: 'Master',
        value: '1920 x 1080, 30 fps, H.264',
      },
      {
        key: 'Sound',
        value: 'Model audio, layered and mixed in the edit',
      },
      {
        key: 'Dialogue',
        value: 'None. The film carries on action and light',
      },
      {
        key: 'Status',
        value: 'Complete. Original characters and world',
      },
    ],
    spine: [
      {
        key: 'Goal',
        value: 'Stand as the last blade on the platform, and be the one still holding it when the rain stops.',
      },
      {
        key: 'Obstacle',
        value: 'The arena is stocked with a predator pack and patrolled from the air. Each stage threatens the one after it.',
      },
      {
        key: 'Tactic',
        value: 'The Shogun fights low and close, using the wet deck. The Ronin fights wide, using phase movement and the enemy\'s own ordnance.',
      },
      {
        key: 'Reversal',
        value: 'The interceptor sent to kill the Ronin becomes his transport and his weapon. The fireball that ends the patrol also announces him to the Shogun.',
      },
      {
        key: 'Value shift',
        value: 'The Shogun reads as a survivor, then as an executioner standing on a mound of the dead. The Ronin reads as prey under fire, then as the thing the platform should have feared.',
      },
    ],
    spineNote: "Every reversal has to move the audience verdict on a character. A turn that changes only the plot is dead weight.",
    beats: [
      {
        letter: 'A',
        time: '0:00',
        span: '0:00 - 0:04',
        name: 'Contact',
        image: 'site/twin-moons/tm-a-contact',
        alt: 'A huge pale predator lunges with a burning orange blade while the small red-armoured bladesman crouches under the swing, blood arcing across the rain-soaked arena floor.',
        note: 'Opening block. The pack is already moving when the first frame appears, so the film starts mid-fight.',
        prompt: `SCENE CONTEXT
A lone red-armoured bladesman sprints across a rain-slick rooftop arena and takes the first strike from an engineered predator.

ACTIVE REFERENCES
@shogun_v1: adult male bladesman, lacquered red lamellar armour, horned silver helm, white waist wraps, blue energy katana in the right hand. 100% matches the reference.
@brute_v1: 2.8m grey-green reptilian predator, heavy shoulders, single orange thermal blade in the right claw. 100% matches the reference.
@arena_v1: open rooftop platform, dark metal panels, recessed cyan strips, standing rainwater.

LOCATION MAP
Camera 1.2m above the deck facing the far edge. Cyan strips run left to right through the midground. City glow and storm cloud fill the background. Rain falls near vertical, drifting screen-left.

FIRST FRAME AND SPATIAL BLOCKING
Frame opens on wet deck panels with @shogun_v1 already visible in the centre distance, running towards camera. @brute_v1 enters from screen-right at 0:02 and closes to within 2 metres. Both stand on the same strip line so the ground reads flat.

OPTICS
35mm for the run, 65mm for the strike. Deep focus on the deck, soft falloff on the city.

CAMERA
Low tracking move retreating with the run, then a hard whip to screen-right on the swing. Handheld weight, no float.

ACTION TIMING
0:00 to 0:02 @shogun_v1 runs at camera, water spraying off each footfall.
0:02 to 0:03 HARD CUT. @brute_v1 swings the thermal blade across frame, a red arc throws screen-left.
0:03 to 0:04 @shogun_v1 drops under the arc on one knee, katana trailing behind him.

PHYSICS
Rain beads and runs off armour plates. Water sheets under the sliding knee. Blood arcs and falls, it does not hang.

LIGHTING
Cold moonlight from behind, cyan uplight from the deck strips, orange rim off the thermal edge. Faces stay in shadow, no flat front light.

AUDIO
Rain on metal, one heavy blade pass, no music.

POSITIVE CONSTRAINTS
Two figures only. Katana stays in the right hand. Blue for the katana, orange for the thermal edge, colours never swap.`,
      },
      {
        letter: 'B',
        time: '0:04',
        span: '0:04 - 0:08',
        name: 'The Brute',
        image: 'site/twin-moons/tm-b-brute',
        alt: 'The predator squares up head on with its orange blade held low, two moons behind it, a small armoured figure falling towards it from the top of the frame.',
        note: 'Scale block. The predator is framed against both moons so the size gap reads instantly.',
        prompt: `SCENE CONTEXT
The bladesman squares off against the largest predator of the pack, which rises to full height under twin moons and opens its arms in challenge.

ACTIVE REFERENCES
@shogun_v1: red lamellar armour, horned silver helm, blue energy katana held low in a two-hand grip. 100% matches the reference.
@brute_v1: 2.8m grey-green predator, orange thermal blade in the right claw, chest and shoulder harness. 100% matches the reference.
@arena_v1: rooftop platform, cyan strips, heavy rain, two full moons low on the horizon behind the far edge.

FIRST FRAME AND SPATIAL BLOCKING
@shogun_v1 occupies the lower screen-left quarter, back three-quarters to camera, facing screen-right. @brute_v1 stands 4 metres away on the right, both moons directly behind its torso. Two dead predators lie in the far background as silhouettes.

OPTICS
85mm from a low deck-level position. The long lens compresses the moons to fill the sky behind the predator and stacks the two figures.

CAMERA
Slow rise from knee height to chest height, no pan. The predator grows in frame through camera height alone.

ACTION TIMING
0:00 to 0:02 @brute_v1 straightens from a hunch, thermal blade sweeping a slow arc at hip height.
0:02 to 0:03 It spreads both arms wide, head tipping back, chest open to camera.
0:03 to 0:04 @shogun_v1 shifts his weight onto the front foot and drops the katana tip towards the deck.

ACTING TASK
@shogun_v1 measures the reach of the blade, not the creature. He is deciding which distance kills him and stepping to the edge of it. The helm hides the face, so the task lives in the weight shift and in the tilt of the head tracking the blade tip.

PHYSICS
Rain runs off the thermal edge as steam. Muscle mass moves before the limb does. Water rings spread from each footfall.

LIGHTING
Moons act as a hard backlight and hold both figures as silhouettes. Cyan floor bounce separates the legs from the deck. No fill on the front.

AUDIO
Low breath, rain, the hum of the thermal edge. No music.

POSITIVE CONSTRAINTS
Both moons stay visible and stay behind the predator. Two figures in the foreground, nothing else enters frame.`,
      },
      {
        letter: 'C',
        time: '0:08',
        span: '0:08 - 0:11',
        name: 'The Mound',
        image: 'site/twin-moons/tm-c-mound',
        alt: 'The bladesman stands on a mound of pale corpses with his sword driven down into them, framed against a full moon in heavy rain.',
        note: 'The value shift. Same character, new verdict: the audience stops reading survival and starts reading appetite.',
        prompt: `SCENE CONTEXT
The fight is over. The bladesman stands on top of the bodies he has made, blade driven down into the pile, blood running with the rain.

ACTIVE REFERENCES
@shogun_v1: red lamellar armour spattered dark, horned silver helm, both hands on the katana grip. 100% matches the reference.
@arena_v1: rooftop platform, cyan strips, twin moons low behind him, storm cloud.

FIRST FRAME AND SPATIAL BLOCKING
@shogun_v1 stands centre frame on a mound of dead predators roughly 1.5m high, facing camera, feet apart. The larger moon sits directly behind his helm, the smaller moon screen-right. Blood spray marks the deck in the foreground.

OPTICS
50mm from slightly below eye level. Neutral field, so the height comes from the low angle instead of distortion.

CAMERA
Static hold with a very slow creep in. The frame stops moving because the story does.

ACTION TIMING
0:00 to 0:01 Blood falls past camera in the foreground, out of focus.
0:01 to 0:03 @shogun_v1 drives the katana down into the pile and holds. Rain sheets off the shoulder plates.

ACTING TASK
He is listening for the next one. The stillness is work, not rest: the head turns two degrees at a time across the platform, checking whether anything is still breathing, and the grip stays closed the whole time.

PHYSICS
Bodies compress under his weight. The blade enters and stays. Rain runs off the helm crest in a continuous line.

LIGHTING
Hard rim from the moons, deep shadow across the front of the armour, cyan spill low on the corpses. Keep the face plate unreadable.

AUDIO
Rain, dripping, one long exhale.

POSITIVE CONSTRAINTS
One living figure only. The blade stays vertical in the pile. The moons do not move between frames.`,
      },
      {
        letter: 'D',
        time: '0:11',
        span: '0:11 - 0:15',
        name: 'Shockwave',
        image: 'site/twin-moons/tm-d-shockwave',
        alt: 'Seen from overhead, a hooded figure stands at the centre of a violet shockwave ring with armoured bodies thrown outward across a metal deck.',
        note: 'Hard switch of protagonist, colour and altitude in a single frame. Magenta enters the film here and never leaves.',
        prompt: `SCENE CONTEXT
On a second platform, a hooded assassin releases a ring of unstable energy that throws an entire security squad off their feet.

ACTIVE REFERENCES
@ronin_v1: tall hooded figure in layered shadow-weave, face void with no features, magenta phase poleblade. 100% matches the reference.
@trooper_v1: security troopers in dark segmented armour, full-face visors, compact rifles. Twelve of them.
@strike_v1: high-altitude combat platform, armoured composite panels, cyan inset strips, wet surface.

FIRST FRAME AND SPATIAL BLOCKING
Overhead view, camera directly above the deck. @ronin_v1 stands at the exact centre, poleblade held vertical. The troopers form a loose ring 6 to 9 metres out, all of them already airborne or falling outward. A magenta ring of light expands from the centre through the whole frame.

OPTICS
24mm top-down. The wide field keeps the full ring in frame and bends the platform edges outward for scale.

CAMERA
Locked overhead, then a fast fall to a low three-quarter angle on the deck at the cut.

ACTION TIMING
0:00 to 0:02 The magenta ring expands from @ronin_v1 outward, bodies thrown back with it, rifles leaving hands.
0:02 to 0:03 HARD CUT to a low angle behind @ronin_v1, two troopers closing from screen-right.
0:03 to 0:04 The poleblade sweeps once across frame, magenta trailing behind the edge.

PHYSICS
Bodies travel outward and tumble, they do not slide. Loose gear leaves at the same moment as the impact. Standing water lifts off the deck inside the ring.

LIGHTING
The ring is the only key light for two seconds and throws hard shadows outward from centre. Cyan deck strips read underneath. No ambient fill.

AUDIO
One low concussive hit, armour on metal, no music.

POSITIVE CONSTRAINTS
One hooded figure only, never duplicated. Magenta belongs to the assassin, cyan belongs to the deck.`,
      },
      {
        letter: 'E',
        time: '0:15',
        span: '0:15 - 0:19',
        name: 'Tracer Run',
        image: 'site/twin-moons/tm-e-tracer',
        alt: 'The hooded assassin runs across a rooftop trailing a violet blade, a jet banking past neon towers behind him and sparks striking the deck.',
        note: 'The chase beat that sets up the reversal. The jet is introduced as a threat so that it can be stolen four seconds later.',
        prompt: `SCENE CONTEXT
The assassin runs the length of the strike deck under fire from an interceptor while the last troopers shoot from the ground.

ACTIVE REFERENCES
@ronin_v1: hooded assassin, magenta phase poleblade held low and behind. 100% matches the reference.
@interceptor_v1: dark arrowhead jet with orange engine glow, banking above the platform.
@strike_v1: combat platform above the megacity, cyan strips, fallen troopers across the deck.

FIRST FRAME AND SPATIAL BLOCKING
High three-quarter view from the far corner of the platform. @ronin_v1 enters lower screen-left and runs a diagonal towards the far edge at screen-right. Cannon rounds walk across the deck one metre behind him for the whole run. @interceptor_v1 crosses the upper third from screen-right to screen-left.

OPTICS
28mm, high and wide, so the diagonal of the platform carries the run and the city drops away underneath.

CAMERA
Fast tracking move that leads the runner, then a whip up to the jet as it crosses.

ACTION TIMING
0:00 to 0:02 Impacts walk across the deck in a line behind @ronin_v1, sparks and panel fragments thrown up.
0:02 to 0:03 He plants one foot on the raised edge and leaps clear of the platform.
0:03 to 0:04 HARD CUT. Side view, the assassin closes on the fuselage of @interceptor_v1 in mid-air over the city.

PHYSICS
Sparks bounce and die on wet metal. Impacts throw water and debris in the same direction as travel. The leap keeps its arc, no hover.

LIGHTING
City neon underneath as a base glow, muzzle flashes as intermittent key, magenta trail from the blade. Keep the hood interior black.

AUDIO
Cannon fire, wind, one jet pass.

POSITIVE CONSTRAINTS
One jet, one runner. The blade stays in the left hand through the leap.`,
      },
      {
        letter: 'F',
        time: '0:19',
        span: '0:19 - 0:22',
        name: 'The Fireball',
        image: 'site/twin-moons/tm-f-fireball',
        alt: 'A small figure rides the nose of a burning aircraft as it falls through a neon skyline with an enormous fireball behind it.',
        note: 'The reversal itself. The weapon sent to kill him carries him down to the arena.',
        prompt: `SCENE CONTEXT
The interceptor detonates above the city and the assassin rides a falling wing down towards the duel platform.

ACTIVE REFERENCES
@ronin_v1: hooded assassin crouched on a sheared wing section, poleblade planted through the metal. 100% matches the reference.
@interceptor_v1: the jet, now a fireball and falling debris.
@arena_v1: duel platform below, cyan strips, wet panels, twin moons behind cloud.

FIRST FRAME AND SPATIAL BLOCKING
Wide side view over the megacity. The fireball fills the upper centre. @ronin_v1 sits in silhouette on the wing at lower centre, falling from screen-right to screen-left across frame. Tower blocks pass behind in the far background.

OPTICS
40mm on a long throw, so the explosion stays big without swallowing the silhouette.

CAMERA
Camera falls with the debris at matched speed. The background moves, the figure holds position in frame.

ACTION TIMING
0:00 to 0:01 The jet detonates, the shockwave clears the smoke outward.
0:01 to 0:02 @ronin_v1 is revealed inside the flash, crouched, cloak thrown flat by the airflow.
0:02 to 0:03 HARD CUT to the arena deck: the wing hits the far edge and the assassin lands in a low crouch, fire behind him.

PHYSICS
Fire rolls upward, debris keeps its forward momentum. The cloak follows airflow, not gravity. The landing takes weight through both legs and one hand.

LIGHTING
The blast is the key light for the whole block, orange on every surface. Magenta stays only on the blade. Rain lights up between camera and fire.

AUDIO
Detonation, then a low hollow roar and falling metal.

POSITIVE CONSTRAINTS
One figure on the debris. Fire behind, never in front of the silhouette.`,
      },
      {
        letter: 'G',
        time: '0:22',
        span: '0:22 - 0:28',
        name: 'The Meeting',
        image: 'site/twin-moons/tm-g-meeting',
        alt: 'The hooded assassin and the red-armoured bladesman face each other in close up with a bright blue blade held level between them.',
        note: 'The two leads share a frame for the first time. Neither moves for two full seconds, which is a long time in a thirty-five second cut.',
        prompt: `SCENE CONTEXT
The bladesman and the assassin stand facing each other on the duel platform while the wreck burns behind them.

ACTIVE REFERENCES
@shogun_v1: red lamellar armour, horned helm, blue energy katana drawn and held low at the right side. 100% matches the reference.
@ronin_v1: hooded assassin, magenta poleblade angled down across the body. 100% matches the reference.
@arena_v1: duel platform, cyan strips, burning wreck on the far edge, rain and drifting smoke.

FIRST FRAME AND SPATIAL BLOCKING
@ronin_v1 stands screen-left in the near foreground, back three-quarters to camera, facing screen-right. @shogun_v1 stands screen-right, 5 metres away, facing screen-left. Eye lines meet across the centre of frame. The burning wreck sits between them in the background. Neither figure crosses the centre line until the last second of the block.

OPTICS
100mm from the side. Compression flattens the distance between them and stacks the fire directly behind.

CAMERA
Slow lateral dolly to screen-right, so the two figures swap depth relationship without either one moving.

ACTION TIMING
0:00 to 0:02 Both hold position. Only smoke, rain and cloth move.
0:02 to 0:04 @shogun_v1 turns his shoulders square and lifts the katana to a mid guard.
0:04 to 0:06 @ronin_v1 lowers into a wide stance and levels the poleblade at hip height.

ACTING TASK
Each one is looking for the tell in the other. The task is reading, not posing: the head tracks the opponent's weapon hand, then the front foot, then back to the hand. Whoever moves first has already lost the read, so both keep working and neither commits.

PHYSICS
Cloth and rain drift with the heat from the fire. Water runs off both weapons. Breath is visible in the cold.

LIGHTING
Orange from the wreck behind, cyan from the deck below, blue and magenta from the weapons. Faces and hood stay dark.

AUDIO
Fire, rain, no dialogue, no music.

POSITIVE CONSTRAINTS
Exactly two figures. Blue stays with the katana, magenta stays with the poleblade, colours never cross.`,
      },
      {
        letter: 'H',
        time: '0:28',
        span: '0:28 - 0:35',
        name: 'Blade Lock',
        image: 'site/twin-moons/tm-h-lock',
        alt: 'The hooded assassin in three quarter view with the red-armoured bladesman’s shoulder plate filling the right of frame, cyan light streaking the wet deck behind them.',
        note: 'Close coverage, then back out wide to end on the standoff. The film stops before the fight resolves, which is the point.',
        prompt: `SCENE CONTEXT
The two blades meet, hold against each other, and break apart into a standoff that does not resolve.

ACTIVE REFERENCES
@shogun_v1: red lamellar armour, horned helm, blue energy katana in a two-hand grip. 100% matches the reference.
@ronin_v1: hooded assassin, magenta poleblade in a two-hand grip. 100% matches the reference.
@arena_v1: duel platform, wet panels, cyan strips, mist at deck level, twin moons behind cloud.

FIRST FRAME AND SPATIAL BLOCKING
Open on a tight two-shot at chest height, blades crossed at the centre of frame, @ronin_v1 screen-left and @shogun_v1 screen-right. Both hold their side of frame for the whole block and never swap sides.

OPTICS
75mm for the lock, 32mm for the closing wide. Shallow field on the close work, deep on the wide.

CAMERA
Handheld pressure on the lock with small shakes on each shove, then a fast pull back to a locked wide for the final hold.

ACTION TIMING
0:00 to 0:02 The blades cross and grind, sparks thrown at the contact point, both fighters leaning in.
0:02 to 0:03 HARD CUT to a tight detail of the crossed edges and the gauntlets.
0:03 to 0:05 They shove apart, each taking two steps back on the wet deck.
0:05 to 0:07 HARD CUT to a wide from deck level. Both settle into low stances at opposite sides of frame and hold to the last frame.

PHYSICS
The energy edges throw sparks where they touch and light the water underneath. Feet slide slightly on the wet panels when they break. Mist parts around movement.

LIGHTING
Blade light is the key at close range, blue from the right and magenta from the left across both faces. Deck strips carry the wide.

AUDIO
Energy contact, boots on wet metal, rain, then near silence on the final hold.

POSITIVE CONSTRAINTS
Two figures only, screen sides fixed. End the block on a static frame with both fighters in the same shot.`,
      },
    ],
    castIntro:
      'Identity is settled on paper first. Each sheet carries orthographic views, close details, a fixed colour palette and a scale guide, so the video model receives one source of truth per character and per location. Sheets were then uploaded into Higgsfield and bound to a tag that stays constant across every generation.',
    castNote: 'Tag naming holds for the whole film. No stale tag ever enters a later prompt.',
    cast: [
      { tag: '@shogun_v1', name: 'Red Moon Shogun, wandering bladesman' },
      { tag: '@ronin_v1', name: 'Neon Void Ronin, phase assassin' },
      { tag: '@raptor_v1 + @brute_v1', name: 'Moonclaw predator' },
      { tag: '@arena_v1', name: 'Twin Moon duel platform' },
      { tag: '@strike_v1', name: 'Strike platform, casualty state' },
    ],
    pipeline: [
      {
        num: '01',
        name: 'STORY ENGINE',
        tool: 'tig-scene-engine',
        body: 'Thirty-five seconds beaten into eight blocks with one reversal that earns a value shift. Blocks that failed the causal test were cut before design started.',
      },
      {
        num: '02',
        name: 'DESIGN SHEETS',
        tool: 'ChatGPT Image 2',
        body: 'Character and location sheets with orthographic views, detail crops, materials notes and a locked palette. Roughly four passes per sheet until the silhouette read at thumbnail size.',
      },
      {
        num: '03',
        name: 'REFERENCE LOCK',
        tool: 'Higgsfield library',
        body: 'Every sheet ingested and bound to one tag. Character, creature and location tags stay separate so a location never drags a costume with it.',
      },
      {
        num: '04',
        name: 'SHOT DESIGN',
        tool: 'cinedance',
        body: 'Each block written as an engineering document: first frame, spatial blocking, lens choice, timed action, physics, lighting priority, audio. Style prose stays out of the control sections.',
      },
      {
        num: '05',
        name: 'PERFORMANCE',
        tool: 'tig-acting-task',
        body: 'For the beats where a stance carries the story, the character is given a task to play instead of a face to pull. Stance, weight shift and head angle are written as doing, not as mood.',
      },
      {
        num: '06',
        name: 'GENERATION',
        tool: 'Seedance 2.0 via Claude x Higgsfield MCP',
        body: 'Prompts fired straight from chat as batches, jobs polled in the same thread, candidates returned for review. No tab switching, no copy and paste between tools.',
      },
      {
        num: '07',
        name: 'SELECTION',
        tool: 'Review pass',
        body: 'Candidates judged on identity match, physics, light direction and hand or weapon state. Anything that broke the cyan key light was dropped even when the action looked good.',
      },
      {
        num: '08',
        name: 'ASSEMBLY',
        tool: 'Edit',
        body: 'Cut on motion. Joins hidden inside whip pans, blade passes and the explosion flash so the eight blocks read as one take of coverage.',
      },
      {
        num: '09',
        name: 'FINISH',
        tool: 'Grade and sound',
        body: 'Contrast pulled down in the rain, cyan and magenta held apart in the mids, rain and metal sitting under the blade hits.',
      },
    ],
    pipelineNote: "ONE THREAD HOLDS THE STORY WORK, THE PROMPT WORK AND THE GENERATION QUEUE. THAT IS THE WHOLE POINT OF THE MCP LAYER.",
    tools: [
      {
        name: 'Seedance 2.0',
        role: 'Video model',
        body: 'Image-to-video and multi-shot generation with native sound. Every frame in the film comes out of it. Multi-shot support is what allows a hard cut to live inside one block.',
      },
      {
        name: 'ChatGPT Image 2',
        role: 'Design',
        body: 'Character sheets, creature sheets and location plates. Chosen for typography inside the sheet and for holding a palette across several passes.',
      },
      {
        name: 'Claude x Higgsfield MCP',
        role: 'Control layer',
        body: 'The studio floor. Prompts are written, batched, submitted, polled and reviewed in one conversation, with the reference library addressed by tag.',
      },
      {
        name: 'Edit and grade',
        role: 'Finish',
        body: 'Assembly, speed adjustment on two impacts, grade and sound layup.',
      },
    ],
    skills: [
      {
        name: 'tig-scene-engine',
        role: 'Structure',
        body: 'Goal, obstacle, tactic, reversal, value shift, applied with bespoke definitions. Used to write the spine and to audit it afterwards.',
      },
      {
        name: 'tig-acting-task',
        role: 'Performance',
        body: 'Acting direction written as an invested tactic instead of described expression. Keeps a masked character alive through stance and eye work.',
      },
      {
        name: 'cinedance',
        role: 'Prompt direction',
        body: 'Turns a beat into a production-ready Seedance prompt: blocking, optics, timing, physics, lighting locks, audio. Failure modes are blocked with positive instructions placed next to the rule they protect.',
      },
    ],
    stackNote:
      'The prompt is an engineering document, not copy. Every failed generation costs money and time.',
    look: [
      {
        key: 'Animation style',
        lines: [
          'Cel-shaded anime action. Hard ink line, flat shadow shapes, painted background plates behind moving figures.',
          'Impacts carry smear frames and a two-frame hold. Everything else runs at full 30 fps.',
          'Figure animation stays weighted. Armour lands before cloth, cloth lands before hair and rain.',
        ],
      },
      {
        key: 'Palette',
        lines: [
          'Dark metal and charcoal hold the base. Cyan lives in the deck, magenta lives with the assassin, blue with the katana, orange only where fire or a thermal edge exists.',
          'Blood reads near-black in the rain and only turns red inside a key light.',
          'No colour crosses ownership between characters at any point in the film.',
        ],
      },
      {
        key: 'Camera grammar',
        lines: [
          'Wide lenses for the arena and the run, long lenses for the duel. Scale comes from lens choice, not from stacking effects.',
          'The camera behaves like an operator on the deck: it can be knocked, it cannot fly.',
          'Cuts land on motion. Whip pans, blade passes and the explosion flash cover the joins between generations.',
        ],
      },
      {
        key: 'Weather and light',
        lines: [
          'Rain is continuous through the film and is the main depth tool.',
          'Twin moons act as a hard back light in every arena block, so figures read as silhouettes first.',
          'Faces and helm visors stay dark. Flat front light was blocked in every prompt.',
        ],
      },
    ],
    lookNote: "Rain was cheaper than any effect and did more work than all of them.",
    locks: [
      {
        name: 'Identity drift',
        symptom: 'Armour details and helm shape wandered between blocks.',
        lock: 'One tag per character, described with the minimum anchors that matter for that shot. Costume detail already visible on the sheet stays out of the text so the reference wins.',
      },
      {
        name: 'Side flipping',
        symptom: 'Fighters swapped screen sides across a cut.',
        lock: 'Screen position written explicitly in every block, plus a line fixing which side each one holds for the whole exchange.',
      },
      {
        name: 'Weapon colour bleed',
        symptom: 'Magenta crept onto the katana and blue onto the poleblade.',
        lock: 'Colour ownership stated as a positive rule next to the blocking, not as a list of things to avoid.',
      },
      {
        name: 'Flat front light',
        symptom: 'The model kept lifting faces out of shadow.',
        lock: 'Lighting written as a priority lock with the direction named, and the shadow state of the face stated as the desired outcome.',
      },
      {
        name: 'Floating motion',
        symptom: 'Leaps and landings drifted and lost weight.',
        lock: 'Physics section on every prompt: arcs keep momentum, water and debris travel with the movement, landings take weight through named limbs.',
      },
      {
        name: 'Empty first frame',
        symptom: 'Generations opened on an establishing plate and wasted a second.',
        lock: 'First frame occupancy stated at the top of the blocking section. Characters are already in shot and already moving at 0:00.',
      },
    ],
    doc: {
      path: '/docs/TwinMoons_Process_TaleCrafters.pdf',
      title: 'Twin Moons, the process document',
      summary:
        'Eleven wide-format sheets covering the whole build. The story spine and the beat map, the five design sheets and the tag naming that holds them, the nine pipeline stages from beat sheet to graded cut, the stack, all eight shot prompts as they were written for Seedance, the look rules that make eight blocks read as one film, and the six failure modes with the instruction that closed each one.',
    },
  },
  {
    slug: 'skyrunner',
    title: 'Skyrunner',
    runtime: '0:30',
    strapline: 'A small pilot takes the line through the city that nobody bigger can fly.',
    standfirst:
      'A glider run through a floating city, flown along a route drawn by hand before a single frame was generated.',
    logline:
      'A pocket-sized scout flies her own glider through a floating spire city, threads the arcane rings and the waterfalls at full speed, drops onto a terrace held by armoured enforcers, and gets off the machine already fighting.',
    poster: 'site/skyrunner/sr-poster',
    posterAlt:
      'The Skyrunner key art: a small fox pilot in goggles and a flight coat stands beside her folded glider on a wet golden terrace, an armoured figure at each edge of the frame, a floating spire city behind her, the title in gold above.',
    hero: 'site/skyrunner/sr-hero',
    heroAlt:
      'The glider seen from behind with its wings spread, diving past a pale tower through blue and violet cloud.',
    strip: 'site/skyrunner/sr-strip',
    stripAlt:
      'A four frame contact strip from Skyrunner: the glider leaving a launch balcony, banking over the spire city, threading a vortex, and the pilot fighting on a terrace.',
    closing: 'site/skyrunner/sr-final',
    closingAlt:
      'The fox pilot squares up to an armoured enforcer on a wet terrace with a blue blade in her hand and a colossal statue standing behind them.',
    spec: [
      { key: 'Runtime', value: '0:30' },
      { key: 'Format', value: '1920 x 1080 / 30 fps / 16:9' },
      { key: 'Blocks', value: '6 generation blocks, chase camera' },
      { key: 'Video model', value: 'Seedance 2.0' },
      { key: 'Design', value: 'ChatGPT Image 2' },
      { key: 'Control layer', value: 'Claude x Higgsfield MCP' },
      { key: 'Skills', value: 'tig-scene-engine, tig-acting-task, cinedance' },
    ],
    delivery: [
      {
        key: 'Runtime',
        value: '0:30',
      },
      {
        key: 'Master',
        value: '1920 x 1080, 30 fps, H.264',
      },
      {
        key: 'Sound',
        value: 'Model audio, layered and mixed in the edit',
      },
      {
        key: 'Dialogue',
        value: 'None. Flight noise and impact carry it',
      },
      {
        key: 'Status',
        value: 'Complete. Original characters and world',
      },
    ],
    spine: [
      {
        key: 'Goal',
        value: 'Reach the terrace and take back what is being loaded there.',
      },
      {
        key: 'Obstacle',
        value: 'A city built at the wrong scale for her, then a unit of enforcers who are ten times her weight and hold the ground she needs.',
      },
      {
        key: 'Tactic',
        value: 'Fly the route nobody larger can fly. On foot, stay inside their reach where a heavy blade cannot land.',
      },
      {
        key: 'Reversal',
        value: 'The approach she planned as a quiet one ends in a hard skid in open view. The glider stops hiding her and starts announcing her.',
      },
      {
        key: 'Value shift',
        value: 'She reads as a courier, small and quick. By the last frame she reads as someone who came for this fight and knew the odds.',
      },
    ],
    spineNote: "The route was drawn by hand before a single frame was generated. Everything after that is just holding the line.",
    beats: [
      {
        letter: 'A',
        time: '0:00',
        span: '0:00 - 0:05',
        name: 'Launch',
        image: 'site/skyrunner/sr-a-launch',
        alt: 'The glider drops away from a stone balcony into a floating city of domes and waterfalls beneath a violet beam.',
        note: 'Opening block. The city is established and left behind inside five seconds, so the film never stops to admire itself.',
        prompt: `SCENE CONTEXT
A small pilot drops her glider off a high balcony and dives into a floating spire city at speed.

ACTIVE REFERENCES
@lyrian_v1: 92cm fennec-featured scout, brass goggles on the forehead, blue-grey coat and leather harness, seated forward on the glider with both hands on the grips. 100% matches the reference.
@skyrunner_v1: 1.8m arcane-steam glider, brass frame, blue stained-glass wings, single blue core at the nose. 100% matches the reference.
@spires_v1: floating city of pale spires, waterfalls, arcane rings and cloud shelves under a violet sky.
@route_v1: position reference for direction of travel only.

LOCATION MAP
Camera starts above and behind the balcony, facing out over the city. The cathedral tower stands screen-right in the midground. Cloud sits below the balcony line. Light comes from the upper left.

FIRST FRAME AND SPATIAL BLOCKING
Frame opens on the city with @skyrunner_v1 already entering from the lower left. Travel runs screen-left to screen-right for the whole block. The camera holds 4 metres behind the tail and 1 metre above it.

OPTICS
18mm chase position. The wide field keeps both wings inside frame and lets the architecture stretch past at the edges.

CAMERA
Locked chase. The camera never overtakes and never falls behind. Roll follows the glider, horizon stays free to tilt.

ACTION TIMING
0:00 to 0:02 The glider drops past the balcony and the tower, wings level.
0:02 to 0:04 It banks left around the tower base, then rights itself.
0:04 to 0:05 It accelerates into open air above the cloud shelf.

PHYSICS
Wings hold their shape under load. Cloud tears past at the same speed as the architecture. The rider leans into the bank before the machine turns.

LIGHTING
Warm sun from the upper left, cold blue from the core at the nose, deep shade inside the canyon walls.

AUDIO
Wind, a low arcane hum, no music.

POSITIVE CONSTRAINTS
One glider, one rider. Direction of travel stays constant. Wings stay attached and stay blue.`,
      },
      {
        letter: 'B',
        time: '0:05',
        span: '0:05 - 0:10',
        name: 'Ring Run',
        image: 'site/skyrunner/sr-b-rings',
        alt: 'The glider banks hard through arcane rings above the spire city with the towers blurred by speed.',
        note: 'Skill on display. The rings give the audience a measure of how tight the flying is.',
        prompt: `SCENE CONTEXT
The glider threads a series of floating arcane rings and stone bridges without slowing down.

ACTIVE REFERENCES
@lyrian_v1: pilot low over the frame, head up, both hands on the grips. 100% matches the reference.
@skyrunner_v1: glider at full speed, core burning blue.
@spires_v1: rings, bridges and towers of the floating city.
@route_v1: position reference for direction of travel only.

FIRST FRAME AND SPATIAL BLOCKING
Open with the glider already in frame at centre, first ring 30 metres ahead and slightly screen-right. Three more rings sit beyond it at increasing distance. The camera holds the chase position behind and above.

OPTICS
16mm. The very wide field exaggerates the closing speed on each ring and keeps the far city readable.

CAMERA
Chase, with a small lag on each turn so the glider leads the frame and the camera catches up. No cuts inside the block.

ACTION TIMING
0:00 to 0:02 Straight run at the first ring, wings level, passing through the centre.
0:02 to 0:03 Hard roll to the right through a narrow bridge span.
0:03 to 0:05 A climbing turn back to the left, second and third rings passing close to the wingtips.

ACTING TASK
She is reading the gap, not enjoying the view. Eyes go to the next opening before the current one is cleared, and the head turns to hold it through the roll. Hands adjust in small corrections, never in big theatrical pulls.

PHYSICS
The machine banks before it turns. Ring light passes across the wings as a moving reflection. Air disturbance trails behind the wingtips.

LIGHTING
Ring glow throws blue across the underside of the wings on each pass. Warm ambient stays on the top surfaces.

AUDIO
Wind, ring resonance on each pass, no music.

POSITIVE CONSTRAINTS
The glider passes through the centre of every ring. Travel direction holds. No second aircraft enters frame.`,
      },
      {
        letter: 'C',
        time: '0:10',
        span: '0:10 - 0:16',
        name: 'The Canyon',
        image: 'site/skyrunner/sr-c-canyon',
        alt: 'The glider climbs past a tall spire with its wings catching the light and violet streaks crossing the clouds.',
        note: 'The block that sells the scale of the city, flown low enough that the walls do the work.',
        prompt: `SCENE CONTEXT
The glider drops into a canyon between two districts, runs low past waterfalls and balconies, then climbs out through the cloud shelf.

ACTIVE REFERENCES
@lyrian_v1: pilot pressed low to the frame for the dive. 100% matches the reference.
@skyrunner_v1: glider, wings angled for the descent.
@spires_v1: canyon walls, waterfalls, hanging gardens, cloud shelf above.
@route_v1: position reference for direction of travel only.

FIRST FRAME AND SPATIAL BLOCKING
Open inside the canyon with walls filling screen-left and screen-right and the glider centred. The near wall stays within 3 metres of the left wingtip for the first three seconds. Waterfall crosses the path at the midpoint.

OPTICS
16mm on the descent for speed, 24mm on the climb so the cloud layer reads as depth instead of fog.

CAMERA
Chase position, dropping with the glider. On the climb the camera falls slightly behind and looks up, so the machine gains height inside the frame.

ACTION TIMING
0:00 to 0:02 Steep descent between the walls, spray thrown off the waterfall as it passes.
0:02 to 0:04 Low run past lit balconies, wing 2 metres off the stone.
0:04 to 0:06 Pitch up into the cloud shelf, cloud closing over the camera.

PHYSICS
Water spray hits the wings and streams backwards. The machine loses a little speed in the climb and gains it in the dive. Cloud reacts to the wings passing through it.

LIGHTING
Shadow inside the canyon with warm light on the upper rim, then flat bright diffusion inside the cloud.

AUDIO
Wind rising with speed, water, muffled air inside the cloud.

POSITIVE CONSTRAINTS
The canyon walls stay on both sides for the low run. The glider never reverses direction. Rider stays seated and in scale.`,
      },
      {
        letter: 'D',
        time: '0:16',
        span: '0:16 - 0:20',
        name: 'The Vortex',
        image: 'site/skyrunner/sr-d-vortex',
        alt: 'The glider threads a narrow gap between a wall of blue water and a face of violet cloud.',
        note: 'The one held image in the film. Everything before it is speed, everything after it is ground.',
        prompt: `SCENE CONTEXT
Above the cloud, the glider crosses in front of a vast spiral in the sky, then rolls over and dives back down towards the water.

ACTIVE REFERENCES
@lyrian_v1: pilot upright, silhouetted. 100% matches the reference.
@skyrunner_v1: glider in silhouette with the core reading as the brightest point in frame.
@spires_v1: upper sky of the city, spiral galaxy, distant floating structures.

FIRST FRAME AND SPATIAL BLOCKING
Open with the spiral filling the upper two-thirds of frame and the glider entering from the lower left, crossing towards screen-right. The machine stays in the lower third and never covers the centre of the spiral.

OPTICS
35mm. A tighter field so the spiral holds its shape instead of bending at the frame edge.

CAMERA
Slow chase from slightly above, then a roll with the glider as it turns over into the dive.

ACTION TIMING
0:00 to 0:02 Level cross in front of the spiral, wings catching a rim of light.
0:02 to 0:03 The glider rolls inverted and pitches down.
0:03 to 0:04 Dive out of the cloud towards open water and cliffs below.

PHYSICS
The roll carries momentum through the turn. The rider stays fixed to the frame while the horizon rotates. Speed builds visibly in the dive.

LIGHTING
The spiral is the key light. Everything in the foreground goes to silhouette with a violet rim and one blue point at the nose.

AUDIO
Wind thinning at altitude, a low tone under the spiral, then air building in the dive.

POSITIVE CONSTRAINTS
One aircraft. The spiral stays behind the glider at all times. No extra light sources in frame.`,
      },
      {
        letter: 'E',
        time: '0:20',
        span: '0:20 - 0:23',
        name: 'Touchdown',
        image: 'site/skyrunner/sr-e-touchdown',
        alt: 'A small fox pilot in goggles leaps clear as the glider skids across a wet terrace in a sheet of spray.',
        note: 'The reversal. A quiet approach becomes a loud arrival, and the machine that carried her now points at her.',
        prompt: `SCENE CONTEXT
The glider comes in under a stone arch, skids along a wet terrace and the pilot steps off it already braced for a fight.

ACTIVE REFERENCES
@lyrian_v1: pilot dismounting, one hand still on the frame, knees bent. 100% matches the reference.
@skyrunner_v1: glider on the ground, wings still extended, core lit.
@enforcer_v1: 2.2m armoured enforcer, ceramic plate, silver mask, heat blade, standing at the far end of the terrace.
@spires_v1: stone terrace with balustrade, lanterns, crates, waterfalls and city beyond.

FIRST FRAME AND SPATIAL BLOCKING
Open low at deck height with the arch filling the upper frame and the glider coming through it towards camera. The terrace runs screen-left to screen-right. @lyrian_v1 lands at centre-left. @enforcer_v1 stands 8 metres away at centre-right, already turning towards her.

OPTICS
24mm at knee height. The low wide angle keeps the pilot small in the frame and the enforcer tall behind her.

CAMERA
Fast track in with the landing, then settle to a static low angle for the dismount.

ACTION TIMING
0:00 to 0:01 The glider passes under the arch, nose up, wings flaring.
0:01 to 0:02 It skids across wet stone with sparks and spray, turning side-on as it stops.
0:02 to 0:03 @lyrian_v1 swings off the frame and drops into a low crouch, facing screen-right.

ACTING TASK
She is counting what she has walked into. The eyes find the enforcer first, then the crates, then the exits, then back to the enforcer. The crouch is a decision to stay, not a landing pose.

PHYSICS
Weight transfers from machine to feet. Water sheets away from the skid. The glider keeps rocking slightly after it stops.

LIGHTING
Warm lantern light on the terrace, cold blue from the core beside her, pale sky behind the balustrade.

AUDIO
Metal on wet stone, wings settling, one heavy footstep answering.

POSITIVE CONSTRAINTS
Scale gap stays visible: the pilot reaches the enforcer's hip. Glider stays intact and stays in frame.`,
      },
      {
        letter: 'F',
        time: '0:23',
        span: '0:23 - 0:30',
        name: 'The Terrace',
        image: 'site/skyrunner/sr-f-terrace',
        alt: 'The fox pilot ducks under an armoured enforcer’s swing on a wet terrace with sparks bursting behind her and more enforcers closing in.',
        note: 'Ground fight in three passes. She never trades a straight hit, and the film ends before the outcome is decided.',
        prompt: `SCENE CONTEXT
The pilot fights two enforcers across the terrace, staying inside their reach and using an arcane charge to put one of them down.

ACTIVE REFERENCES
@lyrian_v1: pilot fighting low and fast, blue arcane light gathered in the right hand. 100% matches the reference.
@enforcer_v1: two enforcers, ceramic plate armour, silver masks, heat blades. Both 2.2m.
@spires_v1: terrace, balustrade, lanterns, crates, city beyond.

FIRST FRAME AND SPATIAL BLOCKING
@lyrian_v1 holds the left half of frame throughout. The first enforcer attacks from screen-right, the second enters from behind him at 0:03. Neither enforcer crosses to the left of the pilot. The crates stay in the right foreground as a fixed landmark.

OPTICS
28mm at chest height for the exchanges, 40mm for the closing wide. Camera height stays low, so every frame reports the size difference.

CAMERA
Handheld with weight. It moves with her on each dodge and is knocked slightly on each blade impact.

ACTION TIMING
0:00 to 0:02 The first enforcer swings down. She rolls inside the arc and releases the charge into his chest, throwing him back.
0:02 to 0:04 HARD CUT. She vaults a crate as the second enforcer swings through it, splinters thrown across frame.
0:04 to 0:06 She lands screen-left, low, blue light building again in her hand.
0:06 to 0:07 Both settle facing each other across the terrace and hold to the final frame.

ACTING TASK
She is measuring reach and buying distance. After every exchange the eyes check the blade hand first and the feet second, and the breathing is working. He is trying to end it in one move and reads as slower each time he misses.

PHYSICS
Armour carries momentum and lands hard. Wood breaks along the grain. Wet stone gives under her feet on each turn. The charge throws light before it throws the body.

LIGHTING
Lantern warmth as the base, blue flash from the charge as a moment of key light, pale sky keeping the silhouettes readable.

AUDIO
Armour, splintering wood, one low concussive release, breathing.

POSITIVE CONSTRAINTS
Two enforcers only. Screen sides fixed. The final frame is static with all three figures in shot.`,
      },
    ],
    castIntro:
      'The pilot and her machine were designed on one sheet so that the rider and the glider would never drift apart, with a turnaround, detail crops, a specification block and three flight states. The enforcers got their own sheet at true scale, since the whole ground fight depends on the size gap being obvious. The city was painted as a single wide plate and used for geography, materials and light direction.',
    castNote: 'One tag per identity. The city plate never dictates framing, only geography.',
    cast: [
      {
        tag: '@lyrian_v1 + @skyrunner_v1',
        name: 'Pilot and arcane-steam glider on one sheet',
        image: 'site/skyrunner/sr-e-dismount',
        alt: 'The fox pilot crouches on a wet terrace with one hand down and the glider hovering behind her beside a waterfall.',
      },
      { tag: '@enforcer_v1', name: 'Elite shock trooper, 210 to 220cm' },
      {
        tag: '@spires_v1',
        name: 'The floating city, used for geography, materials and light direction',
      },
    ],
    route: {
      image: 'site/skyrunner/sr-route-map',
      alt: 'The route map: a dashed yellow flight path drawn across a painted plate of the spire city, with six numbered waypoints marked launch, rings, canyon, climb, vortex and terrace.',
      caption: 'Flight path drawn straight onto the city plate. Redrawn here for print.',
      why: [
        'Text alone cannot hold a route through a city with no street names. Written directions send the model looking for landmarks it has to invent, and the glider ends up wandering, reversing or teleporting between blocks.',
        'So the direction of travel was drawn by hand over the location art as a single line with numbered waypoints, then handed to the model as a position reference alongside the plate and the character sheet. Geometry comes from the drawing. Every visual quality of the shot keeps coming from the plate and the sheets.',
      ],
      // Reflowed to the two statements the sheet makes. The line breaks in the
      // PDF are a function of its column width, not of the prompt.
      positionReference: `@route_v1 - POSITION REFERENCE ONLY. Read it for the direction of travel, the waypoint order and the height of the glider above the architecture inside @spires_v1.

Style, light, colour, materials and every surface in the shot come from @spires_v1 and the character references.`,
      waypoints: [
        { num: '1', name: 'Launch', cue: '0:00 launch below the observation balcony.' },
        { num: '2', name: 'Rings', cue: '0:02 through the outer ring, screen-left to screen-right.' },
        { num: '3', name: 'Canyon', cue: '0:05 down into the canyon, wing 2 metres off the wall.' },
        { num: '4', name: 'Climb', cue: '0:08 climb through the cloud shelf.' },
        { num: '5', name: 'Vortex', cue: '0:12 silhouette pass across the spiral in the sky.' },
        { num: '6', name: 'Terrace', cue: '0:16 descend to the terrace and land.' },
      ],
      locks: [
        'The glider never reverses direction between waypoints.',
        'Travel stays screen-left to screen-right for the whole sequence.',
      ],
      result:
        'Five blocks of flight that cut together as one continuous run, with the city passing in the same direction every time and the machine holding its altitude logic from the first frame to the landing.',
    },
    pipeline: [
      {
        num: '01',
        name: 'STORY ENGINE',
        tool: 'tig-scene-engine',
        body: 'Thirty seconds beaten into six blocks, with the reversal placed on the landing so that the flight is setup and the terrace is payoff.',
      },
      {
        num: '02',
        name: 'DESIGN SHEETS',
        tool: 'ChatGPT Image 2',
        body: 'Pilot and glider on one sheet, enforcers at true scale on another, the city as a single wide plate. Palette and materials fixed at this stage.',
      },
      {
        num: '03',
        name: 'ROUTE DRAWING',
        tool: 'Hand-drawn over the plate',
        body: 'The flight path drawn directly onto the city art with numbered waypoints, then used as a position reference. Geometry only, no style.',
      },
      {
        num: '04',
        name: 'REFERENCE LOCK',
        tool: 'Higgsfield library',
        body: 'One tag per identity, one for the city, one for the route. The route reference is attached last so the painted plate wins the style vote.',
      },
      {
        num: '05',
        name: 'SHOT DESIGN',
        tool: 'cinedance',
        body: 'Every block written as an engineering document: first frame, blocking, lens, timed action, physics, lighting, audio. Chase-camera distance stated in metres.',
      },
      {
        num: '06',
        name: 'PERFORMANCE',
        tool: 'tig-acting-task',
        body: 'The pilot is given something to do with her eyes at every beat: reading the gap, checking the wing, measuring the enforcer. Nothing is played as expression.',
      },
      {
        num: '07',
        name: 'GENERATION',
        tool: 'Seedance 2.0 via Claude x Higgsfield MCP',
        body: 'Batches fired from chat, jobs polled in the same thread, candidates returned inline. The route reference travels with every flight block.',
      },
      {
        num: '08',
        name: 'SELECTION',
        tool: 'Review pass',
        body: 'Blocks judged on direction of travel, wing geometry, rider scale and light continuity. Anything that flipped the travel direction was dropped on sight.',
      },
      {
        num: '09',
        name: 'FINISH',
        tool: 'Grade and sound',
        body: 'Warm gold held against the cold blue of the core, speed ramps on two turns, wind and impact laid under the flight.',
      },
    ],
    pipelineNote: "THE ROUTE DRAWING IS THE ONLY STAGE THAT LEFT THE SCREEN. EVERYTHING ELSE RAN IN ONE THREAD.",
    tools: [
      {
        name: 'Seedance 2.0',
        role: 'Video model',
        body: 'Image-to-video with native sound. Chosen here for sustained camera motion: the flight blocks hold a chase position for five seconds at a time without the frame falling apart.',
      },
      {
        name: 'ChatGPT Image 2',
        role: 'Design',
        body: 'Pilot and glider sheet, enforcer sheet, city plate. Held a painterly finish across every pass, which is what the video model reads back as a style vote.',
      },
      {
        name: 'Claude x Higgsfield MCP',
        role: 'Control layer',
        body: 'Prompts written, batched, submitted, polled and reviewed in one conversation, with the reference library addressed by tag.',
      },
      {
        name: 'Edit and grade',
        role: 'Finish',
        body: 'Assembly on motion, two speed ramps, grade and sound layup.',
      },
    ],
    skills: [
      {
        name: 'tig-scene-engine',
        role: 'Structure',
        body: 'Goal, obstacle, tactic, reversal, value shift, applied with bespoke definitions. Used to place the reversal on the landing instead of somewhere in the air.',
      },
      {
        name: 'tig-acting-task',
        role: 'Performance',
        body: 'Acting written as an invested tactic. A small animal-featured character reads as a person only when the eyes are given work, so every ground beat states what she is reading.',
      },
      {
        name: 'cinedance',
        role: 'Prompt direction',
        body: 'Turns a beat into a production-ready Seedance prompt: blocking, optics, timing, physics, lighting locks, audio. Chase-camera work lives or dies on the distance and height being written down.',
      },
    ],
    stackNote: 'Speed is written, not wished for. Metres, seconds and one direction of travel.',
    look: [
      {
        key: 'Animation style',
        lines: [
          'Painterly fantasy realism. Rendered volumes, soft edges, visible brush character in the architecture and cloud.',
          'Motion blur is allowed on the flight and pulled back on the ground fight so impacts stay readable.',
          'The rider animates against the machine: she leans before it banks, and she settles after it stops.',
        ],
      },
      {
        key: 'Palette',
        lines: [
          'Warm brass and stone against cold blue arcane light. Violet is held back for the sky and the vortex.',
          'The glider core is the brightest point in almost every frame and works as the eye anchor through the cuts.',
          'Enforcer armour stays desaturated so the blue charge reads against it.',
        ],
      },
      {
        key: 'Camera grammar',
        lines: [
          'Flight is chase camera at a stated distance and height. Ground work is handheld at knee to chest level.',
          'Travel runs screen-left to screen-right for the whole flight, which is what lets five blocks cut as one run.',
          'Every low angle on the terrace is there to report the size difference between the two fighters.',
        ],
      },
      {
        key: 'Scale',
        lines: [
          'The pilot is 92cm and the enforcers are 220cm, and no frame is allowed to forget it.',
          'Architecture is framed with a human-sized element in shot so the city keeps its size.',
          'The glider stays 1.8m long against every landmark it passes.',
        ],
      },
    ],
    lookNote: "The city only feels enormous while something small is flying through it.",
    locks: [
      {
        name: 'Direction flipping',
        symptom: 'The glider reversed its travel direction between blocks, which broke the run into unrelated shots.',
        lock: 'The drawn route attached as a position reference to every flight block, plus one written line fixing travel from screen-left to screen-right.',
      },
      {
        name: 'Scale collapse',
        symptom: 'The pilot grew towards human height whenever she was framed alone with the machine.',
        lock: 'Height stated in numbers for both characters, and a landmark of known size kept in frame on every wide.',
      },
      {
        name: 'Rider and machine drift',
        symptom: 'The rider and the glider were treated as two unrelated references and stopped matching.',
        lock: 'Both designed on a single sheet and described together in one anchor line, with the seated position named.',
      },
      {
        name: 'Style bleed from the map',
        symptom: 'The route drawing tried to enter the shot as a graphic look.',
        lock: 'The route reference attached last and described in positive terms only, with style ownership handed to the city plate and the character sheets.',
      },
      {
        name: 'Mushy impacts',
        symptom: 'Blade hits and landings read soft, with everything moving at the same weight.',
        lock: 'Physics written per block: what carries momentum, what breaks, what gives underfoot, and in which order the weight lands.',
      },
      {
        name: 'Empty first frame',
        symptom: 'Flight blocks opened on scenery and lost a second before the machine appeared.',
        lock: 'First frame occupancy stated at the top of the blocking section. The glider is in shot and already moving at 0:00.',
      },
    ],
    doc: {
      path: '/docs/Skyrunner_Process_TaleCrafters.pdf',
      title: 'Skyrunner, the process document',
      summary:
        'Eleven wide-format sheets covering the whole build. The story spine and the beat map, the three design plates and the scale gap they lock, the hand-drawn route and how it is written into a prompt, the nine pipeline stages, the stack, all six shot prompts as written for Seedance, the look rules that hold six blocks together, and the six failure modes with the instruction that closed each one.',
    },
  },
];

export const findFilm = (slug: string): Film | undefined => films.find((f) => f.slug === slug);

// A beat with no still or no prompt would render a hole in the page, and Frame
// would fail later with a less useful message than this one.
{
  const bad = films.flatMap((f) =>
    f.beats
      .filter((b) => !b.image || !b.alt || !b.prompt)
      .map((b) => `${f.slug}/${b.letter}`)
  );
  if (bad.length) {
    throw new Error(`Film beats missing a still, alt text or a prompt: ${bad.join(', ')}`);
  }
}
