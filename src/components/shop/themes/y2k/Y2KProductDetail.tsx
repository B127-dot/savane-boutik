import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, ShoppingBag, Minus, Plus, Star, Sparkles, Zap, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp, Product } from '@/contexts/AppContext';
import { CartSheet } from '@/components/CartSheet';
import { useToast } from '@/hooks/use-toast';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { generateProductMessage } from '@/lib/whatsapp';
import { DEFAULT_TEXTS } from '@/lib/defaultTexts';
import Y2KHeader from './Y2KHeader';
import Y2KFooter from './Y2KFooter';
import { ThemeProvider } from '@/contexts/ThemeContext';
import DynamicThemeStyles from '@/components/shop/DynamicThemeStyles';

// Tailles disponibles
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const Y2KProductDetail = () => {
  const { shopUrl, productId } = useParams<{ shopUrl: string; productId: string }>();
  const navigate = useNavigate();
  const { products, categories, addToCart, cart, shopSettings, addReview, getApprovedReviews, getProductRating } = useApp();
  const { toast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState<{ average: number; count: number }>({ average: 0, count: 0 });

  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setReviews(getApprovedReviews(foundProduct.id));
      setRating(getProductRating(foundProduct.id));
    }
  }, [productId, products, getApprovedReviews, getProductRating]);

  const handleAddToCart = () => {
    if (!product) return;

    if (!selectedSize) {
      toast({
        title: "Oups ! 💫",
        description: "Choisis ta taille avant d'ajouter au panier",
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
      title: "Ajouté ! ✨",
      description: `${quantity} x ${product.name} (Taille ${selectedSize})`,
    });
    setIsCartOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const category = product ? categories.find(c => c.id === product.categoryId) : null;

  // Check if product is new
  const isNew = () => {
    if (!product?.createdAt) return false;
    const createdDate = new Date(product.createdAt);
    const daysSinceCreated = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysSinceCreated <= 7;
  };

  if (!product) {
    return (
      <ThemeProvider themeId="y2k">
        <DynamicThemeStyles />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <Sparkles className="w-16 h-16 mx-auto text-primary animate-pulse" />
            <p className="text-muted-foreground font-display">Produit non trouvé</p>
            <Button 
              onClick={() => navigate(`/shop/${shopUrl}`)}
              className="bg-gradient-primary text-primary-foreground font-display font-bold rounded-full"
            >
              Retour à la boutique
            </Button>
          </motion.div>
        </div>
      </ThemeProvider>
    );
  }

  const images = product.images?.length > 0 ? product.images : ['/placeholder.svg'];

  return (
    <ThemeProvider themeId="y2k">
      <DynamicThemeStyles />
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <Y2KHeader
          shopName={shopSettings?.shopName || 'GLOWUP'}
          logo={shopSettings?.logo}
          cartItemCount={cartItemsCount}
          onCartClick={() => setIsCartOpen(true)}
          shopUrl={shopUrl}
        />

        {/* Spacer for fixed header */}
        <div className="h-16" />

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(`/shop/${shopUrl}`)}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-display"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Retour</span>
          </motion.button>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left: Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-card border-4 border-primary/20">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImageIndex}
                    src={images[selectedImageIndex]}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {isNew() && (
                    <motion.span
                      initial={{ scale: 0, rotate: -12 }}
                      animate={{ scale: 1, rotate: -12 }}
                      className="bg-gradient-primary text-primary-foreground font-display text-xs font-bold uppercase px-3 py-1.5 rounded-full shadow-lg"
                    >
                      {DEFAULT_TEXTS.productCard.newBadge}
                    </motion.span>
                  )}
                  {product.stock <= 5 && product.stock > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-secondary text-secondary-foreground font-display text-xs font-bold uppercase px-3 py-1.5 rounded-full shadow-lg"
                    >
                      {DEFAULT_TEXTS.productCard.limitedBadge}
                    </motion.span>
                  )}
                </div>

                {/* Like Button */}
                <motion.button
                  onClick={() => setIsLiked(!isLiked)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg"
                >
                  <Heart
                    className={`w-6 h-6 transition-colors ${
                      isLiked ? 'fill-primary text-primary' : 'text-muted-foreground'
                    }`}
                  />
                </motion.button>

                {/* Floating sparkles decoration */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 10, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute bottom-4 right-4"
                >
                  <Sparkles className="w-8 h-8 text-primary/60" />
                </motion.div>
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-3 transition-all ${
                        selectedImageIndex === index 
                          ? 'border-primary shadow-lg ring-2 ring-primary/30' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {selectedImageIndex === index && (
                        <motion.div
                          layoutId="thumb-indicator"
                          className="absolute inset-0 bg-primary/10"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right: Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Category */}
              {category && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block text-primary text-sm font-display font-semibold uppercase tracking-widest"
                >
                  {category.name}
                </motion.span>
              )}

              {/* Product Name */}
              <h1 className="font-display font-black text-3xl md:text-4xl text-foreground leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              {rating.count > 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.round(rating.average)
                            ? 'fill-primary text-primary'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground font-display">
                    ({rating.count} avis)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <motion.span 
                  className="font-display font-black text-4xl bg-gradient-primary bg-clip-text text-transparent"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  {formatPrice(product.price)}
                </motion.span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed font-body">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.stock > 0 ? (
                  <Badge 
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20 font-display"
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    {product.stock} en stock
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="font-display">
                    {DEFAULT_TEXTS.productCard.outOfStock}
                  </Badge>
                )}
              </div>

              {/* Size Selector */}
              {product.stock > 0 && (
                <div className="space-y-3">
                  <label className="font-display font-bold text-sm uppercase tracking-wider">
                    Taille <span className="text-primary">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map((size) => (
                      <motion.button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative w-12 h-12 rounded-xl font-display font-bold text-sm transition-all ${
                          selectedSize === size
                            ? 'bg-gradient-primary text-primary-foreground shadow-lg ring-2 ring-primary/50'
                            : 'bg-card border-2 border-border text-foreground hover:border-primary hover:bg-primary/10'
                        }`}
                      >
                        {size}
                        {selectedSize === size && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center"
                          >
                            <Check className="w-3 h-3" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              {product.stock > 0 && (
                <div className="space-y-4 pt-4 border-t border-border">
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4">
                    <label className="font-display font-bold text-sm uppercase tracking-wider">
                      Quantité
                    </label>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="w-10 h-10 rounded-full bg-card border-2 border-border flex items-center justify-center text-foreground hover:border-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </motion.button>
                      <span className="w-12 text-center font-display font-black text-xl">
                        {quantity}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        disabled={quantity >= product.stock}
                        className="w-10 h-10 rounded-full bg-card border-2 border-border flex items-center justify-center text-foreground hover:border-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    onClick={handleAddToCart}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 bg-gradient-primary text-primary-foreground font-display font-black text-lg py-4 rounded-full shadow-xl hover:shadow-2xl transition-shadow"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {DEFAULT_TEXTS.productCard.addToCart}
                  </motion.button>

                  {/* WhatsApp Button */}
                  {shopSettings?.socialLinks?.whatsapp && (
                    <WhatsAppButton
                      phoneNumber={shopSettings.socialLinks.whatsapp}
                      message={generateProductMessage(product, quantity, shopSettings.shopName)}
                      variant="outline"
                      label={DEFAULT_TEXTS.whatsapp.buttonText}
                      className="w-full font-display font-bold rounded-full"
                      size="lg"
                    />
                  )}
                </div>
              )}

              {/* Trust Features */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                {DEFAULT_TEXTS.trustBar.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-center p-3 rounded-xl bg-card border border-border"
                  >
                    <span className="text-xs text-muted-foreground font-display font-medium">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-border"
          >
            <h2 className="font-display font-black text-2xl mb-6">Avis clients ✨</h2>
            
            {reviews.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="p-5 rounded-2xl bg-card border-2 border-border"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-display font-bold">{review.customerName}</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? 'fill-primary text-primary'
                                : 'text-muted-foreground/30'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground font-body text-sm">{review.comment}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Pas encore d'avis. Sois le premier à donner ton avis ! 💬
              </p>
            )}
          </motion.div>
        </div>

        <Y2KFooter
          shopName={shopSettings?.shopName || 'GLOWUP'}
          logo={shopSettings?.logo}
          whatsapp={shopSettings?.socialLinks?.whatsapp}
          facebook={shopSettings?.socialLinks?.facebook}
          instagram={shopSettings?.socialLinks?.instagram}
          tiktok={shopSettings?.socialLinks?.tiktok}
        />

        {/* Cart Sheet */}
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

export default Y2KProductDetail;
