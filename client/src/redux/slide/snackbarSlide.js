import { createSlice } from "@reduxjs/toolkit";

const snackbarSlide = createSlice({
  name: "snackbarSlide",
  initialState: {
    isOpen: false,
    message: "",
    severity: null,
  },
  reducers: {
    open(state, action) {
      const { message, severity } = action.payload;

      return {
        isOpen: true,
        message: message,
        severity: severity,
      };
    },
    close(state, action) {
      return {
        isOpen: false,
        message: "",
        severity: "",
      };
    },
  },
});

export const { open, close } = snackbarSlide.actions;

export default snackbarSlide.reducer;
