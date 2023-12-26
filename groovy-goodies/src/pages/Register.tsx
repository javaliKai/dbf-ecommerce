import { useRef } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/store';
import {
  authenticateCustomer,
  registerCustomer,
} from '../store/thunks/authThunk';
import { uiSliceActions } from '../store/uiSlice';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repasswordRef = useRef<HTMLInputElement>(null);

  // Input validation
  const isFormValid = (
    name: string,
    phone: string,
    email: string,
    password: string,
    rePassword: string
  ): boolean => {
    const phoneRegex = /^\d+$/;

    const nameValid = name.trim().length !== 0;
    const phoneValid = phoneRegex.test(phone);
    const emailValid = email.trim().length !== 0;
    const passwordValid = password === rePassword;

    return nameValid && phoneValid && emailValid && passwordValid;
  };

  const registerHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current!.value;
    const phone = phoneRef.current!.value;
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
    const rePassword = repasswordRef.current!.value;

    const formValid = isFormValid(name, phone, email, password, rePassword);

    if (!formValid) {
      // Send alert to state
      dispatch(
        uiSliceActions.setError({
          message: 'Register fail, please enter the correct credential',
        })
      );
      return;
    }

    // Send register request
    dispatch(registerCustomer({ name, email, password, phone }));

    // Reset form to blank
    nameRef.current!.value = '';
    phoneRef.current!.value = '';
    emailRef.current!.value = '';
    passwordRef.current!.value = '';
    repasswordRef.current!.value = '';
  };

  if (isAuthenticated) {
    navigate('/');
  }

  return (
    <div className='container flex flex-col mx-auto rounded-lg pt-12 my-5 max-w-md w-full p-6 rounded-lg shadow-lg'>
      <div className='flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable'>
        <div className='flex items-center justify-center w-full lg:p-12'>
          <div className='flex items-center xl:p-10'>
            <form
              onSubmit={registerHandler}
              className='flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl'
            >
              <h3 className='mb-3 text-4xl font-extrabold text-dark-grey-900'>
                Create Account
              </h3>
              <p className='mb-4 text-grey-700'>Fill in your credentials</p>
              <a className='flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300'>
                <img
                  className='h-5 mr-2'
                  src='https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png'
                  alt=''
                />
                Register with Google
              </a>
              <div className='flex items-center mb-3'>
                <hr className='h-0 border-b border-solid border-grey-500 grow' />
                <p className='mx-4 text-grey-600'>or</p>
                <hr className='h-0 border-b border-solid border-grey-500 grow' />
              </div>
              <label
                htmlFor='name'
                className='mb-2 text-sm text-start text-grey-900'
              >
                Name*
              </label>
              <input
                ref={nameRef}
                required
                id='name'
                type='text'
                placeholder='John Doe'
                className='flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl'
              />
              <label
                htmlFor='phone'
                className='mb-2 text-sm text-start text-grey-900'
              >
                Phone*
              </label>
              <input
                ref={phoneRef}
                required
                id='phone'
                type='tel'
                placeholder='John Doe'
                className='flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl'
              />
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
                minLength={6}
                placeholder='Enter a password'
                className='flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl'
              />
              <label
                htmlFor='repassword'
                className='mb-2 text-sm text-start text-grey-900'
              >
                Retype Password*
              </label>
              <input
                ref={repasswordRef}
                required
                id='repassword'
                type='password'
                minLength={6}
                placeholder='Enter password again'
                className='flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl'
              />
              <button className='w-full px-6 py-3 mb-5 text-sm font-bold text-white transition duration-300 md:w-96 rounded-2xl hover:bg-rose-600 bg-rose-500'>
                Create Account
              </button>
              <p className='text-sm leading-relaxed text-grey-900'>
                Already have an account?{' '}
                <Link to='/login' className='font-bold text-grey-700'>
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
