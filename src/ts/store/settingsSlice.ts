import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getNodeAtPath,
  removeNodeAtPath,
  TreeItem,
  TreeNode,
} from 'react-sortable-tree';
import { nanoid } from 'nanoid';
import { getUserCategory } from '../api/firebase/db';

//const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchUserCategory = createAsyncThunk(
  'fetchUserCategory',
  // if you type your function argument here
  async (userId: string, {}) => {
    const data = await getUserCategory(userId);

    console.log('fetchCategory = data', data);

    return data;

    //await delay(500);
    //dispatch(loadData([]));
  }
);

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
      // state.treeData = [
      //   {
      //     id: 'trap',
      //     title: 'Транспорт',
      //     subtitle: 'Регулярные поездки',
      //     children: [
      //       { id: 'trapped', title: 'Метро', children: [] },
      //       { id: 'bus', title: 'Автобус', children: [] },
      //     ],
      //   },
      //   {
      //     id: 'no-grandkids',
      //     title: 'Еда',
      //     subtitle: 'Затраты на еду, в тч рестораны',
      //     children: [{ id: 'dasdasd', title: 'Завтраки в кафе', children: [] }],
      //   },
      //   {
      //     id: 'twin-1',
      //     title: 'Twin #1',
      //     subtitle: "Doesn't play with other twin",
      //     children: [],
      //   },
      //   {
      //     id: 'twin-2',
      //     title: 'Twin #2',
      //     subtitle: "Doesn't play with other twin",
      //     children: [],
      //   },
      // ];
      state.selectedItem = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserCategory.pending, (state, action) => {
      console.log('aaa: pending', action.payload);
    });
    builder.addCase(fetchUserCategory.fulfilled, (state, action) => {
      console.log('resolved with:', action);

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
