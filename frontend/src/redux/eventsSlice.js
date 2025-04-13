// frontend/src/redux/eventsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const res = await axios.get('http://localhost:5000/api/events');
  return res.data.map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
});

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default eventsSlice.reducer;
