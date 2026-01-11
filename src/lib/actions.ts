import { db } from "@/lib/db";

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    sale_price: number;
    image_url: string;
    stock: number;
    is_active: number;
}

export async function getProducts(): Promise<Product[]> {
    try {
        const result = await db.execute("SELECT * FROM products WHERE is_active = 1 ORDER BY created_at DESC");
        // Convert to plain objects to avoid serialization issues with Client Components
        return result.rows.map(row => ({
            id: String(row.id),
            name: String(row.name),
            description: String(row.description),
            price: Number(row.price),
            sale_price: Number(row.sale_price),
            image_url: String(row.image_url),
            stock: Number(row.stock),
            is_active: Number(row.is_active)
        })) as Product[];
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}
