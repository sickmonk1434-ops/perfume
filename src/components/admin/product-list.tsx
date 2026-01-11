"use client";

import { Product } from "@/lib/actions";
import { deleteProduct, toggleProductStatus } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { Trash2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export function ProductList({ products }: { products: Product[] }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/10">
                <h2 className="font-bold text-lg">Product Inventory ({products.length})</h2>
            </div>
            <div className="divide-y divide-white/10">
                {products.map((p) => (
                    <div key={p.id} className="p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="relative w-12 h-12 rounded bg-gray-800 overflow-hidden">
                                <Image src={p.image_url} alt={p.name} fill className="object-cover" />
                            </div>
                            <div>
                                <p className="font-medium text-white">{p.name}</p>
                                <p className="text-xs text-gray-400">Stock: {p.stock} | ₹{p.sale_price}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <form action={() => toggleProductStatus(p.id, p.is_active)}>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white">
                                    {p.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </Button>
                            </form>
                            <form action={() => deleteProduct(p.id)}>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500/70 hover:text-red-500 hover:bg-red-500/10">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </div>
                ))}
                {products.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No products found.
                    </div>
                )}
            </div>
        </div>
    );
}
