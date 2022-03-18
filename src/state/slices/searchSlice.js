import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  alliance: { 
    name: "", 
    includeFull: true, 
    includePrivate: true,
    startSearch: false
  }
}; 

export const searchSlice = createSlice({
  name: "search", 
  initialState, 
  reducers: { 
    replaceSearchName: (state, action) => { 
      state.alliance.name = action.payload;
      return state;
    },
    replaceIncludeFull: (state, action) => { 
      state.alliance.includeFull = action.payload;
      return state;
    },
    replaceIncludePrivate: (state, action) => { 
      state.alliance.includePrivate = action.payload;
      return state;
    },
    startAllianceSearch: (state, action) => { 
      state.alliance.startSearch = action.payload;
      return state;
    }
  }
});

export default searchSlice.reducer;
export const {replaceSearchName, replaceIncludeFull, replaceIncludePrivate, startAllianceSearch} = searchSlice.actions;
