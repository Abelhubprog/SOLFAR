import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import passport from "passport";
import { createServer } from "http";
import { WebSocketServer } from "ws";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'solfar-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'SOLFAR server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/token-info', (req, res) => {
  res.json({
    name: 'SOLFAR',
    symbol: 'SOLFAR',
    description: 'Bridge Solana to Farcaster - The eternal arch between ecosystems',
    website: 'https://solfar.fun',
    social: {
      twitter: '@solfarcaster',
      github: 'https://github.com/Abelhubprog/SOLFAR'
    }
  });
});

// Basic stats endpoint (mock data for now)
app.get('/api/stats', (req, res) => {
  res.json({
    holders: 1337,
    success: true,
    message: 'SOLFAR community growing!'
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, '../dist/public');
  app.use(express.static(staticPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
} else {
  // Development mode - Vite handles static files
  app.get('/', (req, res) => {
    res.json({ 
      message: 'SOLFAR development server running. Use Vite dev server for frontend.',
      port: PORT,
      endpoints: ['/api/health', '/api/token-info', '/api/stats']
    });
  });
}

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('🔗 WebSocket client connected');
  
  ws.on('message', (message) => {
    console.log('📨 Received:', message.toString());
    ws.send(`🔄 Echo: ${message}`);
  });
  
  ws.on('close', () => {
    console.log('❌ WebSocket client disconnected');
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 SOLFAR server running on port ${PORT}`);
  console.log(`📱 WebSocket server ready`);
  console.log(`🌟 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API: http://localhost:${PORT}/api/health`);
  console.log(`💰 SOLFAR - Bridge Solana to Farcaster!`);
}); 