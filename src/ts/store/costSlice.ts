import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { setUserExpense } from '../api/firebase/db';
import { ExpenseType } from '../types/domain';

export const saveUserExpense = createAsyncThunk<
  boolean,
  { userId: string; expense: ExpenseType }
>('saveUserExpense', async ({ userId, expense }, {}) => {
  const data = await setUserExpense(userId, expense);
  console.log('data : ', data);
  return data;
});

// basic example slice copied from the docs
const settingSlice = createSlice({
  name: 'costs',
  initialState: {
    expenseSaved: false,
  },
  reducers: {
    resetCost: (state) => {
      state.expenseSaved = false;
    },

    addExpense: (state, action) => {
      console.log('state:', state, 'action:', action);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveUserExpense.pending, (state) => {
      state.expenseSaved = false;
    });
    builder.addCase(saveUserExpense.rejected, (state) => {
      state.expenseSaved = false;
    });
    builder.addCase(saveUserExpense.fulfilled, (state, action) => {
      console.log('authed', action);
      state.expenseSaved = true;
    });
  },
});

// destructure actions and reducer from the slice (or you can access as counterSlice.actions)
const { actions, reducer } = settingSlice;

// export individual action creator functions
export const { addExpense, resetCost } = actions;

// often the reducer is a default export, but that doesn't matter
export default reducer;
