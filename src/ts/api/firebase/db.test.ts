import { config } from 'dotenv';
import { getUserData, setUserData } from './db';

describe('test db functions', () => {
  beforeAll(() => {
    config();
  });

  test('test getUserData', () => {
    const x = getUserData();
    console.log('xxx', x);
  });
  //
  // test('test setUserData', async () => {
  //   console.log('1111');
  //   const x = await setUserData({ a: 'ssss' });
  //   console.log('22222');
  //   console.log(x);
  // });
});
