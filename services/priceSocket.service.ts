import { store } from "@/store";
import { updatePrice } from "@/store/slices/livePricesSlice";
let socket: WebSocket | null = null;
export function connectPriceSocket(pairs: string[]) {
  if (socket) return;
  const streams = pairs.map((p) => `${p.toLowerCase()}@trade`).join("/");
  socket = new WebSocket(
    `wss://stream.binance.com:9443/stream?streams=${streams}`
  );
  socket.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    const data = msg.data;
    const price = Number(data.p);
    const symbol = data.s.replace("USDT", "");
    store.dispatch(
      updatePrice({
        id: symbol,
        price,
      })
    );
  };
  socket.onerror = () => {
    console.warn("Price socket error");
  };
}
