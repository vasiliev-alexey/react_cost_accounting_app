import { createSlice } from '@reduxjs/toolkit';

// basic example slice copied from the docs
const settingSlice = createSlice({
  name: 'costs',
  initialState: {},
  reducers: {
    addExpense: (state, action) => {
      console.log('state:', state, 'action:', action);
    },
  },
});

// destructure actions and reducer from the slice (or you can access as counterSlice.actions)
const { actions, reducer } = settingSlice;

// export individual action creator functions
export const { addExpense } = actions;

// often the reducer is a default export, but that doesn't matter
export default reducer;
