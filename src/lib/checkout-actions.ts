"use server";

import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { CartItem } from "@/components/cart/cart-context";

export async function createOrder(formData: FormData, cartItems: CartItem[], totalAmount: number) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const addressLine1 = formData.get("addressLine1") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const pin = formData.get("pin") as string;

    const orderId = uuidv4();
    const timestamp = Math.floor(Date.now() / 1000);

    const shippingAddress = JSON.stringify({
        line1: addressLine1,
        city,
        state,
        pin,
    });

    try {
        await db.execute({
            sql: `INSERT INTO orders (id, customer_name, customer_email, customer_phone, shipping_address, status, created_at, total_amount) 
            VALUES (:id, :name, :email, :phone, :shipping_address, 'Processing', :created_at, :total_amount)`,
            args: {
                id: orderId,
                name,
                email,
                phone,
                shipping_address: shippingAddress,
                created_at: timestamp,
                total_amount: totalAmount
            },
        });

        // In a real app, we would verify stock and deduct it here within a transaction
        // And also save order items to a separate table.
        // For this MVP, we just create the order record.

        return { success: true, orderId };
    } catch (error) {
        console.error("Order creation failed:", error);
        return { success: false, error: "Failed to place order" };
    }
}
