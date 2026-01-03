import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";

// Configuring store using Redux and RTK with the created slice
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
