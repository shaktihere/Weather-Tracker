import { configureStore } from "@reduxjs/toolkit";
import addButtonSlice from "./addButtonSlice";
import citySlice from "./citySlice";

const Store = configureStore({
  reducer: {
    addButton: addButtonSlice,
    cityDetail: citySlice,
  },
});

export default Store;
