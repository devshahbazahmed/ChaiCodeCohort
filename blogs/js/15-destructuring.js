// Destructuring

let a, b, rest;
[a, b] = [10, 20];

console.log(a);
// Expected output: 10

console.log(b);
// Expected output: 20

[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log(rest);
// Expected output: Array [30, 40, 50]

// Array Destructuring

// Before
const colors = ['red', 'green', 'blue'];

const first = colors[0];
const second = colors[1];
const third = colors[2];

// After
const colors2 = ['red', 'green', 'blue'];

const [first1, second2, third3] = colors2;

// Object Destructuring

// Before
const user = {
  name: 'Shahbaz',
  age: 25,
  city: 'Mumbai',
};

const name = user.name;
const age = user.age;
const city = user.city;

// After
const user2 = {
  name: 'Shahbaz',
  age: 25,
  city: 'Mumbai',
};

const { name1, age1, city1 } = user2;

// Default Values
const user3 = {
  name: 'Shahbaz',
};

const { name2, age2 = 18 } = user3;

console.log(age2); // 18
