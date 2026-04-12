// Spread Operator

function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers)); // Expected output: 6

console.log(sum.apply(null, numbers)); // Expected output: 6

// Rest Operator

function sum(...theArgs) {
  let total = 0;
  for (const arg of theArgs) {
    total += arg;
  }
  return total;
}
console.log(sum(1, 2, 3)); // Expected output: 6

console.log(sum(1, 2, 3, 4)); // Expected output: 10

// Difference

const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = [...arr1, ...arr2]; // [1, 2, 3, 4]

function sum(a, b, c) {
  return a + b + c;
}
const numbers1 = [1, 2, 3];
sum(...numbers1); // Equivalent to sum(1, 2, 3)

function sum(...args) {
  return args.reduce((total, num) => total + num, 0);
}
sum(1, 2, 3, 4); // Returns 10

const [first, ...rest] = [1, 2, 3, 4];
console.log(rest); // [2, 3, 4]

// Spread with arrays and objects

// Array: Concatenation and Copying
const arr3 = [1, 2, 3];
const arr4 = [...arr3, 4, 5]; // [1, 2, 3, 4, 5]
const arrCopy = [...arr3]; // Shallow copy

// Object: Merging and Copying
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }
const merged2 = { ...obj1, ...obj2 }; // Right-most values override duplicates

// Function Calls
function sum(x, y, z) {
  return x + y + z;
}
const nums = [1, 2, 3];
console.log(sum(...nums)); // 6
