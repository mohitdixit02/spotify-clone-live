import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter
    basename='/spotify-clone-live/'
    >
    <App />
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
