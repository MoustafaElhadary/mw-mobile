import { createSlice } from '@reduxjs/toolkit';
import { AccountBase, Institution, LiabilitiesObject } from 'plaid';

export type Account = AccountBase & {
  institution: Institution;
  item_id: string;
};
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
    accounts: [] as Account[],
    liabilities: {} as LiabilitiesObject,
  },
  reducers: {
    setInitialUser: (state, { payload }) => {
      console.log({payload})
      state.profile = payload.profile;
      state.accounts = payload.accounts;
      state.liabilities = payload.liabilities;
      
    },
    setAccounts: (state, { payload }) => {
      state.accounts = payload;
    },
  },
});

export const { setInitialUser, setAccounts } = userSlice.actions;

export default userSlice.reducer;
