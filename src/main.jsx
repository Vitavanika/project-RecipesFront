import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import { store } from './redux/store.js';
import { Toaster } from 'react-hot-toast';
import 'modern-normalize/modern-normalize.css';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor } from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
