import { configureStore } from '@reduxjs/toolkit';
// ...
import counterReducer from './authSlice';
import settingReducer from './settingsSlice';
import authReducer from './authSlice';
import costReducer from './costSlice';
// const reducer = combineReducers({
//   counter: counterReducer,
// });

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    setting: settingReducer,
    auth: authReducer,
    cost: costReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
