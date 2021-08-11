// noinspection DuplicatedCode

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  doSignInWithEmailAndPassword,
  registerUser,
} from '../api/firebase/auth';
import { log } from '../ui/utils/logger';

interface userCred {
  userID: string;
  userName: string;
}

export const loginWithEmailAndPassword = createAsyncThunk<
  userCred,
  { email: string; password: string }
>(
  'auth/register',

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

  async ({ email, password }) => {
    const data = await registerUser(email, password);

    log('fetchCategory = data', data);

    return { userID: data.user.uid, userName: data.user.email };
  }
);

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

const { reducer } = counterSlice;

export default reducer;
