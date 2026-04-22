class Car {
  /**
   * @param {string} brand
   */
  constructor(brand) {
    this.brand = brand;
  }
  start() {
    console.log(`${this.brand} is starting.`);
  }
}

const myCar = new Car('Toyota');
myCar.start(); // Output: "Toyota is starting."

class Car2 {
  /**
   * @param {string} brand
   * @param {string} model
   * @param {number} year
   */
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  // Instance method
  start() {
    console.log(`${this.year} ${this.brand} ${this.model} is starting.`);
  }
}

const myNewCar = new Car2('Toyota', 'Corolla', 2021);
myNewCar.start(); // Output: "2021 Toyota Corolla is starting."

class Car3 {
  /**
   * @param {string} brand
   * @param {string} model
   */
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }
  describe() {
    return `This is a ${this.brand} ${this.model}`;
  }
}

const myCar2 = new Car3('Toyota', 'Camry');
console.log(myCar2.describe()); // "This is a Toyota Camry"
