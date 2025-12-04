import { createSlice } from "@reduxjs/toolkit";
import { descontarStock, sumarStock } from "./stockSlice";


const carritoSlice = createSlice({
  name: "carrito",
  initialState: {
    items: {}   
  },
  reducers: {
    agregarAlCarrito: (state, action) => {
      const producto = action.payload;
      const id = producto.id;

      if (!state.items[id]) {
        state.items[id] = { ...producto, cantidad: 1 };
      } else {
        state.items[id].cantidad += 1;
      }
    },

    quitarDelCarrito: (state, action) => {
      const id = action.payload;

      if (state.items[id]) {
        state.items[id].cantidad -= 1;

        if (state.items[id].cantidad <= 0) {
          delete state.items[id];
        }
      }
    }
  }
});

export const agregarConStock = (producto) => (dispatch) => {
  dispatch(agregarAlCarrito(producto));
  dispatch(descontarStock(producto.id));
};

export const quitarConStock = (id) => (dispatch) => {
  dispatch(quitarDelCarrito(id));
  dispatch(sumarStock(id));
};

export const { agregarAlCarrito, quitarDelCarrito } = carritoSlice.actions;
export default carritoSlice.reducer;

