import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getNodeAtPath,
  removeNodeAtPath,
  TreeItem,
  TreeNode,
} from 'react-sortable-tree';
import { nanoid } from 'nanoid';
import { getUserCategory, setUserCategory } from '../api/firebase/db';
import { log } from '../ui/utils/logger';

export const fetchUserCategory = createAsyncThunk<TreeItem[], string>(
  'fetchUserCategory',
  async (userId) => {
    const data = await getUserCategory(userId);
    log('data : ', data);
    return data;
  }
);

export const saveUserCategories = createAsyncThunk<
  TreeItem[],
  { userId: string; categoryTree: TreeItem[] }
>('saveUserCategories', async ({ userId, categoryTree }, {}) => {
  log('saveUserCategories -> ', userId, { categoryTree });

  const data = await setUserCategory(userId, { categoryTree });

  return data;
});

const settingSlice = createSlice({
  name: 'settings',
  initialState: {
    treeData: [],
    selectedItem: null,
    isLoaded: false,
  },
  reducers: {
    addItem: (state, action) => {
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
          path: action.payload.path,
          getNodeKey: ({ node: { id } }) => id,
          ignoreCollapsed: true,
        });
        (node.node.children as TreeItem).push(newNode);
        node.node.expanded = true;
      }
      state.selectedItem = null;
    },

    syncState: (state, action) => {
      state.treeData = action.payload;
      state.selectedItem = null;
    },

    removeNode(state, action) {
      state.treeData = removeNodeAtPath({
        treeData: state.treeData,
        path: action.payload,
        getNodeKey: ({ node: { id } }) => id,
        ignoreCollapsed: true,
      });
    },

    loadData: (state, action) => {
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

const { actions, reducer } = settingSlice;

export const { addItem, loadData, removeNode, syncState } = actions;

export default reducer;
