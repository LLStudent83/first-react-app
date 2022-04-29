import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../../context';
import './todoItem.scss';

function TodoItem({ todo, index, onChange }) {
  const { removeTodo } = useContext(Context);
  const classes = ['todoItem__todoTitle'];
  if (todo.completed) {
    classes.push('todoItem__done');
  }
  return (
    <li className="todoItem__item">
      <input
        className="todoItem__inputTodo"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onChange(todo.id)}
      />
      <div className="todoItem__serialТumber">{index + 1}</div>
      <div className={classes.join(' ')}>{todo.title}</div>

      <button type="button" className="todoItem__deleteTodo" onClick={() => removeTodo(todo.id)}>
        &times;
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TodoItem;
