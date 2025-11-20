import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Product } from '@/contexts/AppContext';
import { ShoppingCart, X, Star, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const QuickViewModal = ({ product, isOpen, onClose, onAddToCart }: QuickViewModalProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();
  const { shopUrl } = useParams<{ shopUrl: string }>();

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Aperçu rapide du produit</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Images Column */}
          <div className="space-y-4">
            {/* Main Carousel */}
            <Carousel className="w-full">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <AspectRatio ratio={1}>
                      <img 
                        src={image} 
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </AspectRatio>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>

            {/* Image Position Indicator */}
            {product.images.length > 1 && (
              <div className="text-center text-sm text-muted-foreground">
                Image {selectedImage + 1} / {product.images.length}
              </div>
            )}

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md border-2 overflow-hidden transition-all ${
                      selectedImage === index 
                        ? 'border-primary shadow-glow' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Column */}
          <div className="space-y-6">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(12 avis)</span>
            </div>

            {/* Product Name */}
            <h2 className="text-3xl font-bold text-foreground">{product.name}</h2>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.originalPrice!)}
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${product.stock > 10 ? 'bg-success' : 'bg-warning'}`} />
              <span className="text-sm text-muted-foreground">
                {product.stock > 10 ? 'En stock' : `Plus que ${product.stock} en stock`}
              </span>
            </div>

            {/* Description */}
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground/80">{product.description}</p>
            </div>

            {/* Category */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Catégorie:</span>
              <span className="font-medium text-foreground">{product.categoryId}</span>
            </div>

            {/* Add to Cart Button */}
            <Button 
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg shadow-glow"
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Ajouter au panier
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
