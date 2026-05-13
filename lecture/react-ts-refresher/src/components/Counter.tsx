import * as React from "react";
import "./Counter.css";

const Counter = () => {
  const [count, setCount] = React.useState<number>(0);

  function handleIncrement() {
    if (count >= 100) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  }

  function handleDecrement() {
    if (count != 0) {
      setCount(count - 1);
    }
  }
  return (
    <div className="counter">
      <h3 className="counter__display">
        Count is <span>{count}</span>
      </h3>
      <div className="counter__actions">
        <button
          type="button"
          className="counter__btn counter__btn--dec"
          onClick={handleDecrement}
        >
          Decrement
        </button>
        <button
          type="button"
          className="counter__btn counter__btn--inc"
          onClick={handleIncrement}
        >
          Increment
        </button>
      </div>
    </div>
  );
};

export default Counter;
