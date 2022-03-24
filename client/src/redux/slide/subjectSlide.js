import { createSlice } from "@reduxjs/toolkit";

const subjectSlide = createSlice({
  name: "subjectSlide",
  initialState: null,
  reducers: {
    setSubject(state, action) {
      return action.payload;
    },
  },
});

export const { setSubject } = subjectSlide.actions;

export default subjectSlide.reducer;
