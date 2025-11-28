import { createSlice } from "@reduxjs/toolkit";

const carritoSlise = createSlice({
  name: "carrito",
  initialState: {
    items: {}   // objeto tipo { id: { ...producto, cantidad: n } }
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

export const { agregarAlCarrito, quitarDelCarrito } = carritoSlise.actions;
export default carritoSlise.reducer;

