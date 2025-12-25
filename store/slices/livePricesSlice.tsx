import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type LivePricesState = Record<string, number>;
const initialState: LivePricesState = {};
const livePricesSlice = createSlice({
  name: "livePrices",
  initialState,
  reducers: {
    updatePrice(state, action: PayloadAction<{ id: string; price: number }>) {
      state[action.payload.id] = action.payload.price;
    },
  },
});
export const { updatePrice } = livePricesSlice.actions;
export default livePricesSlice.reducer;
