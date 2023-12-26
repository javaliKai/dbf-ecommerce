import React from 'react';
import { Product as PType } from '../types/databaseSchema';
import Product from './Product';

type ProductsProps = {
  content: PType[];
  filterBy:
    | 'all'
    | 'electronics'
    | "mens's clothing"
    | "women's clothing"
    | 'jewelery'
    | string;
};

const Products = ({ content, filterBy }: ProductsProps) => {
  let products;
  if (filterBy !== 'all') {
    products = content.filter((p) => p.product_category === filterBy);
  } else {
    products = content;
  }

  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
        {products.map((product) => {
          return <Product product={product} key={product.product_id} />;
        })}
      </div>
    </div>
  );
};

export default Products;
