import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Eye, Sparkles } from 'lucide-react';
import { Product } from '@/contexts/AppContext';

interface CreativeProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const colorClasses = [
  'from-[#FF1B8D] to-[#9D4EDD]',
  'from-[#FF6B35] to-[#F7931E]',
  'from-[#00F5FF] to-[#9D4EDD]',
  'from-[#9D4EDD] to-[#FF1B8D]',
];

export const CreativeProductCard = ({ product, onAddToCart }: CreativeProductCardProps) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const randomColorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOutOfStock) {
      onAddToCart(product);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden bg-gradient-to-br from-white to-gray-50 border-2 border-transparent hover:border-[#FF1B8D] transition-all duration-500 hover:shadow-2xl hover:shadow-[#FF1B8D]/20 hover:-translate-y-2 hover:rotate-1"
      onClick={handleCardClick}
    >
      {/* Image Container with Creative Border */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Gradient Overlay on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${randomColorClass} opacity-0 group-hover:opacity-20 transition-all duration-500 z-10`}></div>
        
        {/* Product Image */}
        {product.images && product.images[0] && (
          <>
            <img
              src={product.images[0]}
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-3 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#FF1B8D] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
          {isOutOfStock && (
            <Badge className="bg-gray-900 text-white font-fredoka font-bold px-3 py-1 shadow-lg">
              Épuisé
            </Badge>
          )}
          {isLowStock && (
            <Badge className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white font-fredoka font-bold px-3 py-1 shadow-lg animate-pulse">
              <Sparkles className="w-3 h-3 mr-1" />
              Stock limité
            </Badge>
          )}
          {product.featured && (
            <Badge className="bg-gradient-to-r from-[#FF1B8D] to-[#9D4EDD] text-white font-fredoka font-bold px-3 py-1 shadow-lg">
              ⭐ Vedette
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <Button
            size="icon"
            variant="secondary"
            className="bg-white/90 backdrop-blur-md hover:bg-white shadow-xl rounded-full w-10 h-10 hover:scale-110 transition-transform"
            onClick={handleWishlist}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#FF1B8D] text-[#FF1B8D]' : 'text-gray-700'}`} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="bg-white/90 backdrop-blur-md hover:bg-white shadow-xl rounded-full w-10 h-10 hover:scale-110 transition-transform"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
          >
            <Eye className="w-4 h-4 text-gray-700" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Product Name */}
        <div className="min-h-[3rem]">
          <h3 className="font-fredoka font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-[#FF1B8D] transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Decorative Line */}
        <div className="h-1 w-16 bg-gradient-to-r from-[#FF1B8D] via-[#9D4EDD] to-[#00F5FF] rounded-full group-hover:w-full transition-all duration-500"></div>

        {/* Price and Stock */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-righteous bg-gradient-to-r from-[#FF1B8D] to-[#9D4EDD] bg-clip-text text-transparent">
              {product.price.toLocaleString('fr-FR')} F
            </div>
            {isLowStock && (
              <div className="text-xs text-[#FF6B35] font-fredoka font-semibold mt-1">
                Plus que {product.stock} en stock
              </div>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full font-fredoka font-bold text-base py-6 rounded-2xl shadow-lg transition-all duration-300 ${
            isOutOfStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#FF1B8D] to-[#9D4EDD] hover:from-[#FF1B8D] hover:to-[#FF6B35] text-white hover:shadow-2xl hover:shadow-[#FF1B8D]/50 hover:scale-105'
          }`}
        >
          {isOutOfStock ? (
            'Rupture de stock'
          ) : (
            <>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Ajouter au panier
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};
