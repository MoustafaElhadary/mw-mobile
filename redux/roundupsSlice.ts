import { createSlice } from '@reduxjs/toolkit';

export const roundupsSlice = createSlice({
  name: 'roundups',
  initialState: {
    roundups: {} as any
  },
  reducers: {
    setRoundups: (state, { payload }) => {
        state.roundups = payload;
        }
  },
});

export const { setRoundups } = roundupsSlice.actions;

export default roundupsSlice.reducer;
