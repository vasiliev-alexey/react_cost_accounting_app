import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Middleware } from '@reduxjs/toolkit';

import { config } from 'dotenv';
import AddForm from './AddForm';
import userEvent from '@testing-library/user-event';

const middlewares: Middleware[] = [thunk];
configureStore(middlewares);

describe('AddForm comp is function', () => {
  beforeAll(() => {
    config();
  });

  test('AddForm is function', () => {
    expect(AddForm).toBeInstanceOf(Function);
  });

  test('AddForm must be render', () => {
    render(<AddForm title={'ss'} onChangeInput={jest.fn} />);
    const inputElement = screen.getByTestId('addForm-input');
    expect(inputElement).toBeInTheDocument();
    userEvent.click(inputElement);
  });
});
