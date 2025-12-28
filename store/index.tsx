import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./slices/tokenSlice";
import livePricesReducer from "./slices/livePricesSlice";
export const store = configureStore({
  reducer: {
    token: tokenReducer,
    livePrices: livePricesReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
