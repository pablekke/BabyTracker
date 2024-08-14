import { configureStore } from "@reduxjs/toolkit";
import deptosSlice from "./features/deptosSlice";
import categoriasSlice from "./features/categoriasSlice";
import eventosSlice from "./features/eventosSlice";

export const store = configureStore({
  reducer: {
    deptosSlice,
    categoriasSlice,
    eventosSlice
  },
});
