import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowClass?: string;
  delay?: number;
}

export const GlassCard = ({ children, className = "", glowClass = "", delay = 0 }: GlassCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    whileHover={{ y: -2, transition: { duration: 0.2 } }}
    className={`glass-card p-5 ${glowClass} ${className}`}
  >
    {children}
  </motion.div>
);
