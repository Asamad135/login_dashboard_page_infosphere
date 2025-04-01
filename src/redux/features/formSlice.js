import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    name: '',
    // add other initial form fields here
  },
  isSubmitted: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setSubmitted: (state, action) => {
      state.isSubmitted = action.payload;
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.isSubmitted = false;
    },
  },
});

export const { updateFormData, setSubmitted, resetForm } = formSlice.actions;
export default formSlice.reducer;
