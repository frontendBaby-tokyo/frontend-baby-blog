---
description: "A series: What is Three.js? Froggy's Journey into the Wonderful World of Browser 3D."
pubDate: 2025-08-07T16:00:00.000Z
recommended: false
tags:
  - tags.tech.threejs
  - tags.genre.tech-light-novel
title: "Episode 4: Behind the Scenes of the Scene! The World is Made of Trees"
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

### Episode 4: Behind the Scenes of the Scene! The World is Made of Trees

**Froggy:** "Professor, thank you so much for last time, ribbit! The cube I created is still spinning energetically in my browser, ribbit!"

**Professor Saburo:** "That's wonderful to hear. There's nothing more joyful than seeing your own code come to life."

**Froggy:** "And now I have a new question that's been bubbling up, ribbit. Last time, we added an object to the 'scene' with the command `scene.add(cube)`, right, ribbit? Is this 'scene' ultimately just like a big 'box,' ribbit? Just something to toss objects into..."

**Professor Saburo:** "Hehe, Froggy, you've noticed something wonderful. Many people think that way at first. But actually, a scene isn't just a simple box. It has a very clever **'hierarchical structure'** for managing everything in this 3D world."

**Froggy:** "Hi-er-ar-chi-cal structure...? That sounds complicated, ribbit."

**Professor Saburo:** "Don't worry. Once you understand this, you'll be able to create much more complex and interesting things. In technical terms, this structure is called a **Scene Graph**. And by 'graph,' I don't mean a bar chart. It's more like a 'tree diagram' that shows connections and relationships."

**Froggy:** "Tree diagram... like branches connected like a tree, ribbit?"

**Professor Saburo:** "Exactly right! The scene corresponds to the 'root' of that tree diagram. And objects added with `scene.add(object)` become the first 'branches' growing from the root. Furthermore, by using `add` to attach other objects to an object, you can create parent-child relationships, like growing smaller branches from larger branches."

**Professor Saburo:** "For example, let's think about a model where Earth orbits around the Sun, and the Moon orbits around Earth."

```javascript
// Add the sun (parent) to the scene (root)
scene.add(sun);

// Add earth (child) to the sun (parent)
sun.add(earth);

// Add moon (grandchild) to earth (child)
earth.add(moon);
```

**Froggy:** "Wow! You can use `add` not just on `scene`, but on objects too, ribbit! This is the parent-child relationship..."

**Professor Saburo:** "Indeed. And this parent-child relationship demonstrates tremendous power. If you move the sun with something like `sun.position.x = 10`, what do you think happens?"

**Froggy:** "Um... only the sun moves, ribbit?"

**Professor Saburo:** "Not quite. When the parent sun moves, its child Earth and grandchild Moon **all move together** with it. Just like when you shake a large branch, all the smaller branches and leaves attached to it sway together."

**Froggy:** "Ooh! That's so convenient, ribbit! It's perfect for creating complex animations like planetary motion, ribbit! Hop hop!"

**Professor Saburo:** "Exactly right. And here's where things get even more interesting. Suppose you set `moon.position.x = 2`. This '2' coordinate doesn't represent the moon's absolute position."

**Froggy:** "Eh!? What do you mean, ribbit?"

**Professor Saburo:** "It means '2 units away in the x direction as seen from its parent, Earth.' This is called **local coordinates**. And the moon's final position as seen from the entire scene is called **world coordinates**."

**Froggy:** "Local... world... So the positions we set for objects are just 'positions relative to their parent,' ribbit!"

**Professor Saburo:** "Exactly! And when the rendering command `renderer.render(scene, camera)` is issued, Three.js internally traverses this scene graph from the root through all the branches in order. Then, using each object's local coordinates, it performs calculations layer by layer - the parent's position, then that parent's parent's position... - to determine the final world coordinates. It performs these complex matrix calculations invisibly and instantaneously."

**Froggy:** "I... I see... When we write the simple command to 'orbit the moon around Earth,' Three.js has been desperately calculating the moon's true position as seen from the center of the solar system behind the scenes, ribbit..."

**Professor Saburo:** "That's exactly it. Thanks to this clever system called the scene graph, we can manage complex 3D spaces intuitively and efficiently. The scene isn't just a simple box - it's the very framework and neural network that governs the order of the 3D world."

**Froggy:** "Dear Scene... I'm sorry I thought you were just a box, ribbit... You're so incredibly deep, ribbit... I'm so moved, I can't stop hopping, ribbit!"

**Professor Saburo:** "Ha ha ha! If you keep that sense of wonder, you'll be able to create even more amazing worlds. Now, what other structures of the world shall we explore next?"

---
*(To be continued in Episode 5)*
