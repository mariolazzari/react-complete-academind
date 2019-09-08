import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

const Todo = () => {
  // const [state, setState] = useState({ todo: "", todos: [] });
  const [todo, setTodo] = useState({ title: "" });
  const [todos, setTodos] = useState([]);

  // fetch todos
  useEffect(() => {
    getTodos();

    return () => {
      console.log("clean up.");
    };
  }, []);

  const mouseMoveHandler = e => console.log(e.clientX, e.clientY);

  // cleanup
  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  // load todos
  const getTodos = async () => {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  //const { todo, todos } = state;
  const onChange = e => setTodo({ title: e.target.value });
  //const onChange = e => setState({ ...state, todo: e.target.value });
  const addTodo = async () => {
    try {
      setTodos([todo, ...todos]);
      await axios.post("https://jsonplaceholder.typicode.com/todos", { todo });
    } catch (error) {
      console.log(error);
    }
  };
  //const addTodo = () => setState({ ...state, todos: [...todos, todo] });

  return (
    <Fragment>
      <input
        type="text"
        placeholder="Todo..."
        value={todo.title}
        onChange={onChange}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>{todo.title}</li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Todo;
