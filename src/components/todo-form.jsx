import { useState } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField, Button } from "@mui/material";

export default function TodoForm({
    // todoEntry,
    // handleTodoEntry,
    // see todoEntry note in App.jsx
    // setTodoEntry,
    // todos,
    // setTodos,
    deleteDisabled,
    onSubmit,
    handleDelete,
}) {
    // for further reference
    // https://onestepcode.com/creating-a-material-ui-form/

    // manage value state(s) here because parent components will likely only care about the final values after submission
    const [toDo, setToDo] = useState("");

    function handleChange(event) {
        event.target.value.length ? setToDo(event.target.value) : setToDo(null);
    }

    function handleSubmit(event) {
        event.preventDefault();
        // execute parent submit action with values, `toDo` in this case
        onSubmit({ toDo });
        setToDo("");
        // if (!todoEntry) return;
        // setTodos([{ id: nanoid(), checked: false, value: todoEntry }, ...todos]);
        // see todoEntry note in App.jsx
        // setTodoEntry("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                variant="standard"
                value={toDo}
                onChange={handleChange}
                placeholder="Add a todo"
            />
            <Button id="add-button" type="submit" variant="contained" disabled={!toDo.length}>
                Add
            </Button>
            <Button
                id="delete-button"
                variant="contained"
                disabled={deleteDisabled}
                onClick={() => handleDelete()}
            >
                <DeleteIcon />
            </Button>
        </form>
    );
}

TodoForm.propTypes = {
    // todoEntry: PropTypes.string.isRequired,
    // setTodoEntry: PropTypes.func.isRequired,
    // handleTodoEntry: PropTypes.func.isRequired,
    // todos: PropTypes.array.isRequired,
    // setTodos: PropTypes.func.isRequired,
    deleteDisabled: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};
