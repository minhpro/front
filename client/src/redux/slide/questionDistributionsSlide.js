import { createSlice } from "@reduxjs/toolkit";

const questionDistributionsSlide = createSlice({
  name: "questionDistributionsSlide",
  initialState: {
    total: 0,
    data: null,
  },
  reducers: {
    setQuestionDistributions(state, action) {
      const data = {
        total: 0,
        data: action.payload,
      };
      if (action.payload === null) {
        return null;
      }
      data.data.forEach((chapter) => {
        chapter.numberOfQuestions = 0;
        chapter.unitData.forEach((unit) => {
          unit.numberOfQuestions = 0;
          unit.requirements?.forEach((require) => {
            require.numberOfQuestions = 0;
          });
        });
      });
      console.log("redux", data);

      return data;
    },

    updateQuestionDistributions(state, action) {
      const { requireID, number } = action.payload;

      for (let i = 0; i < state.data.length; i++) {
        for (let j = 0; j < state.data[i].unitData.length; j++) {
          for (
            let h = 0;
            h < state.data[i].unitData[j].requirements.length;
            h++
          ) {
            if (state.data[i].unitData[j].requirements[h].id == requireID) {
              state.data[i].unitData[j].requirements[h].numberOfQuestions =
                number;
            }
          }
        }
      }
      for (let i = 0; i < state.data.length; i++) {
        for (let j = 0; j < state.data[i].unitData.length; j++) {
          state.data[i].unitData[j].numberOfQuestions = 0;
          for (
            let h = 0;
            h < state.data[i].unitData[j].requirements.length;
            h++
          ) {
            state.data[i].unitData[j].numberOfQuestions =
              state.data[i].unitData[j].numberOfQuestions +
              state.data[i].unitData[j].requirements[h].numberOfQuestions;
          }
        }
      }
      for (let i = 0; i < state.data.length; i++) {
        state.data[i].numberOfQuestions = 0;
        for (let j = 0; j < state.data[i].unitData.length; j++) {
          state.data[i].numberOfQuestions =
            state.data[i].numberOfQuestions +
            state.data[i].unitData[j].numberOfQuestions;
        }
      }
      state.total = 0;
      for (let i = 0; i < state.data.length; i++) {
        state.total = state.total + state.data[i].numberOfQuestions;
      }
    },
  },
});

export const { setQuestionDistributions, updateQuestionDistributions } =
  questionDistributionsSlide.actions;

export default questionDistributionsSlide.reducer;
