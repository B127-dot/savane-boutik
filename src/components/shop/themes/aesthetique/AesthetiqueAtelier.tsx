import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

interface AesthetiqueAtelierProps {
  title?: string;
  subtitle?: string;
  steps?: ProcessStep[];
  images?: string[];
}

const defaultSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Matériaux',
    subtitle: 'Sources Éthiques',
    description: "Nous travaillons exclusivement avec des bois certifiés FSC et des fibres naturelles. Chaque imperfection du grain témoigne du design naturel, préservé par notre processus de sélection minutieux."
  },
  {
    number: '02',
    title: 'Design',
    subtitle: 'La Forme Suit la Vie',
    description: "Nos formes sont dérivées du corps humain et des courbes organiques. Nous rejetons l'ornementation excessive en faveur de lignes épurées et d'une beauté fonctionnelle qui élève vos rituels quotidiens."
  },
  {
    number: '03',
    title: 'Espace',
    subtitle: 'Harmonie du Foyer',
    description: "Nos objets ne sont pas destinés à être seuls mais à s'harmoniser avec votre environnement. Ils apportent un sentiment de calme et d'ordre au style de vie moderne chaotique."
  }
];

const defaultImages = [
  "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=2574&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2727&auto=format&fit=crop"
];

const AesthetiqueAtelier = ({
  title = "Crafted with Intention.",
  subtitle = "L'Atelier",
  steps = defaultSteps,
  images = defaultImages
}: AesthetiqueAtelierProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setActiveStep(index);
            }
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-zinc-950 border-t border-zinc-900/50" id="about">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Sticky Image - Desktop Only */}
          <div className="hidden lg:block relative h-full min-h-screen border-r border-zinc-900/50">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center p-12 lg:p-16">
              <div className="relative w-full h-[85vh] max-h-[800px] flex items-start">
                <div className="relative w-full h-full overflow-hidden rounded-[2rem] border border-zinc-800/50">
                  {images.map((image, index) => (
                    <motion.img
                      key={index}
                      src={image}
                      alt={`Process ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ 
                        opacity: activeStep === index ? 1 : 0,
                        scale: activeStep === index ? 1 : 1.05
                      }}
                      transition={{ duration: 0.7, ease: [0.2, 0, 0.2, 1] }}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950/60"></div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Scroll Content */}
          <div className="px-6 md:px-12 py-24 md:py-32 flex flex-col gap-32">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="font-instrument-serif text-2xl text-emerald-500 italic mb-4 block">
                {subtitle}
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight font-instrument-serif">
                {title.split(' ').slice(0, 2).join(' ')} <br />
                <span className="text-zinc-600">{title.split(' ').slice(2).join(' ')}</span>
              </h2>
            </motion.div>

            {/* Steps */}
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => { stepRefs.current[index] = el }}
                className="group flex flex-col justify-center min-h-[40vh] border-l border-zinc-800 pl-8 transition-colors duration-500 hover:border-emerald-500/50"
              >
                <span className="text-sm uppercase tracking-widest text-zinc-500 mb-4 block group-hover:text-emerald-500 transition-colors">
                  {step.number}. {step.title}
                </span>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-instrument-serif text-white tracking-tight mb-6">
                  {step.subtitle}
                </h3>
                <p className="text-lg text-zinc-400 font-light leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AesthetiqueAtelier;
