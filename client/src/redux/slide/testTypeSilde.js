import { createSlice } from "@reduxjs/toolkit";

const testTypeSlide = createSlice({
  name: "testTypeSlide",
  initialState: null,
  reducers: {
    setTestType(state, action) {
      return action.payload;
    },
  },
});

export const { setTestType } = testTypeSlide.actions;

export default testTypeSlide.reducer;
