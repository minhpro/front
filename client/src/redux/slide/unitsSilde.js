import { createSlice } from "@reduxjs/toolkit";

const unitsSlide = createSlice({
  name: "unitsSlide",
  initialState: null,
  reducers: {
    setUnits(state, action) {
      return action.payload;
    },
  },
});

export const { setUnits } = unitsSlide.actions;

export default unitsSlide.reducer;
