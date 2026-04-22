console.log(this);

const user = {
  name: 'Alice',
  age: 45,
  greet: function () {
    return `My name is ${this.name} and age is ${this.age}`;
  },
};

console.log(user.greet());

/**
 * @this {any}
 */
function test() {
  'use strict';
  console.log(this);
}

test();
