import { useState } from "react";
import { motion } from "framer-motion";

interface ThreeCoinProps {
  className?: string;
}

export function ThreeCoin({ className }: ThreeCoinProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ scale: 1 }}
      animate={{ scale: isHovered ? 1.2 : 1 }}
      transition={{ duration: 0.2 }}
      style={{
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: "linear-gradient(45deg, #9945FF, #00FFA3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: isHovered 
          ? "0 0 30px rgba(153, 69, 255, 0.6)" 
          : "0 0 15px rgba(153, 69, 255, 0.3)",
        transition: "box-shadow 0.2s ease",
      }}
    >
      <motion.div
        animate={{ rotateY: isHovered ? 360 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "linear-gradient(45deg, #B57AFF, #00FFA3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "bold",
          color: "white",
        }}
      >
        🪙
      </motion.div>
    </motion.div>
  );
}