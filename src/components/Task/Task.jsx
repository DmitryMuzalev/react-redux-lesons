import { useDispatch } from 'react-redux';
import styles from './Task.module.scss';
import { removeTask, toggleTaskChecked } from '../../store/todoSlice';

function Task({ id, text, completed }) {
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
          dispatch(toggleTaskChecked({ id }));
        }}
      />
      <p>{text}</p>
      <span
        onClick={() => {
          dispatch(removeTask({ id }));
        }}
      >
        &times;
      </span>
    </li>
  );
}
export { Task };
