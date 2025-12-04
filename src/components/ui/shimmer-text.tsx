import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span";
}

const ShimmerText = ({ children, className, as: Component = "span" }: ShimmerTextProps) => {
  return (
    <Component className={cn("relative inline-block", className)}>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        style={{
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["200% 0%", "-200% 0%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <span className="relative">{children}</span>
    </Component>
  );
};

export default ShimmerText;
