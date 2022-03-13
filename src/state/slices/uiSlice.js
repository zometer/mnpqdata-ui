import { createSlice } from "@reduxjs/toolkit";
import { HOME } from "utils/BreadcrumbEntry";

const initialState = {
  breadcrumbs: [HOME], 
  allianceName: "", 
  playerName: "", 
  roster: { 
    filter: {
      rarities: [1,2,3,4,5], 
      championStatuses: ["championed", "unchampioned"],
      sortProperty: "displayLevel", 
      sortAscending: false,
      text: ""  
    } 
  }
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: { 
    replaceBreadcrumbs: (state, action) => { 
      state.breadcrumbs = action.payload;
      return state ;
    },
    replaceAllianceName: (state, action) => { 
      state.allianceName = action.payload; 
      return state;
    },
    replaceRosterFilter: (state, action) => { 
      state.roster.filter = action.payload; 
      return state;
    }
  }
});

export default uiSlice.reducer; 
export const { replaceAllianceName, replaceBreadcrumbs, replaceRosterFilter } = uiSlice.actions;
