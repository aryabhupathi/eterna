import { useEffect } from "react";
import { connectPriceSocket } from "@/services/priceSocket.service";
export function usePriceSocket(pairs: string[]) {
  useEffect(() => {
    connectPriceSocket(pairs);
  }, [pairs]);
}
