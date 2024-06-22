import { configureStore } from "@reduxjs/toolkit";
import loadStateSlice from "../slices/loadStateSlice";
import productSlice from "../slices/productSlice";
import authSlice from "../slices/authSlice";
import { productsAPI } from "../services/productQuery";
// ...
const store = configureStore({
  reducer: {
    requestLoader: loadStateSlice.reducer,
    product: productSlice.reducer,
    auth: authSlice.reducer,
    [productsAPI.reducerPath]: productsAPI.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
