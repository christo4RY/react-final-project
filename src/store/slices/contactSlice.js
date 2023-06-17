import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: null,
};
export const contactSlice = createSlice({
  name: "contactSlice",
  initialState,
  reducers: {
    addContacts: (state, { payload }) => {
      console.log(payload);
    },
  },
});

export const { addContacts } = contactSlice.actions;
export default contactSlice.reducer;
