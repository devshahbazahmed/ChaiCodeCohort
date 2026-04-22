// @ts-nocheck
// If statement

let year = prompt(
  'In which year was ECMAScript-2015 specification published?',
  ''
);

if (year == 2015) console.log('You are right!');

if (year == 2015) {
  console.log("That's correct!");
  console.log("You're so smart!");
}

// If-Else statement

function testNum(a) {
  let result;
  if (a > 0) {
    result = 'positive';
  } else {
    result = 'NOT positive';
  }
  return result;
}

console.log(testNum(-5));
// Expected output: "NOT positive"

// The else-if ladder

let year2 = prompt(
  'In which year was the ECMAScript-2015 specification published?',
  ''
);

if (year2 < 2015) {
  console.log('Too early...');
} else if (year2 > 2015) {
  console.log('Too late');
} else {
  console.log('Exactly!');
}

// Switch statement

switch (x) {
  case 'value1': // if (x === 'value1')
  // ...;
  // [break]

  case 'value2': // if (x === 'value2')
  // ...
  // [break]

  default:
  // ...
  // [break]
}

let a = 2 + 2;

switch (a) {
  case 3:
    console.log('Too small');
    break;
  case 4:
    console.log('Exactly!');
    break;
  case 5:
    console.log('Too big');
    break;
  default:
    console.log("I don't know such values");
}

let b = 2 + 2;

switch (b) {
  case 3:
    console.log('Too small');
  case 4:
    console.log('Exactly!');
  case 5:
    console.log('Too big');
  default:
    console.log("I don't know such values");
}
