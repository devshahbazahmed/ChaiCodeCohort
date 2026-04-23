// Built-In Method:
const arr = [1, [2, [3, 4]], 5];

console.log(arr.flat(Infinity));

// Output: [1, 2, 3, 4, 5]

// Using Recursion:
function flattenArray(arr) {
  let result = [];

  for (let item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flattenArray(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

const arr = [1, [2, [3, 4]], 5];
console.log(flattenArray(arr));

// Using Reduce:
const flattenArray = (arr) => {
  return arr.reduce((acc, curr) => {
    return acc.concat(Array.isArray(curr) ? flattenArray(curr) : curr);
  }, []);
};

// Using Stack:
function flattenArray(arr) {
  const stack = [...arr];
  const result = [];

  while (stack.length) {
    const next = stack.pop();

    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      result.push(next);
    }
  }

  return result.reverse();
}
