import { config } from 'dotenv';
import {
  getUserCategory,
  //getUserData,
  setUserCategory,
  //setUserData,
} from './db';

describe('test db functions', () => {
  beforeAll(() => {
    config();
  });

  // test('test getUserData', async () => {
  //   const x = await getUserData();

  //await new Promise((r) => setTimeout(r, 2000));
  // for (const i in x.docs) {
  //   const doc = x.docs[i].data();
  //   console.log(doc);
  // Check for your document data here and break when you find it
  //  }
  //});
  //
  // test('test setUserData', async () => {
  //   console.log('1111');
  //   const x = await setUserData({ a: 'ssss' });
  //   console.log('22222');
  //   console.log(x);
  // });

  test('test setUserCategoryTree', async () => {
    console.log('1111');
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
    console.log('22222');
    console.log(x);
  });

  test('test getUserCategory', async () => {
    const x = await getUserCategory('11111');

    console.log(x);
  });
});
