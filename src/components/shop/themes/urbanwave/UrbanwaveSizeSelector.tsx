import { useState } from 'react';
import { motion } from 'framer-motion';
import { Ruler, Check } from 'lucide-react';

interface Size {
  label: string;
  available: boolean;
}

interface UrbanwaveSizeSelectorProps {
  sizes?: Size[];
  onSizeSelect: (size: string) => void;
  selectedSize?: string | null;
}

const defaultSizes: Size[] = [
  { label: 'XS', available: true },
  { label: 'S', available: true },
  { label: 'M', available: true },
  { label: 'L', available: true },
  { label: 'XL', available: true },
  { label: 'XXL', available: false },
];

const UrbanwaveSizeSelector = ({ 
  sizes = defaultSizes, 
  onSizeSelect,
  selectedSize = null
}: UrbanwaveSizeSelectorProps) => {
  const [internalSelected, setInternalSelected] = useState<string | null>(selectedSize);
  const currentSelection = selectedSize ?? internalSelected;

  const handleSelect = (size: Size) => {
    if (!size.available) return;
    setInternalSelected(size.label);
    onSizeSelect(size.label);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg tracking-wide">Sélectionner une taille</h3>
        <button className="flex items-center gap-2 text-sm text-primary hover:underline">
          <Ruler className="h-4 w-4" />
          Guide des tailles
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <motion.button
            key={size.label}
            onClick={() => handleSelect(size)}
            disabled={!size.available}
            whileHover={size.available ? { scale: 1.05, y: -2 } : {}}
            whileTap={size.available ? { scale: 0.95 } : {}}
            className={`
              relative min-w-[3.5rem] h-12 px-5 rounded-lg font-display text-sm font-medium transition-all
              ${
                currentSelection === size.label
                  ? 'bg-primary text-primary-foreground shadow-lg btn-glow'
                  : size.available
                  ? 'bg-secondary border border-border hover:border-primary hover:text-primary'
                  : 'bg-muted/50 text-muted-foreground/50 cursor-not-allowed line-through'
              }
            `}
          >
            {size.label}
            {currentSelection === size.label && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center"
              >
                <Check className="h-3 w-3 text-accent-foreground" />
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>

      {currentSelection && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-muted-foreground"
        >
          <span className="text-primary font-medium">Taille {currentSelection}</span> sélectionnée
        </motion.p>
      )}

      {!currentSelection && (
        <p className="text-sm text-muted-foreground">
          Veuillez sélectionner une taille pour continuer
        </p>
      )}
    </div>
  );
};

export default UrbanwaveSizeSelector;
