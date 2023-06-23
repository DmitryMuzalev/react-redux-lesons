import styles from './App.module.scss';
import { InputField } from './components/InputField/InputField';
import { TaskList } from './components/TaskList/TaskList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodo } from './store/todoSlice';

function App() {
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.todos);
  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);
  return (
    <div className={styles.app}>
      <div className={styles.todo}>
        <h2 className={styles.todo__title}>Todo</h2>
        <InputField />
        {status === 'loading' && <h2>Loading tasks...</h2>}
        {error && <h2>An error occurred: {error}</h2>}
        <TaskList />
      </div>
    </div>
  );
}

export default App;
