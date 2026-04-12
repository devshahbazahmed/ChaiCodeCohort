// Arithmetic Operators

// 1. Addition

console.log(2 + 2);
// Expected output: 4

console.log(2 + true);
// Expected output: 3

console.log("hello " + "everyone");
// Expected output: "hello everyone"

console.log(2001 + ": A Space Odyssey");
// Expected output: "2001: A Space Odyssey"

// 2. Subtraction

console.log(5 - 3);
// Expected output: 2

console.log(3.5 - 5);
// Expected output: -1.5

console.log(5 - "hello");
// Expected output: NaN

console.log(5 - true);
// Expected output: 4

// 3. Multiplication

console.log(3 * 4);
// Expected output: 12

console.log(-3 * 4);
// Expected output: -12

console.log("3" * 2);
// Expected output: 6

console.log("foo" * 2);
// Expected output: NaN

// 4. Division

console.log(12 / 2);
// Expected output: 6

console.log(3 / 2);
// Expected output: 1.5

console.log(6 / "3");
// Expected output: 2

console.log(2 / 0);
// Expected output: Infinity

// 5. Remainder

console.log(13 % 5);
// Expected output: 3

console.log(-13 % 5);
// Expected output: -3

console.log(4 % 2);
// Expected output: 0

console.log(-4 % 2);
// Expected output: -0

// Comparsion Operators

// 1. Equality

console.log(1 == 1);
// Expected output: true

console.log("hello" == "hello");
// Expected output: true

console.log("1" == 1);
// Expected output: true

console.log(0 == false);
// Expected output: true

// 2. Strict Equality

console.log(1 === 1);
// Expected output: true

console.log("hello" === "hello");
// Expected output: true

console.log("1" === 1);
// Expected output: false

console.log(0 === false);
// Expected output: false

// 3. Inequality

console.log(1 != 1);
// Expected output: false

console.log("hello" != "hello");
// Expected output: false

console.log("1" != 1);
// Expected output: false

console.log(0 != false);
// Expected output: false

// 4. Strict Inequality

console.log(1 !== 1);
// Expected output: false

console.log("hello" !== "hello");
// Expected output: false

console.log("1" !== 1);
// Expected output: true

console.log(0 !== false);
// Expected output: true

// 5. Greatre Than

console.log(5 > 3);
// Expected output: true

console.log(3 > 3);
// Expected output: false

// Compare bigint to number
console.log(3n > 5);
// Expected output: false

console.log("ab" > "aa");
// Expected output: true

// 6. Less Than

console.log(5 < 3);
// Expected output: false

console.log(3 < 3);
// Expected output: false

// Compare bigint to number
console.log(3n < 5);
// Expected output: true

console.log("aa" < "ab");
// Expected output: true

// Logical Operators

// 1. Logical AND (&&)

const a = 3;
const b = -2;

console.log(a > 0 && b > 0);
// Expected output: false

// 2. Logical OR (||)

const c = 3;
const d = -2;

console.log(c > 0 || d > 0);
// Expected output: true

// 3. Logical NOT (!)

const e = 3;
const f = -2;

console.log(!(e > 0 || f > 0));
// Expected output: false

// Assignment Operators

// 1. Assignment

let x = 2;
const y = 3;

console.log(x);
// Expected output: 2

console.log((x = y + 1)); // 3 + 1
// Expected output: 4

console.log((x = x * y)); // 4 * 3
// Expected output: 12

// 2. Addition Assignment

let g = 2;
let h = "hello";

console.log((g += 3)); // Addition
// Expected output: 5

console.log((h += " world")); // Concatenation
// Expected output: "hello world"

// 3. Subtraction Assignment

let m = 2;

console.log((m -= 3));
// Expected output: -1

console.log((m -= "Hello"));
// Expected output: NaN
