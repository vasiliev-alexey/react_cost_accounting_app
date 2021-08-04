import { doSignInWithEmailAndPassword } from './auth';

describe('test auth', () => {
  console.log('sss');
  test('', () => {
    doSignInWithEmailAndPassword('', '').then((u) => {
      console.log(u.user.email);
    });

    expect(1).toBe(1);
  });
});
