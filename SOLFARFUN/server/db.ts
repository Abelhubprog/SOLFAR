import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// Check for DATABASE_URL in environment
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn("⚠️  DATABASE_URL not set. Database features will be disabled in development.");
  console.warn("   To enable database, set DATABASE_URL in your .env file");
  
  // Export null database for development mode
  export const db = null;
} else {
  // Production database connection
  const sql = neon(databaseUrl);
  export const db = drizzle(sql);
  console.log("✅ Database connected successfully");
}

// Helper function to check if database is available
export function isDatabaseAvailable(): boolean {
  return db !== null;
}

// Safe database operations wrapper
export async function withDatabase<T>(
  operation: (db: NonNullable<typeof db>) => Promise<T>
): Promise<T | null> {
  if (!isDatabaseAvailable() || !db) {
    console.warn("Database operation skipped - DATABASE_URL not configured");
    return null;
  }
  
  try {
    return await operation(db);
  } catch (error) {
    console.error("Database operation failed:", error);
    throw error;
  }
} 