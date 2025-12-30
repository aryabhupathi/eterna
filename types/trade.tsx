export type TradeSide = "buy" | "sell";
export type Trade = {
  time: string;
  id: string;
  side: TradeSide;
  price: number;
  amount: number;
  total: number;
  timestamp: number;
  wallet: string;
};
