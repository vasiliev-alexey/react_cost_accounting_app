import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './authSlice';
import settingReducer from './settingsSlice';
import authReducer from './authSlice';
import costReducer from './costSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    setting: settingReducer,
    auth: authReducer,
    cost: costReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
