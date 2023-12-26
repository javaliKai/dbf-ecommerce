import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/store';
import { authenticateCustomer } from '../store/thunks/authThunk';
import { ErrorResponse } from '../types/response';
import { Customer } from '../types/databaseSchema';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const keepLoginRef = useRef<HTMLInputElement>(null);

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
    const keepLogin = keepLoginRef.current!.checked;

    // Send authentication request
    dispatch(authenticateCustomer({ email, password }));
    // navigate('/');
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <div className='container flex flex-col mx-auto rounded-lg pt-12 my-5 max-w-md w-full p-6 rounded-lg shadow-lg'>
      <div className='flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable'>
        <div className='flex items-center justify-center w-full lg:p-12'>
          <div className='flex items-center xl:p-10'>
            <form
              onSubmit={loginHandler}
              className='flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl'
            >
              <h3 className='mb-3 text-4xl font-extrabold text-dark-grey-900'>
                Sign In
              </h3>
              <p className='mb-4 text-grey-700'>
                Enter your email and password
              </p>
              <a className='flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300'>
                <img
                  className='h-5 mr-2'
                  src='https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png'
                  alt=''
                />
                Sign in with Google
              </a>
              <div className='flex items-center mb-3'>
                <hr className='h-0 border-b border-solid border-grey-500 grow' />
                <p className='mx-4 text-grey-600'>or</p>
                <hr className='h-0 border-b border-solid border-grey-500 grow' />
              </div>
              <label
                htmlFor='email'
                className='mb-2 text-sm text-start text-grey-900'
              >
                Email*
              </label>
              <input
                ref={emailRef}
                required
                id='email'
                type='email'
                placeholder='mail@loopple.com'
                className='flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl'
              />
              <label
                htmlFor='password'
                className='mb-2 text-sm text-start text-grey-900'
              >
                Password*
              </label>
              <input
                ref={passwordRef}
                required
                id='password'
                type='password'
                placeholder='Enter a password'
                className='flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl'
              />
              <div className='flex items-center mb-8 text-left'>
                <input
                  ref={keepLoginRef}
                  id='default-checkbox'
                  type='checkbox'
                  className='w-4 h-4 bg-gray-100 border-gray-300 rounded outline-none cursor-pointer'
                />
                <label htmlFor='default-checkbox' className='ms-2 text-sm'>
                  Keep Logged In
                </label>
              </div>
              <button className='w-full px-6 py-3 mb-5 text-sm font-bold text-white transition duration-300 md:w-96 rounded-2xl hover:bg-rose-600 bg-rose-500'>
                Sign In
              </button>
              <p className='text-sm leading-relaxed text-grey-900'>
                Not registered yet?{' '}
                <Link to='/register' className='font-bold text-grey-700'>
                  Create an Account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
