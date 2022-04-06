import { createSlice } from "@reduxjs/toolkit";

const checkingSlice = createSlice({
  name: "checkingSlice",
  initialState: {
    testKitId: null,
    multiChoiceQuestions: [],
    constructedResponseQuestions: [],
  },
  reducers: {
    setTestKitId(state, action) {
      const data = state;
      data.testKitId = parseInt(action.payload);
      return data;
    },
    request(state, action) {
      const data = state;

      const { type, id, answer } = action.payload;

      const answerData = {
        questionId: id,
        answer: answer,
      };

      function checkID(a) {
        return a.questionId !== id;
      }

      if (type === "constructedResponseQuestions") {
        let dataNew = data.constructedResponseQuestions.filter(checkID);

        data.constructedResponseQuestions = dataNew;
        console.log(dataNew);
        data.constructedResponseQuestions.push(answerData);
      } else {
        let dataNew = data.multiChoiceQuestions.filter(checkID);
        data.multiChoiceQuestions = dataNew;
        data.multiChoiceQuestions.push(answerData);
      }
      return data;
    },
  },
});

export const { setTestKitId, request } = checkingSlice.actions;

export default checkingSlice.reducer;
