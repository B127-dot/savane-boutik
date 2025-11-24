import { useEffect } from 'react';
import { CartItem, Product, AbandonedCart } from '@/contexts/AppContext';

const ABANDONED_CART_THRESHOLD = 5 * 60 * 1000; // 5 minutes

export const useAbandonedCartTracker = (
  cart: CartItem[],
  products: Product[],
  userId: string
) => {
  useEffect(() => {
    if (cart.length === 0) return;

    // Update last activity timestamp
    const lastActivity = Date.now();
    localStorage.setItem('lastCartActivity', lastActivity.toString());

    // Set up interval to check for abandoned cart
    const interval = setInterval(() => {
      const lastActivityStr = localStorage.getItem('lastCartActivity');
      if (!lastActivityStr) return;

      const lastActivityTime = parseInt(lastActivityStr);
      const timeSinceActivity = Date.now() - lastActivityTime;

      if (timeSinceActivity >= ABANDONED_CART_THRESHOLD && cart.length > 0) {
        // Cart is abandoned, save it
        const cartWithProducts = cart.map(item => {
          const product = products.find(p => p.id === item.productId);
          return product ? {
            ...item,
            product
          } : null;
        }).filter(Boolean);

        const total = cartWithProducts.reduce(
          (sum, item) => sum + (item?.product?.price || 0) * item!.quantity,
          0
        );

        const productDetails = cartWithProducts.map(item => ({
          id: item!.product!.id,
          name: item!.product!.name,
          price: item!.product!.price,
          image: item!.product!.images[0] || '/placeholder.svg'
        }));

        const abandonedCart: AbandonedCart = {
          id: `cart_${Date.now()}`,
          cart: cart,
          timestamp: lastActivityTime,
          total,
          productDetails,
          isRecovered: false
        };

        // Save to localStorage
        const existingCarts = localStorage.getItem(`abandonedCarts_${userId}`);
        const carts = existingCarts ? JSON.parse(existingCarts) : [];
        
        // Check if this cart was already saved
        const exists = carts.some((c: AbandonedCart) => 
          c.timestamp === lastActivityTime
        );

        if (!exists) {
          carts.push(abandonedCart);
          localStorage.setItem(`abandonedCarts_${userId}`, JSON.stringify(carts));
        }

        // Clear the last activity to prevent duplicate saves
        localStorage.removeItem('lastCartActivity');
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [cart, products, userId]);
};
