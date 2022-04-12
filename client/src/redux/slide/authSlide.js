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

    logOut(state, action) {
      state.loading = true;
    },
  },
});

export const { setAuth, logOut } = authSlide.actions;

export default authSlide.reducer;
