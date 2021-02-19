import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './utils/auth';
import 'services/dev';
import { IsAdminProvider } from 'utils/zoomer/adminContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <IsAdminProvider>
          <App />
        </IsAdminProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
