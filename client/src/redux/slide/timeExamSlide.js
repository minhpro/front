import { createSlice } from "@reduxjs/toolkit";

const timeExamSlide = createSlice({
  name: "timeExamSlide",
  initialState: null,
  reducers: {
    setTimeExam(state, action) {
      return action.payload;
    },
  },
});

export const { setTimeExam } = timeExamSlide.actions;

export default timeExamSlide.reducer;
