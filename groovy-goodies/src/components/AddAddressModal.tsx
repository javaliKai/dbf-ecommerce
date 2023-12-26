import { Button, Modal, Textarea } from 'flowbite-react';
import { Label, TextInput } from 'flowbite-react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { uiSliceActions } from '../store/uiSlice';
import { useRef } from 'react';
import {
  addNewAddress,
  getCustomerAddress,
} from '../store/thunks/customerThunk';

const AddAddressModal = () => {
  const dispatch = useAppDispatch();
  const showAddressModal = useAppSelector((state) => state.ui.showAddressModal);
  const token = useAppSelector((state) => state.auth.token)!;
  const customerId = +useAppSelector((state) => state.customer.cust_id)!;

  const countryRef = useRef<HTMLInputElement>(null);
  const provinceRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLInputElement>(null);
  const addressDetailRef = useRef<HTMLTextAreaElement>(null);

  const closeModalHandler = () => {
    dispatch(uiSliceActions.toggleAddressModal());
  };

  const addAddressFormHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const country = countryRef.current!.value;
    const province = provinceRef.current!.value;
    const state = stateRef.current!.value;
    const addressDetail = addressDetailRef.current!.value;

    dispatch(
      addNewAddress({
        customerId,
        token,
        country,
        province,
        state,
        addressDetail,
      })
    );

    // Close modal upon submission
    dispatch(uiSliceActions.toggleAddressModal());

    // Re-fetch profile
    setTimeout(() => {
      dispatch(getCustomerAddress(token));
    }, 1500);
  };

  return (
    <Modal show={showAddressModal} onClose={() => closeModalHandler()}>
      <form onSubmit={addAddressFormHandler}>
        <Modal.Header>Add New Address</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='small' value='Country' />
              </div>
              <TextInput id='small' type='text' sizing='sm' ref={countryRef} />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='small' value='Province' />
              </div>
              <TextInput
                id='small'
                type='text'
                sizing='sm'
                required
                ref={provinceRef}
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='small' value='State' />
              </div>
              <TextInput
                id='small'
                type='text'
                sizing='sm'
                required
                ref={stateRef}
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='small' value='Address Detail' />
              </div>
              <Textarea id='small' required rows={4} ref={addressDetailRef} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={() => setOpenModal(false)}>I accept</Button> */}
          <Button type='submit'>Add</Button>
          {/* <Button color='gray' onClick={() => setOpenModal(false)}> */}
          <Button color='gray' onClick={closeModalHandler}>
            Return
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddAddressModal;
