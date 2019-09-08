import React, { Fragment, useState } from "react";

const Todo = props => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const onChange = e => setTodo(e.target.value);
  const addTodo = () => setTodos([...todos, todo]);

  return (
    <Fragment>
      <input
        type="text"
        placeholder="Todo..."
        value={todo}
        onChange={onChange}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>{todo}</li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Todo;
