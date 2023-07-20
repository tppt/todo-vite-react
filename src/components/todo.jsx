import PropTypes from 'prop-types';
import { Checkbox, TextField } from '@mui/material';
import './todo.css';

export default function Todo({ id, checked, handleCheckbox, value, handleValueChange }) {
  return (
    <div>
      <Checkbox checked={checked} onChange={() => handleCheckbox(id)} />
      <TextField className={`${checked && 'strikethrough'}`} value={value} disabled={checked} variant="standard" onChange={(event) => handleValueChange(id, event.target.value)} />
    </div>
  );
}

Todo.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  value: PropTypes.string,
  handleCheckbox: PropTypes.func,
  handleValueChange: PropTypes.func
};