import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";

export default configureStore({
  reducer: {
    ui: uiReducer
  }
});
