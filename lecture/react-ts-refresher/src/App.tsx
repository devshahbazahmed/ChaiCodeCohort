// import useRandomUser from "./hooks/useRandomUser";
// import { useState } from "react";
// import Counter from "./components/Counter";

import { useState } from "react";
import "./App.css";

export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

const App = () => {
  // const { user, fetchRandomUser, isFetching, error } = useRandomUser();
  // const [counter, setCounter] = useState<number>(1);

  const [currentValue, setCurrentValue] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleClickAddButton = () => {
    todos.push({
      id: `${Date.now()}`,
      title: currentValue,
      isCompleted: false,
    });
    const newArray = [...todos];
    setTodos(newArray);
    setCurrentValue("");
  };

  function handleRemove(id: string) {
    const result = todos.filter((t) => t.id !== id);
    setTodos(result);
  }

  return (
    <div className="app">
      {/* <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Add Counter
      </button>
      {new Array(counter).fill(null).map((e) => (
        <Counter />
      ))} */}
      {/* <div>
        <button onClick={fetchRandomUser}>Fetch User</button>
        {user ? (
          isFetching ? (
            <h1>Loading...</h1>
          ) : (
            <h1>
              {user.name.first} {user.name.last}
            </h1>
          )
        ) : (
          "No user found..."
        )}
      </div>
      {error && <div>{error}</div>} */}
      <div className="todo-app">
        <input
          type="text"
          placeholder="Enter your todo here"
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          className="todo-app__input"
        />
        <button
          onClick={handleClickAddButton}
          className="todo-app__btn todo-app__btn--add"
        >
          Add
        </button>
        <div className="todo-app__row">
          <ul className="todo-app__list todo-app__row">
            {todos.map((e) => (
              <>
                <li key={e.id} className="todo-app__item">
                  {e.title}
                </li>
                <button
                  onClick={() => handleRemove(e.id)}
                  className="todo-app__btn--remove"
                >
                  Remove
                </button>
              </>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
