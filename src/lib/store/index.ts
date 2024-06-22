import { configureStore } from '@reduxjs/toolkit'
import loadStateSlice from '../slices/loadStateSlice'
import productSlice from '../slices/productSlice'
import authSlice from '../slices/authSlice'
// ...
const store = configureStore({
  reducer: {
    requestLoader: loadStateSlice.reducer,
    product:productSlice.reducer,
    auth:authSlice.reducer
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>


export default store
