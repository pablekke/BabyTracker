import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categorias: [],
};

const categoriasSlice = createSlice({
  name: "categoriasSlice",
  initialState,
  reducers: {
    cargarCategorias: (state, action) => {
      const categorias = action.payload;
      state.categorias = [...categorias];
    }
  },
});
export const { cargarCategorias, getCategorias } = categoriasSlice.actions;
export default categoriasSlice.reducer;
