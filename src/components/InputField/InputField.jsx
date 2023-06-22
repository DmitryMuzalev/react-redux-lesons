import { useState } from 'react';
import styles from './InputField.module.scss';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/todoSlice';

function InputField() {
  const [text, setText] = useState('');
  const changeInputValue = (e) => {
    setText(e.target.value);
  };

  const dispatch = useDispatch();

  return (
    <div className={styles.form}>
      <input type="text" value={text} onChange={changeInputValue} />
      <button
        onClick={() => {
          if (text.trim().length) {
            dispatch(addTask({ text }));
            setText('');
          }
          return;
        }}
      >
        Add
      </button>
    </div>
  );
}
export { InputField };
