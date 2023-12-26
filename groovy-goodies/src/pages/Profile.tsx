import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { MdPerson } from 'react-icons/md';
import AddAddressModal from '../components/AddAddressModal';
import { uiSliceActions } from '../store/uiSlice';

const Profile = () => {
  const dispatch = useAppDispatch();
  const customerInfo = useAppSelector((state) => state.customer);

  const addAddressHandler = () => {
    dispatch(uiSliceActions.toggleAddressModal());
  };

  let addressContent;
  if (customerInfo.address.address_id) {
    addressContent = (
      <>
        <p>Country: {customerInfo.address.country}</p>
        <p>Province: {customerInfo.address.province}</p>
        <p>State: {customerInfo.address.state}</p>
        <p>Detail: {customerInfo.address.address_detail}</p>
      </>
    );
  } else {
    addressContent = <p>No address found.</p>;
  }

  return (
    <>
      <section className='antialiased my-[10vh]'>
        <div className='h-full'>
          <div className='max-w-sm mx-auto bg-white shadow-lg rounded-sm border border-gray-200'>
            <div className='flex flex-col h-full'>
              <div className='flex-grow p-5'>
                <div className='flex justify-between items-start'>
                  <header>
                    <div className='flex mb-2'>
                      <a
                        className='relative inline-flex items-start mr-5'
                        href='#0'
                      >
                        <span>
                          <MdPerson className='text-5xl z-11' />
                        </span>
                      </a>
                      <div className='mt-1 pr-1'>
                        <a
                          className='inline-flex text-gray-800 hover:text-gray-900'
                          href='#0'
                        >
                          <h2 className='text-xl leading-snug justify-center font-semibold'>
                            {customerInfo.cust_name}
                          </h2>
                        </a>
                        <div className='flex flex-col gap-5 my-2'>
                          <div>
                            <h2 className='text-lg font-bold'>Info:</h2>
                            <p>Email: {customerInfo.cust_email}</p>
                            <p>Phone: {customerInfo.cust_phone}</p>
                          </div>
                          <div>
                            <h2 className='text-lg font-bold'>Address:</h2>
                            {addressContent}
                          </div>
                          <div>
                            <h2 className='text-lg font-bold'>Action:</h2>
                            <button
                              onClick={addAddressHandler}
                              className='text-white bg-rose-600 hover:bg-white hover:text-rose-700 border hover:border-rose-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                            >
                              Add Address
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </header>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AddAddressModal />
    </>
  );
};

export default Profile;
