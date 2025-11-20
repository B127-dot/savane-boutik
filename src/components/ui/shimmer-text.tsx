import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ShimmerTextProps {
  text: string;
  className?: string;
}

export default function ShimmerText({
  text,
  className,
}: ShimmerTextProps) {
  return (
    <motion.h2
      className={cn(
        "bg-gradient-to-r from-foreground via-primary to-foreground bg-[length:200%_100%] bg-clip-text text-transparent",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        backgroundPosition: ["200% center", "-200% center"],
      }}
      transition={{
        opacity: { duration: 0.5 },
        y: { duration: 0.5 },
        backgroundPosition: {
          duration: 3,
          ease: "linear",
          repeat: Infinity,
        },
      }}
    >
      {text}
    </motion.h2>
  );
}
