import { configureStore } from '@reduxjs/toolkit'
import loadStateSlice from '../slices/loadStateSlice'
// ...
const store = configureStore({
  reducer: {
    loader: loadStateSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
