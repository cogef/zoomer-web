import { captureException } from '@sentry/react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from 'utils/auth';
import { ParentProps } from 'utils/propTypes';
import { getAdminStatus } from './requests';

const isAdminContext = createContext(false);

export const useIsAdmin = () => useContext(isAdminContext);

export const IsAdminProvider = (props: ParentProps) => {
  const [user] = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      getAdminStatus().then(res => {
        if (res.err !== null) {
          captureException(res.err);
          alert('There was a problem checking your admin privilege');
        } else {
          setIsAdmin(res.data?.isAdmin);
        }
      });
    }
    return () => setIsAdmin(false);
  }, [user]);

  return <isAdminContext.Provider value={isAdmin}>{props.children}</isAdminContext.Provider>;
};
