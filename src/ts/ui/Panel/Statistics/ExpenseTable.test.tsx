import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Middleware } from '@reduxjs/toolkit';

import { config } from 'dotenv';
import { ExpenseType } from '../../../types/domain';
import ExpenseTable from './ExpenseTable';
import { nanoid } from 'nanoid';

const middlewares: Middleware[] = [thunk];
configureStore(middlewares);

const expenseData: ExpenseType[] = [
  {
    expenseId: nanoid(12),
    categoryName: 'categoryName',
    categoryId: 'categoryId',
    description: 'description',
    amount: Math.floor(Math.random() * 100),
    expenseDate: new Date().getMilliseconds(),
  },
];

describe('ExpenseTable comp is function', () => {
  beforeAll(() => {
    config();
  });

  test('ExpenseTable is function', () => {
    expect(ExpenseTable).toBeInstanceOf(Object);
  });

  render(<ExpenseTable expenseList={expenseData} />);
  expect(screen.getByText('categoryName')).toBeInTheDocument();
});
