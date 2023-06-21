import { Task } from '../Task/Task';
import styles from './TaskList.module.scss';

function TaskList({ todos, toggleTaskChecked, removeTask }) {
  const todoList = todos.map((task) => {
    return (
      <Task
        {...task}
        toggleTaskChecked={toggleTaskChecked}
        removeTask={removeTask}
      />
    );
  });
  return <ul className={styles.list}>{todoList}</ul>;
}
export { TaskList };
