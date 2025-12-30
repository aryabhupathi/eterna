import { Token } from "@/types/token";
type PriceUpdate = {
  id: string;
  price: number;
};
let interval: NodeJS.Timeout | null = null;
const prices = new Map<string, number>();
const BASE_PRICE = 6000;
const MAX_TICK = 50;
export function startPriceFeed(
  tokens: Token[],
  onUpdate: (u: PriceUpdate) => void
) {
  if (interval || tokens.length === 0) return;
  prices.clear();
  tokens.forEach((t) => {
    prices.set(t.id, BASE_PRICE + Math.floor(Math.random() * 200));
  });
  interval = setInterval(() => {
    const entries = [...prices.entries()];
    const [id, last] = entries[Math.floor(Math.random() * entries.length)];
    const delta = Math.floor(Math.random() * MAX_TICK * 2) - MAX_TICK;
    let next = last + delta;
    if (next < 100) next = 100;
    prices.set(id, next);
    onUpdate({ id, price: next });
  }, 700);
}
export function stopPriceFeed() {
  if (interval) clearInterval(interval);
  interval = null;
  prices.clear();
}
