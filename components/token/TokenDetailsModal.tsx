"use client";
import { Token } from "@/types/token";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
export function TokenDetailsModal({
  token,
  open,
  onOpenChange,
}: {
  token: Token;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{token.symbol}</DialogTitle>
        </DialogHeader>
        <div className="text-sm space-y-2">
          <div>Price: ${token.price}</div>
          <div>Volume: ${token.volume24h}</div>
          <div>Liquidity: ${token.liquidity}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
