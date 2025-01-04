import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum MODAL_TYPE {
  INVENTORY_EDIT = 'INVENTORY_EDIT',
  // Add more modal types as needed
}
interface ModalState {
  isModalOpen: MODAL_TYPE | ''; // Store modal type or empty string when no modal is open
  modalOpenedPayload?: any; // Optional payload associated with the modal
}

const initialState: ModalState = {
  isModalOpen: '', // No modal is open initially
  modalOpenedPayload: undefined,
};

// Create the modal slice
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // Action to open/close the modal
    openModal: (state, action: PayloadAction<{ type: MODAL_TYPE | ''; payload?: any }>) => {
      if (action.payload.type === '') {
        state.isModalOpen = ''; // Close the modal if type is an empty string
        state.modalOpenedPayload = undefined; // Reset payload when closing
      } else {
        state.isModalOpen = action.payload.type; // Set the modal type
        state.modalOpenedPayload = action.payload.payload; // Set the payload
      }
    },
  },
});

// Export actions
export const { openModal } = modalSlice.actions;

// Export reducer
export default modalSlice.reducer;