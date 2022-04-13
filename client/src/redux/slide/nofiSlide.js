import { createSlice } from "@reduxjs/toolkit";

const nofiSlide = createSlice({
  name: "nofiSlide",
  initialState: 1,
  reducers: {
    setNofi(state, action) {
      return action.payload;
    },
  },
});

export const { setNofi } = nofiSlide.actions;

export default nofiSlide.reducer;
