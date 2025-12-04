import { createSlice } from "@reduxjs/toolkit";

const productosSlice = createSlice({
  name: "productos",
  initialState: {
    lista: []
  },
  reducers: {
    setProductos: (state, action) => {
      state.lista = action.payload;
    },

    descontarStock: (state, action) => {
      const id = action.payload;
      const producto = state.lista.find(p => p.id === id);
      if (producto && producto.cantidad > 0) {
        producto.cantidad -= 1;
      }
    },

    sumarStock: (state, action) => {
      const id = action.payload;
      const producto = state.lista.find(p => p.id === id);
      if (producto) {
        producto.cantidad += 1;
      }
    }
  }
});

export const { setProductos, descontarStock, sumarStock } = productosSlice.actions;
export default productosSlice.reducer;
