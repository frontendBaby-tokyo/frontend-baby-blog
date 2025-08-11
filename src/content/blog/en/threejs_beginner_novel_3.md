---
description: "A series: What is Three.js? Froggy's Journey into the Wonderful World of Browser 3D."
pubDate: 2025-08-07T15:00:00.000Z
recommended: true
tags:
  - tags.tech.threejs
  - tags.genre.tech-light-novel
title: "Episode 3: Froggy's First 3D Object!"
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

### Episode 3: Froggy's First 3D Object!

**Froggy:** "Professor! Ever since I heard your last explanation, I've been so excited I can barely contain myself, ribbit! I really want to try using that 'magic translator' Three.js myself, ribbit!"

**Professor Saburo:** "Oh my, Froggy. What tremendous enthusiasm! Very well, today let's actually create a simple 3D world. First, we'll start by preparing a blank canvas."

**Professor Saburo:** "First, we'll prepare a simple HTML file like this."

```html
<!DOCTYPE html>
<html>
<head>
    <title>Froggy's First Three.js</title>
    <style>
        body { margin: 0; }
        canvas { display: block; }
    </style>
</head>
<body>
    <script src="https://unpkg.com/three@0.165.0/build/three.min.js"></script>
    <script>
        // Here we'll write our magic spells!
    </script>
</body>
</html>
```

**Froggy:** "I see, I see. We load the Three.js library and we're all set, ribbit!"

**Professor Saburo:** "Exactly right. Now, to create a 3D space with Three.js, we basically need three things: a **'Scene,' 'Camera,' and 'Renderer.'**"

*   **Scene:** This is like the 'stage' of our virtual world where we place 3D objects and light sources.
*   **Camera:** This determines the 'viewpoint' - from where and how we look at that stage.
*   **Renderer:** This acts as the 'painter' that actually draws the picture in the browser based on the scene and camera information.

**Froggy:** "A stage, a viewpoint, and a painter... I see, that's very easy to understand, ribbit!"

**Professor Saburo:** "Now, let's actually write some code."

```javascript
// 1. Create the scene (stage)
const scene = new THREE.Scene();

// 2. Create the camera (viewpoint)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 3. Create the renderer (painter)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. Create an object (actor)
const geometry = new THREE.BoxGeometry(1, 1, 1); // Shape: cube
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Material: green color
const cube = new THREE.Mesh(geometry, material); // Combine shape and material to create mesh

// 5. Add the object to the scene
scene.add(cube);

// 6. Rendering (drawing)
renderer.render(scene, camera);
```

**Froggy:** "Wow! A green square box really appeared on the screen, ribbit! Amazing, so amazing, ribbit! Hop hop!"

**Professor Saburo:** "Congratulations, Froggy! This is your very first 3D object that you created."

**Froggy:** "But Professor, something puzzles me, ribbit. I just wrote `new THREE.BoxGeometry()` and yet the browser can draw such a beautiful cube, ribbit? How does this code reach the GPU that you mentioned before, ribbit?"

**Professor Saburo:** "What a wonderful question, Froggy! That curiosity is the key to deeper understanding. Very well, let's take a peek behind the scenes."

### Peeking Behind the Scenes: The Journey from Three.js to GPU

**Professor Saburo:** "First, the code you wrote: `new THREE.BoxGeometry()`. When Three.js receives this, it internally generates a **list of vertex coordinates** needed to construct a cube. A cube has 8 vertices, right? It creates the XYZ coordinate data for each one of them."

**Froggy:** "I see, it's like creating a blueprint, ribbit."

**Professor Saburo:** "Exactly right. Then, with `new THREE.MeshBasicMaterial({ color: 0x00ff00 })`, you give it the information 'please paint this blueprint green.' And the final touch is `renderer.render(scene, camera)`."

**Froggy:** "This 'draw it!' command is the most important, ribbit!"

**Professor Saburo:** "Indeed. When this command is executed, Three.js (the translator) translates all the information it has gathered - that is, the request to draw 'this shape made of these vertex coordinates' from 'this camera viewpoint' in 'this color' - into language the browser can understand, namely **WebGL commands**."

**Froggy:** "This is where the translation happens, ribbit!"

**Professor Saburo:** "That's right. Then, when the browser receives those WebGL commands, it passes them to a specialist called the computer's **graphics driver**. This driver is the only entity that can directly communicate with the GPU."

**Froggy:** "It's like a game of telephone, ribbit."

**Professor Saburo:** "Haha, exactly! And finally, the **GPU**, having received the commands, uses its amazing computational power to create a list of surfaces from the list of vertices, calculates which surfaces are in front, which pixels should be painted green, and generates the final 2D image in an instant, drawing it on the screen (canvas) that we see."

**Froggy:** "Wow~! Behind those few lines of code I wrote, such a grand game of telephone and calculations were taking place, ribbit! I'm so moved, ribbit..."

**Professor Saburo:** "The greatness of Three.js lies in how it beautifully hides this complex process so developers don't have to worry about it. That's exactly why you, Froggy, could step into the 3D world so easily. Now, let's make this cube move as our final touch. It's animation magic."

```javascript
// ...(previous code)...

function animate() {
    requestAnimationFrame(animate); // Call this function again on the next frame

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate(); // Start the animation loop
```

**Froggy:** "Whoa! The cube is spinning, ribbit! It's like it's alive, ribbit! Hop hop hop!"

**Professor Saburo:** "Hehe, how do you like that? Something you created with your own hands, brought to life by your own hands. This is the true joy of programming, and of Three.js."

**Froggy:** "Thank you, Professor, ribbit! Today has become an unforgettable day for me, ribbit! I want to learn more and more, ribbit!"

**Professor Saburo:** "Don't forget that feeling. The world of 3D is still very deep. Let's continue learning together."

---
*(To be continued in Episode 4)*
