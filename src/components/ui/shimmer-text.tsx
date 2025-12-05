'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';
}

export function ShimmerText({ children, className, as: Component = 'span' }: ShimmerTextProps) {
  return (
    <Component className={cn('relative inline-block', className)}>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent bg-[length:200%_100%]"
        style={{
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
        }}
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <span className="relative">{children}</span>
    </Component>
  );
}
