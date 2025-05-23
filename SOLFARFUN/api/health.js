export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ 
      status: 'ok', 
      message: 'SOLFAR API is running on Vercel',
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 