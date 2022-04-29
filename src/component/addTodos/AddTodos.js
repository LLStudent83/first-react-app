import React, { useState } from 'react';
import PropTypes from 'prop-types';

const styles = {
  form: {
    marginBottom: '1rem',
  },
  button: {
    marginLeft: '1rem',
  },
};

function useInputValue(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);
  return {
    bind: {
      value,
      onChange: (e) => setValue(e.target.value),
    },
    value: () => value,
    clear: () => setValue(''),
  };
}

function AddTodo({ onCreate }) {
  const input = useInputValue('');

  // непосредственно добавляет todo в перечень todoList
  function submitHendler(event) {
    event.preventDefault();

    if (input.value().trim()) {
      onCreate(input.value());
    }
    input.clear();
  }

  return (
    <form style={styles.form} onSubmit={submitHendler}>
      <input {...input.bind} />
      <button style={styles.button} type='submit'>
        Add todo
      </button>
    </form>
  );
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default AddTodo;
