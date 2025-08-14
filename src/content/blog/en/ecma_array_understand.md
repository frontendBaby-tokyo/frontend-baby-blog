---
description: I investigated the Array specification in ECMAScript
pubDate: 2025-08-09T02:00:00.000Z
recommended: true
tags:
  - tags.tech.ecmascript
  - tags.tech.javascript
  - tags.tech.array
title: Understanding JavaScript Array Specification by Reading ECMAScript
---

## Note

This article is a republication of what I previously [posted on Qiita](https://qiita.com/fontendBaby/items/11badd2a6a2fc7991de3). I plan to create a more digestible version of this article in the future.

## Introduction

I implement JavaScript code on a daily basis, but I have never actually read ECMAScript, which is the language specification. I haven't been using the language with a proper understanding of its specification; honestly, I've been using it with the attitude of "it works without problems, so I use it somehow."

This time, I wanted to understand JavaScript specifications accurately, so I decided to read ECMAScript, which is the language specification. However, since ECMAScript as a whole would be too broad in scope, I decided to focus on arrays, which are frequently used in React and other contexts, and examine the ECMAScript specification. Below, I'll share what I learned.

## About ECMAScript

To understand JavaScript specifications, let me briefly organize the positioning of ECMAScript.

### There is no official JavaScript documentation

- There is no official documentation for JavaScript itself.
- [MDN](https://developer.mozilla.org/en/docs/Web) is widely referenced and treated as if it were official documentation, but strictly speaking, it is not official.

### JavaScript specifications are described in ECMAScript

- By reading ECMAScript, you can accurately understand JavaScript's core specifications.
- JavaScript execution engines (such as V8) are implemented based on ECMAScript specifications.

### ECMAScript doesn't define everything about JavaScript

- What ECMAScript defines is JavaScript's core language specification. (Examples: data types, functions, objects, etc.)

#### Things outside the scope of ECMAScript
For example, the following APIs are not defined in ECMAScript specifications but by other organizations:
- **DOM API** (defined by WHATWG)
- **Fetch API** (defined by WHATWG)
- **Node.js API** (Node.js-specific specifications)

## Sources for this article

1. **ECMAScript descriptions**  
   Content described in the official ECMAScript specification is the most reliable information.
2. **Verification with JS execution engines**  
   Verify behavior based on ECMAScript specifications by actually executing programs.  
   JavaScript execution engines are implemented faithfully to ECMAScript specifications (presumably), so if we can verify the behavior, our understanding of the specification becomes more certain.  
   While verification with multiple execution engines would increase reliability, I didn't go that far this time and verified execution using Google Chrome's developer tools.

The content of this article from here on is based on the above two points.  
Please note that the content of this article may include my interpretation and speculation.

## Array is an Object

> The ECMAScript language types are Undefined, Null, Boolean, String, Symbol, Number, BigInt, and Object.

Regarding data types in ECMAScript, the above is described in [6 ECMAScript Data Types and Values](https://tc39.es/ecma262/#sec-ecmascript-data-types-and-values).
We can see that Array is not defined as a data type.

Reading [23.1 Array Objects](https://tc39.es/ecma262/#sec-array-objects), we find the statement **Arrays are exotic objects**, confirming that in ECMAScript, Array is defined as a type of object.

```js
const arr = new Array();
const arr2 = []
console.log(typeof arr); // object
console.log(typeof arr2); // object
```

Actually verifying with the [typeof operator](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-typeof-operator), we can see that it is `object`.

By the way, `console.log()` is not included in the ECMAScript specification. The console object specification is defined by the [Console Standard](https://console.spec.whatwg.org/#log) formulated by WHATWG.

## Array is an exotic object

### ordinary object and exotic object
First, in 4.4 Terms and Definitions, there are sections for **ordinary object** and **exotic object**, each briefly defined.

1. [4.4.9 ordinary object](https://tc39.es/ecma262/multipage/overview.html#sec-ordinary-object)  
> An object that has the default behavior for essential internal methods that must be supported by all objects (paraphrased)
2. [4.4.10 exotic object](https://tc39.es/ecma262/multipage/overview.html#sec-exotic-object)
> An object that does not have one or more of the essential internal methods of ordinary objects (paraphrased)

Details about **ordinary object** and **exotic object** are described in [10 Ordinary and Exotic Objects Behaviours](https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-ordinary-and-exotic-objects-behaviours). (This article won't delve into those details.)

### What it means for Array to be an exotic object
What does it mean that Array is an exotic object? 
This is described in [10.4.2 Array Exotic Objects](https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#array-exotic-object), and summarizing the content:

- **Array index property keys**  
   Properties whose property names are array indices are called "elements."
- **length property**  
   A length property always exists, and its value is an integer greater than or equal to 0 and less than 2**32. This property has the non-configurable characteristic.
- **Relationship between index and length**  
   The value of the length property is always greater than the maximum index value in the array.
- **Automatic adjustment of length property**  
   When new index properties are added or changed in an array, the length property is automatically updated. (Example: adding an element with index 4 makes length 5.)
- **Property deletion**  
   When the "length" property is changed, all properties with indices greater than or equal to that value are deleted. (Example: when length is set to 3, all elements with index 3 or higher are deleted.)

### Verify by executing programs
Let's verify the items above that can be confirmed by program execution.

#### Array index property keys
The term "element" cannot be verified by program execution.
```js
const fruits = ["apple", "orange", "banana"]
// Verify that property keys are array indices
0 in fruits; // true
2 in fruits; // true
6 in fruits; // false
// Array values are not property keys
"apple" in fruits // false
```

#### length property
Item `2.` about the length property can be verified.
```js
const arr = [0, 1, 2]

/*
*Verify length property existence
*/
// Verify that length property exists
console.log("length" in arr) // true

// Verify that length property exists in arr's prototype object
// ※We'll touch on prototypes later
console.log("length" in Object.getPrototypeOf(arr)) // true
console.log(Object.getPrototypeOf(arr) === Array.prototype) // true (arr's prototype object is Array.prototype)

/*
*Verify length range
*/
// When trying to set length to a negative value (RangeError occurs)
console.log(arr.length = -1)　// "Uncaught RangeError: Failed to set the 'length' property on 'Array': Invalid array length"

// When trying to set length to 2**32 or higher (RangeError occurs)
console.log(arr.length = 2**32)　// "Uncaught RangeError: Failed to set the 'length' property on 'Array': Invalid array length"

// When trying to set length to a decimal value (RangeError occurs)
console.log(arr.length = 1.8)　// "Uncaught RangeError: Failed to set the 'length' property on 'Array': Invalid array length"

// When trying to set length to a string (RangeError occurs)
console.log(arr.length = "あいうえお") // "Uncaught RangeError: Failed to set the 'length' property on 'Array': Invalid array length"

// Verify that appropriate values can be set for length
console.log(arr.length = 100) // 100 (successfully set)
console.log(arr.length = "20") // 20 (successfully set)
console.log(arr.length = 2**32 - 1) // 4294967295 (successfully set)

/*
*Verify non-configurable characteristic
*/
const arr2 = ["a", "b"]
// Check the object describing the configuration of arr2's length property
console.log(Object.getOwnPropertyDescriptor(arr2, "length"))　
// From the following output, we can see that configurable is false, confirming it is non-configurable.
// {
//     "value": 2,
//     "writable": true,
//     "enumerable": false,
//     "configurable": false
// }

// Verify that length property cannot be deleted
delete arr2.length // false
console.log(arr2.length) // 2 (delete operator couldn't delete the length property)

// Verify that configurable cannot be changed to true
Object.defineProperty(arr2, "length", {
   configurable: true,
})　// "Uncaught TypeError: Cannot redefine property: length at Function.defineProperty (<anonymous>)"

// Verify that enumerable cannot be changed to true
Object.defineProperty(arr2, "length", {
   enumerable: true,
}) // "Uncaught TypeError: Cannot redefine property: length at Function.defineProperty (<anonymous>)"

// writable can be changed from true => false
Object.defineProperty(arr2, "length", {
   writable: false,
}); //  (no error)

// Once set to false, it cannot be changed back to true
Object.defineProperty(arr2, "length", {
   writable: true,
})　// "Uncaught TypeError: Cannot redefine property: length at Function.defineProperty (<anonymous>)"
```
First, we used the [in operator](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-relational-operators) to verify that the length property exists in the Array object `arr`. Furthermore, we verified the existence of the length property in `arr`'s prototype object. Actually, Array objects inherit `Array.prototype`, so the length property of `Array.prototype` also exists in `arr`. We'll touch on this mechanism later.

Next, we verified that length can only be set to appropriate values (integers greater than or equal to 0 and less than 2**32).

Finally, we verified that the length property is non-configurable. Using the [Object.getOwnPropertyDescriptor](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.getownpropertydescriptor) method to get the property configuration, we found that the configurable property value is indeed false.

The configurable property characteristic is described in [6.1.7.1 Property Attributes](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-property-attributes), and in summary, "when `false`, the property cannot be deleted or have its attributes changed."
Indeed, when we try to delete the length property with the delete operator, we cannot delete it. Also, when we try to change configurable or enumerable using the [Object.defineProperty](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.defineproperty) method, errors are returned. However, regarding writable, it is possible to change from true to false. But once changed to false, changing from false=>true becomes impossible. The algorithm for this seems to be defined in [6.2.6.5 ToPropertyDescriptor](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-topropertydescriptor), but since it deviates from the purpose of this article, I won't go into details.
By the way, the reason why you can overwrite the length property value like `arr.length = 100` in normal array objects is because the writable attribute is true. If you change the writable attribute to false, you won't be able to overwrite the length property.

## Array Constructor

In JavaScript, you can create arrays with the Array constructor like `new Array(10)`.  
[23.1.1 The Array Constructor](https://tc39.es/ecma262/#sec-array-constructor) describes the Array constructor specification. Here's a summary:

- **Property of global object**  
   The Array constructor is the initial value of the "Array" property of the global object.

- **Array creation**   
   When called as a constructor, the Array constructor creates and initializes a new array (Array object). (Calling `new Array()` creates a new array.) 
   Also, when called as a function, the Array constructor creates and initializes a new array. That is, calling `Array(...)` behaves the same as `new Array(...)`.

- **Different behavior based on arguments**  
   The behavior of the Array constructor differs depending on the number and type of arguments passed.

- **Use in class definitions**  
   The Array constructor can be used as the value of the `extends` clause in class definitions. To inherit Array behavior, subclass constructors must make a `super` call to invoke the Array constructor.

### Verify by executing programs
Let's verify the above content by executing programs.

#### Property of global object
```js
console.log(Array === window.Array); // true (browser environment)
```

The global object in browser environments is the window object. Since `Array === window.Array` is true, we confirmed that it is the initial value of the "Array" property of the global object.

The window object, which is the global object in browser environments, is not part of the ECMAScript specification but is defined by [WHATWG specifications](https://html.spec.whatwg.org/multipage/nav-history-apis.html#the-window-object). In Node.js, the global object is `global`, so `global.Array === Array` would be true.

The definition of the global object in ECMAScript is described in [19 The Global Object](https://tc39.es/ecma262/#sec-global-object). Briefly summarized, "the global object is created before script execution, cannot be used as a constructor with the new operator, cannot be called as a function, and can have unique properties depending on the host environment." Other global object value properties, function properties, and constructor properties are listed, including [the Array constructor](https://tc39.es/ecma262/#sec-constructor-properties-of-the-global-object-array).

#### Array creation
```js
console.log(new Array()); // [] (calling as constructor with new operator created an array) 
console.log(Array()); // [] (calling as function created an array)
console.log(typeof Array); // 'function' (Array itself is a function)
```
By the way, in the case of Array, the operation results don't change whether called as a function or constructor as shown above, but this doesn't necessarily apply to all constructors other than Array. For example, `Date()` creates a string, while `new Date()` creates an object.

#### Different behavior based on arguments
```js
console.log(new Array()); // [] 
console.log(new Array(10)); // [empty × 10]
console.log(new Array(0, 1)); // [0, 1]
console.log(new Array("a")); // ['a']
```
The internal algorithm when Array is called is defined in [23.1.1.1 Array ( ...values )](https://tc39.es/ecma262/#sec-array), where the different behaviors based on arguments are also described in detail.

#### Use in class definitions
```js
class CustomArray extends Array {
  // Define constructor and call parent class constructor
  constructor(...args) {
    super(...args); // Call Array constructor and pass arguments
  }

  // Add new method
  customMethod() {
    return this.map(element => element * 2); // Example: double each array element
  }
}

// Create CustomArray instance
const myArray = new CustomArray(1, 2, 3, 4);

console.log(myArray); // [1, 2, 3, 4]
console.log(myArray.length); // 4 (can use length property because it inherits Array behavior)
console.log(myArray.customMethod()); // [2, 4, 6, 8]
```

## Array inherits from Object

We confirmed earlier that Array is a type of object, but let's delve deeper into this.  
The Array constructor has a property called [Array.prototype](https://tc39.es/ecma262/#sec-array.prototype).  
[23.1.3 Properties of the Array Prototype Object](https://tc39.es/ecma262/#sec-properties-of-the-array-prototype-object) describes that Array.prototype's prototype is Object.prototype.

```js
const arr = []
// arr's prototype object is Array.prototype
console.log(Object.getPrototypeOf(arr) === Array.prototype); // true
// Array.prototype's prototype object is Object.prototype
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype); // true

// Can also check with deprecated __proto__ method
console.log(arr.__proto__ === Array.prototype);  // true
console.log(arr.__proto__.__proto__ === Object.prototype); // true
console.log(arr.__proto__.__proto__.__proto__ === null);  // true (top level of Object)

// Verify with instanceof operator
console.log(arr instanceof Array);  // true (instance of Array)
console.log(arr instanceof Object); // true (instance of Object)

// Verify that Object.prototype properties can be used
console.log("toString" in Object.prototype) // true (toString method is a property of Object.prototype)
console.log(arr.toString()) // "" (can use toString method)
```

We confirmed that array object arr inherits Array.prototype, but Array.prototype inherits Object.prototype. That is, all array objects inherit from Object, so they can use not only Array.prototype properties (like length and pop) but also Object.prototype properties (like toString).

### Array objects can have properties other than array elements

Since arrays in JavaScript are objects, they have the peculiar characteristic that you can set properties other than array elements.  
As mentioned earlier, array objects have special properties like array index properties (e.g., 0, 1) and the length property, which is why they are defined as exotic objects. However, since they inherit from Object, which is an ordinary object, they can also behave as normal objects.

```js
const arr = [0, 1]
arr["description"] = "This is an array."
arr["print"] = function() {
   this.forEach(item => console.log(item))
}

console.log(arr) // [0, 1, description: 'This is an array.', print: ƒ]
console.log(arr.length) // 2 (length is not affected)
console.log(arr["description"]) // "This is an array."
arr.print() 
// 0
// 1
```

As shown above, we confirmed that description and print properties can be added to array object arr. These two new properties don't correspond to array elements, so they don't affect length.  
As shown above, it becomes possible to have metadata properties or incorporate custom methods.

What happens if we set push or forEach properties?
```js
const arr = [0, 1]
arr["push"] = () => {}
arr["forEach"] = null

console.log(arr.push) // () => {}
arr.push(4)
console.log(arr.length) // 2 (since we set push property to empty function, length doesn't change)
arr.forEach(item => console.log(item)) // arr.forEach is not a function (can't use forEach normally)
console.log(arr.forEach) // null
```
As shown, the newly set push and forEach properties are overwritten, making normal usage impossible.

## Implementing array-like objects

There is no independent "array" data type; arrays are implemented as a type of `Object`. They have special properties like index properties (e.g., 0, 1) and the length property, and special methods like push and pop are provided, but fundamentally they are objects. Therefore, when handling arrays in JavaScript, you don't absolutely have to use Array objects.  
It should be theoretically possible to make normal objects behave like arrays with some ingenuity. Of course, there's basically no merit to doing such a thing in practical work, and there's no problem using the mechanisms provided by the language. This time, as an experiment, I'll try to simply implement an array-like object using normal objects without using the Array provided by the language.

```javascript
// Create array-like object
const arrayLike = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
  push: function (item) {
    this[this.length] = item;
    this.length++;
  },
  pop: function () {
    if (this.length === 0) return undefined;
    const lastItem = this[this.length - 1];
    delete this[this.length - 1];
    this.length--;
    return lastItem;
  },
}

// Initial state
console.log(arrayLike); // {0: 'a', 1: 'b', 2: 'c', length: 3, push: ƒ, pop: ƒ}

// Using push method
arrayLike.push("d");
console.log(arrayLike); // {0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4, push: ƒ, pop: ƒ}

// Using pop method
console.log(arrayLike.pop()); // "d"
console.log(arrayLike); // {0: 'a', 1: 'b', 2: 'c', length: 3, push: ƒ, pop: ƒ}
```
