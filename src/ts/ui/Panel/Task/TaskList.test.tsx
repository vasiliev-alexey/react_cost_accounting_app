import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import TaskList from './TaskList';

describe('TaskList comp is function', () => {
  test('TaskList is function', () => {
    expect(TaskList).toBeInstanceOf(Object);
  });
  test('TaskList is render', () => {
    render(<TaskList />);
  });
});
