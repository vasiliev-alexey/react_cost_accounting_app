import { db } from './firebase';

export const getUserData = () => {
  console.log('wrrrrrrrrrrrrrrrrrrrrr');

  db.collection('users')

    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
      });
    });
};

export const setUserData = async (data: { a: string }) => {
  console.log('wwwwwwwwwwwwwwwwwwww');

  await db.collection('users').doc().set({
    userName: 'Jamie',
    blackLivesMatter: true,
  });
  console.log('eeeeeeeeeeeeeee');
};
