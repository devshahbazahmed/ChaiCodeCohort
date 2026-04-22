// @ts-nocheck
let a = 12;
let b = 13;
function sum() {
  console.log(this);
}

sum(10, 12);

function sayHi() {
  console.log(this.name);
}

function sayHi() {
  console.log(this);
}

sayHi(); // global object

('use strict');
function sayHi() {
  console.log(this);
}

sayHi(); // undefined

let user = {
  name: 'John',
  age: 30,

  sayHi() {
    // "this" is the "current object"
    console.log(this.name);
  },
};

user.sayHi(); // John

// call

function greet() {
  console.log(this.animal, 'typically sleep between', this.sleepDuration);
}

const obj = {
  animal: 'cats',
  sleepDuration: '12 and 16 hours',
};

greet.call(obj); // cats typically sleep between 12 and 16 hours

// apply

const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers);

console.log(max);
// Expected output: 7

const min = Math.min.apply(null, numbers);

console.log(min);
// Expected output: 2

// bind

const module = {
  x: 42,
  getX() {
    return this.x;
  },
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// Expected output: undefined

const boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// Expected output: 42
