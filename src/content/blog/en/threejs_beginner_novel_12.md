---
description: "A series: What is Three.js? Froggy's Journey into the Wonderful World of Browser 3D."
pubDate: 2025-08-08T18:00:00.000Z
recommended: false
tags:
  - tags.tech.threejs
  - tags.genre.tech-light-novel
title: "Episode 12: How to Write Commands vs. How to Write Requests"
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

### Episode 12: How to Write Commands vs. How to Write Requests

**Froggy:** "Professor, something feels strange, ribbit."

One afternoon, Froggy looked puzzledly at his code and spoke to Professor Saburo.
**Froggy:** "When creating a box with Three.js, it feels like I'm giving detailed 'commands' one by one: 'Create geometry!' 'Create material!' 'Combine them into a mesh!' 'And add to the scene!', ribbit."

```javascript
// Giving commands step by step
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

**Froggy:** "But like the HTML code I saw before, if I could just 'request' something like `<cube color="green" />` saying 'I want a green box please!' and have it take care of the rest... that would be so much easier, ribbit."

**Professor Saburo:** "Froggy! You've noticed a very fundamental difference in programming! What an excellent observation."

The professor was impressed by Froggy's insight and nodded deeply.

**Professor Saburo:** "That's the difference between '**imperative**' and '**declarative**' programming approaches."

**Froggy:** "Im-per-a-tive...? De-clar-a-tive...?"

**Professor Saburo:** "Yes. Let me explain each one.

### Imperative Programming - Telling the How

**Professor Saburo:** "What you described about Three.js is exactly the **imperative** approach. This is a style where you give the computer detailed instructions on **'how'** to accomplish a task, step by step. Like a cooking recipe, you specifically describe the procedure: 'peel the potatoes,' 'then cut them,' 'put them in the pot.'"

**Professor Saburo:** "Three.js is a library that makes WebGL - a low-level API for rendering 3D graphics in browsers - more accessible to us. Being powerful and highly flexible, it requires developers to carefully manage the entire process from object creation to rendering."

### Declarative Programming - Telling the What

**Professor Saburo:** "And the writing style you wished for, like `<cube />`, is the **declarative** approach. This is a style where you describe **'what'** you want to achieve - the final 'state.' It's like ordering at a restaurant by saying 'I want curry rice.' You leave the detailed cooking process to the chef (framework)."

**Professor Saburo:** "HTML and modern UI frameworks like React/Vue actively adopt this declarative approach. Developers just describe 'what they want the screen to look like in the end,' and the framework cleverly handles the tedious procedural tasks like DOM manipulation behind the scenes."

### Concrete Example: Button Operations on Web Pages

**Professor Saburo:** "Still not quite clear? Let's look at a simple example of placing a button on a webpage that shows a message when clicked."

**Traditional Imperative Writing**

**Professor Saburo:** "In the old days, we used to directly manipulate the DOM like this."

```javascript
// 1. Create a button element
const button = document.createElement('button');

// 2. Set the button text
button.textContent = 'Click me';

// 3. Define what happens when the button is clicked
button.addEventListener('click', () => {
  alert('Hello!');
});

// 4. Finally, add it to the HTML body
document.body.appendChild(button);
```

**Professor Saburo:** "See? 'Create an element,' 'configure it,' 'add behavior,' 'append it.' Here too, we're giving detailed step-by-step commands, right?"

**Modern Declarative Writing (Framework Style)**

**Professor Saburo:** "In contrast, with modern frameworks today, you can write it like this."

```javascript
// Image of frameworks like React or Vue
function App() {
  const handleClick = () => {
    alert('Hello!');
  };

  // Just request 'I want a button that behaves like this when clicked'
  return <button onClick={handleClick}>Click me</button>;
}
```

**Professor Saburo:** "How about that? Doesn't the latter look like the 'state' you want to achieve - 'I want this kind of button' - is directly reflected in the code? The framework takes care of all the tedious DOM manipulation commands."

### Why is Three.js Imperative?

**Froggy:** "I see! The declarative way looks cleaner and easier to understand, ribbit! So why doesn't Three.js become more declarative too, ribbit?"

**Professor Saburo:** "That's a question that gets to the heart of the matter. There are two main reasons for this.

**1. Maximizing Performance and Flexibility**

**Professor Saburo:** "In the world of 3D graphics, the screen needs to be updated 60 times per second. During this, massive processing occurs - moving many objects, calculating lighting, etc. Declarative libraries, for their convenience, do lots of processing behind the scenes that we can't see. Sometimes this can become a performance bottleneck."

**Professor Saburo:** "Three.js is designed so that developers can reach very low layers like GPU memory management and rendering timing if they want. In other words, we can directly command extreme optimizations like 'let's postpone this process since it's not needed now' or 'let's free this data from memory since it's no longer used.' This **complete control** is the key to realizing complex, large-scale 3D applications."

**Froggy:** "Yikes! It's like the cockpit of an F1 car, ribbit! Lots of switches, and to go fast you have to operate everything yourself..."

Froggy felt a bit dizzy.

**2. Managing Continuously Changing States**

**Professor Saburo:** "Exactly, Froggy. And there's another point. Web page UIs basically change when users take some action, like pressing a button. However, in 3D space, objects are constantly animating, affecting each other through physics calculations - **states are continuously and constantly changing**. To manage such relentless change, it's often more intuitive and efficient to give imperative commands like 'move this like this every frame.'"

**Froggy:** "I see! Like action game characters that are always running around, it's easier to understand if you give commands like 'go right! jump!' as needed, ribbit!"

Froggy's face lit up when he could relate it to his favorite games.

### The Power of Declarative Libraries: `react-three-fiber`

**Professor Saburo:** "However, Froggy, your wish to 'write declaratively' can certainly be fulfilled. For that purpose, wonderful libraries like `react-three-fiber` exist to handle Three.js declaratively."

**Froggy:** "Wow! How does that work, ribbit?"

**Professor Saburo:** "Indeed. It takes care of the imperative parts of Three.js for us, allowing us to focus on writing React components. Let's look at an example. Here's 'a box that rotates according to mouse position' written in both approaches."

**Written with Three.js (Imperative)**

```javascript
import * as THREE from 'three';

// ... scene, camera, renderer setup ...

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Variable to record mouse coordinates
const mouse = new THREE.Vector2();
window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Command to update cube rotation every frame
  cube.rotation.y += (mouse.x - cube.rotation.y) * 0.05;
  cube.rotation.x += (-mouse.y - cube.rotation.x) * 0.05;

  renderer.render(scene, camera);
}

animate();
```

**Written with `react-three-fiber` (Declarative)**

```javascript
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function Box() {
  const meshRef = useRef();

  // useFrame hook abstracts per-frame processing
  useFrame((state, delta) => {
    // Get mouse coordinates directly from state
    const { x, y } = state.mouse;
    // Manipulate object via ref
    meshRef.current.rotation.y += (x - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.x += (-y - meshRef.current.rotation.x) * 0.05;
  });

  // Just describe 'what you want to be here' with JSX
  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  );
}

function App() {
  return (
    <Canvas>
      <Box />
    </Canvas>
  );
}
```

**Froggy:** "Wow! They're completely different, ribbit! The first one looks like a spell scroll and is a bit hard to read... But the `react-three-fiber` version is clean like HTML, and you can see what it wants to do at a glance, ribbit! There's a `<Box />` friend!"

**Professor Saburo:** "Exactly! In the `react-three-fiber` version, you won't find any of the usual commands like `scene.add`, `renderer.render`, or `requestAnimationFrame`, right? We just declare the 'state' of `<Box />`. Then the library takes care of everything behind the scenes, converting it to imperative Three.js code. This allows us to enjoy React's state management mechanisms and component reusability in the 3D world."

**Froggy:** "Amazing! So it's like an excellent autopilot system (react-three-fiber) helping with the difficult F1 car driving (Three.js), ribbit!? That sounds doable for me!"

## Summary

**Froggy:** "Thank you, Professor, ribbit! There are completely different ways to write the same thing, ribbit! The freedom of imperative style is amazing, and the clarity of declarative style is attractive too, ribbit! I feel like I can become friends with both, ribbit!"

**Professor Saburo:** "Indeed. It's not about which is better or worse, but **the right tool for the job**. It's important to choose the optimal tools based on what you want to create and your team's skills. When you can make that judgment, you'll be a proper full-fledged engineer, Froggy."

---
*(To be continued in Episode 13)*
