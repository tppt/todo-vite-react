import { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button } from "@mui/material";

export default function TodoForm({ onSubmit, }) {
  const [todoEntry, setTodoEntry] = useState("");

  function handleTodoEntry(event) {
    setTodoEntry(event.target.value);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    if (!todoEntry) return;
    setTodoEntry("");
    onSubmit(todoEntry)
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
    </form>
  )
}

TodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};