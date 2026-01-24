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
  Sparkles,
  Star,
  Zap,
  Flame
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp, Product } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { ThemeProvider } from '@/contexts/ThemeContext';
import DynamicThemeStyles from '@/components/shop/DynamicThemeStyles';
import Y2kImageGallery from './Y2kImageGallery';
import { Y2kHeader } from './Y2kHeader';
import { Y2kFooter } from './Y2kFooter';
import BottomNavMobile from '@/components/shop/BottomNavMobile';
import { CartSheet } from '@/components/CartSheet';

const Y2kProductDetail = () => {
  const { shopUrl, productId } = useParams<{ shopUrl: string; productId: string }>();
  const navigate = useNavigate();
  const { products, categories, addToCart, cart, shopSettings, addReview, getApprovedReviews, getProductRating } = useApp();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState<{ average: number; count: number }>({ average: 0, count: 0 });

  // Review form
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

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

    if (product.stock < quantity) {
      toast({
        title: "Stock insuffisant 😢",
        description: `Seulement ${product.stock} article(s) disponible(s)`,
        variant: "destructive"
      });
      return;
    }

    addToCart({ productId: product.id, quantity });
    toast({
      title: "Ajouté au panier! 🎉",
      description: `${quantity} x ${product.name} c'est dans le bag!`,
    });
    setIsCartOpen(true);
  };

  const handleSubmitReview = () => {
    if (!product) return;
    
    if (!reviewName.trim() || !reviewComment.trim()) {
      toast({
        title: "Oops! 😅",
        description: "Remplis tous les champs stp",
        variant: "destructive"
      });
      return;
    }

    addReview({
      productId: product.id,
      customerName: reviewName,
      rating: reviewRating,
      comment: reviewComment,
      verified: false,
      status: 'pending'
    });

    toast({
      title: "Avis envoyé! ✨",
      description: "Ton avis sera publié après validation",
    });

    setReviewName('');
    setReviewRating(5);
    setReviewComment('');
    setReviews(getApprovedReviews(product.id));
    setRating(getProductRating(product.id));
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
      <div className="min-h-screen flex items-center justify-center bg-background y2k-theme">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            😢
          </motion.div>
          <p className="text-muted-foreground mb-4 text-lg">Produit non trouvé...</p>
          <Button 
            onClick={() => navigate(`/shop/${shopUrl}`)}
            className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] hover:opacity-90"
          >
            Retour à la boutique
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <ThemeProvider themeId="y2k">
      <DynamicThemeStyles />
      <div className="min-h-screen bg-background pb-24 md:pb-0 y2k-theme">
        <Y2kHeader
          shopName={shopSettings?.shopName || 'GLOW SHOP'}
          logo={shopSettings?.logo}
          cartItemCount={cartItemsCount}
          onCartClick={() => setIsCartOpen(true)}
          shopUrl={shopUrl}
        />

        {/* Animated Background Blobs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[hsl(var(--primary)/0.08)] blur-3xl"
            animate={{ 
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-[hsl(var(--secondary)/0.08)] blur-3xl"
            animate={{ 
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1.2, 1, 1.2]
            }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full bg-[hsl(var(--accent)/0.06)] blur-3xl"
            animate={{ 
              x: [-100, 100, -100],
              scale: [1, 1.4, 1]
            }}
            transition={{ duration: 18, repeat: Infinity }}
          />
        </div>

        {/* Breadcrumb */}
        <div className="container mx-auto px-4 pt-24 pb-4 relative z-10">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(`/shop/${shopUrl}`)}
            className="flex items-center gap-2 text-muted-foreground hover:text-[hsl(var(--primary))] transition-colors group"
          >
            <motion.div
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowLeft className="h-4 w-4" />
            </motion.div>
            <span className="text-sm font-medium">Retour à la boutique</span>
          </motion.button>
        </div>

        {/* Product Content */}
        <div className="container mx-auto px-4 pb-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Y2kImageGallery 
                images={product.images || []} 
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
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {product.stock <= 5 && product.stock > 0 && (
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 flex items-center gap-1">
                      <Flame className="h-3 w-3" />
                      HOT
                    </Badge>
                  </motion.div>
                )}
                <Badge 
                  variant="outline" 
                  className="border-[hsl(var(--accent))] text-[hsl(var(--accent))] flex items-center gap-1"
                >
                  <Zap className="h-3 w-3" />
                  TRENDING
                </Badge>
              </div>

              {/* Category & Name */}
              <div className="space-y-2">
                {category && (
                  <span className="text-[hsl(var(--primary))] text-sm font-bold uppercase tracking-widest">
                    {category.name}
                  </span>
                )}
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                  {product.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <Star 
                          className={`h-5 w-5 ${
                            i < Math.round(rating.average) 
                              ? 'fill-[hsl(var(--accent))] text-[hsl(var(--accent))]' 
                              : 'text-muted'
                          }`} 
                        />
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({rating.count} avis)
                  </span>
                </div>
              </div>

              {/* Price */}
              <motion.div 
                className="relative"
                animate={{ 
                  textShadow: [
                    '0 0 10px hsl(var(--primary)/0.5)',
                    '0 0 20px hsl(var(--secondary)/0.5)',
                    '0 0 10px hsl(var(--accent)/0.5)',
                    '0 0 10px hsl(var(--primary)/0.5)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="font-display text-4xl md:text-5xl font-black bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent">
                  {formatPrice(product.price)}
                </span>
              </motion.div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-[hsl(var(--accent))]' : 'bg-destructive'} animate-pulse`} />
                <span className="text-sm font-medium">
                  {product.stock > 0 
                    ? `${product.stock} en stock` 
                    : 'Rupture de stock'
                  }
                </span>
              </div>

              {/* Quantity */}
              {product.stock > 0 && (
                <div className="space-y-3">
                  <h3 className="font-display text-lg tracking-wide font-bold">Quantité</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-secondary/50 rounded-full overflow-hidden border border-border">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="hover:bg-[hsl(var(--primary)/0.2)] hover:text-[hsl(var(--primary))] rounded-full"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <motion.span 
                        key={quantity}
                        initial={{ scale: 1.3 }}
                        animate={{ scale: 1 }}
                        className="w-12 text-center font-display text-xl font-bold"
                      >
                        {quantity}
                      </motion.span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="hover:bg-[hsl(var(--secondary)/0.2)] hover:text-[hsl(var(--secondary))] rounded-full"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="w-full h-14 font-display text-lg tracking-wider uppercase bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--accent))] hover:opacity-90 shadow-[0_0_30px_hsl(var(--primary)/0.4)] border-0"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    {product.stock === 0 ? 'Sold Out 😢' : 'Add to Bag ✨'}
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className={`h-14 border-2 ${isLiked ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]' : 'border-border'}`}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-[hsl(var(--primary))] text-[hsl(var(--primary))]' : ''}`} />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 border-2 border-border"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                {[
                  { icon: Truck, text: 'Livraison Express', color: 'primary' },
                  { icon: Shield, text: 'Paiement Sécurisé', color: 'secondary' },
                  { icon: Sparkles, text: 'Qualité Premium', color: 'accent' }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <motion.div 
                      className={`w-12 h-12 mx-auto mb-2 rounded-full bg-[hsl(var(--${item.color})/0.15)] flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                    >
                      <item.icon className={`h-6 w-6 text-[hsl(var(--${item.color}))]`} />
                    </motion.div>
                    <p className="text-xs text-muted-foreground font-medium">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Reviews Section */}
          <motion.div 
            className="mt-16 border-t border-border pt-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="h-6 w-6 text-[hsl(var(--accent))]" />
              <h2 className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent">
                Avis Clients
              </h2>
            </div>

            {rating.count > 0 && (
              <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl bg-secondary/30 border border-border">
                <div className="flex items-center gap-2">
                  <Star className="h-8 w-8 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />
                  <span className="text-4xl font-display font-black">{rating.average.toFixed(1)}</span>
                  <span className="text-muted-foreground">/ 5</span>
                </div>
                <div className="h-8 w-px bg-border" />
                <span className="text-muted-foreground">
                  {rating.count} avis vérifiés
                </span>
              </div>
            )}

            {/* Reviews List */}
            {reviews.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {reviews.map((review, index) => (
                  <motion.div 
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-5 rounded-2xl bg-card border border-border hover:border-[hsl(var(--primary)/0.5)] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-bold text-lg">{review.customerName}</p>
                        <div className="flex gap-0.5 my-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating
                                  ? 'fill-[hsl(var(--accent))] text-[hsl(var(--accent))]'
                                  : 'text-muted'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <p className="text-foreground">{review.comment}</p>
                    {review.verified && (
                      <Badge variant="secondary" className="mt-3 bg-[hsl(var(--accent)/0.15)] text-[hsl(var(--accent))]">
                        ✓ Achat vérifié
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground mb-8 text-center py-8">
                Aucun avis pour le moment. Sois le premier à donner ton avis! ✨
              </p>
            )}

            {/* Add Review Form */}
            <motion.div 
              className="p-6 rounded-3xl bg-gradient-to-br from-[hsl(var(--primary)/0.05)] via-[hsl(var(--secondary)/0.05)] to-[hsl(var(--accent)/0.05)] border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[hsl(var(--primary))]" />
                Laisser un avis
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="reviewName" className="font-medium">Ton nom</Label>
                  <Input
                    id="reviewName"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Comment tu t'appelles?"
                    className="mt-1 rounded-xl border-2 focus:border-[hsl(var(--primary))]"
                  />
                </div>
                
                <div>
                  <Label className="font-medium">Ta note</Label>
                  <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Star
                          className={`h-8 w-8 cursor-pointer transition-colors ${
                            star <= reviewRating
                              ? 'fill-[hsl(var(--accent))] text-[hsl(var(--accent))]'
                              : 'text-muted hover:text-[hsl(var(--accent)/0.5)]'
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="reviewComment" className="font-medium">Ton avis</Label>
                  <Textarea
                    id="reviewComment"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Dis-nous ce que tu penses de ce produit... ✨"
                    rows={4}
                    className="mt-1 rounded-xl border-2 focus:border-[hsl(var(--primary))]"
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    onClick={handleSubmitReview} 
                    className="w-full h-12 font-display tracking-wider uppercase bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] hover:opacity-90"
                  >
                    Publier l'avis ✨
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <Y2kFooter 
          shopName={shopSettings?.shopName || 'GLOW SHOP'}
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

export default Y2kProductDetail;
