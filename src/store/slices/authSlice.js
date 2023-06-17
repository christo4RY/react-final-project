import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { useEffect } from "react";

const initialState = {
  user: null,
  token: null,
};
export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    addAuth: (state, { payload: { user, token } }) => {
      {
        (state.user = user), (state.token = token);
        Cookies.set("user", JSON.stringify(user));
        Cookies.set("token", JSON.stringify(token));
      }
    },
    getAuth: (state) => {
      const user = JSON.parse(Cookies.get("user"));
      const token = JSON.parse(Cookies.get("token"));
      {
        (state.user = user), (state.token = token);
      }
    },
    removeAuth: (state) => {
      {
        (state.user = null), (state.token = null);
        Cookies.remove("user");
        Cookies.remove("token");
      }
    },
  },
});

export const { addAuth, getAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
