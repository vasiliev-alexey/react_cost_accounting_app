// noinspection DuplicatedCode

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  doSignInWithEmailAndPassword,
  registerUser,
} from '../api/firebase/auth';

interface userCred {
  userID: string;
  userName: string;
}

export const loginWithEmailAndPassword = createAsyncThunk<
  userCred,
  { email: string; password: string }
>(
  'auth/register',
  // if you type your function argument here
  async ({ email, password }) => {
    const data = await doSignInWithEmailAndPassword(email, password);

    return { userID: data.user.uid, userName: data.user.email };
  }
);
export const registerWithEmailAndPassword = createAsyncThunk<
  userCred,
  { email: string; password: string }
>(
  'auth/login',
  // if you type your function argument here
  async ({ email, password }) => {
    const data = await registerUser(email, password);

    console.log('fetchCategory = data', data);

    return { userID: data.user.uid, userName: data.user.email };
  }
);

// basic example slice copied from the docs
const counterSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null as string,
    userName: null as string,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginWithEmailAndPassword.pending, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(loginWithEmailAndPassword.rejected, (state) => {
      state.userId = null;
      state.isAuthenticated = false;
    });
    builder.addCase(loginWithEmailAndPassword.fulfilled, (state, action) => {
      console.log('authed');
      state.userId = action.payload.userID;
      state.userName = action.payload.userName;
      state.isAuthenticated = true;
    });

    builder.addCase(registerWithEmailAndPassword.pending, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(registerWithEmailAndPassword.rejected, (state) => {
      state.userId = null;
      state.isAuthenticated = false;
    });
    builder.addCase(registerWithEmailAndPassword.fulfilled, (state, action) => {
      state.userId = action.payload.userID;
      state.userName = action.payload.userName;
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
