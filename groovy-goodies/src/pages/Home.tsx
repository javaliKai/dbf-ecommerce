import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getAllProducts } from '../store/thunks/productThunk';
import Product from '../components/Product';
import Spinner from '../components/Spinner';
import Carousel from '../components/Carousel';
import Products from '../components/Products';

// import Product from '../components/Product';
const Home = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);
  const productLoading = useAppSelector((state) => state.product.loading);
  const [filterBy, changeFilterBy] = useState('all');

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const filteredProducts = products;
  return (
    <div>
      <Carousel />
      {productLoading ? (
        <Spinner />
      ) : (
        <article className='py-16'>
          <div className='flex justify-between'>
            <h2 className='text-3xl mb-[2rem]'>Our Products</h2>
            <ul className='flex gap-3'>
              <li
                onClick={() => changeFilterBy('all')}
                className={`cursor-pointer ${
                  filterBy === 'all' && 'underline'
                }`}
              >
                All
              </li>
              <li>/</li>
              <li
                onClick={() => changeFilterBy('electronics')}
                className={`cursor-pointer ${
                  filterBy === 'electronics' && 'underline'
                }`}
              >
                Electronics
              </li>
              <li>/</li>
              <li
                onClick={() => changeFilterBy("men's clothing")}
                className={`cursor-pointer ${
                  filterBy === "men's clothing" && 'underline'
                }`}
              >
                Men's Clothing
              </li>
              <li>/</li>
              <li
                onClick={() => changeFilterBy("women's clothing")}
                className={`cursor-pointer ${
                  filterBy === "women's clothing" && 'underline'
                }`}
              >
                Women's Clothing
              </li>
              <li>/</li>
              <li
                onClick={() => changeFilterBy('jewelery')}
                className={`cursor-pointer ${
                  filterBy === 'jewelery' && 'underline'
                }`}
              >
                Jewelery
              </li>
            </ul>
          </div>
          <Products content={filteredProducts} filterBy={filterBy} />
        </article>
      )}
    </div>
  );
};

export default Home;
