import { createSlice } from '@reduxjs/toolkit';
// import type { RootState } from './store';
import { TreeItem } from 'react-sortable-tree';

// Define a type for the slice state
interface AppState {
  treeData: TreeItem[];
}

// Define the initial state using that type
const initialState: AppState = {
  treeData: [],
};

export const counterSlice = createSlice({
  name: 'treeData',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state, action) => {
      console.log('reducer inc', action);
    },
  },
});

export const { increment } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
