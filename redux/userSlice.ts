import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: {
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      phone: '',
      registered: true,
      address: '',
      items: [],
      payments: {
        receiving: {
          previous: [],
          upcoming: [],
        },
        giving: {
          previous: [],
          upcoming: [],
        },
      },
      roundups: {
        previous: [],
        upcoming: [],
      },
    },
  },
  reducers: {
    setInitialUser: (state, { payload }) => {
      state.profile = payload;
    },
  },
});

export const { setInitialUser } = userSlice.actions;

export default userSlice.reducer;
