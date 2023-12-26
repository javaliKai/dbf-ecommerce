import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import productReqData from './ProductStateTestData';
import {
  addNewProduct,
  deleteProduct,
  updateProduct,
} from '../../../thunks/productThunk';

const ProductStateTest = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (authState.token) {
        // dispatch(
        //   addNewProduct({
        //     token: authState.token,
        //     ...productReqData.newProduct,
        //   })
        // );
        dispatch(
          updateProduct({
            token: authState.token,
            ...productReqData.updateProduct,
          })
        );
        dispatch(
          deleteProduct({
            token: authState.token,
            ...productReqData.deleteProduct,
          })
        );
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <div>ProductStateTest</div>;
};

export default ProductStateTest;
