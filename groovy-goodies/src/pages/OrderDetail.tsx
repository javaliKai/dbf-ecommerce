import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import NotFound from './NotFound';
import { useEffect } from 'react';
import { getOrderDetail } from '../store/thunks/customerThunk';
import Spinner from '../components/Spinner';
import OrderProgres from '../components/OrderProgres';

const OrderDetail = () => {
  const { orderId } = useParams();

  const dispatch = useAppDispatch();
  const orderItem = useAppSelector((state) =>
    state.customer.orders.find((item) => item.order_id === +orderId!)
  );
  const orderDetail = useAppSelector((state) => state.customer.orderDetail)!;
  const token = useAppSelector((state) => state.auth.token)!;
  const customerLoading = useAppSelector((state) => state.customer.loading);
  const customerAddress = useAppSelector((state) => state.customer.address);

  let subtotal = 0;
  if (orderDetail) {
    orderDetail.forEach((item) => {
      subtotal = subtotal + +item.product_price;
    });
  }

  let total = subtotal + 25; // 25 is the shipping fee

  useEffect(() => {
    dispatch(getOrderDetail({ token, orderId: +orderId! }));
  }, []);

  return orderItem && !customerLoading ? (
    <div className='py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto'>
      <div className='flex justify-start item-start space-y-2 flex-col'>
        <h1 className='text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800'>
          Order #{orderId}
        </h1>
        <p className='text-base dark:text-gray-300 font-medium leading-6 text-gray-600'>
          Issued At: {orderItem!.date_issued.toLocaleString()}
        </p>
      </div>
      <>
        <OrderProgres />
      </>
      <div className='mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0'>
        <div className='flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8'>
          <div className='flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full'>
            <p className='text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800'>
              Order Items
            </p>
            {orderDetail?.map((od) => (
              <div
                key={od.orderitem_id}
                className='mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full'
              >
                <div className='pb-4 md:pb-8 w-full md:w-40'>
                  <img
                    className='w-full hidden md:block'
                    src={od.product_image}
                    alt={od.product_name}
                  />
                  <img
                    className='w-full md:hidden'
                    src={od.product_image}
                    alt={od.product_name}
                  />
                </div>
                <div className='border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0'>
                  <div className='w-full flex flex-col justify-start items-start space-y-8'>
                    <h3 className='text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800'>
                      {od.product_name}
                    </h3>
                    <div className='flex justify-start items-start flex-col space-y-2'>
                      <p className='text-sm dark:text-white leading-none text-gray-800'>
                        {od.product_category}
                      </p>
                    </div>
                  </div>
                  <div className='flex justify-between space-x-8 items-start w-full'>
                    <p className='text-base dark:text-white xl:text-lg leading-6'>
                      {' '}
                    </p>
                    <p className='text-base dark:text-white xl:text-lg leading-6 text-gray-800'>
                      {od.quantity}
                    </p>
                    <p className='text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800'>
                      ${od.product_price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8'>
            <div className='flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6'>
              <h3 className='text-xl dark:text-white font-semibold leading-5 text-gray-800'>
                Summary
              </h3>
              <div className='flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4'>
                <div className='flex justify-between w-full'>
                  <p className='text-base dark:text-white leading-4 text-gray-800'>
                    Subtotal
                  </p>
                  <p className='text-base dark:text-gray-300 leading-4 text-gray-600'>
                    ${subtotal}
                  </p>
                </div>
                <div className='flex justify-between items-center w-full'>
                  <p className='text-base dark:text-white leading-4 text-gray-800'>
                    Shipping
                  </p>
                  <p className='text-base dark:text-gray-300 leading-4 text-gray-600'>
                    $25.00
                  </p>
                </div>
              </div>
              <div className='flex justify-between items-center w-full'>
                <p className='text-base dark:text-white font-semibold leading-4 text-gray-800'>
                  Total
                </p>
                <p className='text-base dark:text-gray-300 font-semibold leading-4 text-gray-600'>
                  ${total}
                </p>
              </div>
            </div>
            <div className='flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6'>
              <h3 className='text-xl dark:text-white font-semibold leading-5 text-gray-800'>
                Shipping
              </h3>
              <div className='flex justify-between items-start w-full'>
                <div className='flex justify-center items-center space-x-4'>
                  <div className='w-8 h-8'>
                    <img
                      className='w-full h-full'
                      alt='logo'
                      src='https://i.ibb.co/L8KSdNQ/image-3.png'
                    />
                  </div>
                  <div className='flex flex-col justify-start items-center'>
                    <p className='text-lg leading-6 dark:text-white font-semibold text-gray-800'>
                      DPD Delivery
                      <br />
                      <span className='font-normal'>
                        Delivery within 24 Hours
                      </span>
                    </p>
                  </div>
                </div>
                <p className='text-lg font-semibold leading-6 dark:text-white text-gray-800'>
                  $25.00
                </p>
              </div>
              <div className='w-full flex justify-center items-center'>
                <button className='hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white'>
                  View Carrier Details
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col'>
          <div className='flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0'>
            <div className='flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0'>
              <div className='flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start'>
                <div className='flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8'>
                  <p className='text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800'>
                    Shipping Address
                  </p>
                  <p className='w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600'>
                    {customerAddress.address_detail}, {customerAddress.state},{' '}
                    {customerAddress.province}, {customerAddress.country}
                  </p>
                </div>
                <div className='flex justify-center md:justify-start items-center md:items-start flex-col space-y-4'>
                  <p className='text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800'>
                    Payment Method
                  </p>
                  <p className='w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600'>
                    {orderItem.payment_method}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default OrderDetail;
