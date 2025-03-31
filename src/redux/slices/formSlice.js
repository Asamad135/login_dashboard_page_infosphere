import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: null,
  isSubmitted: false,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    submitForm: (state, action) => {
      state.formData = action.payload;
      state.isSubmitted = true;
    },
  },
});

export const { submitForm } = formSlice.actions;
export default formSlice.reducer;
