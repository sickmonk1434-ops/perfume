"use client";

import { useCart } from "./cart-context";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CartSidebar() {
    const { items, removeItem, updateQuantity, total, isOpen, setIsOpen } = useCart();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <div className="relative w-full max-w-md bg-[#0a0a0a] border-l border-white/10 h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <h2 className="text-xl font-heading font-bold flex items-center">
                        <ShoppingBag className="w-5 h-5 mr-2 text-[#D4AF37]" /> Your Cart
                    </h2>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                            <ShoppingBag className="w-12 h-12 opacity-20" />
                            <p>Your cart is empty.</p>
                            <Button variant="outline" onClick={() => setIsOpen(false)} className="text-[#D4AF37] border-[#D4AF37]/50">
                                Continue Shopping
                            </Button>
                        </div>
                    ) : (
                        items.map(({ product, quantity }) => (
                            <div key={product.id} className="flex gap-4 p-3 bg-white/5 rounded-lg border border-white/5 animate-in slide-in-from-bottom-2">
                                <div className="relative w-20 h-20 bg-gray-800 rounded-md overflow-hidden shrink-0">
                                    <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-white leading-tight">{product.name}</h3>
                                        <p className="text-sm text-[#D4AF37]">₹{product.sale_price}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 bg-black/40 rounded px-2 py-1">
                                            <button onClick={() => updateQuantity(product.id, quantity - 1)} className="hover:text-white text-gray-400">
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-xs font-mono min-w-[1rem] text-center">{quantity}</span>
                                            <button onClick={() => updateQuantity(product.id, quantity + 1)} className="hover:text-white text-gray-400">
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <button onClick={() => removeItem(product.id)} className="text-xs text-red-500 hover:text-red-400">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-6 border-t border-white/10 space-y-4 bg-white/5">
                        <div className="flex justify-between items-center text-lg font-bold">
                            <span>Total</span>
                            <span className="text-[#D4AF37]">₹{total.toFixed(2)}</span>
                        </div>
                        <Link href="/checkout" onClick={() => setIsOpen(false)} className="block w-full">
                            <Button className="w-full bg-[#D4AF37] text-black hover:bg-[#F3E5AB] font-bold py-6">
                                Proceed to Checkout
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
