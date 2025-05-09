import { createSlice } from "@reduxjs/toolkit";

const initialLoginStatus = !!localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: initialLoginStatus },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("id");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
