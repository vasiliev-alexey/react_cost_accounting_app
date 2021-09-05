import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Middleware } from '@reduxjs/toolkit';

import { config } from 'dotenv';
import { nanoid } from 'nanoid';
import ParametersForm from './ParametersForm';

const middlewares: Middleware[] = [thunk];
configureStore(middlewares);

nanoid(12);
Math.floor(Math.random() * 100);
new Date().getMilliseconds();

describe('ParametersForm comp is function', () => {
  beforeAll(() => {
    config();
  });

  test('ParametersForm is function', () => {
    expect(ParametersForm).toBeInstanceOf(Object);
  });

  const requestUserExpenseStats = jest.fn();

  render(
    <ParametersForm
      beginDate={new Date()}
      endDate={new Date()}
      userId={'sss'}
      onEndDateChange={jest.fn}
      onStartDateChange={jest.fn}
      requestUserExpenseStats={requestUserExpenseStats}
    />
  );
  expect(screen.getByText('Дата С')).toBeInTheDocument();
  const form = screen.getByTestId('form-param');
  expect(form).toBeInTheDocument();

  const btnSubmit = screen.getByTestId('form-btn-param');
  expect(btnSubmit).toBeInTheDocument();

  fireEvent.submit(form);
  expect(requestUserExpenseStats).toHaveBeenCalledTimes(1);
});
