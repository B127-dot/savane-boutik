import { Product } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { useState } from 'react';

interface ElegantProductCardProps {
  product: Product;
  shopUrl: string;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
}

const ElegantProductCard = ({
  product,
  shopUrl,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isInWishlist = false,
}: ElegantProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-white rounded-none border border-stone-200 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-amber-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image avec overlay élégant au survol */}
      <AspectRatio ratio={1}>
        <div className="relative w-full h-full overflow-hidden bg-stone-50">
          <img
            src={product.images[0] || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          
          {/* Overlay gradient au survol */}
          <div className={`absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
          
          {/* Actions rapides */}
          <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist?.(product.id);
              }}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-amber-50 transition-all duration-300 hover:scale-110"
            >
              <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-amber-600 text-amber-600' : 'text-stone-700'}`} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-amber-50 transition-all duration-300 hover:scale-110"
            >
              <Eye className="h-4 w-4 text-stone-700" />
            </button>
          </div>

          {/* Badge Stock */}
          {product.stock === 0 && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-stone-900/90 backdrop-blur-sm text-white text-xs font-cormorant tracking-wide">
              Épuisé
            </div>
          )}
          {product.stock > 0 && product.stock <= 5 && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-amber-600/90 backdrop-blur-sm text-white text-xs font-cormorant tracking-wide">
              Stock Limité
            </div>
          )}
        </div>
      </AspectRatio>

      {/* Contenu du produit */}
      <div className="p-6 space-y-4 text-center bg-gradient-to-b from-white to-stone-50/30">
        {/* Nom du produit */}
        <h3 className="font-playfair text-xl text-stone-900 font-semibold leading-tight min-h-[3.5rem] flex items-center justify-center">
          {product.name}
        </h3>

        {/* Ligne décorative */}
        <div className="flex items-center justify-center gap-2">
          <div className="h-px w-8 bg-amber-300" />
          <div className="w-1 h-1 rounded-full bg-amber-600" />
          <div className="h-px w-8 bg-amber-300" />
        </div>

        {/* Prix avec typographie élégante */}
        <div className="space-y-1">
          <div className="text-3xl font-playfair font-bold text-stone-900">
            {product.price.toLocaleString()}
          </div>
          <div className="text-sm font-cormorant text-stone-600 tracking-wide">
            FCFA
          </div>
        </div>

        {/* Bouton d'achat élégant */}
        <Button
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
          className="w-full bg-stone-900 hover:bg-amber-700 text-white font-cormorant text-base tracking-wide py-6 rounded-none transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <ShoppingBag className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
          {product.stock === 0 ? 'Indisponible' : 'Ajouter au Panier'}
        </Button>

        {/* Description courte */}
        {product.description && (
          <p className="text-sm font-cormorant text-stone-600 leading-relaxed line-clamp-2 mt-3">
            {product.description}
          </p>
        )}
      </div>

      {/* Bordure dorée au survol */}
      <div className={`absolute inset-0 border-2 border-amber-400 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
};

export default ElegantProductCard;
