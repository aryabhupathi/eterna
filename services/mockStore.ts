import { Token } from "@/types/token";
import {
  generateNewPairs,
  generateFinalStretch,
  generateMigrated,
} from "./mockGenerator";
const ALL_TOKENS: Token[] = [
  ...generateNewPairs(),
  ...generateFinalStretch(),
  ...generateMigrated(),
];
const TOKEN_BY_SYMBOL = new Map(ALL_TOKENS.map((t) => [t.symbol, t]));
export function getTokensByStage(stage: Token["stage"]): Token[] {
  return ALL_TOKENS.filter((t) => t.stage === stage);
}
export function getTokenBySymbol(symbol: string): Token | undefined {
  return TOKEN_BY_SYMBOL.get(symbol);
}
