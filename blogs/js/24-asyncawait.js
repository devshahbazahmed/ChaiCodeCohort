// Callback hell

fetchData()
  .then((data) => processData(data))
  .then((result) => saveResult(result))
  .catch((error) => console.error(error));

// How async functions work
async function getData() {
  return 'Hello';
}

// Await keyword
async function fetchUser() {
  const response = await fetch('https://api.example.com/user');
  const data = await response.json();
  console.log(data);
}

// Error handling with promises
fetchData()
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

// Error handling with async/await
async function loadData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  } finally {
    console.log('Done');
  }
}

// Simple Example:

// Using Promises
function getNumber() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(10), 1000);
  });
}

getNumber().then((num) => console.log(num));

// Using Async Await
async function showNumber() {
  const num = await getNumber();
  console.log(num);
}

showNumber();
