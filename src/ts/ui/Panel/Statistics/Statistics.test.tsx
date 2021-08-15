import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Middleware } from '@reduxjs/toolkit';

import { config } from 'dotenv';
import { Provider } from 'react-redux';
import Statistics from './Statistics';
import { MemoryRouter } from 'react-router-dom';

const middlewares: Middleware[] = [thunk];
const mockStore = configureStore(middlewares);

describe('Statistics comp is function', () => {
  beforeAll(() => {
    config();
  });

  test('Statistics is function', () => {
    expect(Statistics).toBeInstanceOf(Object);
  });

  render(
    <MemoryRouter>
      <Provider
        store={mockStore({
          auth: { userId: '1111' },
          cost: { expenseList: [], expenseLoaded: false },
        })}
      >
        <Statistics />
      </Provider>
    </MemoryRouter>
  );
});
