import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categorias: [],
};

const categoriasSlice = createSlice({
  name: "categoriasSlice",
  initialState,
  reducers: {
    loadCategorias: (state, action) => {
      const categorias = action.payload;
      state.categorias = [...categorias];
    }
  },
});
export const { loadCategorias } = categoriasSlice.actions;
export default categoriasSlice.reducer;