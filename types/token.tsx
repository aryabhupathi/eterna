export type Token = {
  price: number;
  createdAt: string;
  id: string;
  name: string;
  symbol: string;
  address: string;
  image: string;
  marketCap: number;
  volume: number;
  liquidity: number;
  txCount: number;
  holders: number;
  buyRatio: number;
  buyTax: number;
  sellTax: number;
  dexListed: boolean;
  age: string;
  stage: TokenStage;
  trending: boolean;
  riskScore: number;
};
export type TokenStage = "new" | "final" | "migrated";
export type TradeBubble = {
  id: string;
  side: "buy" | "sell";
  price: number;
  time: number;
};
