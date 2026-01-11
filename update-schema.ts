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
    console.log("Updating schema...");
    try {
        await db.execute("ALTER TABLE orders ADD COLUMN total_amount NUMERIC");
        console.log("Added total_amount column to orders table.");
    } catch (e: any) {
        if (e.message.includes("duplicate column name")) {
            console.log("Column total_amount already exists.");
        } else {
            console.error("Error updating schema:", e);
        }
    }
}

main();
