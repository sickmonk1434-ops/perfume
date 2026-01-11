"use client";

import { useCart } from "./cart-context";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CartIndicator() {
    const { items, setIsOpen } = useCart();
    const count = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <Button
            variant="ghost"
            className="text-white hover:text-[#D4AF37] relative"
            onClick={() => setIsOpen(true)}
        >
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && (
                <span className="absolute top-1 right-1 h-3 w-3 bg-[#D4AF37] text-black text-[9px] flex items-center justify-center rounded-full font-bold">
                    {count}
                </span>
            )}
        </Button>
    );
}
