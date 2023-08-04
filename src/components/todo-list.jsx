import PropTypes from "prop-types";
import { Checkbox } from "@mui/material";
import Todo from "./todo";

export default function TodoList ({ todos, allChecked, handleCheckAll, handleCheckbox, handleValueChange, handleTodoKeyUp, handleBlur }) {
  return (
    <>
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
    </>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  allChecked: PropTypes.bool.isRequired,
  handleCheckAll: PropTypes.func.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  handleValueChange: PropTypes.func.isRequired,
  handleTodoKeyUp: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};