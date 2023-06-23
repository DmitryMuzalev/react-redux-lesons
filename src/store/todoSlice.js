import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTodo = createAsyncThunk(
  'todos/fetchTodo',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=8'
      );
      if (!response.ok) {
        throw new Error('Server Error');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletedTodo = createAsyncThunk(
  'todos/deletedTodo',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error("Can't deleted task. Server Error");
      }
      dispatch(removeTask({ id }));
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const toggleStatusTask = createAsyncThunk(
  'todos/toggleStatusTask',
  async function (id, { rejectWithValue, dispatch, getState }) {
    try {
      const task = getState().todos.todos.find((task) => task.id === id);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ completed: !task.completed }),
        }
      );
      dispatch(toggleTaskChecked({ id }));
      if (!response.ok) {
        throw new Error("Can't toggle status this task. Server error.");
      }
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async function (text, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: 1,
            title: text,
            completed: false,
          }),
        }
      );

      dispatch(addTask({ text }));

      if (!response.ok) {
        throw new Error("Can't create a task. Server error.");
      }
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      state.todos.push({
        id: new Date().toISOString(),
        title: action.payload.text,
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
  extraReducers: {
    [fetchTodo.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTodo.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.todos = action.payload;
    },
    [fetchTodo.rejected]: setError,
    [deletedTodo.rejected]: setError,
    [toggleStatusTask.rejected]: setError,
  },
});

const { addTask, removeTask, toggleTaskChecked } = todoSlice.actions;

export default todoSlice.reducer;
