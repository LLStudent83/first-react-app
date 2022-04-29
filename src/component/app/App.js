/* eslint-disable no-param-reassign */
import React, { Suspense, useEffect, useState } from 'react';
import TodoList from '../todoList/Todolist';
// import AddTodo from './Todo/AddTodos';
import Context from '../../context';
import Loader from '../loader/Loader';
import './app.scss';

const AddTodo = React.lazy(() => import('../addTodos/AddTodos'));

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((response) => response.json())
      .then((todos) => {
        setTodos(todos);
        setloading(false);
      });
  }, []);

  function toggleTodo(id) {
    // зачеркивает выполненные todo
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    );
  }

  function removeTodo(id) {
    // удаляет todo при клике по кнопке
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function addTodo(title) {
    setTodos(
      todos.concat({
        id: Date.now(),
        completed: false,
        title,
      }),
    );
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>Список задач</h1>
        <Suspense fallback={<div>Loading.....</div>}>
          <AddTodo onCreate={addTodo} />
        </Suspense>

        {loading && <Loader />}

        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p>No todo</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
