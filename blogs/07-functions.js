function square(number) {
  return number * number;
}

// Syntax of Function Declaration

function name(parameter1, parameter2, ...parameterN) {
  // body
}

const getRectArea = function (width, height) {
  return width * height;
};

console.log(getRectArea(3, 4));
// Expected output: 12

hoisted(); // Logs "foo"

function hoisted() {
  console.log("foo");
}

console.log(notHoisted); // undefined
// Even though the variable name is hoisted,
// the definition isn't. so it's undefined.
notHoisted(); // TypeError: notHoisted is not a function

var notHoisted = function () {
  console.log("bar");
};
