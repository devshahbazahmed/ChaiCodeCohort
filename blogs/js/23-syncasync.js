// Synchronous Code

console.log('Start');
console.log('Processing...');
console.log('End');

// Output:
// Start
// Processing...
// End

// Problem with Sync Code
console.log('Start');

function fetchData() {
  // Simulating delay
  const start = Date.now();
  while (Date.now() - start < 3000) {} // blocks for 3 sec
  console.log('Data fetched');
}

fetchData();

console.log('End');

// Output:
// Start
// (wait 3 seconds...)
// Data fetched
// End

// Asynchronous Code

console.log('Start');

setTimeout(() => {
  console.log('Data fetched');
}, 3000);

console.log('End');

// Real World Examples

// 1. API Calls
fetch('https://api.example.com/data')
  .then((res) => res.json())
  .then((data) => console.log(data));

// Timers
setTimeout(() => {
  console.log('Runs later');
}, 2000);
