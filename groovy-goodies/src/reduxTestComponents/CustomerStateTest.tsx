import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import custReqData from './CustomerStateTestData';
import {
  addNewAddress,
  addNewOrder,
  addNewWishlist,
  addToCart,
  deleteCartItem,
  getAllWishlist,
  getCartItems,
  getCustomerNotifications,
  getCustomerOrders,
  getCustomerShippings,
  getOrderDetail,
  updateCustomer,
  updateSelectedAddress,
} from '../store/thunks/customerThunk';
import { customerActions } from '../store/customerSlice';

const CustomerStateTest = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    const wishlistWait = setTimeout(() => {
      if (authState.token) {
        dispatch(getAllWishlist(authState.token));
        dispatch(getCartItems(authState.token));
        dispatch(getCustomerShippings(authState.token));
        dispatch(getCustomerNotifications(authState.token));
        dispatch(getCustomerOrders(authState.token));
        dispatch(getOrderDetail({ token: authState.token, orderId: 5035 }));
      }
    }, 3000);

    dispatch(customerActions.unloadOrderDetail());
    if (authState.token) {
      dispatch(addToCart({ token: authState.token, ...custReqData.addToCart }));
      // dispatch(
      //   addNewAddress({ token: authState.token, ...custReqData.newAddress })
      // );
      dispatch(
        addNewWishlist({
          token: authState.token,
          productId: custReqData.newWishlist.productId,
        })
      );
      // dispatch(
      //   addNewOrder({ token: authState.token, ...custReqData.newOrder })
      // );
      dispatch(
        updateSelectedAddress({
          token: authState.token,
          ...custReqData.selectAddress,
        })
      );
      dispatch(
        updateCustomer({
          token: authState.token,
          ...custReqData.updateCustomer,
        })
      );
      dispatch(
        deleteCartItem({
          token: authState.token,
          ...custReqData.deleteCartItem,
        })
      );
    }

    return () => {
      clearTimeout(wishlistWait);
    };
  }, [authState]);

  return <div>CustomerStateTest</div>;
};

export default CustomerStateTest;
