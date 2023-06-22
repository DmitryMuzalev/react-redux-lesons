import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.todos.push({
        id: new Date().toISOString(),
        text: action.payload.text,
        completed: false,
      });
    },
    removeTask: (state, action) => {
      state.todos = state.todos.filter((task) => task.id !== action.payload.id);
    },
    toggleTaskChecked: (state, action) => {
      state.todos.map((task) =>
        task.id === action.payload.id
          ? (task.completed = !task.completed)
          : task
      );
    },
  },
});

export const { addTask, removeTask, toggleTaskChecked } = todoSlice.actions;

export default todoSlice.reducer;
