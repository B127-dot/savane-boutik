import { X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PromoBannerProps {
  text: string;
  backgroundColor: string;
  textColor: string;
  link?: string;
  animationsEnabled?: boolean;
}

const PromoBanner = ({ 
  text, 
  backgroundColor, 
  textColor, 
  link,
  animationsEnabled = true 
}: PromoBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || !text) return null;

  const content = (
    <div 
      className="relative py-2.5 px-4 text-center text-sm font-medium"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="container mx-auto flex items-center justify-center gap-2">
        {link ? (
          <a 
            href={link} 
            className="hover:underline underline-offset-2 transition-all"
            style={{ color: textColor }}
          >
            {text}
          </a>
        ) : (
          <span>{text}</span>
        )}
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/10 transition-colors"
        aria-label="Fermer la bannière"
      >
        <X className="w-4 h-4" style={{ color: textColor }} />
      </button>
    </div>
  );

  if (!animationsEnabled) {
    return content;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromoBanner;
