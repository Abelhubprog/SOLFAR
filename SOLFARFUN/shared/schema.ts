import { pgTable, text, timestamp, uuid, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Users table for authentication
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").unique().notNull(),
  username: text("username").unique(),
  walletAddress: text("wallet_address").unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Token holders tracking
export const tokenHolders = pgTable("token_holders", {
  id: uuid("id").primaryKey().defaultRandom(),
  walletAddress: text("wallet_address").notNull(),
  balance: text("balance").notNull(), // Store as string to avoid precision issues
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

// Community posts/updates
export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: uuid("author_id").references(() => users.id),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Sessions table
export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  expiresAt: timestamp("expires_at").notNull(),
  data: text("data"),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const insertTokenHolderSchema = createInsertSchema(tokenHolders);
export const selectTokenHolderSchema = createSelectSchema(tokenHolders);

export const insertPostSchema = createInsertSchema(posts);
export const selectPostSchema = createSelectSchema(posts);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type TokenHolder = typeof tokenHolders.$inferSelect;
export type NewTokenHolder = typeof tokenHolders.$inferInsert;

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert; 