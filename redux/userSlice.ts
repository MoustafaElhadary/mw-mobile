import { createSlice } from '@reduxjs/toolkit';
import { AccountBase, Institution, LiabilitiesObject, StudentLoan } from 'plaid';

export type Account = AccountBase & {
  institution: Institution;
  item_id: string;
};

export type StudentLoanAPIResponse = {
  loans: StudentLoan[];
  accounts: AccountBase[];
  balance: number;
  loanTerm: {
    initial: number;
    current: number;
  };
  monthlyPayment: {
    initial: number;
    current: number;
    breakdown: {
      minimum: number;
      extra: number;
      familyMatch: number;
      employerMatch: number;
    };
  };
  interest: {
    apr: number;
    initial: number;
    current: number;
    interestSavings: number;
    timeSavedString: string;
  };
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
    studentLoan: {} as StudentLoanAPIResponse,
  },
  reducers: {
    setInitialUser: (state, { payload }) => {
      state.profile = payload.profile;
      state.accounts = payload.accounts;
      state.liabilities = payload.liabilities;
    },
    setAccounts: (state, { payload }: { payload: Account[] }) => {
      state.accounts = payload;
    },
    setStudentLoan: (state, { payload }: { payload: StudentLoanAPIResponse }) => {
      state.studentLoan = payload;
    },
  },
});

export const {
  setInitialUser,
  setAccounts,
  setStudentLoan,
} = userSlice.actions;

export default userSlice.reducer;
