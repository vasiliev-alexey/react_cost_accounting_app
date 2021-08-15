import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import configureStore from 'redux-mock-store';
import { Middleware } from '@reduxjs/toolkit';
import { Costs } from './Costs';
import { TreeItem } from 'react-sortable-tree';
import userEvent from '@testing-library/user-event';

const middlewares: Middleware[] = [];
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

describe('Costs comp is function', () => {
  test('Costs is function', () => {
    expect(Costs).toBeInstanceOf(Function);
  });

  test('Costs  render in page', () => {
    render(
      <Costs
        treeData={treeData}
        userId={'userId'}
        saveUserExpense={jest.fn}
        isCostSaved={false}
      />
    );

    const btnModal = screen.getByTestId('button-show-modal-id');
    expect(btnModal).toBeInTheDocument();
    userEvent.click(btnModal);
    const modalTree = screen.getByText('Затраты на еду, в тч рестораны');
    expect(modalTree).toBeInTheDocument();

    //
  });
});
