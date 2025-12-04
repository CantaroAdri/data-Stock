import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    email: null,
    password: null,
  },
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value.email = action.payload.email;
      state.value.password = action.payload.password;
    },
    logout: (state) => {
      state.value.email = null;
      state.value.password = null;
    },
    clearUser: (state) => {
      state.value.email = "";
      state.value.password = "";
    },
  },
});

export const { setUser, logout, clearUser } = authSlice.actions;
export default authSlice.reducer;
