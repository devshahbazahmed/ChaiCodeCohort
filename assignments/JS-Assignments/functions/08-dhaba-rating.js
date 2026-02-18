/**
 * 🍛 Highway Dhaba Rating System - Higher-Order Functions
 *
 * Highway pe dhabas ki rating system bana raha hai. Higher-order functions
 * (HOF) use karne hain — aise functions jo doosre functions ko parameter
 * mein lete hain YA return karte hain.
 *
 * Functions:
 *
 *   1. createFilter(field, operator, value)
 *      - Returns a FUNCTION that filters objects
 *      - Operators: ">", "<", ">=", "<=", "==="
 *      - e.g., createFilter("rating", ">=", 4) returns a function that
 *        takes an object and returns true if object.rating >= 4
 *      - Unknown operator => return function that always returns false
 *
 *   2. createSorter(field, order = "asc")
 *      - Returns a COMPARATOR function for Array.sort()
 *      - order "asc" => ascending, "desc" => descending
 *      - Works with both numbers and strings
 *
 *   3. createMapper(fields)
 *      - fields: array of field names, e.g., ["name", "rating"]
 *      - Returns a function that takes an object and returns a new object
 *        with ONLY the specified fields
 *      - e.g., createMapper(["name"])({name: "Dhaba", rating: 4}) => {name: "Dhaba"}
 *
 *   4. applyOperations(data, ...operations)
 *      - data: array of objects
 *      - operations: any number of functions to apply SEQUENTIALLY
 *      - Each operation takes an array and returns an array
 *      - Apply first operation to data, then second to result, etc.
 *      - Return final result
 *      - Agar data not array, return []
 *
 * Hint: HOF = functions that take functions as arguments or return functions.
 *   createFilter returns a function. applyOperations takes functions as args.
 *
 * @example
 *   const highRated = createFilter("rating", ">=", 4);
 *   highRated({ name: "Punjab Dhaba", rating: 4.5 }) // => true
 *
 *   const byRating = createSorter("rating", "desc");
 *   [{ rating: 3 }, { rating: 5 }].sort(byRating)
 *   // => [{ rating: 5 }, { rating: 3 }]
 */
function createFilter(field, operator, value) {
  const operators = {
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
    "===": (a, b) => a === b,
  };

  // If operator is invalid
  if (!operators[operator]) {
    return function () {
      return false;
    };
  }

  // Return filter function
  return function (obj) {
    if (!obj || typeof obj !== "object") return false;

    const fieldValue = obj[field];

    return operators[operator](fieldValue, value);
  };
}

const val1 = createFilter("city", "===", "Delhi");

// console.log(val1());

function createSorter(field, order = "asc") {
  const isDesc = order === "desc";

  return function (a, b) {
    const valA = a?.[field];
    const valB = b?.[field];

    // Handle undefined/null safely
    if (valA == null && valB == null) return 0;
    if (valA == null) return isDesc ? 1 : -1;
    if (valB == null) return isDesc ? -1 : 1;

    let result;

    // Number comparison
    if (typeof valA === "number" && typeof valB === "number") {
      result = valA - valB;
    }
    // String comparison
    else {
      result = String(valA).localeCompare(String(valB));
    }

    // Reverse for descending
    return isDesc ? -result : result;
  };
}

function createMapper(fields) {
  return function (obj) {
    let newObj = {};

    for (const field of fields) {
      if (Object.keys(obj).includes(field)) {
        newObj = { ...newObj, [`${field}`]: obj[field] };
      }
    }

    return newObj;
  };
}

const val2 = createMapper(["name", "rating"]);
console.log(val2({ name: "Dhaba", rating: 4 }));

function applyOperations(data, ...operations) {
  if (!Array.isArray(data)) return [];

  let result = [];

  if (operations.length === 0) result = [...data];

  for (let i = 0; i < operations.length; i++) {
    if (i === 0) result = operations[i](data);

    result = operations[i](result);
  }

  return result;
}

const dhabas = [
  { name: "Punjab Dhaba", rating: 4.5, price: 200, city: "Delhi" },
  { name: "Sharma Ji", rating: 3.8, price: 150, city: "Jaipur" },
  { name: "Highway King", rating: 4.0, price: 300, city: "Delhi" },
  { name: "Truck Stop", rating: 3.2, price: 100, city: "Agra" },
];

// const filterDelhi = (arr) => arr.filter((d) => d.city === "Delhi");
const filterHighRated = (arr) => arr.filter(createFilter("rating", ">=", 4));
const sortByRating = (arr) => [...arr].sort(createSorter("rating", "desc"));
const mapNames = (arr) => arr.map(createMapper(["name", "rating"]));

const res = applyOperations(dhabas, filterHighRated, sortByRating, mapNames);

console.log(res);
