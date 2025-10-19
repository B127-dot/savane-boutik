import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp, Product } from '@/contexts/AppContext';
import { CartSheet } from '@/components/CartSheet';
import ThemeToggle from '@/components/ThemeToggle';
import { useToast } from '@/hooks/use-toast';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { generateProductMessage } from '@/lib/whatsapp';

const ProductDetail = () => {
  const { shopUrl, productId } = useParams<{ shopUrl: string; productId: string }>();
  const navigate = useNavigate();
  const { products, categories, addToCart, cart, shopSettings } = useApp();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [productId, products]);

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

  const images = product.images && product.images.length > 0 ? product.images : [null];

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
          {/* Images Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg border bg-muted overflow-hidden">
              {images[selectedImage] ? (
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground">Pas d'image</span>
                </div>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg border overflow-hidden ${
                      selectedImage === idx ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    {img ? (
                      <img
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <span className="text-xs text-muted-foreground">N/A</span>
                      </div>
                    )}
                  </button>
                ))}
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
