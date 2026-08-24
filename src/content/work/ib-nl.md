---
title: One move, tulip field to orbit
client: IB-NL
kind: Client
year: '2026'
place: The Netherlands
order: 2
problem: A consultancy needed to say it works out of the Netherlands and operates worldwide, without a word of voiceover.

brief: |
  IB-NL places Dutch expertise with businesses outside the Netherlands. The line under the mark is where Dutch expertise meets global business, and the whole job was to make that line land as a picture before anybody reads it.

  A corporate consultancy has the same three options every time: stock footage of a handshake, a map with arcs on it, or a presenter. All three have been used so often that they carry no information.

constraint: |
  Two ideas had to sit in one film without a narrator holding them together. Dutch, specifically and recognisably. Global, at a scale no drone reaches.

  There is no camera move that covers that distance. A helicopter cannot leave the atmosphere and a satellite cannot read a windmill. Either you cut between the two and lose the connection, or you find something that holds both ends of it.

built: |
  A continuous pull. It opens on a polder at sunrise, tulip rows and working windmills along a canal, and it does not cut. The camera keeps rising through Amsterdam at dusk, past the canal ring, until the coastline goes flat and the Netherlands is a lit smudge on a night side of Europe seen from orbit.

  The back half comes down again somewhere else: a tower window, a boardroom above a skyline that is plainly not Dutch, and a world map with one country lit.

  The argument is in the move. Nobody says the word global because the camera has already done it.

how: |
  Phantom Set, run as one continuous set instead of one product.

  The specification was written before anything rendered, and it fixed the things a viewer notices when they break: sun position, time of day and the direction of the light at every altitude. A pull that starts at sunrise and arrives at night has to travel through the terminator, so the light change is the story and not a mistake.

  Each altitude band got its own plate: field level, city level, coastal, orbital. Frames were generated from the plate above and the plate below, so the seam between two bands is a match on the horizon line and the colour of the sky, and no two bands drift into different weather.

  The geography gate is the one that applies here. Anybody who lives in the Netherlands knows what the canal ring looks like from the air, and a country shaped almost right is worse than a country not shown. Every land mass on screen was checked against a reference before it went into the cut, and the orbital frames were checked twice, because that is where a model is most confident and most wrong.

landed: |
  Delivered as the client's brand film.

hero: ib-nl/tulips
heroAlt: A polder at sunrise seen from the air, rows of red, orange and pink tulips in blocks beside a canal, a line of windmills receding along the bank and mist lying over the fields.

gallery:
  - src: ib-nl/amsterdam
    alt: Amsterdam from high above at dusk, the canal ring lit in warm orange against blue water, the river and the coast visible at the top of the frame.
    label: city band
  - src: ib-nl/orbit
    alt: Europe at night seen from orbit, city lights picked out across the continent, the curve of the Earth against black space.
    label: orbital band, the seam that had to match
  - src: ib-nl/boardroom
    alt: An empty boardroom high in a tower, long dark table set with glasses, floor to ceiling windows onto a skyline of high rise buildings.
    label: the descent, somewhere else
  - src: ib-nl/map
    alt: A dark world map in thin gold outline with the Netherlands lit in warm yellow, everything else left unlit.
    label: end frame

stack:
  - stage: Set specification
    tool: Written once, sun position fixed per altitude
  - stage: Plates
    tool: Nano Banana Pro, one per altitude band
  - stage: Motion
    tool: Higgsfield Cinema Studio
  - stage: Cut
    tool: CapCut

links: []
---
