import { IoMdArrowForward } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../store/store';
import { uiSliceActions } from '../store/uiSlice';
import Wishlist from './Wishlist';

const WishlistSidebar = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.showWishlistSidebar);
  const wishlistItems = useAppSelector((state) => state.customer.wishlists);
  const wishlistTotal = wishlistItems ? wishlistItems.length : 0;

  const handleClose = () => {
    dispatch(uiSliceActions.toggleWishlistSidebar());
  };

  let wishlistItemContent;
  let wishlistItemClasses;
  if (wishlistTotal === 0) {
    wishlistItemClasses =
      'min-h-[50vh] flex justify-center items-center italic';
    wishlistItemContent = <p>Your wishlist is empty</p>;
  } else {
    wishlistItemContent = wishlistItems.map((item) => {
      return <Wishlist item={item} key={item.product_id} />;
    });
  }

  return (
    <div
      className={`${isOpen ? 'right-0' : '-right-full'}
           overflow-y-auto w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className={'flex items-center justify-between py-6 border-b'}>
        <div className={'uppercase text-sm font-semibold'}>
          Wishlists ({wishlistTotal})
        </div>
        {/* icon */}
        <div
          onClick={handleClose}
          className={'cursor-pointer w-8 h-8 flex justify-center items-center'}
        >
          <IoMdArrowForward className={'text-2xl'} />
        </div>
      </div>
      <div className={wishlistItemClasses}>{wishlistItemContent}</div>
    </div>
  );
};

export default WishlistSidebar;
