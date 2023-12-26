// import link
import { Link } from 'react-router-dom';
// import icons
import { IoMdArrowForward } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../store/store';
import { uiSliceActions } from '../store/uiSlice';
import CartItemComponent from './CartItemComponent';

const CartSidebar = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.showCartSidebar);
  const cartItems = useAppSelector((state) => state.customer.cartItems);
  const cartItemsTotal = cartItems ? cartItems.length : 0;

  let total = 0;
  cartItems.forEach((item) => {
    total = total + +item.product_price;
  });

  const handleClose = () => {
    dispatch(uiSliceActions.toggleCartSidebar());
  };

  let cartItemContent;
  let cartItemClasses;
  if (cartItemsTotal === 0) {
    cartItemClasses = 'min-h-[50vh] flex justify-center items-center italic';
    cartItemContent = <p>Your cart is empty</p>;
  } else {
    cartItemContent = cartItems.map((item) => {
      return <CartItemComponent item={item} key={item.product_id} />;
    });
  }

  return (
    <div
      className={`${isOpen ? 'right-0' : '-right-full'}
           overflow-y-auto w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className={'flex items-center justify-between py-6 border-b'}>
        <div className={'uppercase text-sm font-semibold'}>
          Shopping Cart ({cartItemsTotal})
        </div>
        {/* icon */}
        <div
          onClick={handleClose}
          className={'cursor-pointer w-8 h-8 flex justify-center items-center'}
        >
          <IoMdArrowForward className={'text-2xl'} />
        </div>
      </div>
      <div className={cartItemClasses}>
        {cartItemContent}
        {cartItemsTotal > 0 && (
          <div className='flex flex-col gap-y-3 py-4 mt-4'>
            <div className='flex w-full justify-between items-center'>
              <div className='uppercase font-semibold'>
                <span className='mr-2'>Total:</span>${' '}
                {/* {parseFloat(total.toString()).toFixed(2)} */}
                {total}
              </div>
            </div>
            <Link
              to='/checkout'
              className='bg-primary flex p-4 justify-center items-center text-white w-full font-medium'
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
