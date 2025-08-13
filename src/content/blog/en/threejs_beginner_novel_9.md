---
description: "A series: What is Three.js? Froggy's Journey into the Wonderful World of Browser 3D."
pubDate: 2025-08-08T09:00:00.000Z
recommended: false
tags:
  - tags.tech.threejs
  - tags.genre.tech-light-novel
title: "Episode 9: New Exploration! The Nature of Light and Shadow Mechanisms"
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

### Episode 9: New Exploration! The Nature of Light and Shadow Mechanisms

**Professor Saburo:** "Oh, if it isn't Froggy. The final lecture was yesterday, but what brings you here? Your eyes look like you've discovered another mystery."

**Froggy:** "Professor! That's exactly right, ribbit! I tried changing my material from `MeshBasicMaterial` to `MeshStandardMaterial`, ribbit. And then... my beloved cube turned completely black, ribbit!"

**Professor Saburo:** "I see."

**Froggy:** "I panicked and reviewed my code, then tried adding a light... and suddenly the cube became visible again, ribbit! What exactly is this 'light' thing, ribbit!? And those realistic 'shadows' that appear when light hits objects - how do they work, ribbit!?"

**Professor Saburo:** "Ha ha ha! Wonderful! That's the gateway to the magic of light and shadow that makes 3D graphics 'real.' Very well, today let's unravel the true nature of that magic."

### The Nature of Light: It is 'Information'

**Professor Saburo:** "First, you must understand that light in Three.js is not a visible object. Light is **'information' or 'data' that tells shaders 'how the surface colors of other objects should be calculated.'**"

**Froggy:** "Information...? It's not an object, ribbit?"

**Professor Saburo:** "Indeed. The `MeshBasicMaterial` you used initially completely ignores light information. It's a very simple material that says 'just paint this color uniformly.' That's why colors were visible even without lights. However, `MeshStandardMaterial` and `MeshPhongMaterial` are more advanced materials that assume light calculations will be performed. Without light information from the renderer, they don't know how to calculate their colors and end up appearing completely black."

**Froggy:** "I see! `MeshStandardMaterial` is a serious worker that can't do its job without light information, ribbit."

**Professor Saburo:** "Exactly. And when the renderer calls `render()`, it searches through the scene for lights (like `DirectionalLight`) and passes information about their position, direction, color, and intensity to shaders running on the GPU in the form of **`uniform` variables**. When rendering each pixel, the shader uses this information along with the pixel's surface orientation (normal) to perform complex light reflection calculations. These calculations make surfaces facing the light appear bright while others appear dark, creating the 'shading' or three-dimensional depth we recognize."

### Shadow Mechanisms: The Trick Called Shadow Mapping

**Froggy:** "I understand the shading mechanism, ribbit. But those sharp 'shadows' that objects cast on other objects look much more complex, ribbit!"

**Professor Saburo:** "Froggy, you've noticed well. Shadows aren't automatically generated like shading. They're a very clever and high-cost **'trick'** that the renderer performs secretly behind the scenes. It's called **Shadow Mapping** in technical terms."

**Froggy:** "A trick!? What do you mean, ribbit?"

**Professor Saburo:** "To render shadows, the renderer executes another special rendering pass **before** the normal rendering. Here's how it works:"

1.  **Preparation:** First, we need to enable shadows with `renderer.shadowMap.enabled = true;`, set shadow-casting lights with `light.castShadow = true;`, shadow-receiving objects with `mesh.receiveShadow = true;`, and shadow-casting objects with `mesh.castShadow = true;`.

2.  **Secret Rendering:** When everything is set up, the renderer performs one rendering **'from the light's viewpoint'** before the main rendering. It draws how the world looks from the light, not from the camera.

3.  **Shadow Map Generation:** This secret rendering doesn't draw any colors. Instead, it records only the 'distances' from the light source to objects in a single texture called a **depth map (shadow map)**.

4.  **Main Rendering and Comparison:** Then the main rendering from our camera's viewpoint begins. When rendering pixels like those on the ground, the shader asks itself: 'Is this pixel farther from the light source than the distance recorded in the shadow map we just created?'

**Froggy:** "If it's farther than the shadow map distance...?"

**Professor Saburo:** "Exactly right! That means there's another object (the closer object recorded in the shadow map) between that pixel and the light source. In other words, that pixel is determined to be **'in shadow'** and is rendered dark."

**Froggy:** "Whoa! What a clever trick, ribbit! They create a distance map from the light's viewpoint first, then during the main rendering, they compare against that map to decide if something is in shadow, ribbit! I totally understand why it's high-cost now, ribbit... It's like rendering twice, ribbit!"

**Professor Saburo:** "Exactly, Froggy. Without light, the world is just a collection of colors. But when light is added, along with shadows created when that light is blocked, the world gains depth and reality. Understanding and mastering these two elements is what it means to breathe 'life' into the 3D world."

**Froggy:** "Professor... I feel like I've gotten one step closer to the essence of being a creator, ribbit! The adventure is far from over, ribbit!"

---
*(To be continued in Episode 10)*
