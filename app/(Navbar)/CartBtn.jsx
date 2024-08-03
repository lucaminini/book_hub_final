import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const CartBtn = ({ cart }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-full">
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Carrello</h4>
            <p className="text-sm text-muted-foreground">
              Visualizza informazioni sul carrello
            </p>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg">{cart?.size || 0} Libri</span>
            <span className="text-info">
              Totale:{" "}
              {cart?.subtotal.toLocaleString("it", {
                style: "currency",
                currency: "eur",
              }) || "0,00 €"}
            </span>
          </div>
          <Button asChild>
            <Link href="/profile/cart">
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span>Mostra</span>
            </Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CartBtn;
