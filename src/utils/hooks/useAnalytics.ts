import { useEffect } from 'react';
import { analytics } from 'services/firebase';
import { APP_NAME } from 'utils/constants/app';

export const useCurrentPageAnalytics = (screen: string) => {
  useEffect(() => {
    document.title = `${screen} | ${APP_NAME}`;
    analytics.setCurrentScreen(screen);
  }, [screen]);
};
