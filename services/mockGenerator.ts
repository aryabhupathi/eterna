import { Token } from "@/types/token";
const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min: number, max: number, fixed = 2) =>
  Number((Math.random() * (max - min) + min).toFixed(fixed));
const randomAddress = (seed: number) =>
  `0x${(Math.random().toString(16) + seed).replace(".", "").slice(0, 40)}`;
const randomPrice = (min: number, max: number) =>
  Number((Math.random() * (max - min) + min).toFixed(2));
const shortAddr = (addr: string) => `${addr.slice(0, 4)}…${addr.slice(-4)}`;
export function generateNewPairs(): Token[] {
  return Array.from({ length: 12 }).map((_, i) => {
    const address = randomAddress(i);
    const buyRatio = randomFloat(0.6, 0.9);
    return {
      id: `new-${i}`,
      name: `New Token ${i + 1}`,
      symbol: `N${i + 1}`,
      address,
      shortAddress: shortAddr(address),
      image: "/token-placeholder.png",
      chain: "BNB",
      price: randomPrice(1, 1000),
      marketCap: random(50_000, 250_000),
      liquidity: random(5_000, 40_000),
      volume: random(10_000, 80_000),
      txCount: random(50, 400),
      txRatio: buyRatio,
      holders: random(20, 150),
      buyRatio,
      buyTax: 2,
      sellTax: 4,
      dexListed: false,
      trending: i < 3,
      verified: false,
      age: `${random(1, 8)}m`,
      createdAt: new Date().toISOString(),
      stage: "new",
      riskScore: random(10, 30),
      statusIcons: [i < 3 ? "rocket" : "search", "shield"],
      pills: [
        {
          key: "buy",
          label: "Buy",
          value: `${Math.round(buyRatio * 100)}%`,
          color: "green",
        },
        {
          key: "sell",
          label: "Sell",
          value: `${Math.round((1 - buyRatio) * 100)}%`,
          color: "red",
        },
        { key: "tax", label: "Tax", value: "2/4", color: "yellow" },
      ],
    };
  });
}
export function generateFinalStretch(): Token[] {
  return Array.from({ length: 8 }).map((_, i) => {
    const address = randomAddress(i);
    const buyRatio = randomFloat(0.45, 0.7);
    return {
      id: `final-${i}`,
      name: `Final Token ${i + 1}`,
      symbol: `F${i + 1}`,
      address,
      shortAddress: shortAddr(address),
      image: "/token-placeholder.png",
      chain: "BNB",
      price: randomPrice(1,1000),
      marketCap: random(350_000, 900_000),
      liquidity: random(80_000, 250_000),
      volume: random(150_000, 600_000),
      txCount: random(800, 3000),
      txRatio: buyRatio,
      holders: random(300, 1200),
      buyRatio,
      buyTax: 1,
      sellTax: 3,
      dexListed: true,
      trending: i < 2,
      verified: true,
      age: `${random(30, 90)}m`,
      createdAt: new Date().toISOString(),
      stage: "final",
      riskScore: random(40, 55),
      statusIcons: ["verified", "shield"],
      pills: [
        {
          key: "buy",
          label: "Buy",
          value: `${Math.round(buyRatio * 100)}%`,
          color: "green",
        },
        {
          key: "holders",
          label: "H",
          value: `${random(300, 1200)}`,
          color: "blue",
        },
        { key: "tax", label: "Tax", value: "1/3", color: "yellow" },
      ],
    };
  });
}
export function generateMigrated(): Token[] {
  return Array.from({ length: 15 }).map((_, i) => {
    const address = randomAddress(i);
    const buyRatio = randomFloat(0.35, 0.55);
    return {
      id: `mig-${i}`,
      name: `Migrated Token ${i + 1}`,
      symbol: `M${i + 1}`,
      address,
      shortAddress: shortAddr(address),
      image: "/token-placeholder.png",
      chain: "BNB",
      price: randomPrice(1,1000),
      marketCap: random(1_200_000, 8_000_000),
      liquidity: random(300_000, 2_000_000),
      volume: random(500_000, 5_000_000),
      txCount: random(5_000, 30_000),
      txRatio: buyRatio,
      holders: random(2000, 15000),
      buyRatio,
      buyTax: 0,
      sellTax: 2,
      dexListed: true,
      trending: false,
      verified: true,
      age: `${random(3, 14)}h`,
      createdAt: new Date().toISOString(),
      stage: "migrated",
      riskScore: random(65, 85),
      statusIcons: ["verified"],
      pills: [
        {
          key: "buy",
          label: "Buy",
          value: `${Math.round(buyRatio * 100)}%`,
          color: "green",
        },
        { key: "lock", label: "Lock", value: "100%", color: "blue" },
      ],
    };
  });
}
