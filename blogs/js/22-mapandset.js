// Map

const userMap = new Map();
userMap.set('name', 'Rocky');
userMap.set(1, 'ID');
userMap.set(true, 'isLoggedIn');
console.log(userMap.get('name')); // Rocky

const cache = new Map();
cache.set(userId, userData);

// Set

const numbers = new Set([1, 2, 2, 3, 4, 4]);
console.log(numbers); // Set {1, 2, 3, 4}

const visitedPages = new Set();
visitedPages.add('/home');
visitedPages.add('/about');
