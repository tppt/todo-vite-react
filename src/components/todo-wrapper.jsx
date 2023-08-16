import TodoForm from "./todo-form";
import TodoList from "./todo-list";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

export default function TodoWrapper() {

  let myStoredTodos = localStorage.getItem("todos");
  let myAllChecked = localStorage.getItem("allChecked");
  const [todos, setTodos] = useState(
    myStoredTodos ? JSON.parse(myStoredTodos) : [],
  );

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

  function handleSubmit(todoEntry) {
    setTodos([{ id: nanoid(), checked: false, value: todoEntry }, ...todos]);
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
    <>
      <TodoForm onSubmit={handleSubmit} />
      <TodoList
        todos={todos}
        allChecked={allChecked}
        handleBlur={handleBlur}
        handleCheckAll={handleCheckAll}
        handleCheckbox={handleCheckbox}
        handleDelete={handleDelete}
        handleTodoKeyUp={handleTodoKeyUp}
        handleValueChange={handleValueChange}
      />
    </>
  )
}
