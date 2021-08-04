import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
const envVariables = process.env;

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_BASEURL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

console.log('process.env.REACT_APP_API_KEY', process.env.REACT_APP_API_KEY);
console.log(NODE_ENV); // development

export const auth = firebase.auth();
export const db = firebase.database();
