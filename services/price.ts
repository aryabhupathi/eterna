export const PRICE_SCALE = 100; // cents
export function toDisplayPrice(p: number) {
  return (p / PRICE_SCALE).toFixed(2);
}
export function toDisplayInt(p: number) {
  return Math.round(p / PRICE_SCALE);
}
