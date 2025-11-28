import { createSlice } from "@reduxjs/toolkit";

const contadorSlice = createSlice({
  name: "contador",
  initialState: {
    cantidades: {}
  },
  reducers: {
    incrementar: (state, action) => {
      const id = action.payload;
      state.cantidades[id] = (state.cantidades[id] || 0) + 1;
    },
    decrementar: (state, action) => {
      const id = action.payload;
      state.cantidades[id] = Math.max((state.cantidades[id] || 0) - 1, 0);
    }
  }
});

export const { incrementar, decrementar } = contadorSlice.actions;
export default contadorSlice.reducer;
