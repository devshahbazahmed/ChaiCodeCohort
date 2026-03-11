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
export function repeatChar(char, n) {
  if (n <= 0 || typeof char !== "string" || !char) return "";

  return char + repeatChar(char, n - 1);
}

export function sumNestedArray(arr) {
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

export function flattenArray(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return [];

  let flattenedArray = [];
  let itemsArray = [];
  let arrOfArray = [];
  for (let num of arr) {
    if (!Array.isArray(num)) {
      itemsArray.push(num);
    } else {
      arrOfArray = flattenArray(num);
    }
  }

  flattenedArray = [...itemsArray, ...arrOfArray];
  flattenedArray = flattenedArray.sort();
  return flattenedArray;
}

export function isPalindrome(str) {
  if (typeof str !== "string") return false;
  if (str.length <= 1) return true;

  const lowerStr = str.toLowerCase();

  if (lowerStr[0] !== lowerStr[lowerStr.length - 1]) {
    return false;
  }

  return isPalindrome(lowerStr.slice(1, -1));
}

export function generatePattern(n) {
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
