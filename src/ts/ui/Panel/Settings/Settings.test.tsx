import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Middleware } from '@reduxjs/toolkit';

import Settings from './Settings';
import { config } from 'dotenv';
import { Provider } from 'react-redux';
import { TreeItem } from 'react-sortable-tree';

const middlewares: Middleware[] = [thunk];
const mockStore = configureStore(middlewares);

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

describe('Settings comp is function', () => {
  beforeAll(() => {
    config();
  });

  test('Settings is function', () => {
    expect(Settings).toBeInstanceOf(Object);
  });
  test('Settings must be render in page', () => {
    render(
      <Provider
        store={mockStore({
          setting: { treeData: treeData },
          auth: { userId: '1111' },
        })}
      >
        <Settings />
      </Provider>
    );
  });
});
