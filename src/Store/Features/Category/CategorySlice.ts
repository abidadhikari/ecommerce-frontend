/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addCategory,
  deleteCategory,
  fetchAllCategories,
  updateCategory,
} from "./CategoryAction";

const initialState: any = {
  loading: false,
  success: false,
  categories: [],
};

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    resetCategoryStates(state) {
      state.loading = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const indexOf = state.categories.findIndex(
          (item: any) => item.id === action.payload?.category?.id
        );
        if (indexOf !== -1) {
          state.categories[indexOf] = action.payload?.category;
          state.success = true;
        } else {
          state.success = false;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      });

    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        // const tempCat = state.categories.push(action.payload.data);
        // state.categories = tempCat;
        console.log(action.payload);
        if (action?.payload?.success) {
          const temp = [action.payload.data, ...state.categories];
          state.categories = temp;
          state.success = true;
        } else {
          state.loading = false;
          state.success = false;
        }
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      });

    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        const temp = state.categories.filter(
          (item: any) => item.id !== action.payload?.category?.id
        );
        state.categories = temp;
        state.success = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      });
  },
});
export const { resetCategoryStates } = categorySlice.actions;
export default categorySlice.reducer;
