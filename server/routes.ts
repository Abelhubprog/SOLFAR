import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTokenHolderSchema, insertCommunityMemberSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get token holder stats
  app.get("/api/stats", async (req, res) => {
    try {
      const holderCount = await storage.getTokenHolderCount();
      res.json({
        holders: holderCount,
        success: true
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Register a new token holder
  app.post("/api/token-holders", async (req, res) => {
    try {
      const validatedData = insertTokenHolderSchema.parse(req.body);
      
      // Check if holder already exists
      const existingHolder = await storage.getTokenHolder(validatedData.walletAddress);
      if (existingHolder) {
        return res.status(409).json({ error: "Token holder already exists" });
      }
      
      const holder = await storage.createTokenHolder(validatedData);
      res.status(201).json(holder);
    } catch (error) {
      console.error("Error creating token holder:", error);
      res.status(400).json({ error: "Invalid token holder data" });
    }
  });

  // Get token holder by wallet address
  app.get("/api/token-holders/:walletAddress", async (req, res) => {
    try {
      const { walletAddress } = req.params;
      const holder = await storage.getTokenHolder(walletAddress);
      
      if (!holder) {
        return res.status(404).json({ error: "Token holder not found" });
      }
      
      res.json(holder);
    } catch (error) {
      console.error("Error fetching token holder:", error);
      res.status(500).json({ error: "Failed to fetch token holder" });
    }
  });

  // Register a community member
  app.post("/api/community-members", async (req, res) => {
    try {
      const validatedData = insertCommunityMemberSchema.parse(req.body);
      
      // Check if member already exists by wallet address
      if (validatedData.walletAddress) {
        const existingMember = await storage.getCommunityMember(validatedData.walletAddress);
        if (existingMember) {
          return res.status(409).json({ error: "Community member already exists" });
        }
      }
      
      const member = await storage.createCommunityMember(validatedData);
      res.status(201).json(member);
    } catch (error) {
      console.error("Error creating community member:", error);
      res.status(400).json({ error: "Invalid community member data" });
    }
  });

  // Get community member by wallet address
  app.get("/api/community-members/:walletAddress", async (req, res) => {
    try {
      const { walletAddress } = req.params;
      const member = await storage.getCommunityMember(walletAddress);
      
      if (!member) {
        return res.status(404).json({ error: "Community member not found" });
      }
      
      res.json(member);
    } catch (error) {
      console.error("Error fetching community member:", error);
      res.status(500).json({ error: "Failed to fetch community member" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
