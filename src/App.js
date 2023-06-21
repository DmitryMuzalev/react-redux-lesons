import { useState } from 'react';
import styles from './App.module.scss';
import { InputField } from './components/InputField/InputField';
import { TaskList } from './components/TaskList/TaskList';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim().length) {
      setTodos([
        ...todos,
        {
          id: new Date().toISOString(),
          text: input,
          completed: false,
        },
      ]);
      setInput('');
    }
  };

  const removeTask = (taskID) => {
    setTodos(todos.filter((task) => task.id !== taskID));
  };

  const changeInputValue = (e) => {
    setInput(e.target.value);
  };

  const toggleTaskChecked = (taskID) => {
    setTodos(
      todos.map((task) => {
        return task.id === taskID
          ? { ...task, completed: !task.completed }
          : task;
      })
    );
  };

  return (
    <div className={styles.app}>
      <div className={styles.todo}>
        <h2 className={styles.todo__title}>Todo</h2>
        <InputField
          input={input}
          addTask={addTask}
          changeInputValue={changeInputValue}
        />
        <TaskList
          todos={todos}
          toggleTaskChecked={toggleTaskChecked}
          removeTask={removeTask}
        />
      </div>
    </div>
  );
}

export default App;
