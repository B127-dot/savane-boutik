import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Y2kImageGalleryProps {
  images: string[];
  productName: string;
}

const Y2kImageGallery = ({ images, productName }: Y2kImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  
  const displayImages = images?.length > 0 ? images : ['/placeholder.svg'];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[hsl(var(--primary)/0.2)] via-[hsl(var(--secondary)/0.15)] to-[hsl(var(--accent)/0.1)]">
        {/* Animated Glow Border */}
        <div className="absolute inset-0 rounded-3xl p-1 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--accent))] animate-pulse opacity-60" />
        
        {/* Inner Container */}
        <div className="absolute inset-1 rounded-[22px] overflow-hidden bg-background">
          {/* Floating Sparkles */}
          <motion.div
            className="absolute top-4 right-4 z-10"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 4, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
          >
            <Sparkles className="h-6 w-6 text-[hsl(var(--accent))]" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-6 left-6 z-10"
            animate={{ 
              y: [0, -10, 0],
              rotate: [-10, 10, -10]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="h-5 w-5 text-[hsl(var(--primary))]" />
          </motion.div>

          {/* Main Image with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              transition={{ 
                duration: 0.5, 
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              className="relative w-full h-full cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
            >
              <img
                src={displayImages[currentIndex]}
                alt={`${productName} - Image ${currentIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Hover Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary)/0.3)] via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center pb-8"
              >
                <div className="flex items-center gap-2 text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                  <ZoomIn className="h-4 w-4" />
                  <span className="text-sm font-medium">Cliquer pour zoomer</span>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {displayImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-[hsl(var(--primary)/0.8)] hover:bg-[hsl(var(--primary))] text-white shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-all hover:scale-110"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-[hsl(var(--secondary)/0.8)] hover:bg-[hsl(var(--secondary))] text-white shadow-[0_0_20px_hsl(var(--secondary)/0.5)] transition-all hover:scale-110"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Image Counter Badge */}
          <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-bold">
            {currentIndex + 1} / {displayImages.length}
          </div>
        </div>
      </div>

      {/* Thumbnails with Glow Effect */}
      {displayImages.length > 1 && (
        <div className="flex gap-3 justify-center">
          {displayImages.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden transition-all ${
                index === currentIndex 
                  ? 'ring-2 ring-offset-2 ring-offset-background ring-[hsl(var(--primary))]' 
                  : 'opacity-60 hover:opacity-100'
              }`}
              whileHover={{ scale: 1.1, rotate: index === currentIndex ? 0 : [-2, 2, -2] }}
              whileTap={{ scale: 0.95 }}
              animate={index === currentIndex ? {
                boxShadow: [
                  '0 0 10px hsl(var(--primary)/0.5)',
                  '0 0 20px hsl(var(--secondary)/0.5)',
                  '0 0 10px hsl(var(--accent)/0.5)',
                  '0 0 10px hsl(var(--primary)/0.5)'
                ]
              } : {}}
              transition={{ 
                boxShadow: { duration: 2, repeat: Infinity },
                default: { type: "spring", stiffness: 300 }
              }}
            >
              <img
                src={image}
                alt={`Miniature ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary)/0.4)] to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* Fullscreen Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            {/* Animated Background Blobs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[hsl(var(--primary)/0.15)] blur-3xl"
              animate={{ 
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[hsl(var(--secondary)/0.15)] blur-3xl"
              animate={{ 
                x: [0, -50, 0],
                y: [0, -30, 0],
                scale: [1.2, 1, 1.2]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            <motion.img
              src={displayImages[currentIndex]}
              alt={productName}
              className="max-w-full max-h-[90vh] object-contain rounded-2xl"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />

            {/* Close hint */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Cliquer pour fermer
            </motion.div>

            {/* Navigation in zoom mode */}
            {displayImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.8)] text-white shadow-[0_0_30px_hsl(var(--primary)/0.6)]"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary)/0.8)] text-white shadow-[0_0_30px_hsl(var(--secondary)/0.6)]"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Y2kImageGallery;
