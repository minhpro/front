import { createSlice } from "@reduxjs/toolkit";

const classNameSlide = createSlice({
  name: "classNameSlide",
  initialState: null,
  reducers: {
    setClassName(state, action) {
      return action.payload;
    },
  },
});

export const { setClassName } = classNameSlide.actions;

export default classNameSlide.reducer;
