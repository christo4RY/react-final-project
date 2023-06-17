import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../api/auth";
import authReducer from "../slices/authSlice";
import { contactApi } from "../api/contact";
import contactSlice from "../slices/contactSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    auth: authReducer,
    contacts: contactSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, contactApi.middleware),
});

setupListeners(store.dispatch);
