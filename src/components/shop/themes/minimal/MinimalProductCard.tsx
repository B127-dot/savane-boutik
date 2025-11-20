import { Product } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Plus, Eye, Heart } from 'lucide-react';
import { useState } from 'react';

interface MinimalProductCardProps {
  product: Product;
  shopUrl: string;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
}

const MinimalProductCard = ({
  product,
  shopUrl,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isInWishlist = false,
}: MinimalProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-white overflow-hidden transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image épurée */}
      <AspectRatio ratio={1}>
        <div className="relative w-full h-full overflow-hidden bg-neutral-50">
          <img
            src={product.images[0] || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          />
          
          {/* Overlay minimaliste au survol */}
          <div className={`absolute inset-0 bg-white/80 backdrop-blur-sm transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
          
          {/* Actions rapides centrées */}
          <div className={`absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist?.(product.id);
              }}
              className="p-4 bg-white border border-neutral-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
            >
              <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="p-4 bg-white border border-neutral-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
            >
              <Eye className="h-5 w-5" />
            </button>
            <button
              onClick={() => onAddToCart(product)}
              disabled={product.stock === 0}
              className="p-4 bg-black text-white hover:bg-neutral-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          {/* Badge stock minimaliste */}
          {product.stock === 0 && (
            <div className="absolute top-4 left-4 px-4 py-2 bg-white border border-black text-black text-xs font-inter font-medium tracking-wider">
              ÉPUISÉ
            </div>
          )}
          {product.stock > 0 && product.stock <= 5 && (
            <div className="absolute top-4 left-4 px-4 py-2 bg-black text-white text-xs font-inter font-medium tracking-wider">
              STOCK LIMITÉ
            </div>
          )}
        </div>
      </AspectRatio>

      {/* Contenu minimaliste avec espacement généreux */}
      <div className="p-8 space-y-4">
        {/* Nom du produit */}
        <h3 className="font-inter text-lg font-normal text-black leading-tight tracking-wide min-h-[3rem] flex items-center">
          {product.name}
        </h3>

        {/* Prix épuré */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-inter font-light text-black">
            {product.price.toLocaleString()}
          </span>
          <span className="text-sm font-inter font-light text-neutral-400 tracking-wider">
            FCFA
          </span>
        </div>

        {/* Ligne séparatrice subtile */}
        <div className="h-px bg-neutral-100 my-4" />

        {/* Description courte */}
        {product.description && (
          <p className="text-sm font-inter font-light text-neutral-500 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Bouton d'achat minimaliste */}
        <Button
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
          variant="outline"
          className="w-full border-2 border-black text-black hover:bg-black hover:text-white font-inter text-sm font-medium tracking-wider py-6 rounded-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase"
        >
          {product.stock === 0 ? 'Indisponible' : 'Ajouter'}
        </Button>
      </div>
    </div>
  );
};

export default MinimalProductCard;
