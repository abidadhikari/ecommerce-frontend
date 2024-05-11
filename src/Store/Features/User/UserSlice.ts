/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllUsers, getUsersDashStats } from "./UserAction";

const initialState: any = {
  loading: false,
  success: false,
  get_loading: false,
  get_success: false,
  delete_loading: false,
  delete_success: false,
  allUsers: [],
  stats: [],
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    clearOrderState(state) {
      state.loading = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.get_loading = true;
        state.get_success = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.get_loading = false;
        state.allUsers = action.payload.data;
        state.get_success = true;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.get_loading = false;
        state.get_success = false;
      });

    builder
      .addCase(getUsersDashStats.pending, (state) => {
        state.get_loading = true;
        state.get_success = false;
      })
      .addCase(getUsersDashStats.fulfilled, (state, action) => {
        state.get_loading = false;
        console.log(action.payload.data);
        state.stats = action.payload.data;
        state.get_success = true;
      })
      .addCase(getUsersDashStats.rejected, (state, action) => {
        state.get_loading = false;
        state.get_success = false;
      });

    // builder
    //   .addCase(deleteMyOrder.pending, (state) => {
    //     state.delete_loading = true;
    //     state.delete_success = false;
    //   })
    //   .addCase(deleteMyOrder.fulfilled, (state, action) => {
    //     state.delete_loading = false;
    //     state.myOrders = state.myOrders?.filter(
    //       (item: any) => item.id !== action.payload?.deletedOrder?.id
    //     );
    //     state.allOrders = state.allOrders?.filter(
    //       (item: any) => item.id !== action.payload?.deletedOrder?.id
    //     );
    //     state.delete_success = true;
    //   })
    //   .addCase(deleteMyOrder.rejected, (state, action) => {
    //     state.delete_loading = false;
    //     state.delete_success = false;
    //   });
  },
});
export const { clearOrderState } = userSlice.actions;
export default userSlice.reducer;
