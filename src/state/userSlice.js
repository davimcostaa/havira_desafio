import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/http';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await api.get('users');
  return response.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
    position: [null, null],
  },
  reducers: {
    updatePosition: (state, action) => {
      state.position = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
        if (action.payload.length > 0 && action.payload[0].address?.geo) {
            state.position = [
              action.payload[6].address.geo.lat,
              action.payload[6].address.geo.lng
            ];
          }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { updatePosition } = userSlice.actions;

export default userSlice.reducer;
