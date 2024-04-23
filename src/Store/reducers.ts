import { combineReducers } from "@reduxjs/toolkit";
import uiSlice from "./Features/UI/uiSlice";
import AuthSlice from "./Features/Auth/AuthSlice";
import ProductSlice from "./Features/Product/ProductSlice";
import CategorySlice from "./Features/Category/CategorySlice";
// Example slice, you'll create this later

const rootReducer = combineReducers({
  uiSlice: uiSlice,
  authSlice: AuthSlice,
  productSlice: ProductSlice,
  categorySlice: CategorySlice,
  // Other reducers can go here
});

export default rootReducer;
