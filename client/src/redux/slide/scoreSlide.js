import { createSlice } from "@reduxjs/toolkit";

const scoreSlide = createSlice({
  name: "scoreSlide",
  initialState: null,
  reducers: {
    setScore(state, action) {
      return action.payload;
    },
  },
});

export const { setScore } = scoreSlide.actions;

export default scoreSlide.reducer;
