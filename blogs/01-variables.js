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

// Primitive Datatypes

// Number

let price = 999;
let rating = 4.5;

// String

let firstName = "John";
let lastName = "Doe";
let jobRole = `Software Engineer`;

// Boolean

let isLoggedIn = true;
let isAdmin = false;

// Undefined

let orderStatus;
console.log(orderStatus); // undefined

// Null

let selectedCoupon = null;
console.log(selectedCoupon); // null

// BigInt

let bigNumber = 12345678901234567890n;

// Symbol

let id = Symbol("userId");

// Non-Primitive Datatypes

// Object

let user = {
  name: "Alice",
  age: 25,
  isAuthenticated: true,
};

// Array

let cartItems = ["Shoes", "T-shirt", "Watch"];

// Functions

function calculateDiscount(price) {
  return price * 0.9;
}

// Primitive vs Non-Primitive

let a = 10;
let b = a;
b = 20;

console.log(a); // 10

let user1 = { name: "Shahbaz" };
let user2 = user1;

user2.name = "Ali";

console.log(user1.name); // Ali

// Global Scope

let name = "Bob";

function greet() {
  console.log(name); // Bob
}

greet();
console.log(name); // Bob

// Function Scope

function test() {
  let age = 25;
  console.log(age);
}

test();

console.log(age); // ❌ Error

// Block Scope

if (true) {
  let city = "Mumbai";
  const country = "India";
}

console.log(city); // ❌ Error
