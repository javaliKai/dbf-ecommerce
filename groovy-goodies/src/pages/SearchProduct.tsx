import { useSearchParams } from 'react-router-dom';
import Products from '../components/Products';
import { useAppDispatch, useAppSelector } from '../store/store';
import Spinner from '../components/Spinner';
import { useEffect } from 'react';
import { getAllProducts } from '../store/thunks/productThunk';

const SearchProduct = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const productState = useAppSelector((state) => state.product);

  const productLoading = productState.loading;
  const products = productState.products;
  const productName = searchParams.get('name') || '';
  const filteredProducts = products.filter((p) =>
    p.product_name.match(new RegExp(`${productName}`, 'i'))
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  let searchProductContent;
  if (filteredProducts.length === 0) {
    searchProductContent = (
      <h2 className='text-3xl text-center font-bold my-5'>No product found</h2>
    );
  } else {
    searchProductContent = (
      <>
        <h2 className='text-3xl my-[2rem]'>Result For "{productName}"</h2>
        <Products content={filteredProducts} filterBy='all' />
      </>
    );
  }

  return <>{productLoading ? <Spinner /> : searchProductContent}</>;
};

export default SearchProduct;
