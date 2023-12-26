import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { useEffect } from 'react';
import { getAllProducts } from '../store/thunks/productThunk';
import Spinner from '../components/Spinner';
import { addToCart, getCartItems } from '../store/thunks/customerThunk';
import { authActions } from '../store/authSlice';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const dispatch = useAppDispatch();

  const customerToken = useAppSelector((state) => state.auth.token);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const productLoading = useAppSelector((state) => state.product.loading);
  const products = useAppSelector((state) => state.product.products);
  const product = products.find((p) => productId === p.product_id);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      const savedAuth = JSON.parse(localStorage.getItem('auth')!);
      if (savedAuth) {
        dispatch(authActions.reAuth(savedAuth));
      }
    }
    dispatch(getAllProducts());
  }, []);

  const addToCartHandler = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      dispatch(
        addToCart({ token: customerToken!, productId: productId!, quantity: 1 })
      );
      dispatch(getCartItems(customerToken!));
    }
  };

  if (productLoading) {
    return <Spinner />;
  } else if (product) {
    const {
      product_name,
      product_price,
      product_description,
      product_image,
      product_category,
    } = product;

    return (
      <section className='pt-32 pb-12 lg:py-32 h-screen flex items-center'>
        <div className='container mx-auto'>
          {/* image & text wrapper */}
          <div className='flex flex-col lg:flex-row items-center'>
            {/* image */}
            <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
              <img
                className='max-w-[150px] lg:max-w-sm'
                width='60%'
                height='60%'
                src={product_image}
                alt=''
              />
            </div>
            {/* text */}
            <div className='flex-1 text-center lg:text-left'>
              <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0'>
                {product_name}
              </h1>
              <div className='text-xl text-red-500 font-medium mb-6'>
                $ {product_price}
              </div>
              <p className='mb-8'>{product_description}</p>
              <button
                onClick={addToCartHandler}
                className='bg-primary py-4 px-8 text-white hover:bg-rose-500'
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <h2 className='text-3xl text-center font-bold my-5'>No product found</h2>
    );
  }
};

export default ProductDetail;
