export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({
      name: 'SOLFAR',
      symbol: 'SOLFAR',
      description: 'Bridge Solana to Farcaster - The eternal arch between ecosystems',
      website: 'https://solfar.fun',
      social: {
        twitter: '@solfarcaster',
        github: 'https://github.com/Abelhubprog/SOLFAR'
      },
      trading: {
        pumpfun: 'https://pump.fun',
        dexscreener: 'https://dexscreener.com'
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 