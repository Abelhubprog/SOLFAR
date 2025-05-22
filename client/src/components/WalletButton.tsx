import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const WalletButton: React.FC = () => {
  const { connected, publicKey } = useWallet();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <WalletMultiButton 
        className="btn-secondary px-6 py-2 rounded-xl font-semibold !bg-transparent !border-2 !border-purple-500 !text-purple-400 hover:!bg-purple-500 hover:!text-white !transition-all !duration-300"
      >
        {connected ? 
          `${publicKey?.toString().slice(0, 4)}...${publicKey?.toString().slice(-4)}` : 
          'Connect Wallet'
        }
      </WalletMultiButton>
    </motion.div>
  );
};