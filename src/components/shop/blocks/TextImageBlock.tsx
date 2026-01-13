import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface TextImageBlockProps {
  title?: string;
  text?: string;
  imageUrl?: string;
  imagePosition?: 'left' | 'right';
  buttonText?: string;
  buttonLink?: string;
  animationsEnabled?: boolean;
}

const TextImageBlock = ({
  title = 'Notre histoire',
  text = 'Nous sommes une boutique en ligne passionnée par la qualité et le service client. Depuis notre création, nous nous efforçons de vous offrir les meilleurs produits aux meilleurs prix, avec une livraison rapide partout au Burkina Faso.',
  imageUrl = '/placeholder.svg',
  imagePosition = 'right',
  buttonText,
  buttonLink,
  animationsEnabled = true
}: TextImageBlockProps) => {
  const MotionDiv = animationsEnabled ? motion.div : 'div' as any;

  const imageComponent = (
    <MotionDiv
      initial={animationsEnabled ? { opacity: 0, x: imagePosition === 'right' ? 50 : -50 } : undefined}
      whileInView={animationsEnabled ? { opacity: 1, x: 0 } : undefined}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
        <img 
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Decorative element */}
      <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl bg-primary/10" />
    </MotionDiv>
  );

  const textComponent = (
    <MotionDiv
      initial={animationsEnabled ? { opacity: 0, x: imagePosition === 'right' ? -50 : 50 } : undefined}
      whileInView={animationsEnabled ? { opacity: 1, x: 0 } : undefined}
      viewport={{ once: true }}
      className="flex flex-col justify-center"
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
        {title}
      </h2>
      <p className="text-muted-foreground leading-relaxed text-lg mb-6">
        {text}
      </p>
      {buttonText && (
        <div>
          <Button 
            size="lg"
            className="gap-2"
            onClick={() => buttonLink && (window.location.href = buttonLink)}
          >
            {buttonText}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </MotionDiv>
  );

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {imagePosition === 'left' ? (
            <>
              {imageComponent}
              {textComponent}
            </>
          ) : (
            <>
              {textComponent}
              {imageComponent}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default TextImageBlock;
