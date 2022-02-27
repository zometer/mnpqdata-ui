import { createSlice } from "@reduxjs/toolkit";
import { HOME } from "utils/BreadcrumbEntry";

const initialState = {
  breadcrumbs: [HOME] 
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: { 
    replaceBreadcrumbs: (state, action) => { 
      state.breadcrumbs = action.payload;
      return state ;
    }
  }
});

export default uiSlice.reducer; 
export const { replaceBreadcrumbs } = uiSlice.actions;
export const selectBreadcrumbs = (state) => state.ui.breadcrumbs; 
