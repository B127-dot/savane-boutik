import { motion } from 'framer-motion';
import { Info, Shirt, Ruler, Package, Droplets, Thermometer } from 'lucide-react';

interface Spec {
  label: string;
  value: string;
  icon?: React.ElementType;
}

interface UrbanwaveTechnicalSpecsProps {
  specs?: Spec[];
  productDescription?: string;
}

const defaultSpecs: Spec[] = [
  { label: 'Matière', value: '100% Coton Premium', icon: Shirt },
  { label: 'Coupe', value: 'Oversize / Relaxed Fit', icon: Ruler },
  { label: 'Poids', value: '380g/m²', icon: Package },
  { label: 'Entretien', value: 'Lavage 30°C', icon: Droplets },
  { label: 'Origine', value: 'Fabriqué au Portugal', icon: Thermometer },
];

const UrbanwaveTechnicalSpecs = ({ 
  specs = defaultSpecs,
  productDescription 
}: UrbanwaveTechnicalSpecsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      {/* Product Description */}
      {productDescription && (
        <div className="space-y-3">
          <h3 className="font-display text-lg tracking-wide flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Description
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {productDescription}
          </p>
        </div>
      )}

      {/* Technical Specs */}
      <div className="space-y-3">
        <h3 className="font-display text-lg tracking-wide">Détails du produit</h3>
        
        <div className="bg-secondary/50 rounded-xl p-4 border border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specs.map((spec, index) => {
              const IconComponent = spec.icon || Info;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-3 p-3 bg-background/50 rounded-lg"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      {spec.label}
                    </p>
                    <p className="font-medium text-foreground">
                      {spec.value}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Care Instructions */}
      <div className="space-y-3">
        <h3 className="font-display text-lg tracking-wide">Conseils d'entretien</h3>
        <div className="flex flex-wrap gap-2">
          {['Lavage 30°C', 'Pas de sèche-linge', 'Repassage doux', 'Pas de javel'].map((care, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-secondary rounded-full text-xs text-muted-foreground"
            >
              {care}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default UrbanwaveTechnicalSpecs;
