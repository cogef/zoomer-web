import React from 'react';
import { RootRoute } from './routes';
import { ErrorScreen } from './screens/ErrorScreen';
import { LoadingScreen } from './screens/LoadingScreen';
import { useAuth } from './utils/auth';
import { captureException } from '@sentry/react';

function App() {
  const [, isLoading, error] = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    captureException(error);
    console.error(error);
    return <ErrorScreen errorMsg='An error has occurred with the Auth service' />;
  }

  return (
    <div className='App'>
      <RootRoute />
    </div>
  );
}

export default App;
