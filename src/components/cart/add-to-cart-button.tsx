"use client";

import { useCart } from "./cart-context";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/actions";
import { ShoppingBag } from "lucide-react";

export function AddToCartButton({ product }: { product: Product }) {
    const { addItem } = useCart();

    return (
        <Button
            size="sm"
            className="bg-white text-black hover:bg-gray-200 transition-transform active:scale-95"
            onClick={() => addItem(product)}
        >
            Add to Cart
        </Button>
    );
}
