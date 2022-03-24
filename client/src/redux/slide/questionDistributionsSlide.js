import { createSlice } from "@reduxjs/toolkit";

const questionDistributionsSlide = createSlice({
  name: "questionDistributionsSlide",
  initialState: null,
  reducers: {
    setQuestionDistributions(state, action) {
      const data = action.payload;
      data.forEach((chapter) => {
        chapter.numberOfQuestions = 0;
        chapter.unitData.forEach((unit) => (unit.numberOfQuestions = 0));
      });

      return data;
    },

    updateQuestionDistributions(state, action) {
      const { unitId, number } = action.payload;
      state.forEach((chapter) => {
        chapter.numberOfQuestions = 0;
        chapter.unitData.forEach((unit) => {
          if (unit.id === unitId) {
            unit.numberOfQuestions = number;
          }
        });
      });
      state.forEach((chapter) => {
        chapter.unitData.forEach((unit) => {
          chapter.numberOfQuestions =
            chapter.numberOfQuestions + unit.numberOfQuestions;
        });
      });
    },
  },
});

export const { setQuestionDistributions, updateQuestionDistributions } =
  questionDistributionsSlide.actions;

export default questionDistributionsSlide.reducer;
