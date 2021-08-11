import { config } from 'dotenv';
import {
  getUserCategory,
  getUserExpenseList,
  setUserCategory,
  setUserExpense,
} from './db';
import { ExpenseType } from '../../types/domain';
import { nanoid } from 'nanoid';
import firebase from 'firebase';

describe('test db functions', () => {
  beforeAll(() => {
    config();
  });

  afterAll(() => {
    firebase.app().delete();
  });

  test('test setUserCategoryTree', async () => {
    const x = await setUserCategory('11111', {
      categoryTree: [
        {
          id: 'trap',
          title: 'Транспорт',
          subtitle: 'Регулярные поездки',
          children: [
            { id: 'trapped', title: 'Метро', children: [] },
            { id: 'bus', title: 'Автобус', children: [] },
          ],
        },
        {
          id: 'no-grandkids',
          title: 'Еда',
          subtitle: 'Затраты на еду, в тч рестораны',
          children: [{ id: 'dasdasd', title: 'Завтраки в кафе', children: [] }],
        },
        {
          id: 'twin-1',
          title: 'Twin #1',
          subtitle: "Doesn't play with other twin",
          children: [],
        },
        {
          id: 'twin-2',
          title: 'Twin #2',
          subtitle: "Doesn't play with other twin",
          children: [],
        },
      ],
    });

    expect(x).not.toBeNull();
  });

  test('test getUserCategory', async () => {
    const x = await getUserCategory('11111');
    expect(x).not.toBeNull();
  });

  test('test getUserCategory with null', async () => {
    const x = await getUserCategory('*****');
    expect(x).toEqual([]);
  });

  test('test saveExpense', async () => {
    const data: ExpenseType = {
      categoryId: nanoid(12),
      expenseDate: Date.now(),
      amount: Math.round(Math.random() * 1000),
      description: 'test  expense for save',
    };

    const x = setUserExpense('11111', data);

    expect(x).not.toBeNull();
  });

  test('test get  expense', async () => {
    const x = await getUserExpenseList(
      'HoZR2hJVo4hzMc0Q6RtHizuwsRF3',
      new Date('2021-08-01'),
      new Date('2021-09-01')
    );
    expect(x).not.toBeNull();
    expect(x.length).toBeGreaterThanOrEqual(1);
  });

  test('test get  expense with null', async () => {
    const x = await getUserExpenseList(
      null,
      new Date('2021-08-01'),
      new Date('2021-09-01')
    );
    expect(x).toBe(undefined);
  });
});
