import { combineReducers } from "@reduxjs/toolkit";
import uiSlice from "./Features/UI/uiSlice";
import AuthSlice from "./Features/Auth/AuthSlice";
import ProductSlice from "./Features/Product/ProductSlice";
// Example slice, you'll create this later

const rootReducer = combineReducers({
  uiSlice: uiSlice,
  authSlice: AuthSlice,
  productSlice: ProductSlice,
  // Other reducers can go here
});

export default rootReducer;
