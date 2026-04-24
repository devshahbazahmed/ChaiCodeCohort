let user = null;
console.log(user.name); // ❌ TypeError: Cannot read properties of null

// Basic Syntax

try {
  // Code that might throw an error
} catch (error) {
  // Code to handle the error
}

// Example

try {
  let data = JSON.parse('invalid json');
} catch (error) {
  console.log('Something went wrong:', error.message);
}

// Finally Block - Syntax

try {
  // risky code
} catch (error) {
  // handle error
} finally {
  // always runs
}

// Finally Block - Example

try {
  console.log('Trying...');
} catch (error) {
  console.log('Error occurred');
} finally {
  console.log('Cleanup done');
}

// Custom Errors
function withdraw(amount) {
  if (amount <= 0) {
    throw new Error('Amount must be greater than zero');
  }
  console.log('Withdrawal successful');
}

try {
  withdraw(-100);
} catch (error) {
  console.log(error.message);
}

// You can also throw custom error types:

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

throw new ValidationError('Invalid input');

class CustomError extends Error {
  constructor(foo = 'bar', ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (non-standard)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.name = 'CustomError';
    // Custom debugging information
    this.foo = foo;
    this.date = new Date();
  }
}

try {
  throw new CustomError('baz', 'bazMessage');
} catch (e) {
  console.error(e.name); // CustomError
  console.error(e.foo); // baz
  console.error(e.message); // bazMessage
  console.error(e.stack); // stack trace
}

try {
  let result = riskyFunction();
  display(result);
} catch (error) {
  display('Something went wrong. Please try again.');
}
