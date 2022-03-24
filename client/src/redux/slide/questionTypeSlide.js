import { createSlice } from "@reduxjs/toolkit";

const questionTypeSlide = createSlice({
  name: "questionTypeSlide",
  initialState: null,
  reducers: {
    setQuestionType(state, action) {
      return action.payload;
    },
  },
});

export const { setQuestionType } = questionTypeSlide.actions;

export default questionTypeSlide.reducer;
