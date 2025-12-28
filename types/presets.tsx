import { Token } from "./token";

export const PRESETS = {
  P1: (t:Token) =>
    t.marketCap < 300_000 &&
    t.liquidity < 50_000 &&
    t.riskScore <= 35,

  P2: (t:Token) =>
    t.marketCap >= 300_000 &&
    t.marketCap < 1_000_000 &&
    t.liquidity >= 50_000 &&
    t.liquidity < 300_000 &&
    t.riskScore > 35 &&
    t.riskScore <= 60,

  P3: (t:Token) =>
    t.marketCap >= 1_000_000 &&
    t.liquidity >= 300_000 &&
    t.riskScore > 60,
};
export type PresetKey = keyof typeof PRESETS;