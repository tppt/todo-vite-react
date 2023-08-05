import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import { ColorModeWrapper } from "./components/color-mode-wrapper";
import ColorToggleButton from "./components/color-toggle-button";
import TodoForm from "./components/todo-form";
import TodoList from "./components/todo-list";

function App() {
    let myStoredTodos = localStorage.getItem("todos");
    let myAllChecked = localStorage.getItem("allChecked");
    const [todos, setTodos] = useState(myStoredTodos ? JSON.parse(myStoredTodos) : []);

    // unless we were doing something with this value outside of the form, I wouldn't manage this state here
    // const [todoEntry, setTodoEntry] = useState("");

    const [allChecked, setAllChecked] = useState(myAllChecked ? JSON.parse(myAllChecked) : false);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
        if (todos.length === 0) setAllChecked(false);
    }, [todos]);

    useEffect(() => {
        localStorage.setItem("allChecked", JSON.stringify(allChecked));
    }, [allChecked]);

    // function handleTodoEntry(event) {
    //     console.log("handleTodoEntry");
    //     setTodoEntry(event.target.value);
    // }

    function onSubmit({ toDo }) {
        // manage todos state in one location, preferably the parent component
        setTodos([{ id: nanoid(), checked: false, value: toDo }, ...todos]);
        console.log(todos);
    }

    /*
		For the App structure, I'd implement a shell component that would handle global stuff - the application header, maybe the color toggle button, and a container for all of your main content, based on the current route
			For reference, here's what I've been working on - https://github.com/JoeBello/task-manager-client
			Please feel free to give feedback as well

		Following a similar approach to what I did with TodoForm, I'd move all of the event handlers and component level state for TodoForm and TodoList (values, checked, allChecked) into a single component (<ToDos />?) that would accept maybe 3 props:
			- toDos: an array of objects representing toDos
			- onSubmit: a callback that fires when Add is clicked and receives the updated list of todos
			- onDelete: a callback that fires when Delete is clicked and receives the updated list of todos
		
		In <App>, or whatever route-level component implementing <ToDos />, I'd manage the todos collection state, interactions with local storage, etc.

		Within <ToDos />, I'd consider moving the delete button outside of the form, since it's not semantically related - the form is focused on creating todos

		Overall, I think the change would be a similar approach to what you had, except that I wouldn't manage the componente details in a route level component, <App /> in this case. Another way to think about it would be, if you changed <App /> to be <ToDos />, then created a route level component to encapsulate <ToDos /> and in that route level component handled localStorage, the tasks collection, onSubmit, and onDelete.
	*/

    // deleteDisabled would likely be part of the <ToDos /> component
    const deleteDisabled = !todos.length || !todos.some((toDo) => toDo.checked);

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
                    // todoEntry={todoEntry}
                    // setTodoEntry={setTodoEntry}
                    // todos={todos}
                    // setTodos={setTodos}
                    // handleTodoEntry={handleTodoEntry}
                    deleteDisabled={deleteDisabled}
                    onSubmit={onSubmit}
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
