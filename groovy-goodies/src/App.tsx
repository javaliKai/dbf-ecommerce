import { useEffect, useState } from 'react';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import AuthStateTest from './reduxTestComponents/AuthStateTest';
import CustomerStateTest from './reduxTestComponents/CustomerStateTest';
import ClerkStateTest from './reduxTestComponents/ClerkStateTest';
import { useAppDispatch } from './store/store';
import { getAllProducts } from './store/thunks/productThunk';
import ProductStateTest from './reduxTestComponents/ProductStateTest';

function App() {
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        {/* Component test goes here... */}
        <AuthStateTest />
        {/* <CustomerStateTest /> */}
        {/* <ClerkStateTest /> */}
        {/* <ProductStateTest /> */}
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
