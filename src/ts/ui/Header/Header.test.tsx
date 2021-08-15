import Header from './Header';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import { Middleware } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import firebase from '../../api/firebase/firebase';

const middlewares: Middleware[] = [];
const mockStore = configureStore(middlewares);

describe('Header comp is function', () => {
  test('Header is function', () => {
    expect(Header).toBeInstanceOf(Object);
  });
});

describe('Header render test ', () => {
  afterAll(() => {
    firebase.app().delete();
  });

  test('Header  render in page', () => {
    const initialState = {
      auth: {
        userName: 'userName',
      },
    };
    const store = mockStore(initialState);
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('HeaderLoginButton')).toBeInTheDocument();
  });
});
