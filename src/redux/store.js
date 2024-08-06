import { configureStore } from "@reduxjs/toolkit";
import deptosSlice from "./features/deptosSlice";

export const store = configureStore({
  reducer: {
    deptosSlice,
  },
});
