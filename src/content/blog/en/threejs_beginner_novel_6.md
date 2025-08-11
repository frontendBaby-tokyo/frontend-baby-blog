---
description: "A series: What is Three.js? Froggy's Journey into the Wonderful World of Browser 3D."
pubDate: 2025-08-08T03:00:00.000Z
recommended: false
tags:
  - tags.tech.threejs
  - tags.genre.tech-light-novel
title: "Episode 6: The Mystery of PerspectiveCamera"
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

### Episode 6: The Magic Lens That Captures the World! The Mystery of PerspectiveCamera

**Froggy:** "Hello, Professor, ribbit! Today I want to learn about 'cameras,' ribbit!"

**Professor Saburo:** "Ah, cameras. That single line `new THREE.PerspectiveCamera(...)`. You've spotted something important."

**Froggy:** "That's right, ribbit. Even with a scene and objects, nothing is visible without a camera. When I think about it that way, cameras play such an important role, ribbit. But those spell-like parameters... `(75, window.innerWidth / window.innerHeight, 0.1, 1000)` ...I have no idea what they mean, ribbit."

**Professor Saburo:** "Indeed. Those four numbers are the blueprint for a magic lens that determines how to 'capture' the 3D world and project it onto a 2D screen. Let's unravel them one by one."

### The Magic Lens Blueprint

**Professor Saburo:** "First, the `PerspectiveCamera` we're using is called a **perspective projection camera**. This works the same way we normally see things - objects far away appear small, and objects close up appear large."

**Froggy:** "I see, I see. It's a natural way of seeing, ribbit."

**Professor Saburo:** "Exactly. By the way, there's also something called an `OrthographicCamera` (orthographic projection camera). This has no sense of depth - objects far and near are drawn at the same size. It's a special camera used for building blueprints or certain puzzle games. But `PerspectiveCamera` is the basic one to understand."

**Professor Saburo:** "Now, let's get to those four parameters."

#### 1. `fov` (Field of View) - Viewing Angle

**Professor Saburo:** "The first number, `75`. This is the **fov**, or **field of view**. The unit is 'degrees.' It determines how wide a range the camera can see - essentially the wide-angle capability of the lens."

**Froggy:** "Field of view...? Like the difference between a telescope and a peephole, ribbit?"

**Professor Saburo:** "Exactly right! If you make this value smaller, it's like looking through a telescope - distant objects appear larger (zoom in). If you make it larger, it's like a fisheye lens - a wider range becomes visible but with distortion. `75` is close to human vision and is a commonly used value."

#### 2. `aspect` - Aspect Ratio

**Professor Saburo:** "The second parameter, `window.innerWidth / window.innerHeight`. This is the **aspect**, or **aspect ratio**. It tells the camera the 'width-to-height ratio' of the screen we're drawing on."

**Froggy:** "Why do we need to tell it that, ribbit?"

**Professor Saburo:** "Because if we don't set this correctly, the world will become distorted. For example, if we want to draw something square but force it to display on a wide screen, it would become a horizontally stretched rectangle, right? By telling the camera 'the screen we're displaying on has this ratio,' we ensure objects maintain their correct proportions."

#### 3. `near` & 4. `far` - Clipping Planes

**Professor Saburo:** "And the last two, `0.1` and `1000`. These are called **near** and **far** respectively, and they determine the 'depth range' that the camera will render. `near` is the distance of 'don't render anything closer than this,' and `far` is 'don't render anything farther than this.'"

**Froggy:** "Eh!? Why do we need such restrictions, ribbit? Wouldn't it be better to show everything, ribbit?"

**Professor Saburo:** "Good question. There are two important reasons for this. One is **performance concerns**. If we dutifully calculated objects so far away that they're too small to see anyway, the GPU would get exhausted, right? By deciding 'we only look from here to here,' we eliminate wasteful calculations."

**Froggy:** "I see! It's clever efficiency, ribbit!"

**Professor Saburo:** "The other reason is a somewhat technical issue called **depth buffer precision**. Computers use something called a 'depth buffer' to determine depth relationships. This buffer has limits to the numerical precision it can handle. If the rendering range is extremely wide, like from 0.001 to 100 million, it becomes impossible to correctly determine the front-to-back relationships of nearby objects, causing flickering or strange visual artifacts. That's why setting an appropriate range for what needs to be rendered is essential for clean graphics."

**Froggy:** "Wow, that's deep, ribbit... So our setting `(75, ..., 0.1, 1000)` means..."

**Professor Saburo:** "It means 'with a **field of view of 75 degrees**, **matching the screen's aspect ratio**, render only things within **distances 0.1 to 1000** from the camera.' This creates a pyramid-shaped space (called a frustum) from the camera, and only objects within this frustum get rendered to our screen."

**Froggy:** "Frustum! What a cool name, ribbit! I thought it was just one simple line, but it was defining so much about how the world 'looks'... Camera, you're so incredibly deep, ribbit! Hop hop!"

**Professor Saburo:** "Hehe, that's right. 3D graphics is, at its core, the history of the challenge of how to correctly project information from a virtual world onto the 'window' that is a 2D screen. The camera is one of the most important tools at the forefront of that challenge."

**Froggy:** "Professor, I have another amazing question, ribbit. Just like WebGL had no concept of scenes, maybe... WebGL doesn't have 'cameras' either, ribbit?"

**Professor Saburo:** "...Froggy, you're really good at hitting the nail on the head. That's exactly right. **WebGL has absolutely no concept of 'cameras' either.**"

**Froggy:** "I knew it! So what exactly is this `PerspectiveCamera` we're using, ribbit!? What is it actually doing for us, ribbit!?"

**Professor Saburo:** "The true identity of Three.js's camera class is a **'matrix generator.'** More specifically, it's a smart machine that calculates two extremely important 'transformation matrices' that are essential for projecting 3D space onto a 2D screen, doing it all for us."

1.  **View Matrix:**
    A transformation matrix for moving all objects in 3D space to be seen 'from the camera's viewpoint.' The values of this matrix are determined by where the camera is located (position) and which direction it's facing (lookAt).

2.  **Projection Matrix:**
    A transformation matrix for 'projecting' the scene as viewed from the camera onto the final 2D screen. This matrix is calculated based on the lens blueprint we just learned about - the `fov`, `aspect`, `near`, and `far` values.

**Professor Saburo:** "If Three.js didn't have camera classes... we'd have to calculate these matrices ourselves every time we moved the camera slightly. We'd need to use trigonometry, vectors, and complex linear algebra knowledge. Behind that single line `camera.position.z = 5;`, Three.js is handling all of these complex matrix calculations for us."

**Froggy:** "Yikes... matrices... I had no idea such difficult calculations were happening behind our simple command to 'move the camera back by 5,' ribbit... I never could have imagined, ribbit..."

**Professor Saburo:** "That's right. Three.js's camera class liberates us developers from that most challenging mathematical world. And it lets us focus on the truly creative work of 'where to place the camera' and 'what to look at.' This is the greatest value that the camera class provides us."

**Froggy:** "Dear Camera... you weren't just a lens, you were a mathematical genius protecting us, ribbit... I'm so moved, I can't stop hopping, ribbit!"

---
*(To be continued in Episode 7)*
