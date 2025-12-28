import { Token, TokenStage } from "@/types/token";
import { getTokensByStage, getTokenBySymbol } from "./mockStore";
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
export async function fetchTokensByStage(stage: TokenStage): Promise<Token[]> {
  await delay(500);
  return getTokensByStage(stage);
}
export async function fetchTokenDetails(id: string): Promise<Token | null> {
  await delay(400);
  return getTokenBySymbol(id) ?? null;
}
