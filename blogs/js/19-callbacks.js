// Callback Function

function sayHello() {
  console.log('Hello World!');
}

function executeCallbackFunction(callback) {
  callback();
}

executeCallbackFunction(sayHello);

// Synchronous
function doSomething(callback) {
  callback();
}

// Asynchronous
function doSomething(callback) {
  setTimeout(callback, 0);
}

console.log('Start');
setTimeout(() => {
  console.log('This runs later');
}, 2000);
console.log('End');

// Passing functions as arguments
function calculate(a, b, operation) {
  return operation(a, b);
}
function add(x, y) {
  return x + y;
}
function multiply(x, y) {
  return x * y;
}
console.log(calculate(2, 3, add)); // 5
console.log(calculate(2, 3, multiply)); // 6

// Callback usage in common scenarios

// 1. Event Handling:

button.addEventListener('click', () => {
  console.log('Button clicked!');
});

// 2. Array Methods:

const numbers = [1, 2, 3];
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6]

// 3. API Calls (Before Promises):

function fetchData(callback) {
  setTimeout(() => {
    callback('Data received');
  }, 1000);
}
fetchData((data) => {
  console.log(data);
});

// Callback Nesting

setTimeout(() => {
  console.log('Step 1');
  setTimeout(() => {
    console.log('Step 2');
    setTimeout(() => {
      console.log('Step 3');
    }, 1000);
  }, 1000);
}, 1000);
