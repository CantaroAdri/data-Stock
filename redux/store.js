import { configureStore } from "@reduxjs/toolkit";
import { shopApi } from "../service/shopService";
import { authApi } from "./authService";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    authReducer: authReducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(shopApi.middleware).concat(authApi.middleware),
});


export default store;