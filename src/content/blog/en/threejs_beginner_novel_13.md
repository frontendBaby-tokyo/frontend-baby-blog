---
description: "A series: What is Three.js? Froggy's Journey into the Wonderful World of Browser 3D."
pubDate: 2025-08-08T20:00:00.000Z
recommended: false
tags:
  - tags.tech.threejs
  - tags.genre.tech-light-novel
title: "Episode 13: Sprites - They're Always Looking at You"
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

### Episode 13: Sprites - They're Always Looking at You

One sunny afternoon, Froggy was reflecting on everything he'd learned so far, his heart swelling with enthusiasm for exploring new forms of expression.

**Froggy:** "Hello, Professor Saburo, ribbit!"

**Professor Saburo:** "Hello there, Froggy. You look quite cheerful today."

**Froggy:** "Hehe. That's because I've learned to do so many things - meshes, materials, lights, cameras, ribbit! But I want to try even more interesting expressions. Something like... magical methods that are different from everything I've learned so far - don't they exist, ribbit?"

**Professor Saburo:** "Oh, what wonderful curiosity. Magic, you say. Very well, today I'll teach you about 'Sprites' - perfect for someone like you."

**Froggy:** "Sprites? That sounds like a refreshing drink, ribbit. Or maybe those tiny fairies from games?"

**Professor Saburo:** "Haha, interesting ideas. You might not be entirely wrong. Sprites in Three.js are objects with a very special and useful property - they always face the camera."

**Froggy:** "Always face the camera...? What does that mean, ribbit?"

**Professor Saburo:** "For example, do you remember the `BoxGeometry` - the box geometry we've been making? When you moved the camera around it, you could properly see its back side, right?"

**Froggy:** "Yeah, for sure. When I spun it around, I could see the back side properly, ribbit."

**Professor Saburo:** "But sprites are different. No matter where you move your camera, sprites dutifully rotate to always show their front face to you. Like sunflowers that always chase the direction of the sun."

**Froggy:** "Wow! They're shy guys who never show their profile, ribbit!?"

**Professor Saburo:** "That's right. This property of 'always facing the camera' makes sprites very powerful tools."

**Froggy:** "When is this useful, ribbit?"

**Professor Saburo:** "Excellent question. For example, particle effects. When you want to express things like rain, snow, fire sparks, or stardust, creating each one as a realistic 3D model would put tremendous load on the computer."

**Froggy:** "Yeah yeah, placing lots of them would make things choppy, ribbit."

**Professor Saburo:** "That's where sprites come in. They're just flat rectangles with textures applied, but because they always face us, they don't look flat and appear convincing. Moreover, since they don't have geometry (shape), they're much lighter than meshes. You can place thousands or tens of thousands while maintaining performance."

**Froggy:** "I see! They could be used for distant trees too, ribbit! Instead of 3D models, placing sprites with tree photos or illustrations would look convincing and be lightweight, ribbit!"

**Professor Saburo:** "Exactly! That's precisely the technique called billboarding. Also, character names and HP bars displayed above characters in games - those are often implemented with sprites too. They need to be readable from any angle."

**Froggy:** "Got it, ribbit! Sprites are lightweight, can be placed in large numbers, and always face us, making them perfect for particle effects, distant objects, and UI displays, ribbit! Hop hop!"

Froggy got excited and started hopping on the spot.

**Professor Saburo:** "Quick to understand. They're easy to create too. You just specify the texture (image) you want to display in a dedicated material called `SpriteMaterial`, then pass it to `new THREE.Sprite()`. You don't need geometry like `BoxGeometry`."

```javascript
// Create material
const spriteMaterial = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load('path/to/your/image.png')
});

// Create sprite
const sprite = new THREE.Sprite(spriteMaterial);

// Add to scene
scene.add(sprite);
```

**Froggy:** "Wow, so simple, ribbit! I could make these right away, ribbit! Sprites are such a clever mechanism! With these, I could vividly express countless stars twinkling in the night sky or swarms of fireflies dancing in meadows, ribbit!"

**Professor Saburo:** "Indeed. With creativity, your expressive possibilities will expand dramatically."

Having gained sprites as a new magic wand, Froggy's mind was already filled with sparkling particles and cheerful icons bouncing around energetically.

---
*(To be continued in Episode 14)*
