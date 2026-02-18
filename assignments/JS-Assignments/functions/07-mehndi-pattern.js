/**
 * 🎨 Mehndi Pattern Maker - Recursion
 *
 * Mehndi artist hai tu! Intricate patterns banane hain using RECURSION.
 * Yahan loops use karna MANA hai — sirf function khud ko call karega
 * (recursive calls). Har function mein base case aur recursive case hoga.
 *
 * Functions:
 *
 *   1. repeatChar(char, n)
 *      - Repeat char n times using recursion (NO loops, NO .repeat())
 *      - Base case: n <= 0 => return ""
 *      - Recursive: char + repeatChar(char, n - 1)
 *      - Agar char not a string or empty, return ""
 *
 *   2. sumNestedArray(arr)
 *      - Sum all numbers in an arbitrarily nested array
 *      - e.g., [1, [2, [3, 4]], 5] => 15
 *      - Skip non-number values
 *      - Base case: empty array => 0
 *      - Agar input not array, return 0
 *
 *   3. flattenArray(arr)
 *      - Flatten an arbitrarily nested array into a single flat array
 *      - e.g., [1, [2, [3, 4]], 5] => [1, 2, 3, 4, 5]
 *      - Agar input not array, return []
 *
 *   4. isPalindrome(str)
 *      - Check if string is palindrome using recursion
 *      - Case-insensitive comparison
 *      - Base case: string length <= 1 => true
 *      - Compare first and last chars, recurse on middle
 *      - Agar input not string, return false
 *
 *   5. generatePattern(n)
 *      - Generate symmetric mehndi border pattern
 *      - n = 1 => ["*"]
 *      - n = 2 => ["*", "**", "*"]
 *      - n = 3 => ["*", "**", "***", "**", "*"]
 *      - Pattern goes from 1 star up to n stars, then back down to 1
 *      - Use recursion to build the ascending part, then mirror it
 *      - Agar n <= 0, return []
 *      - Agar n is not a positive integer, return []
 *
 * Hint: Every recursive function needs a BASE CASE (when to stop) and a
 *   RECURSIVE CASE (calling itself with a smaller/simpler input).
 *
 * @example
 *   repeatChar("*", 4)        // => "****"
 *   sumNestedArray([1, [2, [3]]]) // => 6
 *   flattenArray([1, [2, [3]]]) // => [1, 2, 3]
 *   isPalindrome("madam")     // => true
 *   generatePattern(3)        // => ["*", "**", "***", "**", "*"]
 */
function repeatChar(char, n) {
  if (n <= 0 || typeof char !== "string" || char === "") return "";

  return char + repeatChar(char, n - 1);
}

function sumNestedArray(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return 0;

  let sum = 0;

  for (let num of arr) {
    if (typeof num === "number") {
      sum += num;
    } else if (Array.isArray(num)) {
      sum += sumNestedArray(num);
    }
  }

  return sum;
}

function flattenArray(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return [];

  let flattenedArr = [];
  let itemArray = [];
  let arrOfArray = [];

  for (let item of arr) {
    if (!Array.isArray(item)) {
      itemArray.push(item);
    } else {
      arrOfArray = flattenArray(item);
    }
  }

  flattenedArr = [...itemArray, ...arrOfArray];
  flattenedArr = flattenedArr.sort();

  return flattenedArr;
}

console.log(flattenArray([1, [2, [3, 4]], 5]));

function isPalindrome(str) {
  if (typeof str !== "string") return false;
  if (str.length <= 1) return true;

  const lowerStr = str.toLowerCase();

  // const newStr = lowerStr.split("").reverse().join("");

  // if (newStr === lowerStr) return true;
  // else return false;

  if (lowerStr[0] !== lowerStr[lowerStr.length - 1]) {
    return false;
  }

  return isPalindrome(lowerStr.slice(1, -1));
}

console.log(isPalindrome("madam"));
console.log(isPalindrome("hello"));

function generatePattern(n) {
  if (typeof n !== "number" || n <= 0 || !Number.isInteger(n)) return [];

  function build(k) {
    // Base case
    if (k === 1) return ["*"];

    // Recursive call
    const prev = build(k - 1);

    // Add current level
    return [...prev, "*".repeat(k)];
  }

  const ascending = build(n);

  // Mirror without duplicating the last element
  const descending = ascending.slice(0, -1).reverse();

  return [...ascending, ...descending];
}
