---
description: "A series: What is Three.js? Froggy's Journey into the Wonderful World of Browser 3D."
pubDate: 2025-08-08T12:00:00.000Z
recommended: false
tags:
  - tags.tech.threejs
  - tags.genre.tech-light-novel
title: "Episode 10: Secret Notes to Shaders! Exposing the True Identity of uniform Variables"
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

### Episode 10: Secret Notes to Shaders! Exposing the True Identity of uniform Variables

**Froggy:** "Professor! That story about light information being passed to shaders through `uniform` variables is still bothering me, ribbit... How exactly do you 'pass information,' ribbit? Are you sending it with magic spells, or maybe writing letters, ribbit? I want to imagine it more concretely, ribbit!"

**Professor Saburo:** "Froggy, that's an excellent question. That's the most important yet most invisible 'bridge' connecting the CPU world and GPU world - something everyone stumbles over at least once. Very well, today I'll unveil the true nature of that bridge with the ultimate analogy."

**Froggy:** "The ultimate analogy! That's exciting, ribbit!"

### GPU is a Chef, Shaders are Recipes, uniforms are Secret Notes

**Professor Saburo:** "First, imagine this:"

*   **GPU** is... a super-specialized **'chef'** who can cook (render pixels) at incredible speed but can only follow recipes and do nothing else.
*   **Shaders** are... the **'recipes'** that chef uses. Actually, these recipes come as a set of two books: **vertex shader** and **fragment shader**.
    *   **Vertex Shader:** The prep recipe that decides where to place ingredients (vertices).
    *   **Fragment Shader:** The finishing recipe that decides what colors to paint the arranged ingredients.
*   **Geometry (vertices)** are... the **'ingredients'** for cooking. Potatoes and carrots.
*   And **`uniform` variables** are... **'special instruction notes'** or **'secret memos'** for each day that aren't written in the recipes.

**Froggy:** "Secret memos!?"

**Professor Saburo:** "Yes. For example, a recipe might just say 'make sauce.' Then we (the CPU) pass notes with instructions like 'make today's sauce a bit spicy' or 'set the oven to 200 degrees.' These instructions apply **uniformly** throughout making one dish (one object), right? That's why they're called `uniform` variables."

**Froggy:** "I see! They're called `uniform` because the instructions don't change for each vertex or pixel, ribbit! By the way, is there also a way to give different instructions to each ingredient, ribbit?"

**Professor Saburo:** "Sharp observation, Froggy! Exactly right. Information unique to each vertex, like position coordinates and normals (surface orientation), is passed to the chef through a different method called **`attributes`**. If `uniform` is instructions for the entire dish, `attributes` are like the individual shape and size of each potato. Using these two methods appropriately is key."

### The Concrete Picture of the 'Passing Information' Process

**Professor Saburo:** "Now, let's look at the process of passing light information using this analogy."

1.  **Our Instructions (CPU):**
    We write `light.color.set(0xff0000);` in Three.js. This is like giving instructions in human language: "Use red for today's cooking light!"

2.  **Renderer (Site Supervisor) Translation:**
    When `renderer.render()` is called, the site supervisor (renderer) writes this "red light" instruction into a 'secret memo' format that the chef (GPU) can read.

3.  **Shader (Recipe) Preparation:**
    The shader recipe has a **blank space** prepared in advance like `uniform vec3 uLightColor;`, meaning 'Light color instruction: ______'.

4.  **Passing the Memo to Chef (GPU):**
    Just before rendering starts, the renderer quickly fills in the `uLightColor` blank with red color information - the value `vec3(1.0, 0.0, 0.0)`. This is the true nature of 'passing information.'

5.  **Chef (GPU) Cooking:**
    The chef (GPU) looks at the recipe (shader), ingredients (vertices), and the secret memo (`uniform` variables) passed to them, then starts cooking (pixel rendering) at incredible speed. Since the memo says 'red color,' they can calculate light reflection and illuminate objects with a reddish tint.

**Froggy:** "I... I see! 'Passing information' means the renderer fills in blanks prepared in shaders with values, ribbit! Now I can perfectly imagine it, ribbit!"

### Let's Try Passing Our Own Memos!

**Professor Saburo:** "Exactly right. Three.js's `MeshStandardMaterial` and others automatically handle all these memo exchanges. But we can also write our own recipes (shaders) and pass our own memos (uniforms) using `ShaderMaterial`."

**Code We Write (Three.js World):**
Let's try passing time information through a memo named `uTime`.
```javascript
const material = new THREE.ShaderMaterial({
  uniforms: {
    // Prepare a memo named uTime with initial value 0.0
    uTime: { value: 0.0 }
  },
  vertexShader: `...`,
  fragmentShader: `...`
});

// Update memo value every frame in animation loop
function animate(time) {
  requestAnimationFrame(animate);
  // time is in milliseconds, so convert to seconds
  material.uniforms.uTime.value = time * 0.001;
  renderer.render(scene, camera);
}
```

**Secret Memo the Shader Receives (GLSL Language World):**
Receive the `uTime` memo and use it to make vertices move like waves.
```glsl
// uniform variable declaration (blank space to receive uTime memo)
uniform float uTime;

void main() {
  // ...move vertex coordinates (position) in sin waves over time (uTime)...
  vec3 pos = position;
  pos.z += sin(pos.x * 10.0 + uTime) * 0.1;

  // Set calculated vertex position to gl_Position
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
```

**Froggy:** "Wow! When you compare them side by side, it's crystal clear, ribbit! Our simple code gets transformed into specific instruction sheets for shaders thanks to the renderer, ribbit! Plus, being able to pass any information we want means infinite possibilities, ribbit!"

**Professor Saburo:** "Exactly, Froggy. `uniform` variables are the most important bridge connecting our human-friendly 3D world with the pure computational world dominated by the GPU. Now that you understand this bridge exists, you're no longer a beginner. You're a proper 3D developer."

**Froggy:** "Professor...! That was the best lecture ever, ribbit! I've perfectly mastered how to pass secret memos, ribbit! Hop hop hop!"

---
*(To be continued in Episode 11)*
