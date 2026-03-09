# GitHub Issues Tracker - JavaScript Concepts

Hey there! Here are some core JavaScript concepts I used in this project, explained in my own words:

### 1️⃣ What is the difference between var, let, and const?

Alright, so `var` is the old school way to declare variables. It's function-scoped or global, and you can accidentally redeclare it which can cause weird bugs. `let` and `const` are the modern ways (introduced in ES6) and are block-scoped—meaning they only exist between the curly braces `{}` where you created them.
The difference between the two is that `let` allows you to change its value later, while `const` locks you in and prevents reassignment. Honestly, I just use `const` all the time by default, and only switch to `let` if I know the variable needs to be updated or looped through later.

### 2️⃣ What is the spread operator (...)?

The spread operator is just three dots `...`, and it's basically a shortcut to unpack stuff. If you have an array or an object, you can "spread" its contents out into a new array or object. For example, if I have `const arr1 = [1, 2]` and I want to combine it into another array, I can do `const arr2 = [...arr1, 3, 4]`. It's super handy for making copies of arrays or objects without messing with the original data.

### 3️⃣ What is the difference between map(), filter(), and forEach()?

They all loop over an array, but they all serve different purposes:

- **`forEach()`** just runs a function for every piece of data in the array. It doesn't return a new array (it returns `undefined`), so it's mostly used when you just want to do something _with_ the data, like logging it out or updating the DOM.
- **`map()`** also runs a function on every item, but it builds and returns a brand new array based on what you return for each item. It's really useful if you have raw data and want to transform it into HTML elements, like we did when rendering the label badges.
- **`filter()`** loops over the array and returns a new array, but it only keeps the items that pass a specific condition (when your function returns `true`). Perfect for filtering lists, like when we filtered the issues by "Open" or "Closed".

### 4️⃣ What is an arrow function?

An arrow function is just a shorter, cleaner way to write a function. Instead of typing out `function() { ... }`, you use an arrow like this: `() => { ... }`. Aside from looking nicer, it has one major background difference: it doesn't create its own `this` context. It just inherits `this` from wherever it was created, which saves a lot of headaches when you're passing functions around or doing event listeners.

### 5️⃣ What are template literals?

Template literals are strings, but way better. Instead of using regular quotes (`' ` or `" `) and painfully combining text and variables using `+` signs, you use backticks (`` ` ``). This lets you inject variables directly into the string by wrapping them in `${variableName}`. It also lets you write strings across multiple lines without breaking your code or needing `\n`. It makes building dynamic HTML structures incredibly easy!
