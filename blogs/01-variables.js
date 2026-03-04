var age = 25;
var age = 30; // ✅ Allowed
age = 35; // ✅ Allowed

console.log(age); // 35

let score = 10;
score = 20; // ✅ Allowed

// let score = 30; ❌ Error (cannot redeclare)

const tax = 18;

// tax = 20; ❌ Error (cannot reassign)
// const tax; ❌ Error (must initialize)
