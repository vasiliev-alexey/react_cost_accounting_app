import { db } from './firebase';
import firebase from 'firebase';

const getUserData = () => {
  let ref = db.ref('/');
  ref.on('value', (snapshot) => {
    const state = snapshot.val();
  });
  console.log('DATA RETRIEVED');
};
