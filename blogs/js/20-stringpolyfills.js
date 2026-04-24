const str = '  hello world  ';
console.log(str.trim().toUpperCase()); // "HELLO WORLD"

// myTrim() Polyfill

String.prototype.myTrim = function () {
  let start = 0;
  let end = this.length - 1;

  while (this[start] === ' ') start++;
  while (this[end] === ' ') end--;

  let result = '';
  for (let i = 0; i < end; i++) {
    result += this[i];
  }

  return result;
};

// myIncludes() Polyfill

String.prototype.myIncludes = function (search) {
  for (let i = 0; i < this.length - search.length; i++) {
    let found = true;

    for (j = 0; j < search.length; j++) {
      if (this[i + j] !== search[j]) {
        found = false;
        break;
      }
    }

    if (found) return true;
  }

  return false;
};

// mySlice() Polyfill

String.prototype.mySlice = function (start, end = this.length) {
  let result = '';

  if (start < 0) start = this.end + start;
  if (end < 0) end = this.length + end;

  for (let i = 0; i < end && i < this.length; i++) {
    result += this[i];
  }

  return result;
};

// Common interview problems

// 1. Reverse a String

function reverseString(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}

// 2. Check for Palindrome

// function isPalindrome(str) {
//   let reversed = str.split('').reverse().join('');
//   return str === reversed;
// }

function isPalindrome(str) {
  let left = 0,
    right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }

  return true;
}

// 3. Count Character Frequency

function charCount(str) {
  let map = {};
  for (let char of str) {
    map[char] = (map[char] || 0) + 1;
  }
  return map;
}

// 4. Find First Non-Repeating Character

function firstUniqueChar(str) {
  let map = {};

  for (let char of str) {
    map[char] = (map[char] || 0) + 1;
  }

  for (let char of str) {
    if (map[char] === 1) return char;
  }

  return null;
}
