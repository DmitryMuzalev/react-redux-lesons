import styles from './App.module.scss';
import { InputField } from './components/InputField/InputField';
import { TaskList } from './components/TaskList/TaskList';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.todo}>
        <h2 className={styles.todo__title}>Todo</h2>
        <InputField />
        <TaskList />
      </div>
    </div>
  );
}

export default App;
