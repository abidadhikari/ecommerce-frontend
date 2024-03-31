/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSingleProductDetail } from "./ProductAction";

const initialState: any = {
  loading: false,
  singleProduct: {},
  cart: [],
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    addToCart(state, action: any | undefined) {
      const newItem = action.payload;
      const existingItem = state.cart.find(
        (item: any) => item.id === newItem.id
      );

      if (existingItem) {
        // If the item already exists in the cart, update its quantity
        state.cart = state.cart.map((item: any) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If the item doesn't exist in the cart, add it
        state.cart = [...state.cart, { ...newItem, quantity: 1 }];
      }
    },

    updateCart(state, action: any | undefined) {
      const { id, quantity } = action.payload;
      const index = state.cart.findIndex((item: any) => item.id === id);
      if (quantity !== 0) {
        if (index !== -1) {
          state.cart = [
            ...state.cart.slice(0, index),
            { ...state.cart[index], quantity }, // Update the quantity of the item
            ...state.cart.slice(index + 1),
          ];
        }
      } else {
        state.cart = state.cart.filter((e: any) => {
          return e.id !== id;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProductDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProductDetail.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export const { addToCart, updateCart } = productSlice.actions;
export default productSlice.reducer;
