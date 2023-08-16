import PropTypes from "prop-types";
import { Checkbox, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Todo from "./todo";

export default function TodoList ({ todos, allChecked, handleCheckAll, handleCheckbox, handleValueChange, handleTodoKeyUp, handleBlur, handleDelete }) {
  return (
    <>
      <div id="list-controls-div">
        <Checkbox
          id="check-all"
          disabled={todos.length === 0}
          checked={allChecked}
          onChange={(event) => handleCheckAll(event)}
        />
        <label htmlFor="check-all" className={!todos.length ? "disabled-text" : ""}>
          {allChecked ? `Uncheck All` : `Check All`}
        </label>
        <Button
          id="delete-button"
          variant="contained"
          disabled={!todos.some((todo) => todo.checked)}
          onClick={() => handleDelete()}
        >
          <DeleteIcon />
        </Button>
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
    </>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  allChecked: PropTypes.bool.isRequired,
  handleCheckAll: PropTypes.func.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleValueChange: PropTypes.func.isRequired,
  handleTodoKeyUp: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};