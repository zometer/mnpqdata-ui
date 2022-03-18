import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import searchReducer from "./slices/searchSlice";

export default configureStore({
  reducer: {
    ui: uiReducer,
    search: searchReducer
  }
});
