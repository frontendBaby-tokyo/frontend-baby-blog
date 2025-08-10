---
description: "Ponkichi dreams of becoming a frontend engineer and dives into the world of Vue.js with a genius doctor!"
pubDate: 2025-08-07T09:00:00.000Z
recommended: false
tags:
  - tags.tech.vue
  - tags.character.ponkichi
  - tags.series.ponkichi-to-vue
  - tags.genre.tech-light-novel
title: "Episode 13: Doctor's Graduation Certificate (Final Episode)"
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

## Episode 13🦝: Doctor's Graduation Certificate (Final Episode)

That day, the atmosphere in the laboratory was a little different than usual. The doctor stood with his arms crossed, staring at the monitor with a stern expression. Ponkichi gulped nervously and sat in his chair with a tense look on his face.

**Dr. Frontend:**
"Ponkichi, today is your final exam. You must prove everything I have taught you here and now."

**Ponkichi:**
"Y-yes! Boi...!"

His voice cracked a little. It was understandable. On the monitor in front of him, only one empty file was open. Today's challenge was to build a complete application from scratch.

**Dr. Frontend:**
"Your assignment is a 'Simple Todo List.' You can add tasks and cross them out when completed. That's all. However, there are conditions."

The doctor raised one finger.

**Dr. Frontend:**
"First, everything must be type-safe, from `createApp` to `Component` design. Make full use of TypeScript's power."

He raised a second finger.

**Dr. Frontend:**
"Second, components must be properly divided. Input form, list display, and individual list items. Each should be designed as independent, reusable parts."

Then he raised a third finger.

**Dr. Frontend:**
"Finally, I will not help you at all—no hands, no words. No questions allowed. Overcome this challenge with your own strength alone. ...Begin!"

At those words, Ponkichi placed his hands on the keyboard. Only the soft sound of typing echoed in the laboratory.

(*`createApp`... first I need to create the app container...*)

Ponkichi remembered what he learned in the first episode. He created a `main.ts` file and wrote the application's entry point.

(*Next is component design... the doctor said to divide them...*)

Ponkichi began drawing a parent-child component relationship diagram on paper. `App.vue` at the top. Below it, `TodoForm.vue` for adding new todos and `TodoList.vue` for displaying the todo list. And below that, `TodoItem.vue` for individual todo items.

**Ponkichi:**
"Alright...! The flow of `props` and `emits` goes like this...!"

`App.vue` would hold the entire todo list as state, `TodoForm` would `emit` an event to add a new todo. `App.vue` would receive that event, update the list, and pass the updated list as `props` to `TodoList`. `TodoList` would loop through the list and pass individual todos to `TodoItem`, and `TodoItem` would `emit` a completion event...

He could clearly visualize the data flow in his mind. This was proof that all his conversations with the doctor had become part of his flesh and blood.

The keyboard sounds grew stronger and more confident.

He started with `TodoItem.vue`. The golden rule is to build from the smallest parts first.

```vue
// TodoItem.vue
<script setup lang="ts">
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const props = defineProps<{ todo: Todo }>()
const emit = defineEmits<{ (e: 'toggle-complete', id: number): void }>()
</script>

<template>
  <li :class="{ completed: props.todo.completed }" @click="emit('toggle-complete', props.todo.id)">
    {{ props.todo.text }}
  </li>
</template>

<style scoped>
.completed { text-decoration: line-through; }
li { cursor: pointer; }
</style>
```

(*Good! Types defined with `defineProps` and `defineEmits`...! The contract with the parent is perfect!*)

Next came `TodoList.vue`, then `TodoForm.vue`. Ponkichi wrote code frantically. Midway through, he made a mistake with the props type and red squiggly lines appeared in the editor.

**Ponkichi:**
"Ah...!"

In the past, he might have panicked. But Ponkichi was different now. He carefully read the error message from TypeScript.

(*"Type 'number' is not assignable to type 'string'." I see, the type of data I'm passing is wrong.*)

He calmly corrected the mistake. Now he understood what the doctor meant by "errors are your friends." TypeScript was constantly by his side, guiding him so he wouldn't stray from the path.

Finally, all the parts were assembled, and he completed the final `App.vue`.

```vue
// App.vue
<script setup lang="ts">
import { ref } from 'vue'
import TodoForm from './TodoForm.vue'
import TodoList from './TodoList.vue'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const todos = ref<Todo[]>([])
let nextId = 0

function addTodo(text: string) {
  todos.value.push({ id: nextId++, text, completed: false })
}

function toggleComplete(id: number) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}
</script>

<template>
  <h1>Ponkichi's Todo List</h1>
  <TodoForm @add-todo="addTodo" />
  <TodoList :todos="todos" @toggle-complete="toggleComplete" />
</template>
```

After saving all files, Ponkichi reloaded the browser with trembling hands. The screen displayed the heading "Ponkichi's Todo List" and an input form.

He typed "Thank the doctor" in the form and pressed the add button. An item was added to the list. When he clicked on that item, a strikethrough line appeared.

**Ponkichi:**
"I... I did it...! It works...!"

Tears welled up in Ponkichi's eyes. He had built a complete application from scratch using only his own strength and the knowledge he had learned. The sense of accomplishment was a great joy he had never felt before.

At that moment, the doctor, who had maintained silence throughout, slowly began to clap.

Clap... Clap... Clap...

**Dr. Frontend:**
"Magnificent, Ponkichi. Perfect work."

The doctor's eyes also seemed a little moist.

**Dr. Frontend:**
"You are no longer just a curious little raccoon dog. You can face problems, think about design, write code, and fix bugs on your own... You are a true frontend engineer in the making."

The doctor took out a parchment from his desk drawer. It read:

```
----------------------------------------

    Certified by Dr. Frontend

        Graduation Certificate

Mr. Ponkichi

You have magnificently completed
your journey of exploring Vue.js and TypeScript
In recognition of your curiosity and spirit of inquiry
I hereby certify your graduation

I look forward to your continued learning
and creating wonderful applications
for the world

From Dr. Frontend

----------------------------------------
```

**Ponkichi:**
"Doctor...!"

When Ponkichi received the graduation certificate, he couldn't hold back his tears and began to cry. These weren't tears of frustration, but warm tears of joy, pride, and a little sadness.

**Dr. Frontend:**
"Don't cry, Ponkichi. Graduation is not an end, but a new beginning. Before you lies the vast ocean of frontend development. React, Angular, Svelte... there are still many continents to explore. Turn today's success into confidence and keep moving forward."

**Ponkichi:**
"Yes...! Yes! Doctor, thank you, truly thank you so much! Boing! Boing!"

Wiping away his tears, Ponkichi bowed again and again with a beaming smile. His tail was wagging so hard it might have fallen off.

The adventure of a little raccoon dog that began with an encounter at a mysterious laboratory deep in the forest. He learned many things, starting from the mystery of `createApp`, through `Component` types, to the magic of TypeScript. But perhaps the most precious thing he gained wasn't the knowledge itself, but "the power to learn, think, and create on his own."

As the doctor watched Ponkichi's figure disappearing into the sunset, carefully holding his graduation certificate, he kept watching for a long time.

**Dr. Frontend:**
"Go, Ponkichi. I'm sure you'll become a wonderful engineer..."

Ponkichi's adventure had only just begun.

---

### 🌟 Story Summary

- **`createApp`** is the first magic that creates the container for an application.
- **`h` function** and **`VNode`** are at the core of Vue's virtual DOM mechanism that supports fast rendering.
- **TypeScript** and **type definitions** are reliable allies for making code safe and robust.
- **`Component` type** enables the creation of reusable and flexible parts through mechanisms like `Props`, `Emits`, and `Slots`.
- **Composition API** and **`<script setup>`** organize logic clearly and accelerate development.
- And most importantly, **not being afraid of errors, thinking for yourself, and continuing to learn step by step** is the path to becoming the best engineer!

### 👨‍🏫 Doctor's Graduation Message

Thank you so much to everyone who read this long story spanning 13 episodes to the very end.

Looking back, when Ponkichi first came to the laboratory in Episode 1, he was truly a naive little raccoon dog who didn't even know `createApp`. Now he has grown to the point where he can build a type-safe Vue application all by himself. This growth is what **true learning** is all about.

What Ponkichi gained was not mere knowledge. It was **"the power to research, think, and experiment on his own when faced with something he doesn't understand."** This is the treasure that will be useful for a lifetime in this industry where technology keeps changing.

#### 📚 Your Learning Journey

Those of you who have read this story are surely walking a similar learning journey as Ponkichi.

- Initially confused, thinking "What is this?"
- Gradually understanding, "Ah, I see!"
- Sometimes feeling like giving up
- Finally experiencing the accomplishment of "I did it myself!"

This repetition will surely make you grow. Every time you encounter an error or a new concept, it would make me happy if you remember "Ponkichi went through this path too."

#### 🚀 To Everyone Standing at a New Starting Line

Those who have read this series to the end are no longer beginners. You are **frontend engineers in the making** who have firmly grasped the basics of Vue.js and TypeScript.

Vast possibilities now spread before you:

- Building more complex applications
- Experiencing team development
- Creating services that delight users
- And now it's your turn to teach others

#### 💌 Final Request from the Doctor

Finally, I have just one request.

Even if you get lost or face difficulties in your future learning, please never give up. As it was with Ponkichi, **"not understanding" is the beginning of "learning to understand."**

And when you become someone's mentor someday, if you could pass on the "joy of learning" you felt in this series to the next generation, there would be no greater happiness.

**I sincerely pray for your growth and success.**

---

*Ponkichi's Vue.js Adventure: The Day His Life Changed at the Forest Doctor's Lab - The End*
