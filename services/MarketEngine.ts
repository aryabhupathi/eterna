export type MarketTick = {
  id: string;
  price: number;
  volumeDelta: number;
  txDelta: number;
  buyRatioDelta: number;
};
export function generateMarketTick(
  tokenId: string,
  lastPrice: number
): MarketTick {
  const volatility = 0.003;
  const changePct = (Math.random() - 0.5) * volatility;
  const price = Math.max(0.0000001, lastPrice * (1 + changePct));
  return {
    id: tokenId,
    price,
    volumeDelta: Math.abs(price - lastPrice) * (800 + Math.random() * 1200),
    txDelta: Math.random() > 0.6 ? 1 : 0,
    buyRatioDelta: (Math.random() - 0.5) * 0.015,
  };
}
