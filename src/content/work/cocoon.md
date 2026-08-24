---
title: COCOON
client: SEleNe CC
kind: Client
year: '2025'
place: Horizon Europe, grant 101120221
order: 6
problem: A grid cyberattack had to be explained to people who do not work on grids.

brief: |
  COCOON is a Horizon Europe project on cooperative cyber protection for modern power grids, run across a consortium. SEleNe CC brought me in for the moving pieces: a project promo, two pilot films and an explainer on how an attack reaches a substation.

  The audience is mixed. Some of it is engineers on the consortium. The rest is policy people, reviewers and the public, who need the same story without the vocabulary.

constraint: |
  Nothing could be shot. Live substations, control rooms and pilot sites are not places a camera crew walks into, and the attack being described has never happened to the equipment on screen.

  The material was a grant document and a set of technical diagrams. That is the whole source. Every frame had to come out of reading, and every claim on screen had to survive a consortium partner who knows the subject better than I do.

built: |
  A project promo, two pilot films and a vector attack explainer that walks the route an intrusion takes through a grid, one hop at a time.

  The explainer is the piece that mattered. It holds one visual system from the first frame to the last, so a viewer who does not know what a substation is can still follow which box just went dark and why.

how: |
  This one ran on the writing, not on the generation.

  The grant text and the technical diagrams got read down into a single sequence of events, then storyboarded as a chain: entry point, lateral move, control layer, physical effect. One diagram vocabulary, agreed early, held across all four pieces. Colour carries state and nothing else, so a partner can point at a frame and say which stage is wrong.

  Generation covered the environments, the establishing shots and the abstracted grid, and every technical claim went back to the consortium before it went into a render. The claim gate is the one that applies here: nothing appears on screen that the grant text does not support.

landed: |
  Delivered to SEleNe CC for the COCOON consortium. The project is publicly documented under Horizon Europe grant agreement 101120221.

hero: selene-cc/explainer-title
heroAlt: The title card of the vector attack explainer, reading Attack Vector Deployment in cyan display type over a dark network mesh, with the COCOON mark above it.

gallery:
  - src: selene-cc/explainer-spoof
    alt: An explainer frame headed DNS Spoofing, with two paragraphs setting out how an attacker redirects an operator to a fraudulent site.
    label: the scenario, stated before it is drawn
  - src: selene-cc/explainer-chain
    alt: 'The full attack diagram: a hacker icon above a DNS server, a dashed line from an operator into the server, a red path branching to a fake website and a green path to the real one.'
    label: one vocabulary, colour carries state
  - src: selene-cc/logo-dark
    alt: The COCOON project mark, a stylised power pylon and solar panel inside a green cocoon, with the line Cooperative Cyber Protection for Modern Power Grids around it.
    label: consortium mark, supplied

stack:
  - stage: Source
    tool: Grant text and consortium diagrams
  - stage: Storyboard
    tool: Written, then boarded by hand
  - stage: Frames
    tool: Nano Banana Pro
  - stage: Motion and assembly
    tool: Higgsfield, CapCut

links:
  - label: cyber-cocoon.eu
    href: https://cyber-cocoon.eu/
---
