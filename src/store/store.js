// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';

export const Store = configureStore({
  reducer: {
    formData: formReducer
  },
});
