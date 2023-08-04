import { useEffect, useState } from "react";
import "./App.css";
import { ColorModeWrapper } from "./components/color-mode-wrapper";
import ColorToggleButton from "./components/color-toggle-button";
import TodoForm from "./components/todo-form";
import TodoList from "./components/todo-list";

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
    <ColorModeWrapper>
      <main>
        <header>
          <ColorToggleButton />
          <h1>{`//TODO`}</h1>
        </header>
        <TodoForm
          todoEntry={todoEntry}
          setTodoEntry={setTodoEntry}
          todos={todos}
          setTodos={setTodos}
          handleTodoEntry={handleTodoEntry}
          handleDelete={handleDelete}
        ></TodoForm>
        <TodoList
          todos={todos}
          allChecked={allChecked}
          handleCheckAll={handleCheckAll}
          handleCheckbox={handleCheckbox}
          handleValueChange={handleValueChange}
          handleTodoKeyUp={handleTodoKeyUp}
          handleBlur={handleBlur}
        ></TodoList>
      </main>
    </ColorModeWrapper>
  );
}

export default App;
