import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Middleware } from '@reduxjs/toolkit';

import { config } from 'dotenv';
import ExpenseChart from './ExpenseChart';
import { ExpenseType } from '../../../types/domain';

const middlewares: Middleware[] = [thunk];
configureStore(middlewares);

const expenseData: ExpenseType[] = [
  {
    categoryName: 'categoryName',
    categoryId: 'categoryId',
    description: 'description',
    amount: Math.floor(Math.random() * 100),
    expenseDate: new Date().getMilliseconds(),
  },
];

describe('ExpenseChart comp is function', () => {
  beforeAll(() => {
    config();
  });

  test('ExpenseChart is function', () => {
    expect(ExpenseChart).toBeInstanceOf(Object);
  });

  render(
    <ExpenseChart
      expenseList={expenseData}
      endDate={new Date()}
      beginDate={new Date()}
    />
  );
  expect(screen.getByText('Loading Chart')).toBeInTheDocument();
});
