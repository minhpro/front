import { createSlice } from "@reduxjs/toolkit";

const authSlide = createSlice({
  name: "authSlide",
  initialState: {
    loading: true,
    auth: null,
  },
  reducers: {
    setAuth(state, action) {
      const data = {
        loading: false,
        auth: action.payload,
      };

      return data;
    },
  },
});

export const { setAuth } = authSlide.actions;

export default authSlide.reducer;
