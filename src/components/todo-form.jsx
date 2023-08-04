import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField, Button } from "@mui/material";

export default function TodoForm({ todoEntry, handleTodoEntry, setTodoEntry, todos, setTodos, handleDelete }) {
  function handleSubmit(event) {
    event.preventDefault();
    if (!todoEntry) return;
    setTodos([{ id: nanoid(), checked: false, value: todoEntry }, ...todos]);
    setTodoEntry("");
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        variant="standard"
        value={todoEntry}
        onChange={(event) => handleTodoEntry(event)}
        placeholder="Add a todo"
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
  )
}

TodoForm.propTypes = {
  todoEntry: PropTypes.string.isRequired,
  setTodoEntry: PropTypes.func.isRequired,
  handleTodoEntry: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
  setTodos: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};