import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    datails: {},
    address: {},
    step: 1,
  },
  reducers: {
    setuserDetails: (state, action) => {
      state.datails = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    resetAll: (state) => {
      state.datails = {};
      state.address = {};
      state.step = 1;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
  },
});

export const {
  setuserDetails,
  setAddress,
  resetAll,
  setStep,
  incrementByAmount,
} = userSlice.actions;

export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export const selectUserDetails = (state) => state.user.datails;
export const selectUserAddress = (state) => state.user.address;
export const selectStep = (state) => state.user.step;

export default userSlice.reducer;
