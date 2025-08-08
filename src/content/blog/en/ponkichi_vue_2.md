---
heroImage: /src/assets/images/placeholder-social.jpg
description: "Ponkichi experiences his first hands-on createApp coding and discovers the mystery behind the h function!"
pubDate: 2025-08-03T00:00:00.000Z
recommended: false
tags:
  - tags.tech.vue
  - tags.character.ponkichi
  - tags.series.ponkichi-to-vue
  - tags.genre.tech-light-novel
title: "Episode 2: First createApp Experience and the Mystery of the h Function"
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

## Episode 2: First createApp Experience and the Mystery of the h Function

The next day, as promised, Ponkichi arrived at Dr. Frontend's laboratory.

**Ponkichi:**
"Good morning, Doctor! Thank you for having me again today! Boing!"

Seeing Ponkichi's boundless energy, the doctor smiled warmly.

**Dr. Frontend:**
"Ah, good morning, Ponkichi. Did you review what we learned yesterday?"

**Ponkichi:**
"Yes! `createApp` is a super important function that combines components—the 'ingredients'—into an application 'container,' right?"

**Dr. Frontend:**
"Exactly! You remembered it well. Now then, today let's have you try using `createApp` with your own hands."

The doctor seated Ponkichi in front of the monitor.

**Dr. Frontend:**
"Here's the code I showed you yesterday. Now, try writing it yourself."

```javascript
import { h, createApp } from "@vue/runtime-dom";

const App = {
  render() {
    return h("div", "Hello, Ponkichi!");
  },
};
createApp(App).mount("#app");
```

Ponkichi nervously but diligently began typing on the keyboard. Though his fingers were unsteady at first, with the doctor's guidance, he managed to finish writing the code.

**Ponkichi:**
"I did it! Doctor!"

**Dr. Frontend:**
"Well done! Now, let's run it."

When Ponkichi pressed Enter, the browser displayed "Hello, Ponkichi!"

**Ponkichi:**
"Yay! The code I wrote actually works! Boing! Boing!"

Ponkichi was so happy that he started hopping up and down.

**Dr. Frontend:**
"Ha ha ha! That's the true joy of programming. There's nothing quite like the moment when your own code comes to life."

After celebrating for a while, Ponkichi suddenly had a question.

**Ponkichi:**
"Doctor, I was wondering yesterday too—what exactly is this `h` function? How is it different from writing with `template` like I usually do?"

The doctor nodded as if he'd been waiting for this question.

**Dr. Frontend:**
"Excellent question, Ponkichi! That's precisely the key to understanding Vue.js's inner workings."

**Dr. Frontend:**
"The `template` you usually use is actually converted internally by Vue.js into code that uses this `h` function."

**Ponkichi:**
"What?! Really?!"

**Dr. Frontend:**
"Indeed. While `template` is an easy-to-understand way of writing for humans, what Vue.js truly understands are things called 'Virtual Nodes' or 'VNodes' created by this `h` function."

**Ponkichi:**
"Virtual nodes...?"

The doctor began drawing on the blackboard again.

```
<template>
  <div>Hello</div>
</template>

      ↓ Vue.js converts this to

h('div', 'Hello')
```

**Dr. Frontend:**
"Code written in `template` is ultimately converted into a form using the `h` function and passed to Vue.js. You could say the `h` function is like Vue.js's 'common language.'"

**Ponkichi:**
"I see! So we can write with the `h` function directly instead of using `template`!"

**Dr. Frontend:**
"Exactly! And to understand the inner workings of Vue.js—the true nature of the 'magic'—learning from this `h` function is the best shortcut."

**Ponkichi:**
"The `h` function... It sounds difficult, but interesting too!"

**Dr. Frontend:**
"With that curiosity, you'll be just fine. Next time, let's explore the mysterious world of this `h` function and the 'virtual nodes' it creates in more detail."

**Ponkichi:**
"Yes! I'm looking forward to it! Boing!"

Ponkichi left the laboratory, excited about this new magical incantation called the `h` function.

---

### 🌟 Today's Takeaways

- Experienced creating an application by writing **`createApp`** yourself.
- The **`template`** we usually use is internally converted to the **`h` function**.
- The **`h` function** is the key to understanding Vue.js's inner workings.

### Next Episode Preview: "The Mysterious World of the h Function and VNodes"

Ponkichi learns how to use the h function and uncovers the mysteries of Vue.js's magical ingredient: "VNodes (Virtual Nodes)"!

### 👨‍🏫 Doctor's Note

To make the story easier to understand, the doctor explained that "templates are converted to h functions," but technically, it's a bit different.

Vue's compiler first parses the template (converting it to a tree structure called an AST), then generates optimized rendering code from there. The `h` function is a convenient API we developers use when we want to manually write rendering logic, while the code the compiler ultimately generates is even more optimized.

In this story, I used the term "h function" as a representative concept to make it easier for Ponkichi to understand.
By the way, this "h" stands for "hyperscript," which is a type of "notation for describing virtual DOM trees in JavaScript." The same concept is used in React as well.

---
*End of Episode 2*
