---
description: "A series: What is Three.js? Froggy's Journey into the Wonderful World of Browser 3D."
pubDate: 2025-08-08T22:00:00.000Z
recommended: false
tags:
  - tags.tech.threejs
  - tags.genre.tech-light-novel
title: "Episode 14: Drawing Text with Sprites and Canvas!"
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

### Episode 14: Drawing Text with Sprites and Canvas!

**Froggy:** "Professor, Professor! Sprites are so interesting, ribbit! I can now make lots of sparkling particles fly around!"

Froggy had been playing around with the sprites that Professor Saburo taught him last time, moving lots of particles around on screen.

**Professor Saburo:** "Oh, that's wonderful. Sprites are lightweight and can be placed in large numbers, making them perfect for particle effects."

**Froggy:** "Yeah! But instead of just having them sparkle, I think it would be more interesting if I could display messages on these particles, ribbit. Like 'Hello!' or 'Well done!'"

**Professor Saburo:** "I see, that's a brilliant idea. It's certainly possible. There's a technique using **canvas** to display text on sprites."

**Froggy:** "Canvas? That sounds difficult, ribbit..."

**Professor Saburo:** "Hehe, don't worry. Canvas is like a 'drawing board.'"

**Froggy:** "A drawing board?"

**Professor Saburo:** "Yes. First, you prepare an invisible drawing board in your program that doesn't display directly on screen, and draw your desired text on it."

**Froggy:** "I see! It's like writing text with colored pens on transparent paper, then cutting it out and pasting it onto sprites, ribbit!"

**Professor Saburo:** "Exactly right! You understand quickly. Then you attach that drawing board with the text drawn on it to the sprite as an image (texture), and you're done."

**Froggy:** "Wow! That sounds fun, ribbit!"

**Professor Saburo:** "Let's take a peek at what's happening inside the computer, shall we?"

**Froggy:** "Yeah, I want to know, ribbit!"

**Professor Saburo:** "First, drawing text on canvas is handled by the CPU - the computer's brain. This is somewhat brain-intensive work, calculating the shape and color of text."

**Froggy:** "I see, I see. The CPU designs the text for us."

**Professor Saburo:** "Then, the completed text image is sent to the GPU - the graphics specialist device. The GPU excels at rendering many sprites at high speed."

**Froggy:** "I understand! The CPU designs the text, the GPU pastes it onto sprites and displays it on screen, ribbit! They're working together - so smart, ribbit!"

**Professor Saburo:** "Exactly. Now let's look at the actual code."

```javascript
// Create canvas element
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

// Draw text on canvas (handled by CPU)
context.font = 'bold 40px Arial';
context.fillStyle = 'white';
context.textAlign = 'center';
context.fillText('Hello, Sprite!', canvas.width / 2, canvas.height / 2);

// Generate texture from canvas and send to GPU
const texture = new THREE.CanvasTexture(canvas);

// Create sprite material
const spriteMaterial = new THREE.SpriteMaterial({
  map: texture,
  transparent: true, // Make background transparent
});

// Create sprite (rendered by GPU)
const sprite = new THREE.Sprite(spriteMaterial);
scene.add(sprite);
```

**Froggy:** "Wow, it really works, ribbit! With this, I could display character names above their heads, show item descriptions nearby, display game scores, and do all sorts of things, ribbit!"

**Professor Saburo:** "That's right. Moreover, with this method, you can dynamically change text through programming. For example, you can change character dialogue based on situations or update scores in real-time."

**Froggy:** "Amazing! Sprites really are like magic, ribbit! Now I can create even more interesting things, ribbit! Hop hop!"

Froggy's heart raced with the possibilities of new expressions, and he hopped around excitedly.

---
*(To be continued in Episode 15)*
