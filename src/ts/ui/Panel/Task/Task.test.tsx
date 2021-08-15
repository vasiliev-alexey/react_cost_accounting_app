import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Task from './Task';

describe('Task comp is function', () => {
  test('Task is function', () => {
    expect(Task).toBeInstanceOf(Object);
  });

  test('Task is render', () => {
    render(<Task />);
  });
});
