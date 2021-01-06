import { auth } from '../../services/firebase';
import firebase from 'firebase/app';

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ hd: 'cogef.org' });

export const login = () => {
  return auth.signInWithPopup(provider);
};

export const logout = () => auth.signOut();
