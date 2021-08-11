import { Navigation } from './Navigation';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe('Navigation comp is function', () => {
  test('Navigation is function', () => {
    expect(Navigation).toBeInstanceOf(Function);
    expect(new Navigation({})).toBeInstanceOf(React.Component);
  });
});

describe('Navigation render test ', () => {
  test('Navigation  render in page', () => {
    render(
      <MemoryRouter initialEntries={['/users/2']}>
        <Navigation />
      </MemoryRouter>
    );
    expect(screen.getByTestId('Navigation-Test-Id')).toBeInTheDocument();
  });

  test.each([
    ['О проекте'],
    ['Настройка'],
    ['Ввод расходов'],
    ['Просмотр статистики'],
  ])('render element   with text %s', (text: string) => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    expect(screen.getByText(`${text}`)).toBeInTheDocument();
  });
});
