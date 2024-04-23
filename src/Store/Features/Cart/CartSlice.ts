/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCart, updateCart } from "./CartAction";

const initialState: any = {
  loading: false,
  success: false,
  update_loading: false,
  update_success: false,
  cart: [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    clearCartLocal(state) {
      state.cart = [];
      console.log("CART CLEARED!!!", state.cart);
    },
  },
  extraReducers: (builder) => {
    //get single product
    //  getSingleProduct
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data;
        state.success = true;
        state.update_loading = false;
        state.update_success = false;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      });

    builder
      .addCase(updateCart.pending, (state) => {
        state.update_loading = true;
        state.update_success = false;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.update_loading = false;
        // state.cart = action.payload.data;
        state.update_success = true;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.update_loading = false;
        state.update_success = false;
      });
  },
});
export const { clearCartLocal } = cartSlice.actions;
export default cartSlice.reducer;
