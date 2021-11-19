import { createSlice } from '@reduxjs/toolkit';

export const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    registered: false,
  },
  reducers: {
    // setSelectedTab: (state, { payload }) => {
    //   state.selectedTab = payload;
    // },
  },
});

// export const { setSelectedTab } = registrationSlice.actions;

export default registrationSlice.reducer;
