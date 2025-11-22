import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    email: null,
  },
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value.email = action.payload;
    },
    logout: (state) => {
      state.value.email = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
