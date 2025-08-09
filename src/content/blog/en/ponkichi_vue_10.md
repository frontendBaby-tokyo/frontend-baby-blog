---
description: "Ponkichi dreams of becoming a frontend engineer and dives into the world of Vue.js with a genius doctor!"
pubDate: 2025-08-06T12:00:00.000Z
recommended: false
tags:
  - tags.tech.vue
  - tags.character.ponkichi
  - tags.series.ponkichi-to-vue
  - tags.genre.tech-light-novel
title: "Episode 10: Setup and Composition API"
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

## Episode 10🦝: Setup and Composition API

Having learned about the type safety of `Props`, Ponkichi now dives into the mystery of the `setup` function, which the doctor called "the heart of Vue 3."

**Ponkichi:**
"Doctor! Please teach me about the `setup` function! Last time, it was taking `props` as an argument, but what exactly was it doing?"

**Dr. Frontend:**
"Indeed. The `setup` function is the central place for the new way of writing components called 'Composition API,' introduced in Vue 3. It would be good to first understand why Composition API was created."

The doctor displayed a component written with Options API.

```typescript
// Options API (traditional way)
export default defineComponent({
  data() {
    return {
      count: 0
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
})
```

**Dr. Frontend:**
"In the traditional Options API, `data` goes here, `methods` go there, and `computed` goes over there—related code was scattered across different sections based on the type of functionality. This works fine for small components, but as they grow larger, logic related to a single feature gets scattered throughout the file, making it hard to follow."

**Ponkichi:**
"That's true... I can imagine having to search all over the place wondering 'Where is the logic for this button written?'"

**Dr. Frontend:**
"Exactly right. That's where Composition API comes in. It's a new style that allows you to write related code for each feature in one place. And the stage for this is the `setup` function."

The doctor showed an example of a counter component using the `setup` function.

```typescript
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup() {
    // 1. Define reactive state
    const count = ref(0) // Wrapping with ref() makes it reactive

    // 2. Define methods that update state
    function increment() {
      count.value++
    }

    // 3. Define values derived from state
    const doubleCount = computed(() => count.value * 2)

    // 4. Return what should be exposed to the template
    return {
      count,
      increment,
      doubleCount
    }
  }
})
```

**Ponkichi:**
"Wow! There's no `data` or `methods`! Instead, everything related to the counter is grouped together inside the `setup` function! And there are new functions like `ref` and `computed`."

**Dr. Frontend:**
"That's right. `ref` is a function for creating reactive data. And the properties of the object returned from the `setup` function become available in the component's template."

**Ponkichi:**
"I see! Unlike Options API, where you have to write things in different places, all the related code is together in `setup`, making it super clear! Boing!"

**Dr. Frontend:**
"Indeed. That's the major advantage of Composition API. And this is where the second of the seven parameters, `RawBindings`, comes into play."

**Ponkichi:**
"`RawBindings`...! What does that mean?"

**Dr. Frontend:**
"`RawBindings` is the parameter that defines the 'type' of the object that this `setup` function returns. In this example, a type like `{ count: Ref<number>, increment: () => void, doubleCount: ComputedRef<number> }` would be inferred as `RawBindings`."

**Dr. Frontend:**
"Because of this type information, TypeScript can accurately understand what's returned from `setup`, enabling more powerful type checking within templates and stronger type inference for `this`."

Ponkichi understood that the `setup` function wasn't just a new way of writing code, but a powerful mechanism for creating more robust and understandable code in collaboration with TypeScript.

**Ponkichi:**
"`setup` and Composition API, and `RawBindings`. Everything connects together to create safe and organized components!"

**Dr. Frontend:**
"Exactly right! However, Ponkichi, don't you think writing `defineComponent` and `setup` every time, and having to `return` at the end, is a bit tedious?"

**Ponkichi:**
"Eh...? Ah, yes, a little bit..."

**Dr. Frontend:**
"Hehe. Actually, Vue has even more magic that lets you write much more simply. Next time, let's look at the magic spell `<script setup>` and the mysterious power of type inference."

**Ponkichi:**
"What?! It can get even simpler?! I can't wait!"

---

### 🌟 Today's Takeaways

- **Composition API** is a new way of writing that groups related code by feature.
- The **`setup`** function is the central place for writing Composition API logic.
- **`ref`** can be used to create reactive data.
- Objects returned from `setup` become available in the template.
- One of the seven parameters, **`RawBindings`**, defines the type of the object returned by `setup`.

### Next Episode Preview: "The Mysterious Power of Type Inference"
The magic spell `<script setup>` appears, eliminating the need for `defineComponent`, `setup`, and `return`! Why does it all work so seamlessly with just that? We'll explore the powerful force of TypeScript's "type inference"!

### 👨‍🏫 Doctor's Note

Ponkichi might have been a bit puzzled by the `count.value++` syntax this time. Many readers probably thought "Why can't we just write `count++`?"

This will be a somewhat technical discussion, but the answer to this question involves deep technical background of JavaScript and Vue. It's perfectly fine if you can't understand everything completely—just thinking "Oh, so there's such a reason" is enough.

Actually, this `.value` is a beautiful "compromise product" born from the deep constraints of the JavaScript language and the ingenious solution Vue devised.

First, to achieve reactivity (a mechanism that automatically detects value changes), we need to "**catch the moment when a value changes**." Vue 2 used `Object.defineProperty`:

```javascript
// Vue 2's reactivity (simplified)
let data = {}
Object.defineProperty(data, 'count', {
  get() { 
    console.log('Value was read!')
    return this._count 
  },
  set(newValue) { 
    console.log('Value was changed!', newValue)
    this._count = newValue
    // DOM updates are queued and batched in the next tick
  }
})
```

But this had major problems. **You couldn't add new properties later**, and **you couldn't detect array index operations**.

Vue 3 solved this problem with **Proxy**:

```javascript
// Vue 3's reactivity (simplified)
const reactive = (obj) => {
  return new Proxy(obj, {
    get(target, key) {
      console.log(`${key} was read!`)
      return target[key]
    },
    set(target, key, value) {
      console.log(`${key} was changed to ${value}!`)
      target[key] = value
      // Update DOM
      return true
    }
  })
}
```

This made reactivity for **objects** perfect. But here, a new problem arose.

**Primitive values (numbers, strings, booleans) are not objects!**

```javascript
let count = 5  // This is a number, can't wrap it with Proxy
count = 6      // How do we detect this change?
```

So Vue's solution was to **wrap primitive values in objects**:

```javascript
// The essence of ref() (super simplified)
function ref(value) {
  return reactive({
    value: value  // Store primitive value in value property
  })
}

const count = ref(5)
// count is an object like { value: 5 }
// By doing count.value = 6, Proxy can detect the change!
```

In other words, the `count.value++` syntax is a "**beautiful hack that Vue devised to overcome JavaScript's constraints**."

Interestingly, you don't need to write `.value` in templates:

```vue
<template>
  <!-- No need to write .value! -->
  <div>{{ count }}</div>
</template>
```

This is because Vue's compiler automatically adds `.value` for you. It's a very thoughtful design that considers developer experience.

Behind this seemingly tedious `.value` syntax lies the battle with JavaScript language limitations, the pursuit of performance, and consideration for developer experience—all packed together.

---

*End of Episode 10*
