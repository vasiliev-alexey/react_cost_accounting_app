import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getNodeAtPath,
  removeNodeAtPath,
  TreeItem,
  TreeNode,
} from 'react-sortable-tree';
import { nanoid } from 'nanoid';
import { getUserCategory, setUserCategory } from '../api/firebase/db';

//const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchUserCategory = createAsyncThunk<TreeItem[], string>(
  'fetchUserCategory',
  async (userId) => {
    const data = await getUserCategory(userId);
    console.log('data : ', data);
    return data;
  }
);

export const saveUserCategories = createAsyncThunk<
  TreeItem[],
  { userId: string; categoryTree: TreeItem[] }
>('saveUserCategories', async ({ userId, categoryTree }, {}) => {
  console.log('saveUserCategories -> ', userId, { categoryTree });

  const data = await setUserCategory(userId, { categoryTree });
  console.log('data : ', data);
  return data;
});

// basic example slice copied from the docs
const settingSlice = createSlice({
  name: 'settings',
  initialState: {
    treeData: [],
    selectedItem: null,
    isLoaded: false,
  },
  reducers: {
    addItem: (state, action) => {
      console.log('state', state, 'action', action);

      const newNode = {
        id: nanoid(10),
        title: action.payload.title,
        subtitle: action.payload.subtitle,
        children: [] as TreeItem[],
      };

      if (!action.payload.path) {
        state.treeData.push(newNode);
      } else {
        const node: TreeNode = getNodeAtPath({
          treeData: state.treeData,
          path: action.payload.path, // You can use path from here
          getNodeKey: ({ node: { id } }) => id,
          ignoreCollapsed: true,
        });
        (node.node.children as TreeItem).push(newNode);
        node.node.expanded = true;
        console.log('node', node.node);
      }
      state.selectedItem = null;
    },

    syncState: (state, action) => {
      console.log('state', state, 'action', action);
      state.treeData = action.payload;
      state.selectedItem = null;
    },

    removeNode(state, action) {
      console.log('state', state, 'action', action);
      state.treeData = removeNodeAtPath({
        treeData: state.treeData,
        path: action.payload, // You can use path from here
        getNodeKey: ({ node: { id } }) => id,
        ignoreCollapsed: true,
      });
    },

    loadData: (state, action) => {
      console.log('loadData state', state, action);

      const treeData = action.payload.treData;
      state.treeData = treeData;
      state.selectedItem = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserCategory.pending, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(fetchUserCategory.fulfilled, (state, action) => {
      state.treeData = action.payload;
      state.isLoaded = true;
    });

    builder.addCase(saveUserCategories.pending, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(saveUserCategories.fulfilled, (state, action) => {
      state.treeData = action.payload;
      state.isLoaded = true;
    });
  },
});

// destructure actions and reducer from the slice (or you can access as counterSlice.actions)
const { actions, reducer } = settingSlice;

// export individual action creator functions
export const { addItem, loadData, removeNode, syncState } = actions;

// often the reducer is a default export, but that doesn't matter
export default reducer;
