// Exporting functions from greet.js file
export function greet(name) {
  console.log("Hello World!", name);
}

// Exporting values
export const name = "Alice";

// import greet function from greet.js file
import { greet, name } from "./greet.js";

greet(name);

// Default Exports
// 📂 math.js
const add = (a, b) => a + b;
export default add;

// 📂 main.js
import myAddFunction from "./math.js";
const result = myAddFunction(5, 10); // This will call the add function from math.js and store the result in the 'result' variable.

// Named Exports
// 📂 math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// 📂 main.js
import { add, subtract } from "./math.js";

const result1 = add(5, 3); // result1 will be 8
const result2 = subtract(10, 4); // result2 will be 6
