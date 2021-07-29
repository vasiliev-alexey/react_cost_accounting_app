import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TreeItem } from 'react-sortable-tree';

// basic example slice copied from the docs
const settingSlice = createSlice({
  name: 'settings',
  initialState: {
    treeData: [],
    selectedItem: null,
  },
  reducers: {
    addItem: (state, action: PayloadAction<TreeItem>) => {
      console.log('state', state, 'action', action);
      state.treeData.push(action.payload);
      state.selectedItem = null;
    },
  },
});

// destructure actions and reducer from the slice (or you can access as counterSlice.actions)
const { actions, reducer } = settingSlice;

// export individual action creator functions
export const { addItem } = actions;

// often the reducer is a default export, but that doesn't matter
export default reducer;
