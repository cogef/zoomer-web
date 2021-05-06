import { useEffect } from 'react';
import { analytics } from 'services/firebase';
import env from 'env';

export const useCurrentPageAnalytics = (screen: string) => {
  useEffect(() => {
    document.title = `${screen} | ${env.APP_NAME}`;
    analytics.setCurrentScreen(screen);
  }, [screen]);
};
