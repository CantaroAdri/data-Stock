import { configureStore } from "@reduxjs/toolkit";
import { shopApi } from "../redux/shopService";
import { authApi } from "./authService";
import authReducer from "./authSlice";
import contadorReducer from "./contadorSlice";
import carritoReducer from "./carritoSlice";
import productosReducer from "./stockSlice";


const store = configureStore({
  reducer: {
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    contador: contadorReducer,
    carritoReducer: carritoReducer,
    productos: productosReducer,
    authReducer: authReducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(shopApi.middleware).concat(authApi.middleware),
});


export default store;