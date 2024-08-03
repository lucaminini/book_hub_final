"use client";

import { Button } from "@/components/ui/button";
import { Check, Loader2, ShoppingCart } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function AddToCartBtn({ bookAlreadyInCart }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending || bookAlreadyInCart}>
      {pending ? (
        <Loader2 size={16} className="animate-spin mr-2" />
      ) : bookAlreadyInCart ? (
        <Check className="mr-2 size-4" />
      ) : (
        <ShoppingCart className="mr-2 size-4" />
      )}
      Aggiungi al carrello
    </Button>
  );
}
