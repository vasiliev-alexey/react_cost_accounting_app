import { config } from 'dotenv';
import { getUserData, setUserData } from './db';

describe('test db functions', () => {
  beforeAll(() => {
    config();
  });

  test('test getUserData', async () => {
    const x = await getUserData();

    //await new Promise((r) => setTimeout(r, 2000));
    for (let i in x.docs) {
      const doc = x.docs[i].data();
      console.log(doc);
      // Check for your document data here and break when you find it
    }
  });
  //
  // test('test setUserData', async () => {
  //   console.log('1111');
  //   const x = await setUserData({ a: 'ssss' });
  //   console.log('22222');
  //   console.log(x);
  // });
});
