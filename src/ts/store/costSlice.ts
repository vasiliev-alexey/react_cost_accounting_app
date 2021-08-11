import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUserExpenseList, setUserExpense } from '../api/firebase/db';
import { ExpenseType } from '../types/domain';
import { log } from '../ui/utils/logger';

export const saveUserExpense = createAsyncThunk<
  boolean,
  { userId: string; expense: ExpenseType }
>('saveUserExpense', async ({ userId, expense }, {}) => {
  const data = await setUserExpense(userId, expense);
  log('data : ', data);
  return data;
});

export const getUserExpense = createAsyncThunk<
  ExpenseType[],
  { userId: string; beginDate: Date; endDate: Date }
>('getUserExpense', async ({ userId, beginDate, endDate }, {}) => {
  log('data : -> ', userId, beginDate, endDate);
  const data = await getUserExpenseList(userId, beginDate, endDate);
  log('data : ', data);
  return data;
});

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
    builder.addCase(saveUserExpense.fulfilled, (state) => {
      state.expenseSaved = true;
    });

    builder.addCase(getUserExpense.pending, (state) => {
      state.expenseLoaded = false;
    });
    builder.addCase(getUserExpense.rejected, (state) => {
      state.expenseLoaded = false;
    });
    builder.addCase(getUserExpense.fulfilled, (state, action) => {
      state.expenseList = action.payload;
      state.expenseLoaded = true;
    });
  },
});

const { actions, reducer } = settingSlice;

export const { resetCost } = actions;

export default reducer;
