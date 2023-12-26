import { Label, Select } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { products } from './Checkout';

export default function Example() {
  const [paymentMethod, setPaymentMethod] = useState('bitcoin');

  useEffect(() => {}, []);

  let paymentDetailsContent;
  if (paymentMethod === 'credit card') {
    paymentDetailsContent = (
      <div className='mt-10'>
        <h3 id='payment-heading' className='text-lg font-medium text-gray-900'>
          Payment details
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
              <dt className='text-sm font-medium'>Amount due</dt>
              <dd className='mt-1 text-3xl font-bold tracking-tight'>
                $232.00
              </dd>
            </dl>

            <ul
              role='list'
              className='divide-y divide-white divide-opacity-10 text-sm font-medium'
            >
              {products.map((product) => (
                <li
                  key={product.id}
                  className='flex items-start space-x-4 py-6'
                >
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className='h-20 w-20 flex-none rounded-md object-cover object-center'
                  />
                  <div className='flex-auto space-y-1'>
                    <h3 className='text-black'>{product.name}</h3>
                    <p>{product.color}</p>
                    <p>{product.size}</p>
                  </div>
                  <p className='flex-none text-base font-medium text-black'>
                    {product.price}
                  </p>
                </li>
              ))}
            </ul>

            <dl className='space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium'>
              <div className='flex items-center justify-between'>
                <dt>Subtotal</dt>
                <dd>$570.00</dd>
              </div>

              <div className='flex items-center justify-between'>
                <dt>Shipping</dt>
                <dd>$25.00</dd>
              </div>

              <div className='flex items-center justify-between'>
                <dt>Taxes</dt>
                <dd>$47.60</dd>
              </div>

              <div className='flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-black'>
                <dt className='text-base'>Total</dt>
                <dd className='text-base'>$642.60</dd>
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

          <form>
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
                  <Select id='countries' required value={paymentMethod}>
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

                <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3'>
                  <p></p>
                </div>
              </div>

              <div className='mt-10 flex justify-end border-t border-gray-200 pt-6'>
                <button
                  type='submit'
                  className='rounded-md border border-transparent bg-rose-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
                >
                  Pay now
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
