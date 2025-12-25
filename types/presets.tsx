import { Token } from "@/types/token";
export type PresetKey = "P1" | "P2" | "P3";
export const PRESETS: Record<PresetKey, (t: Token) => boolean> = {
  P1: (t) =>
    t.marketCap < 1_500_000 && t.volume24h > 5_000 && t.liquidity > 2_000,
  P2: (t) => t.marketCap < 3_000_000 && t.volume24h > 10_000,
  P3: () => true,
};
