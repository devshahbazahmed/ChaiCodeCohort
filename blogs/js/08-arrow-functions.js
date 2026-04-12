// Syntax

() => expression;

(param) => expression;

(param) => expression;

(param1, paramN) => expression;

() => {
  statements;
};

(param) => {
  statements;
};

(param1, paramN) => {
  statements;
};

(a, b, ...r) => expression;
(a = 400, b = 20, c) => expression;
([a, b] = [10, 20]) => expression;
({ a, b } = { a: 10, b: 20 }) => expression;

async (param) => expression;
async (param1, param2, ...paramN) => {
  statements;
};

let sum = (a, b) => a + b;

/* This arrow function is a shorter form of:

let sum = function(a, b) {
  return a + b;
};
*/

console.log(sum(1, 2)); // 3

let double = (n) => n * 2;
// roughly the same as: let double = function(n) { return n * 2 }

console.log(double(3)); // 6

let sayHi = () => console.log("Hello!");

sayHi();

let age = prompt("What is your age?", 18);

let welcome =
  age < 18 ? () => console.log("Hello!") : () => console.log("Greetings!");

welcome();

const add = (a, b) => a + b;

const setData = (prevData) => {
  return {
    ...prevData,
    content: "lorem ipsum",
  };
};
