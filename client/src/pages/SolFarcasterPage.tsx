"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Zap, Gift, Share2, ExternalLink, TrendingUp, BarChart3, Coins, Users, Lock, Twitter, MessageCircle, Github, Star, Rocket, Globe, Send } from "lucide-react";
import { formatNumber, formatPrice, formatCurrency } from "@/lib/utils";
import { WalletButton } from "@/components/WalletButton";

// Replace with the real pump.fun embed URL once your token is live
const PUMP_FUN_WIDGET_URL = "https://pump.fun/";
const TOKEN_ADDRESS = "Coming Soon...";

// Wrapper for consistent section animations
const SectionWrapper = ({ children, className = "", delay = 0, yOffset = 50, ...props }: any) => (
  <motion.section
    initial={{ opacity: 0, y: yOffset }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
    {...props}
  >
    {children}
  </motion.section>
);

// Animated Card Component
const MotionCard = motion(Card);

// Enhanced Particle Background with Interactive Stars
const ParticleBackground = () => (
  <div className="fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-black">
      {/* Animated starfield */}
      {Array.from({ length: 150 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Shooting stars */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute w-1 h-1 bg-teal-400 rounded-full"
          style={{
            left: `${Math.random() * 50}%`,
            top: `${Math.random() * 50}%`,
          }}
          animate={{
            x: [0, 200],
            y: [0, 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 3 + Math.random() * 2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  </div>
);

// CSS-based 3D Coin Component
const AnimatedCoin = ({ isHovered }: { isHovered: boolean }) => (
  <motion.div
    className="relative w-48 h-48 md:w-64 md:h-64 mx-auto"
    animate={{
      rotateY: isHovered ? 360 : 0,
      scale: isHovered ? 1.1 : 1,
    }}
    transition={{
      rotateY: { duration: 2, repeat: Infinity, ease: "linear" },
      scale: { duration: 0.3 },
    }}
    style={{ transformStyle: "preserve-3d" }}
  >
    <div
      className="absolute inset-0 rounded-full"
      style={{
        background: `conic-gradient(from 0deg, 
          #00FFA3 0deg, 
          #9945FF 90deg, 
          #00FFA3 180deg, 
          #9945FF 270deg, 
          #00FFA3 360deg)`,
        filter: isHovered ? "brightness(1.3) drop-shadow(0 0 30px #00FFA3)" : "brightness(1) drop-shadow(0 0 20px #9945FF)",
        animation: "spin-slow infinite",
      }}
    />
    <div
      className="absolute inset-2 rounded-full bg-black flex items-center justify-center border-2 border-teal-400"
      style={{
        boxShadow: isHovered 
          ? "inset 0 0 30px rgba(0, 255, 163, 0.3), 0 0 40px rgba(153, 69, 255, 0.4)" 
          : "inset 0 0 20px rgba(153, 69, 255, 0.2)",
      }}
    >
      <div className="text-center">
        <div className="text-2xl md:text-4xl font-bold gradient-text mb-2">SOL</div>
        <div className="text-lg md:text-2xl font-bold gradient-text-purple">FAR</div>
      </div>
    </div>
  </motion.div>
);

export default function SolFarcasterPage() {
  const ticker = "SOLFAR";
  const [price, setPrice] = useState(0.0001);
  const [marketCap, setMarketCap] = useState(150000);
  const [supply, setSupply] = useState(1000000);
  const [holders, setHolders] = useState(420);
  const [isCoinHovered, setIsCoinHovered] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setPrice((prev) => prev + (Math.random() - 0.5) * 0.0001);
      setMarketCap((prev) => prev + Math.floor((Math.random() - 0.5) * 10000));
      setSupply((prev) => prev + Math.floor(Math.random() * 1000));
      setHolders((prev) => prev + Math.floor((Math.random() - 0.3) * 5));
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const howToSteps = [
    {
      step: 1,
      title: "Mint on pump.fun",
      desc: "Acquire $SOLFAR tokens directly via the official pump.fun launch. Be early!",
      icon: <Zap size={32} className="text-teal-400 group-hover:text-teal-300 transition-colors" />,
      link: PUMP_FUN_WIDGET_URL,
      linkText: "Go to pump.fun"
    },
    {
      step: 2,
      title: "Hold & Be Rewarded",
      desc: "Become part of the community. Future airdrops, utilities, and surprises await holders.",
      icon: <Gift size={32} className="text-fuchsia-500 group-hover:text-fuchsia-400 transition-colors" />,
    },
    {
      step: 3,
      title: "Bridge Worlds",
      desc: "Champion the symbiotic link between Solana's speed and Farcaster's social fabric.",
      icon: <Share2 size={32} className="text-violet-400 group-hover:text-violet-300 transition-colors" />,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white font-sans">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Aurora background effect */}
      <div className="aurora-bg"></div>

      {/* Header */}
      <header className="relative z-50 p-6">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            className="text-2xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="gradient-text">Sol</span><span className="gradient-text-purple">Farcaster</span>
          </motion.div>
          <motion.div 
            className="hidden md:flex space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a href="#launch" className="hover:text-teal-400 transition-colors">Launch</a>
            <a href="#tokenomics" className="hover:text-teal-400 transition-colors">Tokenomics</a>
            <a href="#how-to-join" className="hover:text-teal-400 transition-colors">How to Join</a>
          </motion.div>
          
          {/* Social Links in Header */}
          <motion.div 
            className="hidden lg:flex items-center space-x-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <motion.a
              href="https://twitter.com/solfarcaster"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Twitter size={16} />
            </motion.a>
            <motion.a
              href="https://t.me/solfarcaster"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Send size={16} />
            </motion.a>
            <motion.a
              href="https://warpcast.com/solana"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <MessageCircle size={16} />
            </motion.a>
          </motion.div>
          
          <WalletButton />
        </nav>
      </header>

      {/* Hero Section */}
      <motion.section
        className="relative flex flex-col items-center justify-center px-4 py-28 text-center min-h-screen"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter"
        >
          Welcome&nbsp;
          <motion.span
            className="gradient-text"
            whileHover={{ letterSpacing: "0.05em" }}
            transition={{ duration: 0.3 }}
          >
            Solana
          </motion.span>
          &nbsp;to&nbsp;
          <motion.span
            className="gradient-text-purple"
            whileHover={{ letterSpacing: "0.05em" }}
            transition={{ duration: 0.3 }}
          >
            Farcaster
          </motion.span>
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="mt-8 max-w-xl text-lg md:text-xl text-gray-300"
        >
          <span className="font-semibold text-teal-300">${ticker}</span> is the bridge-native meme token celebrating the eternal arch between&nbsp;
          <span className="font-medium text-teal-400">Solana</span> and&nbsp;
          <span className="font-medium text-violet-400">Farcaster</span>. Join the movement.
        </motion.p>

        {/* Animated Coin */}
        <motion.div
          variants={itemVariants}
          className="mt-12 cursor-pointer"
          onMouseEnter={() => setIsCoinHovered(true)}
          onMouseLeave={() => setIsCoinHovered(false)}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <AnimatedCoin isHovered={isCoinHovered} />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          <Button
            size="lg"
            className="btn-primary rounded-xl px-8 py-3 text-base md:text-lg font-semibold"
            onClick={() => document.getElementById('launch')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <motion.span
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View Live Launch
            </motion.span>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="btn-secondary rounded-xl px-8 py-3 text-base md:text-lg font-semibold group"
            onClick={() => window.open(PUMP_FUN_WIDGET_URL, '_blank')}
          >
            <motion.span
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              Mint on pump.fun <ExternalLink size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.span>
          </Button>
        </motion.div>

        {/* Social Media Call-to-Action */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-6">Join our growing community</p>
          <div className="flex justify-center space-x-6">
            <motion.a
              href="https://twitter.com/solfarcaster"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-6 py-3 bg-gray-900 rounded-xl border border-gray-700 hover:border-blue-500 transition-all group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Twitter size={20} className="text-blue-400 group-hover:text-blue-300" />
              <span className="text-gray-300 group-hover:text-white">Follow on X</span>
            </motion.a>
            
            <motion.a
              href="https://t.me/solfarcaster"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-6 py-3 bg-gray-900 rounded-xl border border-gray-700 hover:border-blue-400 transition-all group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={20} className="text-blue-400 group-hover:text-blue-300" />
              <span className="text-gray-300 group-hover:text-white">Join Telegram</span>
            </motion.a>
            
            <motion.a
              href="https://warpcast.com/solana"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-6 py-3 bg-gray-900 rounded-xl border border-gray-700 hover:border-purple-500 transition-all group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={20} className="text-purple-400 group-hover:text-purple-300" />
              <span className="text-gray-300 group-hover:text-white">Join Farcaster</span>
            </motion.a>
          </div>
        </motion.div>
      </motion.section>

      {/* Live Launch Panel */}
      <SectionWrapper className="px-4 py-16 md:py-24" id="launch">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Live Trading Hub</span>
            </h2>
            <p className="text-xl text-gray-300">Real-time market data and trading interface</p>
          </div>
          
          <MotionCard
            className="trading-widget rounded-2xl card-glow"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Pump.fun Widget Mock */}
                <motion.div 
                  className="bg-gray-900 rounded-xl p-6 border border-gray-700"
                  whileHover={{ scale: 1.02, borderColor: "rgba(0, 255, 163, 0.5)" }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-teal-400">pump.fun Launch</h3>
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <motion.div 
                        className="w-16 h-16 mx-auto mb-4 bg-teal-400 rounded-full flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <TrendingUp className="w-8 h-8 text-black" />
                      </motion.div>
                      <p className="text-gray-400">pump.fun Widget</p>
                      <p className="text-sm text-teal-400 mt-2">Live trading coming soon!</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Dexscreener Chart Mock */}
                <motion.div 
                  className="bg-gray-900 rounded-xl p-6 border border-gray-700"
                  whileHover={{ scale: 1.02, borderColor: "rgba(153, 69, 255, 0.5)" }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-violet-400">Live Chart</h3>
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <motion.div 
                        className="w-16 h-16 mx-auto mb-4 bg-violet-400 rounded-full flex items-center justify-center"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <BarChart3 className="w-8 h-8 text-white" />
                      </motion.div>
                      <p className="text-gray-400">Dexscreener Chart</p>
                      <p className="text-sm text-violet-400 mt-2">Charts ready for launch!</p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Live Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <motion.div 
                  className="stats-card rounded-lg p-4 text-center"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-gray-400 text-sm">Price</p>
                  <p className="text-2xl font-bold price-ticker">${formatPrice(Math.abs(price))}</p>
                </motion.div>
                <motion.div 
                  className="stats-card rounded-lg p-4 text-center"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-gray-400 text-sm">Market Cap</p>
                  <p className="text-2xl font-bold">{formatCurrency(Math.abs(marketCap))}</p>
                </motion.div>
                <motion.div 
                  className="stats-card rounded-lg p-4 text-center"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-gray-400 text-sm">Supply</p>
                  <p className="text-2xl font-bold">{formatNumber(Math.abs(supply))}</p>
                </motion.div>
                <motion.div 
                  className="stats-card rounded-lg p-4 text-center"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-gray-400 text-sm">Holders</p>
                  <p className="text-2xl font-bold">{Math.abs(holders)}</p>
                </motion.div>
              </div>
            </CardContent>
          </MotionCard>
        </div>
      </SectionWrapper>

      {/* Tokenomics Section */}
      <SectionWrapper id="tokenomics" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text-purple">Tokenomics</span>
            </h2>
            <p className="text-xl text-gray-300">Fair launch with community-first principles</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="step-card rounded-2xl p-8 text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <motion.div 
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Coins className="w-10 h-10 text-black" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">Total Supply</h3>
              <p className="text-4xl font-extrabold gradient-text mb-4">1B</p>
              <p className="text-gray-400">Fixed supply, no inflation</p>
            </motion.div>
            
            <motion.div
              className="step-card rounded-2xl p-8 text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <motion.div 
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-violet-400 to-fuchsia-500 rounded-full flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Users className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">Community</h3>
              <p className="text-4xl font-extrabold gradient-text-purple mb-4">100%</p>
              <p className="text-gray-400">Fair launch, no team allocation</p>
            </motion.div>
            
            <motion.div
              className="step-card rounded-2xl p-8 text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <motion.div 
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Lock className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">Liquidity</h3>
              <p className="text-4xl font-extrabold text-emerald-400 mb-4">Locked</p>
              <p className="text-gray-400">LP tokens burned forever</p>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* How to Join Section */}
      <SectionWrapper id="how-to-join" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How to <span className="gradient-text">Join</span>
            </h2>
            <p className="text-xl text-gray-300">Three simple steps to become part of the movement</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {howToSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className="step-card rounded-2xl p-8 text-center group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div 
                  className="w-20 h-20 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400 mb-6">{step.desc}</p>
                {step.link && (
                  <Button
                    variant="outline"
                    className="btn-secondary group/btn"
                    onClick={() => window.open(step.link, '_blank')}
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="flex items-center"
                    >
                      {step.linkText} <ExternalLink size={16} className="ml-2" />
                    </motion.span>
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Community Section */}
      <SectionWrapper className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Join the <span className="gradient-text">SOLFAR</span> Community
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Connect with fellow bridge builders across all platforms. Stay updated, share ideas, and be part of the revolution.
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-2xl p-8 border border-blue-500/20 hover:border-blue-400/40 transition-all group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <motion.div 
                className="w-20 h-20 mx-auto mb-6 bg-blue-500 rounded-full flex items-center justify-center"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Twitter size={32} className="text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-blue-400">X (Twitter)</h3>
              <p className="text-gray-400 mb-6">Follow for real-time updates, announcements, and community highlights</p>
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white border-0"
                onClick={() => window.open('https://twitter.com/solfarcaster', '_blank')}
              >
                Follow @solfarcaster
              </Button>
            </motion.div>
            
            <motion.div
              className="bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-400/40 transition-all group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <motion.div 
                className="w-20 h-20 mx-auto mb-6 bg-cyan-500 rounded-full flex items-center justify-center"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Send size={32} className="text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Telegram</h3>
              <p className="text-gray-400 mb-6">Join our active chat for discussions, alpha, and community support</p>
              <Button
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white border-0"
                onClick={() => window.open('https://t.me/solfarcaster', '_blank')}
              >
                Join Channel
              </Button>
            </motion.div>
            
            <motion.div
              className="bg-gradient-to-br from-purple-900/20 to-fuchsia-800/20 rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <motion.div 
                className="w-20 h-20 mx-auto mb-6 bg-purple-500 rounded-full flex items-center justify-center"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <MessageCircle size={32} className="text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Farcaster</h3>
              <p className="text-gray-400 mb-6">Connect on the decentralized social network that inspired our mission</p>
              <Button
                className="w-full bg-purple-500 hover:bg-purple-600 text-white border-0"
                onClick={() => window.open('https://warpcast.com/solana', '_blank')}
              >
                Join on Warpcast
              </Button>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* Footer */}
      <footer className="relative py-16 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <motion.div 
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <span className="gradient-text">Sol</span><span className="gradient-text-purple">Farcaster</span>
              </motion.div>
              <p className="text-gray-400 mb-6">
                Bridging the gap between Solana's lightning-fast blockchain and Farcaster's decentralized social network. 
                Join the revolution where DeFi meets social.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="https://twitter.com/solfarcaster"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  title="Follow us on X (Twitter)"
                >
                  <Twitter size={20} className="group-hover:text-white transition-colors" />
                </motion.a>
                <motion.a
                  href="https://t.me/solfarcaster"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  title="Join our Telegram channel"
                >
                  <Send size={20} className="group-hover:text-white transition-colors" />
                </motion.a>
                <motion.a
                  href="https://warpcast.com/solana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  title="Join us on Farcaster"
                >
                  <MessageCircle size={20} className="group-hover:text-white transition-colors" />
                </motion.a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-teal-400">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#launch" className="hover:text-white transition-colors">Launch</a></li>
                <li><a href="#tokenomics" className="hover:text-white transition-colors">Tokenomics</a></li>
                <li><a href="#how-to-join" className="hover:text-white transition-colors">How to Join</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-violet-400">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Whitepaper</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
          
          <motion.div 
            className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>&copy; 2024 SolFarcaster. Bridging worlds, one token at a time.</p>
            <p className="text-sm mt-2">Contract: {TOKEN_ADDRESS}</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}