import React, { useEffect } from 'react';
import Header from './components/Header';
import CartSidebar from './components/CartSidebar';
import { useRoutes } from 'react-router-dom';
import Routes from './Routes';
import { useAppDispatch, useAppSelector } from './store/store';
import { authenticateCustomer } from './store/thunks/authThunk';
import { authActions } from './store/authSlice';
import Alert from './components/Alert';
import { getCartItems } from './store/thunks/customerThunk';
import Footer from './components/Footer';
import WishlistSidebar from './components/WishlistSidebar';

const App = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const routing = useRoutes(Routes(isAuthenticated));

  // Add auto authentication here using useEffect
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      const savedAuth = JSON.parse(localStorage.getItem('auth')!);
      if (savedAuth) {
        dispatch(authActions.reAuth(savedAuth));
        // dispatch(authenticateCustomer({}));
      }
    }
  }, []);

  return (
    <>
      <Header />
      <main className='py-[5rem] px-[4rem]'>
        <Alert />
        {routing}
      </main>
      <CartSidebar />
      <WishlistSidebar />
      <Footer />
    </>
  );
};

export default App;
