import { Progress } from 'flowbite-react';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const OrderProgres = () => {
  return (
    <div className='max-w-xl mx-auto my-4 border-b-2 pb-4'>
      <div className='flex text-xs content-center text-center'>
        <div className='w-1/4 flex flex-col justify-center items-center gap-2'>
          <span>
            <FaCheckCircle className='text-2xl text-rose-500' />
          </span>
          <p>Confirm Payment</p>
        </div>

        <div className='w-1/4 flex flex-col justify-center items-center gap-2'>
          <span>
            <FaCheckCircle className='text-2xl text-rose-500' />
          </span>
          <p>Waiting for Courier</p>{' '}
        </div>

        <div className='w-1/4 flex flex-col justify-center items-center gap-2'>
          <span>
            <FaRegCircle className='text-2xl text-rose-500' />
          </span>
          <p>Shipping to Address</p>{' '}
        </div>

        <div className='w-1/4 flex flex-col justify-center items-center gap-2'>
          <span>
            <FaRegCircle className='text-2xl text-rose-500' />
          </span>
          <p>Confirm Order</p>{' '}
        </div>
      </div>
      <div className='my-5'>
        <Progress progress={45} color='pink' />
      </div>
    </div>
  );
};

export default OrderProgres;
