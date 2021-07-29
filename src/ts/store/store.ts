import { configureStore } from '@reduxjs/toolkit';
// ...
import counterReducer from './appSlice';
import settingReducer from './settingsSlice';
// const reducer = combineReducers({
//   counter: counterReducer,
// });

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    setting: settingReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
