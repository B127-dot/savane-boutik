import { motion } from 'framer-motion';

interface SavaneLookbookProps {
  images?: string[];
}

const SavaneLookbook = ({ images }: SavaneLookbookProps) => {
  const defaultImages = [
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop'
  ];

  const lookbookImages = images?.length ? images : defaultImages;

  return (
    <section id="lookbook" className="py-16 md:py-24 px-4 md:px-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 md:mb-16"
      >
        <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-[0.05em] text-foreground">
          LOOKBOOK
        </h2>
      </motion.div>

      {/* Two Images Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground">
        {lookbookImages.slice(0, 2).map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="aspect-[4/5] bg-background"
          >
            <img
              src={image}
              alt={`Lookbook ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SavaneLookbook;
