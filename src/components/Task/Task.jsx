import { useDispatch } from 'react-redux';
import styles from './Task.module.scss';
import { deletedTodo, toggleStatusTask } from '../../store/todoSlice';

function Task({ id, title, completed }) {
  const classesItem = [styles.item, completed ? styles.itemCompleted : '']
    .join(' ')
    .trim();
  const dispatch = useDispatch();

  return (
    <li className={classesItem} key={id}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => {
          dispatch(toggleStatusTask(id));
        }}
      />
      <p>{title}</p>
      <span
        onClick={() => {
          dispatch(deletedTodo(id));
        }}
      >
        &times;
      </span>
    </li>
  );
}
export { Task };
