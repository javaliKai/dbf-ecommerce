import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  confirmOrder,
  getAllNotification,
  getAllOrders,
  sendNotification,
} from '../store/thunks/clerkThunk';
import clerkReqData from './ClerkStateTestData';

const ClerkStateTest = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (authState.token) {
        dispatch(getAllOrders(authState.token));
        dispatch(
          confirmOrder({ token: authState.token, ...clerkReqData.confirmOrder })
        );
        dispatch(
          sendNotification({
            token: authState.token,
            ...clerkReqData.sendNotification,
          })
        );
        dispatch(getAllNotification(authState.token));
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <div>ClerkStateTest</div>;
};

export default ClerkStateTest;
