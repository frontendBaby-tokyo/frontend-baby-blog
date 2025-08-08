---
description: "Ponkichi discovers TypeScript and learns how 'types' can prevent unexpected bugs in his code."
pubDate: 2025-08-05T03:00:00.000Z
recommended: false
tags:
  - tags.tech.vue
  - tags.character.ponkichi
  - tags.series.ponkichi-to-vue
  - tags.genre.tech-light-novel
title: "Episode 5: Ponkichi's Frontend Adventure - Unraveling the Mysteries of Vue and Types with the Doctor"
---

## The Tale of a Young Raccoon Dog Whose Life Was Drastically Changed When He Barged into the Forest Doctor's Laboratory Because He Just Couldn't Understand Vue.js

### Note

This story was written with the help of generative AI, aiming to make learning frontend technology enjoyable.
While we have taken the utmost care to ensure the accuracy of technical information, we cannot guarantee that all content is completely true.
Please enjoy this as a supplementary learning tool and with a relaxed mindset.

---

### Character Introduction

*   **Dr. Frontend**: A knowledgeable doctor who lives in a laboratory deep in the forest and knows everything about frontend development. He always kindly (and humorously) answers Ponkichi's simple questions.
*   **Ponkichi**: A curious young raccoon dog. His dream is to become a frontend engineer. He recently started learning Vue.js and is very intrigued by its depth. He has a special skill of exclaiming "Pon!" and jumping up when he learns something new.

---

### Episode 5 🦝 "Ponkichi's Frontend Adventure - Unraveling the Mysteries of Vue and Types with the Doctor"

A few days later, Ponkichi came to the laboratory with a slightly troubled look on his face.

**Ponkichi**: "Hello, Doctor... There's something I'd like to ask you."

**Dr. Frontend**: "Oh, Ponkichi. What's wrong? You look so serious."

**Ponkichi**: "The other day, I tried to make a simple function to do some calculations. But sometimes, it does strange things..."

Ponkichi showed the Doctor the code he had written.

```javascript
// A function intended to add two numbers
function add(a, b) {
  return a + b;
}

// Ponkichi's execution example
console.log(add(5, 3));      // -> 8  (This is OK!)
console.log(add("5", "3"));    // -> "53" (Huh?)
```

**Ponkichi**: "When I add the numbers `5` and `3`, I get `8`, but when I add the strings `"5"` and `"3"`, they just stick together and become `"53"`. I'd rather it gave me an error..."

The Doctor smiled gently.

**Dr. Frontend**: "Ponkichi, that is precisely why we need the magic of TypeScript, which we are about to learn today."

**Ponkichi**: "TypeScript...?"

**Dr. Frontend**: "Yes. The language you are currently writing in is called JavaScript. JavaScript is a very free and flexible language, but as you've just seen, it can sometimes behave in unintended ways. When you use the `+` operator with a 'number' and a 'string', JavaScript tries to be helpful and concatenates them both as strings."

**Ponkichi**: "Helpful... But it's a nuisance for me..."

**Dr. Frontend**: "I understand. That's where TypeScript comes in. TypeScript is like JavaScript's older brother, adding a set of rules called 'types' to JavaScript."

**Ponkichi**: "Types...? Like you mentioned yesterday, about putting labels on data..."

**Dr. Frontend**: "Exactly! With TypeScript, you can write the previous function like this."

The Doctor rewrote Ponkichi's code.

```typescript
// The add function written in TypeScript
function add(a: number, b: number): number {
  return a + b;
}

// Execution example
add(5, 3);      // -> 8 (OK!)
add("5", "3");    // -> Error! "Argument of type 'string' is not assignable to parameter of type 'number'."
```

**Ponkichi**: "Wow! There's a `: number` added! And when I put in the strings '5' and '3', it actually gives an error!"

**Dr. Frontend**: "That's right. This `: number` is called a 'type annotation,' and it's like putting a label on the variable `a` that says, 'Only a number is allowed here.' So, if you try to put a string in there, TypeScript will tell you, 'The types are different!' before you even run the code."

**Ponkichi**: "Before running it...? Amazing! This will prevent mistakes like the one I made earlier!"

**Dr. Frontend**: "Exactly. TypeScript has three main purposes."

The Doctor wrote on the blackboard.

1.  **Early Error Detection**: Find mistakes in your code before you run it.
2.  **Improved Code Readability**: Just by writing `: number`, it becomes easier to understand what the function is intended to do.
3.  **Advanced Editor Support**: The editor understands the types and provides powerful features like autocompletion.

**Ponkichi**: "I see! The freedom of JavaScript is nice, but having strict rules like in TypeScript seems more reassuring when building large applications!"

**Dr. Frontend**: "Precisely, Ponkichi. Especially in applications like Vue.js, where you combine many components, the safety provided by TypeScript's 'types' is a great help in development."

**Ponkichi**: "TypeScript sounds like a reliable ally! I want to learn more! Pon!"

**Dr. Frontend**: "Alright. Next time, let's take a look together at the 'type' definition of our `createApp` function in the world of TypeScript."

**Ponkichi**: "`createApp` has a type too!? Yes, I'm looking forward to it!"

And so, Ponkichi obtained a new magic map to navigate the world of programming more safely.

---

### **🌟 Today's Takeaways**

- **JavaScript** is free and flexible but can sometimes behave in unintended ways.
- **TypeScript** is a language that adds **'type'** rules to JavaScript.
- **Types** are a mechanism for labeling data, such as "this is a number" or "this is a string."
- With TypeScript, you can find mistakes **before** running your code, allowing for safer development.

### **Next Episode Preview: "Let's Look at the Type of createApp"**

We'll take a peek at the true identity of the `createApp` function we always use, through its TypeScript type definition file! What discoveries will Ponkichi make?

---
*End of Episode 5*