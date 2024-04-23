/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addProduct,
  addProductImage,
  deleteProduct,
  deleteProductImage,
  fetchAllProducts,
  fetchSingleProductDetail,
  getProductImage,
  getSingleProduct,
  searchProducts,
  updateProduct,
  updateProductImage,
} from "./ProductAction";

const initialState: any = {
  loading: false,
  success: false,
  action_loading: false,
  action_success: false,
  add_loading: false,
  add_success: false,
  singleProduct: {},
  products: [],
  searchProducts: [],
  product_image_loading: false,
  product_image_success: false,
  productImages: [],
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

    updateCart(state, action: { payload: { id: any; quantity: any } }) {
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

    //fetch all products
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.add_loading = false;
        state.add_success = false;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
      });

    //delete product
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.action_loading = true;
        state.action_success = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.action_loading = false;
        state.products = state.products.filter(
          (item: any) => item.id !== action.payload?.product?.id
        );
        state.action_success = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.action_loading = false;
        state.action_success = false;
      });

    //update product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.action_loading = true;
        state.action_success = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.action_loading = false;
        const updatedProductIndex = state.products.findIndex(
          (product: any) => product?.id === action.payload?.product?.id
        ); // Assuming each product has an `id` property
        if (updatedProductIndex !== -1) {
          state.products[updatedProductIndex] = action.payload.product;
          state.action_success = true;
        } else {
          // Handle the case where the product to update is not found
          // Maybe log an error or perform some other action
          state.action_success = false;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.action_loading = false;
        state.action_success = false;
      });

    //add product
    builder
      .addCase(addProduct.pending, (state) => {
        state.add_loading = true;
        state.add_success = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.add_loading = false;
        state.add_success = true;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.add_loading = false;
        state.add_success = false;
      });

    //get single product
    //  getSingleProduct
    builder
      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload.data;
        state.success = true;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      });

    //product images get
    builder
      .addCase(getProductImage.pending, (state) => {
        state.product_image_loading = true;
        state.product_image_success = false;
      })
      .addCase(getProductImage.fulfilled, (state, action) => {
        state.product_image_loading = false;
        state.productImages = action.payload.data;
        state.product_image_success = true;
      })
      .addCase(getProductImage.rejected, (state, action) => {
        state.product_image_loading = false;
        state.product_image_success = false;
      });

    //product image add independent
    builder
      .addCase(addProductImage.pending, (state) => {
        state.product_image_loading = true;
        state.product_image_success = false;
      })
      .addCase(addProductImage.fulfilled, (state, action) => {
        state.product_image_loading = false;
        state.productImages = [...state.productImages, action.payload.data];
        state.product_image_success = true;
      })
      .addCase(addProductImage.rejected, (state, action) => {
        state.product_image_loading = false;
        state.product_image_success = false;
      });

    //product images update
    builder
      .addCase(updateProductImage.pending, (state) => {
        state.product_image_update_loading = true;
        state.product_image_update_success = false;
      })
      .addCase(updateProductImage.fulfilled, (state, action) => {
        state.product_image_update_loading = false;
        const updatedProductIndex = state.productImages.findIndex(
          (product: any) => product?.id === action.payload?.data?.id
        ); // Assuming each product has an `id` property
        console.log("Update id", updatedProductIndex);
        if (updatedProductIndex !== -1) {
          state.productImages[updatedProductIndex] = action.payload.data;
          state.product_image_update_success = true;
        } else {
          // Handle the case where the product to update is not found
          // Maybe log an error or perform some other action
          state.product_image_update_success = false;
        }
      })
      .addCase(updateProductImage.rejected, (state, action) => {
        state.product_image_update_loading = false;
        state.product_image_update_success = false;
      });

    //product images delete
    builder
      .addCase(deleteProductImage.pending, (state) => {
        state.product_image_update_loading = true;
        state.product_image_update_success = false;
      })
      .addCase(deleteProductImage.fulfilled, (state, action) => {
        state.product_image_update_loading = false;
        state.productImages = state.productImages.filter(
          (item: any) => item.id !== action.payload?.data?.id
        );
        state.product_image_update_success = true;
      })
      .addCase(deleteProductImage.rejected, (state, action) => {
        state.product_image_update_loading = false;
        state.product_image_update_success = false;
      });

    // search
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchProducts = action.payload.data;
        state.success = true;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      });
  },
});
export const { addToCart, updateCart } = productSlice.actions;
export default productSlice.reducer;
