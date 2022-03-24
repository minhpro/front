import { createSlice } from "@reduxjs/toolkit";

const chapterSlide = createSlice({
  name: "chapterSlide",
  initialState: null,
  reducers: {
    setChapter(state, action) {
      return action.payload;
    },
  },
});

export const { setChapter } = chapterSlide.actions;

export default chapterSlide.reducer;
