import React, { useContext } from 'react';
//import link
import { Link, useNavigate } from 'react-router-dom';
//import icons
import { BsPlus, BsEyeFill } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { Product as ProductType } from '../types/databaseSchema';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  addNewWishlist,
  addToCart,
  getCartItems,
} from '../store/thunks/customerThunk';
import { uiSliceActions } from '../store/uiSlice';
// import cart context
// import { CartContext } from '../contexts/CartContext';

type ProductProps = {
  product: ProductType;
};

const Product = ({ product }: ProductProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const customerToken = useAppSelector((state) => state.auth.token);

  //destructure product
  const {
    product_id,
    product_name,
    product_image,
    product_category,
    product_description,
    product_price,
  } = product;

  const addToCartHandler = () => {
    if (customerToken) {
      dispatch(
        addToCart({ token: customerToken, productId: product_id, quantity: 1 })
      );
      dispatch(getCartItems(customerToken));
    } else {
      navigate('/login');
    }
  };

  const addToWishlistHandler = () => {
    if (customerToken) {
      dispatch(addNewWishlist({ token: customerToken, productId: product_id }));
      dispatch(getCartItems(customerToken));
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <div className='border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition'>
        <div className='w-full h-full flex justify-center items-center'>
          {/*image*/}
          <div className='w-[200px] mx-auto flex justify-center items-center'>
            <img
              className='max-h-[160px] group-hover:scale-110 transition duration-300'
              src={product_image}
              alt=''
            />
          </div>
        </div>
        {/*buttons*/}
        <div className='absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
          <button onClick={addToCartHandler}>
            <div className='flex justify-center items-center text-white w-12 h-12 bg-red-500'>
              <BsPlus className='text-3xl' />
            </div>
          </button>
          <Link
            to={`/product/${product_id}`}
            className='w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl'
          >
            <BsEyeFill />
          </Link>
          <button onClick={addToWishlistHandler}>
            <div className='flex justify-center items-center text-rose-500 w-12 h-12 bg-white'>
              <FaHeart />
            </div>
          </button>
        </div>
      </div>
      {/* category & title & price */}
      <div>
        <div className='text-sm capitalize text-gray-500 mb-1'>
          {product_category}
        </div>
        <Link to={`/product/${product_id}`}>
          <h2 className='font-semibold mb-1'>{product_name}</h2>
        </Link>
        <div className='font-semibold'>${product_price}</div>
      </div>
    </div>
  );
};

export default Product;
