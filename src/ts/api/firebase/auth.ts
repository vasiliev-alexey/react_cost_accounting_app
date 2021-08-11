import { auth } from './firebase';
import firebase from 'firebase';

// Sign In
export const doSignInWithEmailAndPassword = (
  email: string,
  password: string
): Promise<firebase.auth.UserCredential> =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = (): Promise<void> => auth.signOut();
export const registerUser = (
  email: string,
  password: string
): Promise<firebase.auth.UserCredential> =>
  auth.createUserWithEmailAndPassword(email, password);
