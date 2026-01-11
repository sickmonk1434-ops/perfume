"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Product } from "./actions";

export async function getAllProducts(): Promise<Product[]> {
    try {
        const result = await db.execute("SELECT * FROM products ORDER BY created_at DESC");
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

export async function getOrders() {
    try {
        const result = await db.execute("SELECT * FROM orders ORDER BY created_at DESC");
        return result.rows.map(row => ({
            ...row,
            id: String(row.id),
            customer_name: String(row.customer_name),
            customer_email: String(row.customer_email),
            customer_phone: String(row.customer_phone),
            shipping_address: String(row.shipping_address),
            status: String(row.status),
            tracking_number: row.tracking_number ? String(row.tracking_number) : null,
            created_at: Number(row.created_at),
            total_amount: row.total_amount ? Number(row.total_amount) : 0
        }));
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return [];
    }
}

export async function updateOrderStatus(id: string, status: string) {
    await db.execute({
        sql: "UPDATE orders SET status = ? WHERE id = ?",
        args: [status, id],
    });
    revalidatePath("/admin");
    revalidatePath("/track");
}

export async function getOrderById(id: string) {
    try {
        const result = await db.execute({
            sql: "SELECT * FROM orders WHERE id = ?",
            args: [id]
        });
        const row = result.rows[0];
        if (!row) return null;

        return {
            ...row,
            id: String(row.id),
            customer_name: String(row.customer_name),
            customer_email: String(row.customer_email),
            customer_phone: String(row.customer_phone),
            shipping_address: String(row.shipping_address),
            status: String(row.status),
            tracking_number: row.tracking_number ? String(row.tracking_number) : null,
            created_at: Number(row.created_at),
            total_amount: row.total_amount ? Number(row.total_amount) : 0
        };
    } catch (error) {
        console.error("Failed to fetch order:", error);
        return null;
    }
}

export async function addProduct(formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const sale_price = parseFloat(formData.get("sale_price") as string);
    const image_url = formData.get("image_url") as string;
    const stock = parseInt(formData.get("stock") as string);

    if (!name || !price) {
        throw new Error("Missing required fields");
    }

    await db.execute({
        sql: `INSERT INTO products (id, name, description, price, sale_price, image_url, stock, is_active) 
          VALUES (:id, :name, :description, :price, :sale_price, :image_url, :stock, 1)`,
        args: {
            id: uuidv4(),
            name,
            description,
            price,
            sale_price: sale_price || price,
            image_url,
            stock,
        },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    redirect("/admin");
}

export async function deleteProduct(id: string) {
    await db.execute({
        sql: "DELETE FROM products WHERE id = ?",
        args: [id],
    });
    revalidatePath("/");
    revalidatePath("/admin");
}

export async function toggleProductStatus(id: string, currentStatus: number) {
    await db.execute({
        sql: "UPDATE products SET is_active = ? WHERE id = ?",
        args: [currentStatus === 1 ? 0 : 1, id],
    });
    revalidatePath("/");
    revalidatePath("/admin");
}
