import { configureStore } from "@reduxjs/toolkit";
import { shopApi } from "../redux/shopService";
import { authApi } from "./authService";
import authReducer from "./authSlice";
import contadorReducer from "./contadorSlice";

const store = configureStore({
  reducer: {
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    contador: contadorReducer,
    authReducer: authReducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(shopApi.middleware).concat(authApi.middleware),
});


export default store;