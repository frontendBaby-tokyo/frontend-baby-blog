---
description: "A series: What is Three.js? Froggy's Journey into the Wonderful World of Browser 3D."
pubDate: 2025-08-08T05:00:00.000Z
recommended: false
tags:
  - tags.tech.threejs
  - tags.genre.tech-light-novel
title: "Episode 7: The Final Worker! Exposing Everything About the Renderer"
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

### Episode 7: The Final Worker! Exposing Everything About the Renderer

**Froggy:** "Professor! We've learned so much about scenes, cameras, objects... but the biggest mystery left is that single line `renderer.render(scene, camera)`, ribbit! This 'renderer' is the final worker that brings everything to the screen... Today I want to completely expose its true identity, ribbit!"

**Professor Saburo:** "Ha ha ha, Froggy, what tremendous determination! It feels like you're ready to take on the final boss. Very well, today I'll tell you everything about the renderer. The renderer isn't just a 'painter.' It's the 'site supervisor' for the entire scene and the sole 'commander' for the GPU."

**Froggy:** "A commander! That sounds so cool, ribbit! What kind of work does this commander do after the `render` command is issued, ribbit?"

**Professor Saburo:** "Alright, let's look at the commander's workflow step by step. This is a grand collaboration between the CPU (brain) and GPU (ultra-skilled drawing specialist)."

### The Renderer's Processing Flow: A Grand Relay

**Professor Saburo:** "When `renderer.render(scene, camera)` is called, thorough preparation begins on the CPU side first."

**Step 1: Frustum Culling**
"First, objects that don't fall within the camera's field of view (frustum) are completely excluded from rendering. Objects too far to see, too far to the side to see - calculating those would be wasteful. This is the initial sorting work."

**Froggy:** "I see! An efficient commander who doesn't do unnecessary work, ribbit."

**Step 2: Scene Graph Analysis and Matrix Calculations**
"Next, it traces the parent-child relationships of the remaining objects and calculates each one's final world coordinates. This is what we learned in Episodes 4 and 5."

**Step 3: Major Translation to WebGL Commands**
"Here's where the commander shows their skills. They translate scene information that humans can understand into WebGL language that only the GPU can comprehend."
*   **Geometry (shapes)** becomes → **Vertex buffers (arrays of coordinate numbers)**
*   **Materials** become → **Shaders (calculation programs for how to paint pixels)**
*   **Object positions, colors, and light information** become → **Uniform variables (settings passed to shaders)**

**Froggy:** "Wow, everything gets translated into separate parts here, ribbit..."

**Step 4: Issuing Commands to GPU (Draw Calls)**
"The translated parts are transferred to the GPU, and commands like 'use this vertex data and this shader to draw triangles!' are issued. These commands are called **Draw Calls**. This is the CPU's final job."

**Step 5: Massively Parallel Computing by GPU**
"The GPU receiving the commands shows its true power. Thousands of small processors simultaneously, in parallel, calculate vertex positions, create countless triangles, and compute what color to paint which pixels at incredible speed."

**Step 6: Final Drawing to Canvas**
"When the calculations are complete, a finished 2D image is generated. The renderer transfers that image to the HTML `<canvas>` element, and it finally appears to our eyes as a picture."

**Froggy:** "Whoa... Behind that single line we wrote, such a grand relay was taking place... I'm so moved I'm speechless, ribbit..."

### Performance and What Developers Should Know

**Froggy:** "But Professor, with such complex processing happening, why does it run so smoothly in browsers, ribbit? Is performance okay, ribbit?"

**Professor Saburo:** "Good question. Thanks to WebGL and GPU, this processing is surprisingly fast. But it's not invincible. It's very important for developers to be conscious of performance. And the bottleneck (where processing gets stuck) is often not the GPU's calculation speed itself, but **the number of draw calls in Step 4**."

**Froggy:** "Draw calls!? The number of commands to the GPU, ribbit?"

**Professor Saburo:** "Exactly. Issuing commands from CPU to GPU is actually quite expensive processing. Imagine a commander giving individual orders to each soldier. If there were 10,000 soldiers, just giving orders would take all day, right? Even though the GPU soldiers are super capable, if the commander gives too many orders, the whole operation slows down."

**Froggy:** "I see! So what should developers do, ribbit?"

**Professor Saburo:** "There are several points we should keep in mind to help the commander (renderer) work efficiently."

1.  **Reduce Draw Calls:** This is most important. For example, instead of issuing 1000 commands to draw 1000 objects of the same shape, issue one command saying 'draw objects of this shape at these 1000 locations all at once!' (**InstancedMesh**). Or programmatically merge multiple objects into one (**geometry merging**). This is the best consideration we can show our commander.

2.  **Manage Polygon Count and Texture Size:** Basic 3D principles. Unnecessarily detailed models or overly large images increase the amount of data sent to the GPU and reduce performance.

3.  **Know That Lights and Shadows Are High-Cost:** Especially dynamic shadow calculations from moving objects are among the most computationally expensive tasks for the renderer. It's important to consider whether they're truly necessary.

4.  **Understand Renderer Options:** Settings like `new THREE.WebGLRenderer({ antialias: true })` enable antialiasing (smoothing jagged edges) for better visuals but slightly increase load. Also, `renderer.setPixelRatio(window.devicePixelRatio)` makes displays crisp on high-resolution screens but increases the number of pixels to render. It's important to know these are trade-off relationships.

**Froggy:** "Whoa! Using the renderer effectively means managing the commander well, ribbit! Now that I understand the performance mysteries too, I feel like everything about Three.js is connected, ribbit! Thank you so much, Professor, ribbit! Hop hop hop!"

**Professor Saburo:** "Well done making it this far, Froggy. You're now a proper explorer of the 3D world. But the real adventure starts here. Armed with today's knowledge, you'll create your own unique worlds. I'll always be cheering you on."

---
*(To be continued in Episode 8)*
