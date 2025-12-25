import { Token } from "@/types/token";
type PriceUpdate = {
  id: string;
  price: number;
};
let interval: NodeJS.Timeout | null = null;
export function startPriceFeed(
  tokens: Token[],
  onUpdate: (update: PriceUpdate) => void
) {
  if (interval) return;
  interval = setInterval(() => {
    const token = tokens[Math.floor(Math.random() * tokens.length)];
    const delta = token.price * (Math.random() * 0.01 - 0.005);
    onUpdate({
      id: token.id,
      price: Number((token.price + delta).toFixed(4)),
    });
  }, 800);
}
export function stopPriceFeed() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}
