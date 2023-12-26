import { Navigate } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import SearchProduct from './pages/SearchProduct';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';

const Routes = (isAuthenticated: boolean) => [
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/product/:productId',
    element: <ProductDetail />,
  },
  {
    path: '/product/search',
    element: <SearchProduct />,
  },
  {
    path: '/profile',
    element: isAuthenticated ? <Profile /> : <Navigate to='/login' />,
  },
  {
    path: '/checkout',
    element: isAuthenticated ? <Checkout /> : <Navigate to='/login' />,
  },
  {
    path: '/checkout/success',
    element: <PaymentSuccess />,
  },
  {
    path: '/orders',
    element: isAuthenticated ? <Orders /> : <Navigate to='/login' />,
  },
  {
    path: '/orders/:orderId',
    element: isAuthenticated ? <OrderDetail /> : <Navigate to='/login' />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default Routes;
