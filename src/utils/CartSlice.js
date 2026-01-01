import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    search: "",
  },
  reducers: {
    addToCart(state, action) {
      const item = state.items.find((i) => i.id === action.payload.id);

      if (item) {
        item.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      item.quantity++;
    },
    decreaseQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item.quantity > 1) item.quantity--;
    },
    clearCart(state) {
      state.items = [];
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
  setSearch,
} = cartSlice.actions;

export default cartSlice.reducer;
