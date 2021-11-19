import { createSlice } from '@reduxjs/toolkit';

export const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    registered: false,
    step: 0
  },
  reducers: {
    setStep: (state, { payload }) => {
      state.step = payload;
    },
    setRegistered: (state, { payload }) => {
      state.registered = payload;
    }
  },
});

export const { setStep, setRegistered } = registrationSlice.actions;

export default registrationSlice.reducer;
