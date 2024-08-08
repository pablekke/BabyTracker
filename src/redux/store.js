import { configureStore } from "@reduxjs/toolkit";
import deptosSlice from "./features/deptosSlice";
import categoriasSlice from "./features/categoriasSlice";

export const store = configureStore({
  reducer: {
    deptosSlice,
    categoriasSlice,
  },
});
