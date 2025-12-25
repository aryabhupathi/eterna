import { configureStore } from "@reduxjs/toolkit";
import livePricesSlice from "./slices/livePricesSlice";
export const store = configureStore({
  reducer: {
    livePrices: livePricesSlice,
  },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;