import { createSlice } from "@reduxjs/toolkit";

const addButtonSlice = createSlice({
  name: "Button Status",
  initialState: {
    buttonStatus: false,
  },
  reducers: {
    onclick: (state) => {
      state.buttonStatus = !state.buttonStatus;
    },
  },
});

export const { onclick } = addButtonSlice.actions;
export default addButtonSlice.reducer;
