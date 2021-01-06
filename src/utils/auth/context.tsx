import { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { ParentProps } from '../propTypes';
import { auth } from '../../services/firebase';

const initialState: AuthState = [auth.currentUser, true, null];
const authContext = createContext(initialState);

export const useAuth = () => useContext(authContext);

export const AuthProvider = (props: Props) => {
  const [state, setState] = useState<AuthState>([auth.currentUser, true, null]);

  console.log({ authState: state });

  useEffect(() => {
    auth.onAuthStateChanged(
      fbUser => {
        setState([fbUser, false, null]);
      },
      error => {
        setState([null, false, error]);
      }
    );
  }, []);

  return <authContext.Provider value={state}>{props.children}</authContext.Provider>;
};

type AuthState = [firebase.User | null, boolean, firebase.auth.Error | null];

type Props = ParentProps;
