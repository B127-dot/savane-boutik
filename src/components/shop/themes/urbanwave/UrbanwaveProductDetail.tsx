import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Minus, 
  Plus, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RefreshCw,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp, Product } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { ThemeProvider } from '@/contexts/ThemeContext';
import DynamicThemeStyles from '@/components/shop/DynamicThemeStyles';
import UrbanwaveImageGallery from './UrbanwaveImageGallery';
import UrbanwaveSizeSelector from './UrbanwaveSizeSelector';
import UrbanwaveTechnicalSpecs from './UrbanwaveTechnicalSpecs';
import UrbanwaveHeader from './UrbanwaveHeader';
import UrbanwaveFooter from './UrbanwaveFooter';
import BottomNavMobile from '@/components/shop/BottomNavMobile';
import QuickViewModal from '@/components/shop/QuickViewModal';
import { CartSheet } from '@/components/CartSheet';

const UrbanwaveProductDetail = () => {
  const { shopUrl, productId } = useParams<{ shopUrl: string; productId: string }>();
  const navigate = useNavigate();
  const { products, categories, addToCart, cart, shopSettings } = useApp();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!product) return;
    
    if (!selectedSize) {
      toast({
        title: "Sélectionnez une taille",
        description: "Veuillez choisir une taille avant d'ajouter au panier",
        variant: "destructive"
      });
      return;
    }

    if (product.stock < quantity) {
      toast({
        title: "Stock insuffisant",
        description: `Seulement ${product.stock} article(s) disponible(s)`,
        variant: "destructive"
      });
      return;
    }

    addToCart({ productId: product.id, quantity });
    toast({
      title: "Produit ajouté !",
      description: `${quantity} x ${product.name} (Taille ${selectedSize}) ajouté(s) au panier`,
    });
    setIsCartOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(price) + ' FCFA';
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const category = product ? categories.find(c => c.id === product.categoryId) : null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background urbanwave-theme">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Produit non trouvé</p>
          <Button onClick={() => navigate(`/shop/${shopUrl}`)}>
            Retour à la boutique
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider themeId="urbanwave">
      <DynamicThemeStyles />
      <div className="min-h-screen bg-background pb-20 md:pb-0 urbanwave-theme">
        <UrbanwaveHeader
          shopName={shopSettings?.shopName || 'URBANWAVE'}
          logo={shopSettings?.logo}
          cartItemCount={cartItemsCount}
          onCartClick={() => setIsCartOpen(true)}
          shopUrl={shopUrl}
        />

        {/* Breadcrumb */}
        <div className="container mx-auto px-4 pt-20 pb-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(`/shop/${shopUrl}`)}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Retour à la boutique</span>
          </motion.button>
        </div>

        {/* Product Content */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <UrbanwaveImageGallery 
                images={product.images} 
                productName={product.name} 
              />
            </motion.div>

            {/* Right: Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Category & Name */}
              <div className="space-y-2">
                {category && (
                  <span className="text-primary text-sm font-medium uppercase tracking-widest">
                    {category.name}
                  </span>
                )}
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight">
                  {product.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < 4 ? 'fill-primary text-primary' : 'text-muted'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(24 avis)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-display text-4xl text-gradient">
                  {formatPrice(product.price)}
                </span>
                {product.stock <= 5 && product.stock > 0 && (
                  <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-medium rounded-full">
                    Plus que {product.stock} en stock
                  </span>
                )}
              </div>

              {/* Size Selector */}
              <UrbanwaveSizeSelector 
                onSizeSelect={setSelectedSize}
                selectedSize={selectedSize}
              />

              {/* Quantity */}
              <div className="space-y-3">
                <h3 className="font-display text-lg tracking-wide">Quantité</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-secondary rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="hover:bg-transparent hover:text-primary"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-display text-lg">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="hover:bg-transparent hover:text-primary"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.stock} disponible(s)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  size="lg"
                  className="flex-1 h-14 font-display text-lg tracking-wider uppercase btn-glow"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  {product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-primary text-primary' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">Livraison Express</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                    <RefreshCw className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">Retours 30 jours</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">Paiement sécurisé</p>
                </div>
              </div>

              {/* Technical Specs */}
              <UrbanwaveTechnicalSpecs productDescription={product.description} />
            </motion.div>
          </div>
        </div>

        <UrbanwaveFooter 
          shopName={shopSettings?.shopName || 'URBANWAVE'}
          shopUrl={shopUrl}
        />

        <BottomNavMobile
          cartItemsCount={cartItemsCount}
          onCartClick={() => setIsCartOpen(true)}
          onCategoriesClick={() => navigate(`/shop/${shopUrl}#categories`)}
          onHomeClick={() => navigate(`/shop/${shopUrl}`)}
        />

        <CartSheet
          open={isCartOpen}
          onOpenChange={setIsCartOpen}
          shopUrl={shopUrl || ''}
          shopSettings={shopSettings}
        />
      </div>
    </ThemeProvider>
  );
};

export default UrbanwaveProductDetail;
