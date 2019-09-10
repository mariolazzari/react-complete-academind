import React, {
  Fragment,
  useState,
  useEffect,
  useReducer,
  useRef
} from "react";
import axios from "axios";

// todo reducer
const todoReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;

    case "ADD":
      return [action.payload, ...state];

    case "REMOVE":
      return state.filter(todo => todo.id !== action.payload);

    default:
      return state;
  }
};

const Todo = () => {
  // const [state, setState] = useState({ todo: "", todos: [] });
  const [todo, setTodo] = useState({ title: "" });
  //const [todos, setTodos] = useState([]);

  // const todoInputRef = useRef();

  // fetch todos
  useEffect(() => {
    getTodos();

    return () => {
      console.log("clean up: remove mousemove event.");
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

  const [todoList, dispatch] = useReducer(todoReducer, []);

  // load todos
  const getTodos = async () => {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      //      setTodos(data);
      dispatch({ type: "SET", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  //const { todo, todos } = state;
  const onChange = e => setTodo({ title: e.target.value });
  //const onChange = e => setState({ ...state, todo: e.target.value });
  const addTodo = async () => {
    try {
      //setTodos([todo, ...todos]);
      await axios.post("https://jsonplaceholder.typicode.com/todos", { todo });
      dispatch({ type: "ADD", payload: todo });
    } catch (error) {
      console.log(error);
    }
  };
  //const addTodo = () => setState({ ...state, todos: [...todos, todo] });

  // remove item
  const removeTodo = id => {
    axios.delete("https://jsonplaceholder.typicode.com/todos/" + id);
    dispatch({ type: "REMOVE", payload: id });
  };

  return (
    <Fragment>
      <input
        type="text"
        placeholder="Todo..."
        value={todo.title}
        onChange={onChange}
        //ref={todoInputRef}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todoList.map(todo => (
          <li key={todo.id} onClick={() => removeTodo(todo.id)}>
            {todo.title}
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Todo;
