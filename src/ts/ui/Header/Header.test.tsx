import Header from './Header';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Header comp is function', () => {
  test('Header is function', () => {
    expect(Header).toBeInstanceOf(Function);
  });
});

describe('Header render test ', () => {
  test('Header  render in page', () => {
    render(<Header />);
    expect(screen.getByTestId('HeaderLoginButton')).toBeInTheDocument();
  });
});
