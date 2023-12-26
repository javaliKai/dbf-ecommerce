import React, { useContext } from 'react';
// import link
import { Link, useNavigate } from 'react-router-dom';
// import icons
import { IoMdAdd, IoMdClose, IoMdRemove } from 'react-icons/io';
import { Product } from '../types/databaseSchema';
import { CartItem } from '../types/response';
import { useAppDispatch, useAppSelector } from '../store/store';
import { deleteCartItem, getCartItems } from '../store/thunks/customerThunk';

type CartItemProps = {
  item: CartItem;
};

const CartItemComponent = ({ item }: CartItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const token = authState.token!;
  const cust_id = authState.userId;

  const {
    cartitem_id,
    product_id,
    product_name,
    product_image,
    product_price,
    quantity,
  } = item;

  const removeCartItemHandler = () => {
    dispatch(deleteCartItem({ token, cartItemId: cartitem_id }));
  };

  return (
    <div
      className={
        'flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500'
      }
    >
      <div className={'w-full min-h-[150px] flex items-center gap-x-4'}>
        {/* product_image */}
        <Link to={`/product/${product_id}`}>
          <img className={'max-w-[80px]'} src={product_image} alt={''} />
        </Link>
        <div className={'w-full flex flex-col'}>
          {/* product_name & remove icon */}
          <div className={'flex justify-between mb-2'}>
            {/* product_name */}
            <Link
              to={`/product/${product_id}`}
              className={
                'text-sm uppercase font-medium max-w-[240px] text-primary hover:underline'
              }
            >
              {product_name}
            </Link>
            {/* remove icon */}
            <div
              onClick={removeCartItemHandler}
              className={'text-xl cursor-pointer'}
            >
              <IoMdClose
                className={'text-gray-500 hover:text-red-500 transition'}
              />
            </div>
          </div>
          <div className={'flex gap-x-2 h-[36px] text-sm'}>
            {/* qty */}
            <div
              className={
                'flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium'
              }
            >
              {/* minus icon */}
              <div
                // onClick={() => decreaseAmount(product_id)}
                className={
                  'flex-1 h-full flex justify-center items-center cursor-pointer'
                }
              >
                <IoMdRemove />
              </div>

              <div className={'h-full flex justify-center items-center px-2'}>
                {quantity}
              </div>
              {/* plus icon */}
              <div
                // onClick={() => increaseAmount(product_id)}
                className={
                  'flex-1 h-full flex justify-center items-center cursor-pointer'
                }
              >
                <IoMdAdd />
              </div>
            </div>
            {/* item product_price */}
            <div className={'flex-1 flex items-center'}>$ {product_price}</div>
            {/* final product_price */}
            {/* make the product_price at two decimals */}
            <div
              className={
                'flex-1 flex justify-end items-center text-primary font-medium'
              }
            >
              {/* {`$ ${parseFloat(product_price).toFixed(2)}`} */}
              {`$${product_price}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;
