import { createSlice } from "@reduxjs/toolkit";

const citySlice = createSlice({
  name: "City Details",
  initialState: {
    city: [],
  },
  reducers: {
    addCity: (state, action) => {
      let a = 0;
      state.city.map((city) => {
        if (city.longitude === action.payload.longitude) {
          a = 1;
          return;
        }
        return;
      });
      if (a === 0) {
        state.city.push(action.payload);
      }
    },
    removeCity: (state, action) => {
      state.city = state.city.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addCity, removeCity } = citySlice.actions;
export default citySlice.reducer;
