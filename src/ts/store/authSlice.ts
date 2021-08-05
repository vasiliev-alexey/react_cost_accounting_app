import { createSlice } from '@reduxjs/toolkit';

// basic example slice copied from the docs
const counterSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: '11111',
  },
  reducers: {},
});

// destructure actions and reducer from the slice (or you can access as counterSlice.actions)
const { reducer } = counterSlice;

// export individual action creator functions
//export const { increment } = actions;

// often the reducer is a default export, but that doesn't matter
export default reducer;
