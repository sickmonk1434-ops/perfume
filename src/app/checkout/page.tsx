"use client";

import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createOrder } from "@/lib/checkout-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-32 container mx-auto px-6 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <Button onClick={() => router.push("/")} className="bg-[#D4AF37] text-black">
                    Continue Shopping
                </Button>
            </div>
        );
    }

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            const result = await createOrder(formData, items, total);
            if (result.success) {
                clearCart();
                router.push(`/checkout/success/${result.orderId}`);
            } else {
                alert("Failed to place order. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 container mx-auto px-6 max-w-6xl">
            <h1 className="text-3xl font-heading font-bold text-[#D4AF37] mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Form */}
                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h2 className="text-xl font-bold mb-4 text-white">Shipping Details</h2>
                        <form action={handleSubmit} className="space-y-4" id="checkout-form">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" name="name" required placeholder="John Doe" className="bg-black/20" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" required placeholder="john@example.com" className="bg-black/20" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" name="phone" required placeholder="+91 98765..." className="bg-black/20" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="addressLine1">Address Line 1</Label>
                                <Input id="addressLine1" name="addressLine1" required placeholder="Flat / House No. / Street" className="bg-black/20" />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" name="city" required placeholder="Mumbai" className="bg-black/20" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state">State</Label>
                                    <Input id="state" name="state" required placeholder="Maharashtra" className="bg-black/20" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="pin">PIN Code</Label>
                                    <Input id="pin" name="pin" required placeholder="400001" className="bg-black/20" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right: Order Summary */}
                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h2 className="text-xl font-bold mb-4 text-white">Order Summary</h2>
                        <div className="space-y-4 mb-6">
                            {items.map((item) => (
                                <div key={item.product.id} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-400">{item.quantity}x</span>
                                        <span>{item.product.name}</span>
                                    </div>
                                    <span>₹{(item.product.sale_price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-white/10 pt-4 flex justify-between items-center text-lg font-bold">
                            <span>Total To Pay</span>
                            <span className="text-[#D4AF37]">₹{total.toFixed(2)}</span>
                        </div>

                        <Button
                            type="submit"
                            form="checkout-form"
                            className="w-full mt-8 bg-[#D4AF37] text-black hover:bg-[#F3E5AB] font-bold py-6 text-lg"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Processing..." : "Place Order (COD)"}
                        </Button>
                        <p className="text-xs text-center text-gray-500 mt-2">
                            Payment collected on delivery.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
