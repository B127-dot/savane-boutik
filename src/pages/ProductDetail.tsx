import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Minus, Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp, Product } from '@/contexts/AppContext';
import { CartSheet } from '@/components/CartSheet';
import ThemeToggle from '@/components/ThemeToggle';
import { useToast } from '@/hooks/use-toast';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { generateProductMessage } from '@/lib/whatsapp';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Themed Product Detail Pages
import { UrbanwaveProductDetail } from '@/components/shop/themes/urbanwave';
import { Y2KProductDetail } from '@/components/shop/themes/y2k';

const ProductDetail = () => {
  const { shopUrl, productId } = useParams<{ shopUrl: string; productId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { products, categories, addToCart, cart, shopSettings, addReview, getApprovedReviews, getProductRating } = useApp();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState<{ average: number; count: number }>({ average: 0, count: 0 });

  // Get current theme
  const previewTheme = searchParams.get('previewTheme');
  const currentTheme = previewTheme || shopSettings?.selectedTheme || 'modern';
  
  // Render themed product detail if theme requires it
  if (currentTheme === 'urbanwave') {
    return <UrbanwaveProductDetail />;
  }
  
  if (currentTheme === 'y2k') {
    return <Y2KProductDetail />;
  }
  
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
    if (product) {
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
        description: `${quantity} x ${product.name} ajouté(s) au panier`,
      });
      setIsCartOpen(true);
    }
  };

  const handleSubmitReview = () => {
    if (!product) return;
    
    if (!reviewName.trim() || !reviewComment.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
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
      title: "Avis envoyé !",
      description: "Votre avis sera publié après validation",
    });

    // Reset form
    setReviewName('');
    setReviewRating(5);
    setReviewComment('');
    
    // Reload reviews
    setReviews(getApprovedReviews(product.id));
    setRating(getProductRating(product.id));
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(`/shop/${shopUrl}`)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la boutique
            </Button>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button
                variant="outline"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Images Gallery with Carousel */}
          <div className="space-y-4">
            {product.images && product.images.length > 0 ? (
              <>
                {/* Main Carousel */}
                <Carousel className="w-full">
                  <CarouselContent>
                    {product.images.map((image: string, index: number) => (
                      <CarouselItem key={index}>
                        <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                          <img
                            src={image}
                            alt={`${product.name} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {product.images.length > 1 && (
                    <>
                      <CarouselPrevious className="left-4" />
                      <CarouselNext className="right-4" />
                    </>
                  )}
                </Carousel>

                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.map((image: string, index: number) => (
                      <div
                        key={index}
                        className="aspect-square rounded-md overflow-hidden border-2 border-border hover:border-primary transition-colors cursor-pointer"
                      >
                        <img
                          src={image}
                          alt={`Miniature ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Aucune image disponible</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <p className="text-sm text-muted-foreground">
                Catégorie: {categories.find(c => c.id === product.categoryId)?.name || 'N/A'}
              </p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">
                {product.price.toLocaleString()} FCFA
              </span>
            </div>

            <p className="text-foreground leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-2">
              <Badge variant={product.stock > 10 ? 'default' : 'destructive'}>
                {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
              </Badge>
              {product.status === 'active' && (
                <Badge variant="outline">Disponible</Badge>
              )}
            </div>

            {product.stock > 0 && (
              <div className="space-y-4 pt-4 border-t">
                <div>
                  <label className="text-sm font-medium mb-2 block">Quantité</label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="w-full"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Ajouter au panier
                </Button>

                {shopSettings?.socialLinks?.whatsapp && (
                  <WhatsAppButton
                    phoneNumber={shopSettings.socialLinks.whatsapp}
                    message={generateProductMessage(product, quantity, shopSettings.shopName)}
                    variant="outline"
                    label="Commander via WhatsApp"
                    className="w-full"
                    size="lg"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 border-t pt-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Avis clients</h2>
            {rating.count > 0 && (
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-6 w-6 fill-primary text-primary" />
                  <span className="text-3xl font-bold">{rating.average}</span>
                  <span className="text-muted-foreground">/ 5</span>
                </div>
                <span className="text-muted-foreground">
                  {rating.count} avis
                </span>
              </div>
            )}
          </div>

          {/* Reviews List */}
          {reviews.length > 0 ? (
            <div className="space-y-6 mb-8">
              {reviews.map((review) => (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{review.customerName}</p>
                      <div className="flex gap-1 my-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? 'fill-primary text-primary'
                                : 'text-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <p className="text-foreground">{review.comment}</p>
                  {review.verified && (
                    <Badge variant="secondary" className="mt-2">
                      Achat vérifié
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground mb-8">
              Aucun avis pour le moment. Soyez le premier à donner votre avis !
            </p>
          )}

          {/* Add Review Form */}
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="text-xl font-semibold mb-4">Laisser un avis</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="reviewName">Nom</Label>
                <Input
                  id="reviewName"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="Votre nom"
                />
              </div>
              
              <div>
                <Label>Note</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 cursor-pointer ${
                          star <= reviewRating
                            ? 'fill-primary text-primary'
                            : 'text-muted'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="reviewComment">Commentaire</Label>
                <Textarea
                  id="reviewComment"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Partagez votre expérience avec ce produit..."
                  rows={4}
                />
              </div>

              <Button onClick={handleSubmitReview} className="w-full">
                Publier l'avis
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sheet */}
      <CartSheet 
        open={isCartOpen} 
        onOpenChange={setIsCartOpen}
        shopUrl={shopUrl || ''}
        shopSettings={shopSettings}
      />
    </div>
  );
};

export default ProductDetail;
