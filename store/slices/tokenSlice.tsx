import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token } from "@/types/token";
import { RootState } from "@/store";
interface TokensState {
  tokens: Record<string, Token>;
  lastPrice: Record<string, number>;
}
const initialState: TokensState = {
  tokens: {},
  lastPrice: {},
};
const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    upsertTokens(state, action: PayloadAction<Token[]>) {
      action.payload.forEach((t) => {
        const prev = state.tokens[t.id];
        const price =
          typeof t.price === "number" ? t.price : prev?.price ?? 6000;
        state.tokens[t.id] = {
          ...prev,
          ...t,
          price,
          volume: prev?.volume ?? 0,
          txCount: prev?.txCount ?? 0,
          marketCap: price * 10_000, // SAFE
        };
        state.lastPrice[t.id] = price;
      });
    },
    updatePrice(state, action: PayloadAction<{ id: string; price: number }>) {
      const token = state.tokens[action.payload.id];
      if (!token) return;
      const prev = token.price;
      token.price = action.payload.price;
      state.lastPrice[token.id] = prev;
      token.marketCap = token.price * 10_000;
      token.volume += Math.abs(token.price - prev);
      token.txCount += Math.random() > 0.7 ? 1 : 0;
    },
  },
});
export const selectAllTokens = (s: RootState) => Object.values(s.token.tokens);
export const selectTokenById = (id: string) => (s: RootState) =>
  s.token.tokens[id];
export const { upsertTokens, updatePrice } = tokenSlice.actions;
export default tokenSlice.reducer;
