import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import store from './store/store.ts';
import './index.css';
import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import Header from './components/Header.tsx';
import Sidebar from './components/CartSidebar.tsx';
import Login from './pages/Login.tsx';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
