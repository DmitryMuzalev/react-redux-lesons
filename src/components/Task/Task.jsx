import styles from './Task.module.scss';

function Task({ id, text, completed, toggleTaskChecked, removeTask }) {
  const classesItem = [styles.item, completed ? styles.itemCompleted : '']
    .join(' ')
    .trim();
  return (
    <li className={classesItem} key={id}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => {
          toggleTaskChecked(id);
        }}
      />
      <p>{text}</p>
      <span
        onClick={() => {
          removeTask(id);
        }}
      >
        &times;
      </span>
    </li>
  );
}
export { Task };
