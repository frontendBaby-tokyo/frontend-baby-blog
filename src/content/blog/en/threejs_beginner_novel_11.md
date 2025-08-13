---
description: "A series: What is Three.js? Froggy's Journey into the Wonderful World of Browser 3D."
pubDate: 2025-08-08T15:00:00.000Z
recommended: false
tags:
  - tags.tech.threejs
  - tags.genre.tech-light-novel
title: "Episode 11: Object Anatomy! The Duet of Geometry and Material"
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

### Episode 11: Object Anatomy! The Duet of Geometry and Material

**Froggy:** "Professor! That `new THREE.Mesh()` command I've been using... what exactly is it, ribbit? That green solid box doesn't actually exist inside the computer, right, ribbit...? It won't start moving around on its own in the middle of the night, will it, ribbit?"

**Professor Saburo:** "Ha ha ha! Don't worry, Froggy. The only things that move around at night are code bugs or things in your dreams. But that's a wonderful question. It seems it's time to approach the essence, the very soul of 3D objects."

### Objects are Made of 'Soul' and 'Body'

**Professor Saburo:** "Let me start with the conclusion. What we call 'objects' - these `Mesh` entities - are not singular beings. They're dual beings that can only exist when two elements come together."

*   **Geometry:** The object's **'soul'** that defines its **'shape'**.
*   **Material:** The object's **'body'** that defines its **'appearance'**.

**Professor Saburo:** "The command `new THREE.Mesh(geometry, material)` is precisely a ritual that binds 'soul' and 'body' together to birth a new life. A soul (Geometry) alone would be like an invisible ghost. A body (Material) alone would just be a paint stain without form. Only with both together does an object appear before our eyes."

**Froggy:** "Soul and body! How romantic, ribbit! So what's inside that 'soul' - the geometry, ribbit?"

### Anatomy of Geometry: A Soul Made of Numbers

**Professor Saburo:** "Listen well, Froggy. Geometry isn't a solid lump of clay packed full. It's the **ultimate hollow shell** made of countless triangular polygons."

**Froggy:** "A hollow shell!?"

**Professor Saburo:** "Yes. And the true identity of that shell is **`BufferGeometry`** - a massive **container of just numerical data**. Inside it, information belonging to each vertex called **`attributes`** is stored as endless lists of numbers."

*   **`position`:** A list of XYZ coordinates for all vertices like 'vertex 1 at coordinate (1,1,1), vertex 2 at coordinate (-1,1,1)...' This is the most important attribute - without it, there's no shape.
*   **`normal`:** Information about surface orientation like 'vertex 1's face points this way, vertex 2's face points that way...' Without this, light calculations can't be performed, resulting in flat appearance. It's like the direction a face is looking.
*   **`uv` (UV coordinates):** 2D coordinates for texture mapping that say 'paste this part of this image onto this triangle.' It's like a pattern for dressing 3D models with textures.

**Froggy:** "I see! Object shapes are ultimately just massive 'lists of numbers,' ribbit! That's a bit disappointing, ribbit..."

**Professor Saburo:** "Haha, but thanks to that, we can freely create any shape we want. And there's more than one way to create them."

### Object Implementation Diversity: Four Stages of Creation

1.  **Primitives (Convenience Combos):** Using basic shapes prepared by Three.js like `BoxGeometry` and `SphereGeometry`. It's a simple and convenient method - order and it comes right out.
2.  **Manual Work (Artisan Craftsmanship):** Defining vertex coordinates yourself as arrays and building `BufferGeometry` from scratch. It's completely handmade so you can create any bizarre shape, but it's incredibly labor-intensive.
3.  **External Tools (Professional Kitchen):** Creating complex models in specialized software like Blender and loading them with `GLTFLoader`. This is the most common and powerful method - like ordering dishes made by professional chefs.
4.  **Procedural (Alchemy):** Having code automatically generate shapes using mathematical formulas and algorithms. Creating different dungeon layouts with the press of a button, generating complex terrain... It's truly magic, or alchemy!

### Three.js Limitations: Boundaries of Illusion

**Froggy:** "So anything is really possible, ribbit!? Are there no limits?"

**Professor Saburo:** "Of course there are! We're not gods, after all. Understanding the limitations of handling 3D in Three.js and browsers is very important."

*   **Performance Limitations (Stomach Capacity Limits):**
    There's naturally a limit to how many vertices a browser can handle at once. If you brought in models with hundreds of millions of polygons like those used in movies, the browser would become too full to move. Always asking 'Could this model go on a diet?' is the mark of a good developer.

*   **Physical Simulation Limitations (Ghost Limitations):**
    Three.js objects are ghost-like beings that pass through each other by default. They don't collide or roll down slopes. To simulate such 'laws of physics,' you need to hire specialized 'physics engines' like bodyguards called Rapier3D or Cannon.js.

*   **Precision Limitations (Shaky Puppy Limitations):**
    The numbers computers handle actually have limits. If you try to create vast cosmic spaces or conversely microscopic worlds, coordinate calculations gradually become inaccurate. As a result, distant objects start shaking, or overlapping surfaces flicker (Z-fighting) - like a puppy that's had too much caffeine.

**Froggy:** "I see, ribbit... There are things you can do and things you can't do (or things you can't do without hiring specialists), ribbit. Everything from the true nature of objects to their limitations is now clear, ribbit!"

**Professor Saburo:** "Exactly right. Objects are 'digital life forms' we create by giving souls made of numbers bodies of light calculation formulas. Understanding that essence will expand your creative possibilities infinitely."

**Froggy:** "Digital life forms! So cool, ribbit! I'm going to create my own ultimate digital life form, ribbit!"

---
*(To be continued in Episode 12)*
