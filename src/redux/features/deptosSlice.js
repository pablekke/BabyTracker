import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deptos: [],
};

const deptosSlice = createSlice({
  name: "deptosSlice",
  initialState,
  reducers: {
    cargarDeptos: (state, action) => {
      const deptos = action.payload;
      state.deptos = [...deptos];
    }
  },
});
export const { cargarDeptos, getDeptos } = deptosSlice.actions;
export default deptosSlice.reducer;