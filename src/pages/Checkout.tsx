import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useApp, Order, ShopSettings } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { generateOrderMessage } from '@/lib/whatsapp';

const Checkout = () => {
  const { shopUrl } = useParams<{ shopUrl: string }>();
  const navigate = useNavigate();
  const { cart, products, clearCart, addOrder } = useApp();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shopSettings, setShopSettings] = useState<ShopSettings | null>(null);

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    phone: '',
    address: '',
    notes: ''
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('shopSettings');
    if (savedSettings) {
      setShopSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    if (cart.length === 0) {
      navigate(`/shop/${shopUrl}`);
    }
  }, [cart, navigate, shopUrl]);

  // Get full product details from cart items
  const cartWithProducts = cart.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)!
  })).filter(item => item.product);

  const subtotal = cartWithProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = subtotal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.phone || !formData.address) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Generate unique order ID
    const newOrderId = `CMD-${Date.now()}`;
    
    // Create order matching the Order interface
    const newOrder: Omit<Order, 'id' | 'createdAt' | 'userId'> = {
      products: cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product?.price || 0
        };
      }),
      total,
      status: 'pending',
      customerName: formData.customerName,
      customerEmail: formData.customerEmail || '',
      customerPhone: formData.phone,
      deliveryAddress: formData.address,
      notes: formData.notes || undefined,
      paymentMethod: 'cod'
    };

    // Save order
    addOrder(newOrder);
    clearCart();
    
    toast({
      title: "Commande confirmée !",
      description: `Votre commande ${newOrderId} a été enregistrée avec succès.`,
    });

    setIsSubmitting(false);
    
    // Redirect to success page
    setTimeout(() => {
      navigate(`/shop/${shopUrl}/order-success/${newOrderId}`);
    }, 500);
  };


  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(`/shop/${shopUrl}`)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la boutique
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Finaliser ma commande</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informations de livraison</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Nom complet *</Label>
                    <Input
                      id="customerName"
                      value={formData.customerName}
                      onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                      placeholder="Votre nom complet"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerEmail">Email (optionnel)</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Ex: +226 XX XX XX XX"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse de livraison *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="Rue, quartier, ville"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes supplémentaires (optionnel)</Label>
                    <Input
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Instructions spéciales pour la livraison"
                    />
                  </div>

                  <div className="space-y-3">
                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? 'Traitement...' : 'Confirmer la commande'}
                    </Button>

                    {shopSettings?.socialLinks?.whatsapp && formData.customerName && formData.phone && formData.address && (
                      <>
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Ou</span>
                          </div>
                        </div>
                        
                        <WhatsAppButton
                          phoneNumber={shopSettings.socialLinks.whatsapp}
                          message={generateOrderMessage(
                            cart,
                            products,
                            shopSettings.shopName,
                            {
                              name: formData.customerName,
                              phone: formData.phone,
                              address: formData.address,
                              email: formData.customerEmail
                            }
                          )}
                          variant="outline"
                          label="Envoyer la commande via WhatsApp"
                          className="w-full"
                          size="lg"
                        />
                      </>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cartWithProducts.map(item => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.product.name} x{item.quantity}
                      </span>
                      <span className="font-medium">
                        {(item.product.price * item.quantity).toLocaleString()} FCFA
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span className="font-medium">{subtotal.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{total.toLocaleString()} FCFA</span>
                  </div>
                </div>

                <div className="pt-4 border-t text-xs text-muted-foreground">
                  <p>Le vendeur vous contactera pour confirmer votre commande et organiser la livraison.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
