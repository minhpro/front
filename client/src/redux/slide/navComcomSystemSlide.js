import { createSlice } from "@reduxjs/toolkit";

const navComcomSystemSlide = createSlice({
  name: "navComcomSystemSlide",
  initialState: 0,
  reducers: {
    setNav(state, action) {
      return action.payload;
    },
  },
});

export const { setNav } = navComcomSystemSlide.actions;

export default navComcomSystemSlide.reducer;
