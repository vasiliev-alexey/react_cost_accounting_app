import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
const envVariables = process.env;

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  // // databaseURL: process.env.REACT_APP_BASEURL,
  projectId: 'inbound-coast-275214', //process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(config);

const db = firebase.firestore();
//db.useEmulator('localhost', 8080);
const auth = firebase.auth();

export default firebase;
export { db, auth };
