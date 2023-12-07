import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  authenticateClerk,
  authenticateCustomer,
  registerClerk,
  registerCustomer,
} from '../store/thunks/authThunk';
import authReqData from './AuthStateTestData';

const AuthStateTest = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authenticateCustomer(authReqData.customerAuth));
    // dispatch(authenticateClerk(authReqData.clerkAuth));
    // dispatch(registerCustomer(authReqData.customerRegister));
    // dispatch(registerClerk(authReqData.clerkRegister));
  }, []);
  return <div>AuthStateTest</div>;
};

export default AuthStateTest;
