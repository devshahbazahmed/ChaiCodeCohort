// Array Methods

// 1. Push()

let arr = [10, 20, 30, 40, 50];
// const elem = 100;
// arr.push(elem);
// console.log(arr); // arr = [10, 20, 30, 40, 50, 100];

// 2. Pop()

// arr.pop();
// console.log(arr);

// 3. Shift()

// arr.shift();
// console.log(arr);

// 4. Unshift()

// const elem = 0;
// arr.unshift(elem);
// console.log(arr);

// 5. ForEach()
//
arr.forEach((elem) => console.log(elem));
// Output =>
// 10
// 20
// 30
// 40
// 50

// Syntax:
arr.forEach(function (item, index, array) {
  // ... do something with an item
});

// 6. Map()

const array = [1, 4, 9, 16];

// Pass a function to map
const mapped = array.map((x) => x * 2);

console.log(mapped);
// Output => array = [2, 8, 18, 32];

// Syntax:
let res = arr.map(function (item, index, array) {
  // returns the new value instead of item
});

// 7. Filter()

const words = ["spray", "elite", "exuberant", "destruction", "present"];

const result = words.filter((word) => word.length > 6);

console.log(result);
// Output => result = ["exuberant", "destruction", "present"]

// Syntax:
let results = arr.filter(function (item, index, array) {
  // if true item is pushed to results and the iteration continues
  // returns empty array if nothing found
});

// 8. Reduce()

const array2 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array2.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue,
);

console.log(sumWithInitial);
// Output => 10

// Syntax:
let value = arr.reduce(
  function (accumulator, item, index, array) {
    // ...
  },
  [initial],
);
