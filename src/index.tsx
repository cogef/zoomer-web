import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './utils/auth';
import 'services/dev';
import { IsAdminProvider } from 'utils/zoomer/adminContext';
import { init, ErrorBoundary } from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import env from 'env';

init({
  dsn: env.SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  environment: env.NODE_ENV,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.5,
});

ReactDOM.render(
  <ErrorBoundary fallback='An error has occurred'>
    <React.StrictMode>
      <Router>
        <AuthProvider>
          <IsAdminProvider>
            <App />
          </IsAdminProvider>
        </AuthProvider>
      </Router>
    </React.StrictMode>
  </ErrorBoundary>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
