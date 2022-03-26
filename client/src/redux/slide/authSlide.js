import { createSlice } from "@reduxjs/toolkit";

const authSlide = createSlice({
  name: "authSlide",
  initialState: {
    loading: true,
    auth: null,
  },
  reducers: {
    setChapter(state, action) {
      return action.payload;
    },
  },
});

export const { setChapter } = authSlide.actions;

export default authSlide.reducer;
