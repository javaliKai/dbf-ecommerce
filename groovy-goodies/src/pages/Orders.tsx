import OrderItem from '../components/OrderItem';
import { useAppSelector } from '../store/store';

const Orders = () => {
  const orderItems = useAppSelector((state) => state.customer.orders);
  return (
    <>
      <div className='my-5'>
        <h2 className='my-3 text-2xl dark:text-white lg:text-3xl font-semibold leading-7 lg:leading-9 text-gray-800'>
          Your Orders
        </h2>
        <ul className='flex flex-col-reverse mx-auto my-5 max-w-md divide-y divide-gray-200 dark:divide-gray-700'>
          {orderItems.map((item) => (
            <OrderItem key={item.order_id} order={item} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Orders;
