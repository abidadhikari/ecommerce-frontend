/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteMyOrder,
  getAllOrders,
  getOrders,
  getSalesLast30days,
  getSingleOrder,
  placeOrders,
  updateSingleOrder,
} from "./OrderAction";

const initialState: any = {
  loading: false,
  success: false,
  get_loading: false,
  get_success: false,
  update_loading: false,
  update_success: false,
  delete_loading: false,
  delete_success: false,
  myOrders: [],
  allOrders: [],
  singleOrder: {},
  sales: [],
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    clearOrderState(state) {
      state.loading = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.get_loading = true;
        state.get_success = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.get_loading = false;
        state.myOrders = action.payload.data;
        state.get_success = true;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.get_loading = false;
        state.get_success = false;
      });

    //all order
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.get_loading = true;
        state.get_success = false;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.get_loading = false;
        state.allOrders = action.payload.data;
        state.get_success = true;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.get_loading = false;
        state.get_success = false;
      });

    // get single order
    builder
      .addCase(getSingleOrder.pending, (state) => {
        state.get_loading = true;
        state.get_success = false;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.get_loading = false;
        state.singleOrder = action.payload.data;
        state.get_success = true;
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.get_loading = false;
        state.get_success = false;
      });

    // update single order
    builder
      .addCase(updateSingleOrder.pending, (state) => {
        state.update_loading = true;
        state.update_success = false;
      })
      .addCase(updateSingleOrder.fulfilled, (state, action) => {
        state.update_loading = false;
        state.singleOrder = action.payload.data;
        state.update_success = true;
      })
      .addCase(updateSingleOrder.rejected, (state, action) => {
        state.update_loading = false;
        state.update_success = false;
      });

    builder
      .addCase(placeOrders.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(placeOrders.fulfilled, (state, action) => {
        state.loading = false;
        // state.cart = action.payload.data;
        state.success = true;
      })
      .addCase(placeOrders.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      });

    // get sales data for 30 days
    builder
      .addCase(getSalesLast30days.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getSalesLast30days.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload.data;
        state.success = true;
      })
      .addCase(getSalesLast30days.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      });

    builder
      .addCase(deleteMyOrder.pending, (state) => {
        state.delete_loading = true;
        state.delete_success = false;
      })
      .addCase(deleteMyOrder.fulfilled, (state, action) => {
        state.delete_loading = false;
        state.myOrders = state.myOrders?.filter(
          (item: any) => item.id !== action.payload?.deletedOrder?.id
        );
        state.allOrders = state.allOrders?.filter(
          (item: any) => item.id !== action.payload?.deletedOrder?.id
        );
        state.delete_success = true;
      })
      .addCase(deleteMyOrder.rejected, (state, action) => {
        state.delete_loading = false;
        state.delete_success = false;
      });
  },
});
export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
