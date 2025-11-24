import { motion } from 'framer-motion';
import React from 'react';

interface IconContainerProps {
  icon: React.ElementType;
  type?: 'revenue' | 'orders' | 'products' | 'conversion' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
}

const IconContainer = ({ icon: Icon, type = 'neutral', size = 'md' }: IconContainerProps) => {
  // Size configurations
  const sizeConfig = {
    sm: { container: 'h-12 w-12', icon: 'h-5 w-5' },
    md: { container: 'h-14 w-14', icon: 'h-6 w-6' },
    lg: { container: 'h-16 w-16', icon: 'h-8 w-8' }
  };

  // Color configurations based on type
  const colorConfig = {
    revenue: {
      gradient: 'from-kpi-success/20 via-kpi-success/10 to-transparent',
      glow: 'hsl(var(--kpi-success))',
      iconColor: 'text-kpi-success'
    },
    orders: {
      gradient: 'from-chart-2/20 via-chart-2/10 to-transparent',
      glow: 'hsl(var(--chart-2))',
      iconColor: 'text-chart-2'
    },
    products: {
      gradient: 'from-kpi-warning/20 via-kpi-warning/10 to-transparent',
      glow: 'hsl(var(--kpi-warning))',
      iconColor: 'text-kpi-warning'
    },
    conversion: {
      gradient: 'from-chart-4/20 via-chart-4/10 to-transparent',
      glow: 'hsl(var(--chart-4))',
      iconColor: 'text-chart-4'
    },
    danger: {
      gradient: 'from-kpi-danger/20 via-kpi-danger/10 to-transparent',
      glow: 'hsl(var(--kpi-danger))',
      iconColor: 'text-kpi-danger'
    },
    neutral: {
      gradient: 'from-primary/20 via-primary/10 to-transparent',
      glow: 'hsl(var(--primary))',
      iconColor: 'text-primary'
    }
  };

  const config = colorConfig[type];
  const sizes = sizeConfig[size];

  // SVG Background shapes based on type
  const getSVGBackground = () => {
    const baseProps = {
      className: "absolute inset-0 opacity-25",
      viewBox: "0 0 100 100",
      fill: "currentColor"
    };

    switch (type) {
      case 'revenue':
        // Organic blob
        return (
          <svg {...baseProps}>
            <path d="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z M35,25 Q45,20 55,25 T75,40 Q80,55 75,70 T55,85 Q45,80 35,75 T15,60 Q10,45 15,30 T35,25 Z" />
          </svg>
        );
      case 'orders':
        // Dynamic wave
        return (
          <svg {...baseProps}>
            <path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z M10,60 Q35,45 60,60 T110,60" />
          </svg>
        );
      case 'products':
        // Rounded star
        return (
          <svg {...baseProps}>
            <path d="M50,5 L60,35 L90,35 L67,52 L77,82 L50,65 L23,82 L33,52 L10,35 L40,35 Z" />
          </svg>
        );
      case 'conversion':
        // Concentric circles
        return (
          <svg {...baseProps}>
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        );
      default:
        // Simple circle
        return (
          <svg {...baseProps}>
            <circle cx="50" cy="50" r="35" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* Animated SVG Background */}
      <motion.div
        className={`absolute inset-0 ${config.iconColor}`}
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {getSVGBackground()}
      </motion.div>

      {/* Circular container with gradient and glow */}
      <motion.div
        className={`relative ${sizes.container} rounded-full bg-gradient-to-br ${config.gradient} backdrop-blur-sm flex items-center justify-center`}
        style={{
          boxShadow: `
            0 0 20px ${config.glow}33,
            0 0 40px ${config.glow}1a,
            inset 0 0 20px ${config.glow}1a
          `
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: `
            0 0 30px ${config.glow}4d,
            0 0 60px ${config.glow}26,
            inset 0 0 30px ${config.glow}26
          `
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 6, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className={`${sizes.icon} ${config.iconColor}`} strokeWidth={2.5} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default IconContainer;
