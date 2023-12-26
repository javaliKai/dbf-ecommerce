import { Label, Select } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { uiSliceActions } from '../store/uiSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Link, useNavigate } from 'react-router-dom';
import ProductCheckout from '../components/ProductCheckout';
import { addNewOrder } from '../store/thunks/customerThunk';

export default function Example() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token)!;
  const customerState = useAppSelector((state) => state.customer);
  const customerAddress = customerState.address;
  const cartItems = customerState.cartItems;
  const cartId = customerState.cartId;
  const [paymentMethod, setPaymentMethod] = useState('bitcoin');

  let subtotal = 0;
  cartItems.forEach((item) => {
    subtotal = subtotal + +item.product_price;
  });

  let total = subtotal + 25; // 25 is the shipping fee

  useEffect(() => {
    dispatch(uiSliceActions.closeCartSidebar());
  }, []);

  const submitCheckoutHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addNewOrder({ token, cartId: cartId!, paymentMethod }));
    navigate('/checkout/success');
  };

  const paymentChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPayment = e.currentTarget.value;
    setPaymentMethod(selectedPayment);
  };

  let paymentDetailsContent;
  if (paymentMethod === 'credit card') {
    paymentDetailsContent = (
      <div className='mt-10'>
        <h3 id='payment-heading' className='text-lg font-medium text-gray-900'>
          Payment details - {paymentMethod}
        </h3>

        <div className='mt-6 grid grid-cols-3 gap-y-6 gap-x-4 sm:grid-cols-4'>
          <div className='col-span-3 sm:col-span-4'>
            <label
              htmlFor='card-number'
              className='block text-sm font-medium text-gray-700'
            >
              Card number
            </label>
            <div className='mt-1'>
              <input
                type='text'
                id='card-number'
                name='card-number'
                autoComplete='cc-number'
                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              />
            </div>
          </div>

          <div className='col-span-2 sm:col-span-3'>
            <label
              htmlFor='expiration-date'
              className='block text-sm font-medium text-gray-700'
            >
              Expiration date (MM/YY)
            </label>
            <div className='mt-1'>
              <input
                type='text'
                name='expiration-date'
                id='expiration-date'
                autoComplete='cc-exp'
                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='cvc'
              className='block text-sm font-medium text-gray-700'
            >
              CVC
            </label>
            <div className='mt-1'>
              <input
                type='text'
                name='cvc'
                id='cvc'
                autoComplete='csc'
                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (paymentMethod === 'bitcoin') {
    paymentDetailsContent = (
      <div className='mt-10'>
        <h3 id='payment-heading' className='text-lg font-medium text-gray-900'>
          Payment details
        </h3>

        <div className='mt-6 grid grid-cols-3 gap-y-6 gap-x-4 sm:grid-cols-4'>
          <div className='col-span-3 sm:col-span-4'>
            <label
              htmlFor='walletAddress'
              className='block text-sm font-medium text-gray-700'
            >
              Wallet address
            </label>
            <div className='mt-1'>
              <input
                type='text'
                id='walletAddress'
                name='walletAddress'
                autoComplete='cc-number'
                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              />
            </div>
          </div>
          <div className='col-span-3 sm:col-span-4'>
            <label
              htmlFor='privateKey'
              className='block text-sm font-medium text-gray-700'
            >
              Private Key
            </label>
            <div className='mt-1'>
              <input
                type='text'
                id='privateKey'
                name='privateKey'
                autoComplete='cc-number'
                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  let addressDetailContent;
  let payButtonSection;
  if (customerAddress.address_id) {
    addressDetailContent = (
      <>
        <p>Country: {customerAddress.country}</p>
        <p>Province: {customerAddress.province}</p>
        <p>State: {customerAddress.state}</p>
        <p>Address Detail: {customerAddress.address_detail}</p>
      </>
    );

    payButtonSection = (
      <button
        type='submit'
        className='rounded-md border border-transparent bg-rose-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
      >
        Pay now
      </button>
    );
  } else {
    addressDetailContent = (
      <p>
        You don't have any address yet, click{' '}
        <Link to='/profile' className='underline'>
          here
        </Link>{' '}
        to add one.
      </p>
    );
  }

  return (
    <div>
      {/* Background color split screen for large screens */}
      <div
        className='fixed top-0 left-0 hidden h-full w-1/2 bg-white lg:block'
        aria-hidden='true'
      />
      <div
        className='fixed top-0 right-0 hidden h-full w-1/2 border-slate-250 border-l-2 lg:block'
        aria-hidden='true'
      />

      <header className='relative mx-auto max-w-7xl py-6 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:bg-transparent lg:px-8 lg:pt-16 lg:pb-10'>
        <div className='mx-auto flex max-w-2xl px-4 lg:w-full lg:max-w-lg lg:px-0'>
          <a href='#'>
            <h2 className='text-3xl mb-[2rem]'>Checkout</h2>
          </a>
        </div>
      </header>

      <main className='relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8'>
        <h1 className='sr-only'>Checkout</h1>

        <section
          aria-labelledby='summary-heading'
          className=' pt-6 pb-12 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pt-0 lg:pb-24'
        >
          <div className='mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0 text-black'>
            <h2 id='summary-heading' className='sr-only'>
              Order summary
            </h2>

            <dl>
              <dd className='mt-1 text-3xl font-bold tracking-tight'>
                Cart Items
              </dd>
            </dl>

            <ul
              role='list'
              className='divide-y divide-white divide-opacity-10 text-sm font-medium'
            >
              {cartItems.map((product) => (
                <ProductCheckout key={product.product_id} product={product} />
              ))}
            </ul>

            <dl className='space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium'>
              <div className='flex items-center justify-between'>
                <dt>Subtotal</dt>
                <dd>${subtotal}</dd>
              </div>

              <div className='flex items-center justify-between'>
                <dt>Shipping</dt>
                <dd>$25.00</dd>
              </div>

              <div className='flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-black'>
                <dt className='text-base'>Total</dt>
                <dd className='text-base'>${total}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          aria-labelledby='payment-and-shipping-heading'
          className='py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pt-0 lg:pb-24'
        >
          <h2 id='payment-and-shipping-heading' className='sr-only'>
            Payment and shipping details
          </h2>

          <form onSubmit={submitCheckoutHandler}>
            <div className='mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0'>
              <div className='mt-10'>
                <h3
                  id='payment-heading'
                  className='text-lg font-medium text-gray-900'
                >
                  Payment methods
                </h3>
                <div className='max-w-md'>
                  <div className='mb-2 block'>
                    <Label htmlFor='countries' value='Select your country' />
                  </div>
                  <Select
                    onChange={paymentChangeHandler}
                    id='countries'
                    required
                  >
                    <option value='bitcoin'>Bitcoin</option>
                    <option value='credit card'>Credit Card</option>
                  </Select>
                </div>
              </div>

              {paymentDetailsContent}

              <div className='mt-10'>
                <h3
                  id='shipping-heading'
                  className='text-lg font-medium text-gray-900'
                >
                  Shipping address
                </h3>

                <div>{addressDetailContent}</div>
              </div>

              <div className='mt-10 flex justify-end border-t border-gray-200 pt-6'>
                {payButtonSection}
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
