import { createSlice } from '@reduxjs/toolkit';

export const roundupsSlice = createSlice({
  name: 'roundups',
  initialState: {
    roundups: {} as any,
    autoDeposits: {
      frequency: 'Weekly',
      amount: 600,
    }
  },
  reducers: {
    setRoundups: (state, { payload }) => {
        state.roundups = payload;
        },
    setAutoDeposits: (state, { payload }) => {
        state.autoDeposits = payload;
    }
  },
});

export const { setRoundups } = roundupsSlice.actions;

export default roundupsSlice.reducer;
