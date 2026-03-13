// Declare an array

let arr = new Array();
let arr2 = [];

let fruits = ["Apple", "Orange", "Plum"];

// Updating an Array

console.log(fruits[0]); // Apple
console.log(fruits[1]); // Orange
console.log(fruits[2]); // Plum

fruits[2] = "Pear"; // now ["Apple", "Orange", "Pear"]

fruits[3] = "Lemon"; // now ["Apple", "Orange", "Pear", "Lemon"]

// Array Length Property

console.log(fruits.length); // 3

console.log(fruits); // Apple,Orange,Plum

fruits[123] = "Apple";

console.log(fruits.length); // 124

let arr3 = [1, 2, 3, 4, 5];

arr.length = 2; // truncate to 2 elements
console.log(arr3); // [1, 2]

arr.length = 5; // return length back
console.log(arr3[3]); // undefined: the values do not return

// Looping in Arrays

let arr4 = ["Apple", "Orange", "Pear"];

for (let i = 0; i < arr4.length; i++) {
  alert(arr4[i]);
}

for (let fruit of fruits) {
  alert(fruit);
}

// Not recommended
for (let key in arr4) {
  alert(arr4[key]); // Apple, Orange, Pear
}
