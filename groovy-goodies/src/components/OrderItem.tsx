import { Link } from 'react-router-dom';
import { Order } from '../types/databaseSchema';
import { Card } from 'flowbite-react';

type OrderItemProps = {
  order: Order;
};

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <li className='pb-3 sm:pb-4 cursor-pointer'>
      <Link to={`/orders/${order.order_id}`}>
        <Card>
          <div className='flex items-center space-x-4 rtl:space-x-reverse'>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
                #{order.order_id}
              </p>
              <p className='text-sm text-gray-500 truncate dark:text-gray-400'>
                {order.date_issued.toLocaleString()}
              </p>
            </div>
            <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
              {order.order_status}
            </div>
          </div>
        </Card>
      </Link>
    </li>
  );
};

export default OrderItem;
