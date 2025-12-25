

export type TokenStage = "new" | "final" | "migrated";

export type Token = {
  createdAt: Date;


  id: string;
  name: string;
  symbol: string;
  address: string;
  image: string;

  marketCap: number;      // USD
  volume: number;         // 24h volume USD
  liquidity: number;      // USD

  txCount: number;
  holders: number;

  buyRatio: number;       // 0 → 1
  buyTax: number;         // %
  sellTax: number;        // %

  dexListed: boolean;

  age: string;            // "2m", "1h"
  stage: TokenStage;

  trending: boolean;
  riskScore: number;      // 0 (safe) → 100 (danger)
};

export type TradeBubble = {
  id: string;
  side: "buy" | "sell";
  price: number;
  time: number;
};
