import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authNavModalOpen: false,
  authNavModalData: { title: null, description: null },
};

const miscSlice = createSlice({
  name: 'misc',
  initialState,
  reducers: {
    openAuthNavModal(state, action) {
      state.authNavModalOpen = true;
      state.authNavModalData = action.payload;
    },
    closeAuthNavModal(state) {
      state.authNavModalOpen = false;
      state.authNavModalData = initialState.authNavModalData;
    },
  },
});

export const miscReducer = miscSlice.reducer;
export const { openAuthNavModal, closeAuthNavModal } = miscSlice.actions;
