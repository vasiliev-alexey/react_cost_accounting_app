import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Middleware } from '@reduxjs/toolkit';

import { config } from 'dotenv';
import { TreeItem } from 'react-sortable-tree';
import { Tree } from './Tree';

const middlewares: Middleware[] = [thunk];
configureStore(middlewares);

const treeData: TreeItem[] = [
  {
    id: 'trap',
    title: 'Транспорт',
    subtitle: 'Регулярные поездки',
    children: [
      { id: 'trapped', title: 'Метро', children: [] },
      { id: 'bus', title: 'Автобус', children: [] },
    ],
  },
  {
    id: 'no-grandkids',
    title: 'Еда',
    subtitle: 'Затраты на еду, в тч рестораны',
    children: [{ id: 'dasdasd', title: 'Завтраки в кафе', children: [] }],
  },
  {
    id: 'twin-1',
    title: 'Twin #1',
    subtitle: "Doesn't play with other twin",
    children: [],
  },
  {
    id: 'twin-2',
    title: 'Twin #2',
    subtitle: "Doesn't play with other twin",
    children: [],
  },
];

describe('AddForm comp is function', () => {
  beforeAll(() => {
    config();
  });

  test('AddForm is function', () => {
    expect(Tree).toBeInstanceOf(Function);
  });

  test('Tree must be render', async () => {
    render(
      <Tree
        treeData={treeData}
        onChange={jest.fn}
        buttonText={'btnTxt'}
        removeNode={jest.fn}
        onNodeClick={jest.fn}
      />
    );
    const btnRemove = await screen.findAllByTestId('tree-Button-test-id');
    expect(btnRemove[0]).toBeInTheDocument();
  });
});
