// Problem with String Concatenation
const name = 'Alice';
const age = 25;

const message = 'My name is ' + name + ' and I am ' + age + ' years old.';

// Template Literals
const message = `Hello World`;

// Syntax
`string text ${expression} string text`;

// Embedding String
const name = 'Alice';
const age = 25;

const message = `My name is ${name} and I am ${age} years old.`;

// Multi-Line Strings
// Before
const text = 'This is line 1\n' + 'This is line 2\n' + 'This is line 3';

// After
const text = `This is line 1
This is line 2
This is line 3`;

// Use cases in modern JavaScript

// 1. Dynamic HTML Generation:

const user = { name: 'Shahbaz', age: 25 };

const card = `
  <div>
    <h2>${user.name}</h2>
    <p>Age: ${user.age}</p>
  </div>
`;

// 2. Logging & Debugging:

console.log(`User ${name} logged in at ${new Date()}`);

// 3. Expressions Inside Strings:

const a = 10;
const b = 20;

console.log(`Sum is ${a + b}`);

// 4. Conditional Rendering:

const isLoggedIn = true;

const status = `User is ${isLoggedIn ? 'Online' : 'Offline'}`;
