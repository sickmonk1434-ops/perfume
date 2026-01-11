"use client";

import { addProduct } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef } from "react";

export function ProductForm() {
    const ref = useRef<HTMLFormElement>(null);

    return (
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#D4AF37]">Add New Product</h2>
            <form
                ref={ref}
                action={async (formData) => {
                    await addProduct(formData);
                    ref.current?.reset();
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" name="name" required placeholder="Ex: Midnight Bloom" className="bg-black/20" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="price">Price (MRP)</Label>
                    <Input id="price" name="price" type="number" step="0.01" required placeholder="1299" className="bg-black/20" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="sale_price">Sale Price</Label>
                    <Input id="sale_price" name="sale_price" type="number" step="0.01" placeholder="899" className="bg-black/20" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input id="stock" name="stock" type="number" required placeholder="50" className="bg-black/20" />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input id="image_url" name="image_url" required placeholder="https://..." className="bg-black/20" />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" name="description" required placeholder="Fragrance notes..." className="bg-black/20" />
                </div>

                <div className="md:col-span-2">
                    <Button type="submit" className="w-full bg-[#D4AF37] text-black hover:bg-[#F3E5AB]">
                        Add Product
                    </Button>
                </div>
            </form>
        </div>
    );
}
