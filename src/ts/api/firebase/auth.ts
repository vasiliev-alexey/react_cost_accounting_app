import { auth } from './firebase';
import firebase from 'firebase';
//import UserCredential = firebase.auth.UserCredential;

// Sign In
export const doSignInWithEmailAndPassword = (
  email: string,
  password: string
): Promise<firebase.auth.UserCredential> =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = (): Promise<void> => auth.signOut();
