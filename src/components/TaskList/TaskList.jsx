import { useSelector } from 'react-redux';
import { Task } from '../Task/Task';
import styles from './TaskList.module.scss';

function TaskList() {
  const todos = useSelector((state) => state.todos.todos);
  const todoList = todos.map((task) => {
    return <Task key={task.id} {...task} />;
  });
  return <ul className={styles.list}>{todoList}</ul>;
}
export { TaskList };
