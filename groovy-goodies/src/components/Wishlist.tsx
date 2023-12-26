import { Link } from 'react-router-dom';
import { Wishlist as WishlistType } from '../types/databaseSchema';
import { WishListItem } from '../types/response';
import { IoMdClose, IoMdRemove } from 'react-icons/io';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { deleteWishlist, getAllWishlist } from '../store/thunks/customerThunk';

type WishlistProps = {
  item: WishListItem;
};

const Wishlist = ({ item }: WishlistProps) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token)!;
  const {
    product_id,
    product_name,
    product_image,
    product_price,
    wishlist_id,
  } = item;

  const removeWishlistHandler = () => {
    dispatch(deleteWishlist({ token, wishlistId: wishlist_id }));
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
              onClick={removeWishlistHandler}
              className={'text-xl cursor-pointer'}
            >
              <IoMdClose
                className={'text-gray-500 hover:text-red-500 transition'}
              />
            </div>
          </div>
          <div className={'flex gap-x-2 h-[36px] text-sm'}>
            {/* qty */}

            {/* item product_price */}
            <div className={'flex-1 flex items-center'}>$ {product_price}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
