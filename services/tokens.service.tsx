import { Token, TokenStage } from "@/types/token";
const randomAge = () => {
  const m = Math.floor(Math.random() * 60);
  return m < 60 ? `${m}m` : `${Math.floor(m / 60)}h`;
};
export async function fetchTokensByStage(stage: TokenStage): Promise<Token[]> {
  await new Promise((res) => setTimeout(res, 600));
  return Array.from({ length: 10 }).map((_, i) => {
    const isP1 = i < 4;
    const isP2 = i >= 4 && i < 7;
    return {
      id: `${stage}-${i}`,
      name: `Token ${i + 1}`,
      symbol: `T${i + 1}`,
      address: `0x${Math.random().toString(16).slice(2, 10)}...${i}`,
      image: "/token-placeholder.png",
      marketCap: isP1 ? 300_000 : isP2 ? 800_000 : 1_800_000,
      volume: isP1 ? 400_000 : 120_000,
      liquidity: isP1 ? 120_000 : 40_000,
      txCount: Math.floor(Math.random() * 2000),
      holders: Math.floor(Math.random() * 1000),
      buyRatio: isP1 ? 0.75 : 0.45,
      buyTax: 2,
      sellTax: 4,
      dexListed: true,
      age: randomAge(),
      createdAt: new Date(Date.now() - Math.random() * 3_600_000),
      stage,
      trending: isP1,
      riskScore: isP1 ? 18 : 55,
    };
  });
}
