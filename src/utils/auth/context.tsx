import { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { ParentProps } from '../propTypes';
import { analytics, auth } from '../../services/firebase';

const initialState: AuthState = [auth.currentUser, true, null];
const authContext = createContext(initialState);

export const useAuth = () => useContext(authContext);

export const AuthProvider = (props: Props) => {
  const [state, setState] = useState<AuthState>([auth.currentUser, true, null]);

  useEffect(() => {
    auth.onAuthStateChanged(
      fbUser => {
        setState([fbUser, false, null]);
        analytics.setUserId(fbUser?.uid || 'anonymous');
        analytics.setUserProperties({ name: fbUser?.displayName, email: fbUser?.email });
      },
      error => {
        setState([null, false, error]);
      }
    );
  }, []);

  return <authContext.Provider value={state}>{props.children}</authContext.Provider>;
};

type AuthState = [User: firebase.User | null, IsLoading: boolean, Error: firebase.auth.Error | null];

type Props = ParentProps;
