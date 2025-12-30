import { Token } from "@/types/token";
const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min: number, max: number, fixed = 2) =>
  Number((Math.random() * (max - min) + min).toFixed(fixed));
const randomAddress = (seed: number) =>
  `0x${(Math.random().toString(16) + seed).replace(".", "").slice(0, 40)}`;
const randomPrice = (min: number, max: number) =>
  Number((Math.random() * (max - min) + min).toFixed(6));
export function generateNewPairs(): Token[] {
  return Array.from({ length: 12 }).map((_, i) => ({
    id: `new-${i}`,
    name: `New Token ${i + 1}`,
    symbol: `N${i + 1}`,
    address: randomAddress(i),
    price: randomPrice(0.00001, 0.01),
    image: "",
    marketCap: random(50_000, 250_000),
    liquidity: random(5_000, 40_000),
    volume: random(10_000, 80_000),
    riskScore: random(10, 30),
    txCount: random(50, 400),
    holders: random(20, 150),
    buyRatio: randomFloat(0.6, 0.9),
    buyTax: 2,
    sellTax: 4,
    dexListed: false,
    age: `${random(1, 8)}m`,
    createdAt: new Date().toISOString(),
    stage: "new",
    trending: i < 3,
  }));
}
export function generateFinalStretch(): Token[] {
  return Array.from({ length: 8 }).map((_, i) => ({
    id: `final-${i}`,
    name: `Final Token ${i + 1}`,
    symbol: `F${i + 1}`,
    address: randomAddress(i),
    price: randomPrice(0.00001, 0.01),
    image: "",
    marketCap: random(350_000, 900_000),
    liquidity: random(80_000, 250_000),
    volume: random(150_000, 600_000),
    riskScore: random(40, 55),
    txCount: random(800, 3000),
    holders: random(300, 1200),
    buyRatio: randomFloat(0.45, 0.7),
    buyTax: 1,
    sellTax: 3,
    dexListed: true,
    age: `${random(30, 90)}m`,
    createdAt: new Date().toISOString(),
    stage: "final",
    trending: i < 2,
  }));
}
export function generateMigrated(): Token[] {
  return Array.from({ length: 15 }).map((_, i) => ({
    id: `mig-${i}`,
    name: `Migrated Token ${i + 1}`,
    symbol: `M${i + 1}`,
    address: randomAddress(i),
    price: randomPrice(0.00001, 0.01),
    image: "",
    marketCap: random(1_200_000, 8_000_000),
    liquidity: random(300_000, 2_000_000),
    volume: random(500_000, 5_000_000),
    riskScore: random(65, 85),
    txCount: random(5000, 30000),
    holders: random(2000, 15000),
    buyRatio: randomFloat(0.35, 0.55),
    buyTax: 0,
    sellTax: 2,
    dexListed: true,
    age: `${random(3, 14)}h`,
    createdAt: new Date().toISOString(),
    stage: "migrated",
    trending: false,
  }));
}
