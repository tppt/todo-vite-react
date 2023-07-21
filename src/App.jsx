import { useEffect, useState } from "react";
import "./App.css";
import Todo from "./components/todo";
import { TextField, Button, Checkbox } from "@mui/material";
import { nanoid } from "nanoid";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  let myStoredTodos = localStorage.getItem("todos");
  let myAllChecked = localStorage.getItem("allChecked");
  const [todos, setTodos] = useState(
    myStoredTodos ? JSON.parse(myStoredTodos) : [],
  );
  const [todoEntry, setTodoEntry] = useState("");
  const [allChecked, setAllChecked] = useState(
    myAllChecked ? JSON.parse(myAllChecked) : false,
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    if (todos.length === 0) setAllChecked(false);
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("allChecked", JSON.stringify(allChecked));
  }, [allChecked]);

  function handleTodoEntry(event) {
    setTodoEntry(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!todoEntry) return;
    setTodos([{ id: nanoid(), checked: false, value: todoEntry }, ...todos]);
    setTodoEntry("");
  }

  function handleCheckbox(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, checked: !todo.checked };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function handleValueChange(id, value) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, value: value };
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  function handleDelete() {
    const updatedTodos = todos.filter((todo) => !todo.checked);
    setTodos(updatedTodos);
  }

  function handleCheckAll() {
    setAllChecked(!allChecked);
    const updatedTodos = todos.map((todo) => {
      todo.checked = !allChecked;
      return todo;
    });
    setTodos(updatedTodos);
  }

  function handleTodoKeyUp(event, id, value) {
    if (event.code === "Enter") {
      if (!value) {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      }
      event.target.blur();
      return;
    }
  }

  function handleBlur(id, value) {
    if (!value) {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    }
  }

  return (
    <main>
      <header>
        <h1>{`//TODO`}</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="standard"
            value={todoEntry}
            onChange={(event) => handleTodoEntry(event)}
          />
          <Button
            id="add-button"
            type="submit"
            variant="contained"
            disabled={!todoEntry.length}
          >
            Add
          </Button>
          <Button
            id="delete-button"
            variant="contained"
            disabled={!todos.some((todo) => todo.checked)}
            onClick={() => handleDelete()}
          >
            <DeleteIcon />
          </Button>
        </form>
      </header>
      <div id="check-all-div">
        <Checkbox
          id="check-all"
          disabled={todos.length === 0}
          checked={allChecked}
          onChange={(event) => handleCheckAll(event)}
        />
        <label htmlFor="check-all" className={!todos.length ? "disabled-text" : ""}>
          {allChecked ? `Uncheck All` : `Check All`}
        </label>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Todo
              id={todo.id}
              checked={todo.checked}
              handleCheckbox={handleCheckbox}
              value={todo.value}
              handleValueChange={handleValueChange}
              handleTodoKeyUp={handleTodoKeyUp}
              handleBlur={handleBlur}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
