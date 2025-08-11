---
description: "A series: What is Three.js? Froggy's Journey into the Wonderful World of Browser 3D."
pubDate: 2025-08-08T00:00:00.000Z
recommended: true
tags:
  - tags.tech.threejs
  - tags.genre.tech-light-novel
title: "Episode 5: Is the Scene Inevitable? The True Relationship with WebGL"
---

## What is Three.js? Froggy's Journey into the Wonderful World of Browser 3D

### Note

This story is written with the assistance of generative AI for the purpose of making Three.js learning enjoyable.
While we pay careful attention to the accuracy of technical information, we cannot guarantee that all content is completely accurate.
Please use this as a supplementary learning tool and enjoy it with a relaxed mindset.

---

### Characters

*   **Froggy:** An energetic young frog who recently started learning programming. While there's still so much he doesn't know, his curiosity knows no bounds. Known for his distinctive "~ribbit" speech pattern.
*   **Professor Saburo:** A knowledgeable professor who is very well-versed in 3D graphics and web technologies. He kindly answers any question with patience.

---

### Episode 5: Is the Scene Inevitable? The True Relationship with WebGL

**Froggy:** "Professor, that scene graph discussion last time was really fascinating, ribbit. Building a world with parent-child relationships is such an amazing idea, ribbit. But it sparked a new question, ribbit."

**Professor Saburo:** "Oh? What kind of question?"

**Froggy:** "Is this concept of 'scene' and 'scene graph' something special that Three.js created, ribbit? Or is it something 'inevitable' that anyone doing 3D graphics would eventually arrive at, no matter how they approached it, ribbit?"

**Professor Saburo:** "Froggy, that's an excellent question that gets to the heart of the matter! Let me give you the conclusion first. Scene graphs are a **universal and inevitable design philosophy in modern real-time 3D graphics**. They're not at all a unique idea exclusive to Three.js."

**Froggy:** "So it really was 'inevitable,' ribbit!?"

**Professor Saburo:** "Indeed. For example, world-famous game engines like **Unity** and **Unreal Engine**, and professional 3D creation software like **Blender** and **Maya** all use this hierarchical structure of scene graphs as their core for managing worlds, though they may call it different names or have different details. That's how powerful and rational this approach is."

**Froggy:** "I see... But then, that 'magic spell' **WebGL** from our previous discussions must naturally have the concept of scenes too, ribbit?"

**Professor Saburo:** "No, Froggy. This is the most crucial point. **WebGL has absolutely no concept of scenes whatsoever.**"

**Froggy:** "Whaaaat!? What do you mean, ribbit!? Then what is WebGL doing, ribbit!?"

**Professor Saburo:** "Calm down and listen. WebGL is a much more 'low-level' and 'raw' worker than we might think. WebGL only understands extremely primitive commands:"

*   **Vertex Lists:** Just arrays of numbers saying 'Here's a collection of points with these coordinates.'
*   **Shaders:** Calculation programs that say 'Connect those points with lines to make surfaces and paint pixels, but what calculation formula should we use to determine the colors?'
*   **Transformation Matrices:** Sets of numbers for calculations that say 'Transform those points by warping them with this matrix.'

**Professor Saburo:** "WebGL knows nothing about 'cubes,' 'parent-child relationships,' or 'lights.' It's just an ultra-high-performance 'drawing machine' that silently draws triangles and fills pixels according to the massive coordinate data and calculation formulas it's given."

**Froggy:** "I... I had no idea, ribbit... So if we didn't have Three.js (scene graphs), what would happen to us, ribbit?"

**Professor Saburo:** "We'd see hell. For example, let's say we want to animate Earth orbiting around the Sun. With a scene graph, we just 'rotate Earth a little bit' and we're done. But without a scene graph, this is what would happen:"

1.  You'd have to remember 'Earth's current angle from the Sun's center' yourself.
2.  Use that angle to calculate Earth's new XYZ coordinates (world coordinates) with trigonometry.
3.  Based on Earth's new position, calculate the Moon's relative position with more trigonometry to determine the Moon's final world coordinates.
4.  Then send that calculated coordinate list to WebGL every frame saying 'please draw triangles at these coordinates.'

**Professor Saburo:** "What if you had thousands or tens of thousands of objects...? Just thinking about it makes your head spin, doesn't it?"

**Froggy:** "Ugh... my brain is about to explode, ribbit... Without scene graphs, I'd have to calculate the absolute position of everything in the world every frame myself, ribbit..."

**Professor Saburo:** "Exactly! The greatness of scene graphs lies in how they automatically handle all of that most tedious and complex part - the 'world coordinate calculations.' We just need to describe **local (relative) changes** like 'rotate Earth a little bit,' and the scene graph takes care of making everything else consistent."

**Froggy:** "Ahhhh, I see now, ribbit... That's why it was 'inevitable,' ribbit. Scene graphs were the one and only solution for humans to properly handle complex 3D spaces, ribbit."

**Professor Saburo:** "Exactly right, Froggy. And that's where Three.js's true value lies. Three.js made it possible to control WebGL - that raw drawing machine - using the powerful 'world blueprint' that is the scene graph. It's the best 'site supervisor' standing between us developers and low-level WebGL."

**Froggy:** "A site supervisor! What a perfect analogy, ribbit! Thank you again today, Professor, ribbit! I now truly understand from the bottom of my heart the real relationship between Three.js and WebGL, ribbit! Hop hop hop!"

---
*(To be continued in Episode 6)*
