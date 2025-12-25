import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token } from "@/types/token";
interface TokensState {
  tokens: Record<string, Token>;
  lastPrice: Record<string, number>;
}
const initialState: TokensState = {
  tokens: {},
  lastPrice: {},
};
const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    upsertTokens(state, action: PayloadAction<Token[]>) {
      action.payload.forEach((t) => {
        state.tokens[t.id] = t;
        state.lastPrice[t.id] = t.price;
      });
    },
    updatePrice(state, action: PayloadAction<{ id: string; price: number }>) {
      const token = state.tokens[action.payload.id];
      if (!token) return;
      state.lastPrice[action.payload.id] = token.price;
      token.price = action.payload.price;
    },
  },
});
export const { upsertTokens, updatePrice } = tokensSlice.actions;
export default tokensSlice.reducer;
