// @ts-nocheck
// Syntax

let user1 = new Object(); // "object constructor" syntax
let user2 = {}; // "object literal" syntax

// Creating

let user3 = {
  // an object
  name: 'John', // by key "name" store value "John"
  age: 30, // by key "age" store value 30
};

// Accessing

console.log(user3.name);
console.log(user3.age);

let user = {};

// set
user['likes birds'] = true;

// get
console.log(user['likes birds']); // true

// Updating Object Properties

ourDog.name = 'Happy Camper'; // Using dot notation
ourDog['name'] = 'Happy Camper'; // Using bracket notation

// Looping

const obj = { a: 1, b: 2, c: 3 };
for (const key in obj) {
  console.log(key); // Outputs: a, b, c
}

for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key);
  }
}

const obj2 = { a: 1, b: 2, c: 3 };
Object.keys(obj2).forEach((key) => {
  console.log(key); // Outputs: a, b, c
});
