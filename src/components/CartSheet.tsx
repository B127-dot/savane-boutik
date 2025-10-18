import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shopUrl: string;
}

export const CartSheet = ({ open, onOpenChange, shopUrl }: CartSheetProps) => {
  const { cart, products, updateCartItem, removeFromCart } = useApp();
  const { toast } = useToast();

  // Get full product details from cart items
  const cartWithProducts = cart.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)!
  })).filter(item => item.product); // Filter out items where product not found

  const subtotal = cartWithProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast({
      title: "Produit retiré",
      description: `${productName} a été retiré du panier`,
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Panier ({cart.length})
          </SheetTitle>
        </SheetHeader>

        {cartWithProducts.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">Votre panier est vide</p>
              <Button onClick={() => onOpenChange(false)}>
                Continuer mes achats
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cartWithProducts.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 p-4 rounded-lg border bg-card"
                >
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    {item.product.images?.[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">N/A</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-1">{item.product.name}</h4>
                    <p className="text-sm font-bold text-primary mt-1">
                      {item.product.price.toLocaleString()} FCFA
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateCartItem(item.productId, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateCartItem(item.productId, Math.min(item.product.stock, item.quantity + 1))}
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 ml-auto text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleRemoveItem(item.productId, item.product.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="flex-col gap-4 border-t pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{subtotal.toLocaleString()} FCFA</span>
              </div>

              <Link to={`/shop/${shopUrl}/checkout`} className="w-full" onClick={() => onOpenChange(false)}>
                <Button className="w-full" size="lg">
                  Procéder au paiement
                </Button>
              </Link>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
