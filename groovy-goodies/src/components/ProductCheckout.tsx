import { CartItem } from '../types/response';

type ProductCheckoutProps = {
  product: CartItem;
};

const ProductCheckout = ({ product }: ProductCheckoutProps) => {
  return (
    <li className='flex items-start space-x-4 py-6'>
      <img
        src={product.product_image}
        alt={product.product_name}
        className='h-20 w-20 flex-none rounded-md object-cover object-center'
      />
      <div className='flex-auto space-y-1'>
        <h3 className='text-black'>{product.product_name}</h3>
        <p>{product.product_category}</p>
      </div>
      <p className='flex-none text-base font-medium text-black'>
        ${product.product_price}
      </p>
    </li>
  );
};

export default ProductCheckout;
