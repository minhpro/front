import { createSlice } from "@reduxjs/toolkit";

const otherConfigSlide = createSlice({
  name: "otherConfigSlide",
  initialState: null,
  reducers: {
    setOtherConfig(state, action) {
      return action.payload;
    },
  },
});

export const { setOtherConfig } = otherConfigSlide.actions;

export default otherConfigSlide.reducer;
