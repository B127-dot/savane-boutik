import { motion } from 'framer-motion';

interface SavaneTickerProps {
  text?: string;
  inverted?: boolean;
}

const SavaneTicker = ({ 
  text = "LIVRAISON PARTOUT AU BURKINA /// NOUVELLE COLLECTION DISPONIBLE /// ",
  inverted = false
}: SavaneTickerProps) => {
  return (
    <div className={`w-full overflow-hidden border-y ${inverted ? 'bg-foreground border-foreground' : 'bg-background border-foreground'}`}>
      <div className="flex whitespace-nowrap animate-ticker">
        {[...Array(4)].map((_, i) => (
          <span 
            key={i}
            className={`inline-block py-3 px-4 font-heading text-sm md:text-base uppercase tracking-[0.2em] ${
              inverted ? 'text-background' : 'text-foreground'
            }`}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SavaneTicker;
