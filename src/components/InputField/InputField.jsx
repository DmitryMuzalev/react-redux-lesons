import styles from './InputField.module.scss';

function InputField({ input, addTask, changeInputValue }) {
  return (
    <div className={styles.form}>
      <input type="text" value={input} onChange={changeInputValue} />
      <button onClick={addTask}>Add</button>
    </div>
  );
}
export { InputField };
