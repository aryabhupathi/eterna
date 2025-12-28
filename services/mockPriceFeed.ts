export function startMockPriceFeed(
  startPrice: number,
  onTick: (price: number) => void
) {
  let price = startPrice;
  const interval = setInterval(() => {
    price += price * (Math.random() * 0.002 - 0.001);
    onTick(Number(price.toFixed(5)));
  }, 700);
  return () => clearInterval(interval);
}
