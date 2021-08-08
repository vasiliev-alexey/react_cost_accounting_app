import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUserExpenseList, setUserExpense } from '../api/firebase/db';
import { ExpenseType } from '../types/domain';

export const saveUserExpense = createAsyncThunk<
  boolean,
  { userId: string; expense: ExpenseType }
>('saveUserExpense', async ({ userId, expense }, {}) => {
  const data = await setUserExpense(userId, expense);
  console.log('data : ', data);
  return data;
});

export const getUserExpense = createAsyncThunk<
  ExpenseType[],
  { userId: string; beginDate: Date; endDate: Date }
>('getUserExpense', async ({ userId, beginDate, endDate }, {}) => {
  console.log('data : -> ', userId, beginDate, endDate);
  const data = await getUserExpenseList(userId, beginDate, endDate);
  console.log('data : ', data);
  return data;
});

// basic example slice copied from the docs
const settingSlice = createSlice({
  name: 'costs',
  initialState: {
    expenseSaved: false,
    expenseLoaded: false,
    expenseList: [] as ExpenseType[],
  },
  reducers: {
    resetCost: (state) => {
      state.expenseSaved = false;
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

    builder.addCase(getUserExpense.pending, (state) => {
      console.log('getUserExpense pending');
      state.expenseLoaded = false;
    });
    builder.addCase(getUserExpense.rejected, (state) => {
      console.log('getUserExpense rejected');
      state.expenseLoaded = false;
    });
    builder.addCase(getUserExpense.fulfilled, (state, action) => {
      console.log('getUserExpense', action);
      state.expenseList = action.payload;
      state.expenseLoaded = true;
    });
  },
});

// destructure actions and reducer from the slice (or you can access as counterSlice.actions)
const { actions, reducer } = settingSlice;

// export individual action creator functions
export const { resetCost } = actions;

// often the reducer is a default export, but that doesn't matter
export default reducer;
