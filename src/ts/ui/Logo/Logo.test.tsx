import { Logo } from './Logo';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Header comp is function', () => {
  test('Header is function', () => {
    expect(Logo).toBeInstanceOf(Function);
    expect(new Logo({})).toBeInstanceOf(React.Component);
  });
});

describe('Logo render test ', () => {
  test('Logo  render in page', () => {
    render(<Logo />);
    expect(screen.getByTestId('HeaderLogoImg')).toBeInTheDocument();
  });
});
