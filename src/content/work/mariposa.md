---
title: Mariposa
client: Mariposa
kind: Client
year: '2026'
place: Rhodes, Greece
order: 1
problem: A restaurant needed a site, a film and pictures of dishes nobody had photographed.

brief: |
  A restaurant on Rhodes needed a site and a set of moving pieces to run alongside it. I took the whole thing: the website, the film, the script and the stills.

  The site is live and the kitchen is real, which sets the standard. Everything I made had to survive a customer sitting down and being handed the actual plate.

constraint: |
  The restaurant already had photography of its own, shot on the terrace under real light. It covers part of the menu and no more, and it is honest work, which sets a floor that anything generated has to clear without announcing itself.

  That floor is the hard part. A generated plate that looks better than the kitchen is a lie, and a plate that does not exist on the pass is worse than no picture at all. The work was making images of these dishes, at this restaurant, that a diner would recognise when the plate arrived.

built: |
  A WordPress site, built and shipped. A ninety-second VSL script. Short vertical pieces for social, including an establishing film and a run of plate close-ups. Generated stills covering the dishes the camera never reached.

  The film went the other way. It is drawn: a garden, a fire, a plate and a long day by the water, in the warm palette the room already has. A restaurant film that tries to look like the restaurant invites the comparison every second it runs. An openly illustrated one is free of that.

  The frames below run in two sets. The first is from the film. The second is the restaurant's own photography, which sits in the case study because it is the reference: the crockery, the plating, the pomegranate on the salad and the quality of the light on that terrace. Every generated frame was measured against it.

how: |
  Phantom Set, which is the pipeline I use whenever the subject is a real object that somebody can hold up against the picture.

  One master plate per dish, locked first: the crockery, the garnish, the light, the angle. Every later frame gets generated from that plate instead of from a fresh prompt, so the plating cannot wander between shots. Two gates do most of the work. The label gate means zooming to full resolution and reading every word on anything printed in frame, and a fail sends the shot back to the master plate instead of into a retouching tool. The silhouette gate means laying the render over the master plate at forty per cent opacity, where any shift in the outline of the plate kills the frame.

  The last gate is not technical. Somebody from the kitchen looks at the dish and says whether it is theirs.

landed: |
  Live at mariposa.restaurant, site and film together.

hero: mariposa/dinner-mariposa
heroAlt: The terrace at Mariposa after dark, with wooden decking, cane shades, planting overhead and a lit table in the middle distance.

gallery:
  - src: mariposa/film-01
    alt: 'A frame from the film: a drawn kitchen garden in flat warm colour, a row of young vegetables in dark soil under two bands of green field, one tall plant in white flower above them and a yellow butterfly in the air beside it.'
    label: from the film
  - src: mariposa/film-02
    alt: 'A frame from the film: a drawn octopus over glowing orange coals in the dark, titled Grilled Octopus.'
    focus: 45% 50%
    label: from the film
  - src: mariposa/film-03
    alt: 'A frame from the film: a drawn white plate of saffron risotto crowned with a single scampi on a deep yellow ground, headed Carnaroli and Saffron.'
    focus: 72% 50%
    label: from the film
  - src: mariposa/film-04
    alt: 'A frame from the film: the end card, the word Mariposa in cream serif with two butterfly wings above it and the line the hidden gem above the Aegean underneath.'
    label: from the film, end card
  - src: mariposa/mariposa-mousaka
    alt: A slice of moussaka on a white plate, photographed on the restaurant terrace in daylight with a wine glass behind it.
    label: reference plate, shot on site
  - src: mariposa/shrimp-mariposa
    alt: Shrimp on a saffron risotto in a dark bowl, topped with basil and cracked pepper, photographed from above.
    label: reference plate, shot on site
  - src: mariposa/beef-stifado
    alt: Beef stifado in a dark sauce in a metal bowl, under a nest of shoestring fries and a sprig of rosemary, a long slice of grilled bread beside it.
    label: reference plate, shot on site
  - src: mariposa/food-01
    alt: Grilled cheese over rocket, tomato and pomegranate on a wide white plate, photographed at the table.
    label: reference plate, shot on site
  - src: mariposa/food-02
    alt: Grilled octopus curled over yellow fava purée in a stone bowl, topped with pickled onion and dill, photographed at the table at night with a glass of white wine behind it.
    label: reference plate, and the dish the drawn octopus was measured against

stack:
  - stage: Master plate
    tool: Nano Banana Pro
  - stage: Variations
    tool: Nano Banana Pro, image to image from the plate
  - stage: Motion
    tool: Higgsfield Cinema Studio
  - stage: Cut
    tool: CapCut
  - stage: Site
    tool: WordPress, Figma, Claude Code

links:
  - label: mariposa.restaurant
    href: https://mariposa.restaurant/
---
