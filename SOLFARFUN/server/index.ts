import express from "express";
import { createServer } from "http";

const app = express();
const server = createServer(app);

// Basic middleware
app.use(express.json());

// Simple API routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'SOLFAR server running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/token-info', (req, res) => {
  res.json({
    name: 'SOLFAR',
    symbol: 'SOLFAR',
    description: 'Bridge Solana to Farcaster'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'SOLFAR API Server',
    endpoints: ['/api/health', '/api/token-info']
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 SOLFAR server running on port ${PORT}`);
  console.log(`🔗 Test: http://localhost:${PORT}/api/health`);
}); 