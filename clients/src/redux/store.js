import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice/userSlice";
import categorySlice from "./categorySlice/categorySlice";
import productSlice from "./productSlice/productSlice";
import cartSlice from "./cartSlice/cartSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    category: categorySlice,
    product: productSlice,
    cart: cartSlice
  },
});
