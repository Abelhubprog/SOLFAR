import { pgTable, text, serial, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  walletAddress: text("wallet_address"),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tokenHolders = pgTable("token_holders", {
  id: serial("id").primaryKey(),
  walletAddress: text("wallet_address").notNull().unique(),
  balance: numeric("balance", { precision: 20, scale: 8 }).notNull().default("0"),
  firstPurchaseAt: timestamp("first_purchase_at").defaultNow(),
  lastActivityAt: timestamp("last_activity_at").defaultNow(),
});

export const communityMembers = pgTable("community_members", {
  id: serial("id").primaryKey(),
  walletAddress: text("wallet_address"),
  twitterHandle: text("twitter_handle"),
  telegramUsername: text("telegram_username"),
  farcasterHandle: text("farcaster_handle"),
  joinedAt: timestamp("joined_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  walletAddress: true,
  email: true,
});

export const insertTokenHolderSchema = createInsertSchema(tokenHolders).pick({
  walletAddress: true,
  balance: true,
});

export const insertCommunityMemberSchema = createInsertSchema(communityMembers).pick({
  walletAddress: true,
  twitterHandle: true,
  telegramUsername: true,
  farcasterHandle: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTokenHolder = z.infer<typeof insertTokenHolderSchema>;
export type TokenHolder = typeof tokenHolders.$inferSelect;
export type InsertCommunityMember = z.infer<typeof insertCommunityMemberSchema>;
export type CommunityMember = typeof communityMembers.$inferSelect;
