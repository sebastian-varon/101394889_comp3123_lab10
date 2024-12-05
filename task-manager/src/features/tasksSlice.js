import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

// Async Thunks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (token, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addTask = createAsyncThunk("tasks/addTask", async ({ task, token }, { rejectWithValue }) => {
  try {
    await axios.post(`${API_BASE_URL}/tasks`, { task }, { headers: { Authorization: token } });
    return task;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async ({ index, token }, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_BASE_URL}/tasks/${index}`, { headers: { Authorization: token } });
    return index;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ index, updatedTask, token }, { rejectWithValue }) => {
    try {
      // Send the updated task to the backend
      await axios.put(`${API_BASE_URL}/tasks/${index}`, { task: updatedTask }, {
        headers: { Authorization: token },
      });
      return { index, updatedTask }; // Return updated data for the Redux store
    } catch (error) {
      console.error("Edit Task Error:", error); // Debug log
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks.splice(action.payload, 1);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const { index, updatedTask } = action.payload;
        state.tasks[index] = updatedTask; // Update the specific task
      });
  },
});

export default tasksSlice.reducer;