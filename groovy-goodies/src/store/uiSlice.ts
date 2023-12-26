import { createSlice } from '@reduxjs/toolkit';
import { UIState } from '../types/state';

const initialState: UIState = {
  alert: undefined,
  error: undefined,
  showCartSidebar: false,
  showWishlistSidebar: false,
  showAddressModal: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCartSidebar(state) {
      state.showCartSidebar = !state.showCartSidebar;
    },
    closeCartSidebar(state) {
      state.showCartSidebar = false;
    },
    toggleWishlistSidebar(state) {
      state.showWishlistSidebar = !state.showWishlistSidebar;
    },
    toggleAddressModal(state) {
      state.showAddressModal = !state.showAddressModal;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setAlert(state, action) {
      state.alert = action.payload;
    },
    resetAlertError(state) {
      state.alert = undefined;
      state.error = undefined;
    },
  },
});

export const uiSliceActions = uiSlice.actions;
export default uiSlice;
