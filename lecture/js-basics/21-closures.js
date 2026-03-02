function startCompany() {
  function ca(name) {
    return `Name of your company is ${name}`;
  }
  return ca;
}

const getMeACompany = startCompany();
const myCompanyName = getMeACompany("Zomato");
console.log(myCompanyName);

function eternal(guest) {
  const guestName = guest;
  let count = 0;

  function zomato() {
    console.log(`Hi ${guestName}, from zomato`);
  }

  function blinkit() {
    if (count === 1) return;
    console.log(`Hi ${guestName}, from blinkit`);
    count++;
  }

  // zomato();
  // blinkit();
  return {
    zomato,
    blinkit,
  };
}

const hitesh = eternal("hitesh");
const piyush = eternal("piyush");

hitesh.blinkit();
hitesh.blinkit();
hitesh.blinkit();

function createOptimisedVersion(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      console.log(`Returning from cache: ${key}`);
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

function add(a, b) {
  return a + b;
}

function square(n) {
  return n * n;
}

const optimisedAdd = createOptimisedVersion(add);
const optimisedSquare = createOptimisedVersion(square);

// optimisedAdd(2, 3);
// optimisedAdd(2, 3);
// optimisedAdd(2, 3);
// optimisedAdd(2, 3);
// optimisedAdd(2, 3);
// optimisedAdd(2, 3);

// optimisedSquare(5);
// optimisedSquare(5);
// optimisedSquare(5);
// optimisedSquare(5);
// optimisedSquare(5);
// optimisedSquare(5);

// console.time("startCode");
// optimisedSquare(1200040404934348675837834534);
// console.timeEnd("startCode");
// console.time("startCode");
// optimisedSquare(1200040404934348675837834534);
// console.timeEnd("startCode");
// console.time("startCode");
// optimisedSquare(1200040404934348675837834534);
// console.timeEnd("startCode");
// console.time("startCode");
// optimisedSquare(1200040404934348675837834534);
// console.timeEnd("startCode");
// console.time("startCode");
// optimisedSquare(1200040404934348675837834534);
// console.timeEnd("startCode");
// console.time("startCode");
// optimisedSquare(1200040404934348675837834534);
// console.timeEnd("startCode");
// console.time("startCode");
// optimisedSquare(1200040404934348675837834534);
// console.timeEnd("startCode");
// console.time("startCode");
// optimisedSquare(1200040404934348675837834534);
// console.timeEnd("startCode");
