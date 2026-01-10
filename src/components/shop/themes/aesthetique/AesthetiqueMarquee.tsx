import { motion } from 'framer-motion';

interface MarqueeItem {
  text: string;
}

interface AesthetiqueMarqueeProps {
  items?: MarqueeItem[];
}

const defaultItems = [
  { text: 'Design Minimaliste' },
  { text: 'Matériaux Durables' },
  { text: 'Fait Main' },
  { text: 'Livraison Mondiale' },
];

const AesthetiqueMarquee = ({ items = defaultItems }: AesthetiqueMarqueeProps) => {
  // Duplicate items for seamless loop
  const allItems = [...items, ...items, ...items, ...items];

  return (
    <section className="border-b border-zinc-900/50 bg-zinc-950 py-8 overflow-hidden">
      <motion.div
        className="flex items-center gap-12 md:gap-24 whitespace-nowrap"
        animate={{ x: [0, -50 * items.length * 4] }}
        transition={{ 
          duration: 40, 
          repeat: Infinity, 
          ease: 'linear' 
        }}
      >
        {allItems.map((item, index) => (
          <div key={index} className="flex items-center gap-12 md:gap-24 px-6">
            <span className="text-xl md:text-2xl font-light uppercase tracking-widest text-zinc-500">
              {item.text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-800"></span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default AesthetiqueMarquee;
