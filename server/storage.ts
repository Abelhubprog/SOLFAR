import { users, tokenHolders, communityMembers, type User, type InsertUser, type TokenHolder, type InsertTokenHolder, type CommunityMember, type InsertCommunityMember } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getTokenHolder(walletAddress: string): Promise<TokenHolder | undefined>;
  createTokenHolder(holder: InsertTokenHolder): Promise<TokenHolder>;
  getCommunityMember(walletAddress: string): Promise<CommunityMember | undefined>;
  createCommunityMember(member: InsertCommunityMember): Promise<CommunityMember>;
  getTokenHolderCount(): Promise<number>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getTokenHolder(walletAddress: string): Promise<TokenHolder | undefined> {
    const [holder] = await db.select().from(tokenHolders).where(eq(tokenHolders.walletAddress, walletAddress));
    return holder || undefined;
  }

  async createTokenHolder(insertHolder: InsertTokenHolder): Promise<TokenHolder> {
    const [holder] = await db
      .insert(tokenHolders)
      .values(insertHolder)
      .returning();
    return holder;
  }

  async getCommunityMember(walletAddress: string): Promise<CommunityMember | undefined> {
    const [member] = await db.select().from(communityMembers).where(eq(communityMembers.walletAddress, walletAddress));
    return member || undefined;
  }

  async createCommunityMember(insertMember: InsertCommunityMember): Promise<CommunityMember> {
    const [member] = await db
      .insert(communityMembers)
      .values(insertMember)
      .returning();
    return member;
  }

  async getTokenHolderCount(): Promise<number> {
    const result = await db.select({ count: tokenHolders.id }).from(tokenHolders);
    return result.length;
  }
}

export const storage = new DatabaseStorage();
