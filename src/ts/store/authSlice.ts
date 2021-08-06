import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { doSignInWithEmailAndPassword } from '../api/firebase/auth';
export const loginWithEmailAndPassword = createAsyncThunk<
  { userID: string },
  { email: string; password: string }
>(
  'auth/login',
  // if you type your function argument here
  async ({ email, password }) => {
    const data = await doSignInWithEmailAndPassword(email, password);

    console.log('fetchCategory = data', data);

    return { userID: data.user.uid };
  }
);
// basic example slice copied from the docs
const counterSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null as string,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginWithEmailAndPassword.pending, (state) => {
      state.isAuthenticated = true;
    });
    builder.addCase(loginWithEmailAndPassword.rejected, (state) => {
      state.userId = null;
      state.isAuthenticated = false;
    });
    builder.addCase(loginWithEmailAndPassword.fulfilled, (state, action) => {
      console.log('authed');
      state.userId = action.payload.userID;
      state.isAuthenticated = true;
    });
  },
});

// destructure actions and reducer from the slice (or you can access as counterSlice.actions)
const { reducer } = counterSlice;

// export individual action creator functions
//export const { increment } = actions;

// often the reducer is a default export, but that doesn't matter
export default reducer;
