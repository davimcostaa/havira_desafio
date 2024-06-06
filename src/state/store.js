import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import formReducer from './formSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    form: formReducer
  },
});

export default store;
