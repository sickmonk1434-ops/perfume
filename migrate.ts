import { createClient } from "@libsql/client";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.TURSO_DATABASE_URL || "file:local.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

const db = createClient({
    url,
    authToken,
});

async function main() {
    console.log("Running migrations...");

    // Products Table
    await db.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL DEFAULT 1299,
      sale_price REAL DEFAULT 899,
      image_url TEXT,
      stock INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at INTEGER DEFAULT (unixepoch())
    );
  `);

    // Orders Table
    await db.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      shipping_address TEXT NOT NULL,
      status TEXT DEFAULT 'Processing',
      tracking_number TEXT,
      created_at INTEGER DEFAULT (unixepoch()),
      total_amount NUMERIC
    );
  `);

    // Seed Data
    console.log("Seeding products...");
    const products = [
        {
            id: '1',
            name: 'Midnight Bloom',
            description: 'A mysterious blend of night-blooming jasmine and sandalwood.',
            price: 1299,
            sale_price: 899,
            image_url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80',
            stock: 50
        },
        {
            id: '2',
            name: 'Ocean Breeze',
            description: 'Fresh aquatic notes with a hint of citrus and sea salt.',
            price: 1299,
            sale_price: 899,
            image_url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80',
            stock: 50
        },
        {
            id: '3',
            name: 'Vanilla Silk',
            description: 'Warm Madagascar vanilla wrapped in amber and musk.',
            price: 1499,
            sale_price: 999,
            image_url: 'https://images.unsplash.com/photo-1620917670397-a64d1f2e96d1?q=80',
            stock: 30
        },
        {
            id: '4',
            name: 'Rose Royale',
            description: 'Classic english rose with modern spicy undertones.',
            price: 1299,
            sale_price: 899,
            image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80',
            stock: 45
        }
    ];

    for (const product of products) {
        try {
            await db.execute({
                sql: `INSERT INTO products (id, name, description, price, sale_price, image_url, stock) 
                  VALUES (:id, :name, :description, :price, :sale_price, :image_url, :stock)
                  ON CONFLICT(id) DO UPDATE SET stock = :stock`,
                args: product
            });
        } catch (e) {
            console.error(`Error inserting ${product.name}:`, e);
        }
    }

    console.log("Migration complete!");
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
