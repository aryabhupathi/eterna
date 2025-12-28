import { Token } from "@/types/token";
export function applyMarketTick(token: Token, tick: any): Token {
  return {
    ...token,
    price: tick.price,
    volume: token.volume + tick.volumeDelta,
    marketCap: tick.price * 1_000_000,
    txCount: token.txCount + tick.txDelta,
    buyRatio: Math.min(
      0.95,
      Math.max(0.05, token.buyRatio + tick.buyRatioDelta)
    ),
  };
}
