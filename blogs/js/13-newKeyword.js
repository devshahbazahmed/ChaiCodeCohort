// Constructor Function
/**
 *
 * @param {string} name
 * @param {number} age
 */
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function () {
    return `Hello, I'm ${this.name}`;
  };
}

const alice = new Person('Alice', 30);
console.log(alice.name); // "Alice"
console.log(alice.greet()); // "Hello, I'm Alice"

// New Keyword with classes

class Person2 {
  /**
   *
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const p = new Person2('Caroline');
p.greet(); // Hello, my name is Caroline
