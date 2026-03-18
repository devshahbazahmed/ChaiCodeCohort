// ForEach

Array.prototype.myForEach = function (cb) {
  for (let i = 0; i < this.length; i++) {
    cb(this[i], i);
  }
};

const newArr = [1, 2, 3, 4, 5];
const res = newArr.map((val) => val * 2);

// newArr.myForEach((elem, index) => console.log(elem, index));

// Map

Array.prototype.myMap = function (cb) {
  const result = [];

  for (let j = 0; j < this.length; j++) {
    const value = cb(this[j], j);
    result.push(value);
  }
  return result;
};

const res2 = newArr.myMap((val, idx) => val * idx);
// console.log(res2);

// Reduce

Array.prototype.myReduce = function (cb, initialValue = undefined) {
  let acc = initialValue || this[0];

  let startValue = initialValue ? 0 : 1;

  for (let k = startValue; k < this.length; k++) {
    acc = cb(acc, this[k]);
  }

  return acc;
};

const res3 = newArr.myReduce((acc, ci) => acc + ci);
// console.log(res3);

class MyPromise {
  constructor(executorFn) {
    this._status = "pending";
    this.successfulCallbacks = [];
    this.errorCallbacks = [];
    this.finallyCallbacks = [];

    this.value = undefined;

    executorFn(
      this.resolverFunction.bind(this),
      this.rejectorFunction.bind(this),
    );
  }

  then(cb) {
    if (this._status === "fulfilled") {
      cb(this.value);
      return this;
    }
    this.successfulCallbacks.push(cb);
    return this;
  }

  catch(cb) {
    if (this._status === "rejected") {
      cb();
      return this;
    }
    this.errorCallbacks.push(cb);
    return this;
  }

  finally(cb) {
    if (this._status !== "pending") {
      cb();
      return this;
    }
    this.finallyCallbacks.push(cb);
    return this;
  }

  resolverFunction(value) {
    this._status = "fulfilled";
    this.value = value;
    this.successfulCallbacks.forEach((cb) => cb(value));
    this.finallyCallbacks.forEach((cb) => cb());
  }

  rejectorFunction(err) {
    this._status = "rejected";
    this.value = err;
    this.errorCallbacks.forEach((cb) => cb(err));
    this.finallyCallbacks.forEach((cb) => cb());
  }
}
