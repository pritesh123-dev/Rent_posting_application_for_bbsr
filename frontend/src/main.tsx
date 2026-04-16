import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: '16px',
              background: '#1B1B2F',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 500,
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
