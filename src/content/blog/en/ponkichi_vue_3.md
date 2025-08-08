---
description: "Ponkichi discovers the secrets of h functions and VNodes with Dr. Frontend!"
pubDate: 2025-08-04T00:00:00.000Z
recommended: false
tags:
  - tags.tech.vue
  - tags.character.ponkichi
  - tags.series.ponkichi-to-vue
  - tags.genre.tech-light-novel
title: "Episode 3: The Mysterious World of h Functions and VNodes"
---

## Ponkichi's Vue.js Adventure: The Day His Life Changed at the Forest Doctor's Lab

### Note

This story was translated and written with the help of generative AI, aiming to make learning frontend technology enjoyable.
Every effort has been made to ensure technical and translation accuracy, but we cannot guarantee that everything is absolutely perfect.
Please treat this series as a friendly learning aid, and enjoy it with an open mind!

---

## Characters

* **Dr. Frontend:**
  The wise Frontend Doctor who lives in a laboratory deep in the forest. He knows everything about frontend technology and always answers Ponkichi's innocent questions with kindness and humor.
* **Ponkichi:**
  A curious young raccoon dog who dreams of becoming a frontend engineer. He has just started learning Vue.js and is fascinated by its depth. When he discovers something new, he can't help but jump up with a cheerful "Boing!"

---

## Episode 3🦝: The Mysterious World of h Functions and VNodes

There was a knock at the laboratory door. When the doctor opened it, there stood Ponkichi with sparkling eyes.

**Ponkichi:**
"Hello, Doctor! Today you're going to teach me the secrets of the `h` function, right? Boing!"

**Dr. Frontend:**
"Indeed, Ponkichi. You're full of enthusiasm. Come on in."

Ponkichi took his seat and immediately turned to face the monitor.

**Dr. Frontend:**
"Last time, we talked about how `template` gets converted into `h` functions. Today, let's actually use that `h` function to create various things."

The doctor started typing on the keyboard, writing new code.

```javascript
import { createApp, h } from 'vue'

const App = {
  render() {
    return h('div', { class: 'container' }, [
      h('h1', { style: 'color: red;' }, 'Amazing Title'),
      h('p', 'This is a paragraph created with the h function.'),
      h('ul', [
        h('li', 'List Item 1'),
        h('li', 'List Item 2'),
      ])
    ])
  }
}

createApp(App).mount('#app')
```

**Ponkichi:**
"Wow! This looks quite complex... There are `h` functions inside other `h` functions..."

**Dr. Frontend:**
"That's right. You can pass child elements as an array to the third argument of the `h` function. This is how we represent nested HTML structures."

When Ponkichi ran the code, the browser displayed a red title, a paragraph, and a list.

**Ponkichi:**
"It's true! The same thing as HTML is being displayed! So the `h` function is a function for building HTML tags! But Doctor..."

Ponkichi tilted his head in confusion.

**Ponkichi:**
"Why do we need to write it this complicated way? Writing regular HTML would be much easier..."

The doctor nodded with satisfaction.

**Dr. Frontend:**
"That's an excellent question that gets to the heart of the matter, Ponkichi. The answer becomes clear when you understand what exactly the `h` function returns."

**Dr. Frontend:**
"The `h` function doesn't directly create HTML strings. Instead, it creates something called a 'VNode'—a 'virtual node'—which is simply a JavaScript object."

**Ponkichi:**
"VNode...? Virtual node...?"

**Dr. Frontend:**
"Yes. A 'node' refers to each individual element in HTML, like `<div>` or `<p>`. We first represent these virtually as objects in the JavaScript world."

The doctor drew on the blackboard an image of the object that the code `h('p', 'hello')` would return.

```javascript
// Image of the VNode (virtual node) returned by h('p', 'hello')
{
  type: 'p',
  props: null,
  children: 'hello'
}
```

**Ponkichi:**
"Wow! It's just a regular object! Even I can understand this!"

**Dr. Frontend:**
"Exactly. And Vue.js uses this VNode as a blueprint to make changes to the actual DOM—that is, the real screen in the browser."

**Ponkichi:**
"But why go through all this trouble...? Can't we just change the screen directly?"

**Dr. Frontend:**
"That's because actual DOM manipulation is very 'expensive'—meaning it takes a lot of time. If we rewrote the entire screen every time data changed, our applications would become very slow."

**Dr. Frontend:**
"So Vue.js first compares VNodes in the JavaScript world to identify only what has changed. Then it applies only those differences to the actual DOM. This mechanism is called the 'virtual DOM.' Because of this, we can update the screen very quickly with minimal changes."

Ponkichi listened with wide eyes.

**Ponkichi:**
"Amazing...! So we create a blueprint called VNode with the `h` function, find the changes on that blueprint, and then only do construction work on the parts that really need it—is that right?"

**Dr. Frontend:**
"Oh! Ponkichi, that's a perfect analogy! Exactly right! While `template` is a convenient tool, to understand Vue.js's clever magical mechanism, it's important to first know about VNodes—the 'raw materials' of the magic—and the `h` function that creates them."

Ponkichi understood that the `h` function wasn't just a complicated way of writing things, but something very important that held the secret to Vue.js's speed.

**Ponkichi:**
"Thank you, Doctor! Now that I understand VNodes, writing `h` functions has become fun! Boing!"

**Dr. Frontend:**
"Good, that's the spirit. Next time, let's explore what exactly the `createApp` function returns—let's uncover the mystery of its return value."

**Ponkichi:**
"Yes! Thank you in advance!"

Ponkichi left the laboratory proudly, having become a little wiser once again.

---

### 🌟 Today's Takeaways

- **`h` functions** can be nested to represent complex HTML structures.
- What the `h` function returns is not HTML strings, but **`VNodes` (virtual nodes)**—JavaScript objects.
- **`VNodes`** are like "blueprints" for the actual DOM.
- Vue.js uses these `VNodes` to calculate only the differences and efficiently update the screen (**virtual DOM**). That's why it's fast!

### Next Episode Preview: "What createApp Returns"

What exactly do you get after executing the `createApp` function...? Ponkichi delves into the mystery of App instances!

### 👨‍🏫 Doctor's Note

While I explained VNodes to Ponkichi as simply "JavaScript objects" for easy understanding, they're actually a bit more complex.

Real Vue VNodes contain much more than just `type`, `props`, and `children`. They also hold `key` (a unique ID for identifying elements), `ref` (a mechanism for directly referencing elements), `shapeFlag` (flags for efficiently determining element types), `patchFlag` (hint information for optimization), and various other pieces of information that help Vue.js operate at high speed.

Also, while I used the analogy of VNodes as "blueprints," it might be more accurate to call them "blueprint fragments." This is because VNodes form a tree structure, and each individual VNode only has meaning within its parent-child relationships. We call this entire tree a "VNode tree" or "virtual DOM tree."

And while I introduced Ponkichi to the magic of the "virtual DOM," this idea wasn't originally created by Vue.js—it was first popularized by a library called React.

Long ago, as web pages became increasingly complex, directly manipulating the DOM became very challenging. Especially in applications where data changed frequently, managing which parts of the screen should be updated became extremely difficult.

Around 2013, React's developers came up with the revolutionary idea: "Let's first create a virtual DOM in the JavaScript world, compare the new state with the old state, and apply only the differences to the actual DOM." This was the beginning of the "virtual DOM."

Vue.js took this wonderful idea from React as reference, but implemented it in an intuitive and easy-to-understand way.

In the frontend world, developers reference each other's good ideas and continue to improve upon them based on their own philosophies, leading to continuous progress. It's a beautiful example of collaboration and development rather than competition.

---
*End of Episode 3*
