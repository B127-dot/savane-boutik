import { Product, CartItem, ShopSettings } from '@/contexts/AppContext';

/**
 * Format WhatsApp phone number to international format (remove spaces, dashes, etc.)
 * Example: "+226 70 12 34 56" -> "22670123456"
 */
export function formatWhatsAppNumber(phone: string): string {
  if (!phone) return '';
  
  // Remove all non-digit characters except the leading +
  let cleaned = phone.replace(/[^\d+]/g, '');
  
  // Remove + if present
  if (cleaned.startsWith('+')) {
    cleaned = cleaned.substring(1);
  }
  
  return cleaned;
}

/**
 * Validate WhatsApp phone number format
 */
export function isValidWhatsAppNumber(phone: string): boolean {
  if (!phone) return false;
  const cleaned = formatWhatsAppNumber(phone);
  // Should be at least 10 digits
  return cleaned.length >= 10 && cleaned.length <= 15;
}

/**
 * Generate WhatsApp message for a single product
 */
export function generateProductMessage(
  product: Product,
  quantity: number,
  shopName: string
): string {
  const message = `Bonjour ${shopName} 👋

Je souhaite commander :
🛒 ${product.name} × ${quantity} - ${(product.price * quantity).toLocaleString()} FCFA

💰 Total : ${(product.price * quantity).toLocaleString()} FCFA

Merci !`;

  return encodeURIComponent(message);
}

/**
 * Generate WhatsApp message for cart items
 */
export function generateCartMessage(
  cart: CartItem[],
  products: Product[],
  shopName: string
): string {
  const cartWithProducts = cart.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)!
  })).filter(item => item.product);

  const itemsList = cartWithProducts
    .map(item => `🛒 ${item.product.name} × ${item.quantity} - ${(item.product.price * item.quantity).toLocaleString()} FCFA`)
    .join('\n');

  const total = cartWithProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const message = `Bonjour ${shopName} 👋

Je souhaite commander :
${itemsList}

💰 Total : ${total.toLocaleString()} FCFA

Merci !`;

  return encodeURIComponent(message);
}

/**
 * Generate WhatsApp message for a completed order (with customer details)
 */
export function generateOrderMessage(
  cart: CartItem[],
  products: Product[],
  shopName: string,
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    email?: string;
  }
): string {
  const cartWithProducts = cart.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)!
  })).filter(item => item.product);

  const itemsList = cartWithProducts
    .map(item => `🛒 ${item.product.name} × ${item.quantity} - ${(item.product.price * item.quantity).toLocaleString()} FCFA`)
    .join('\n');

  const total = cartWithProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const message = `Bonjour ${shopName} 👋

Je souhaite commander :
${itemsList}

💰 Total : ${total.toLocaleString()} FCFA

📋 Informations de livraison :
👤 Nom : ${customerInfo.name}
📞 Téléphone : ${customerInfo.phone}
📍 Adresse : ${customerInfo.address}${customerInfo.email ? `\n📧 Email : ${customerInfo.email}` : ''}

Merci !`;

  return encodeURIComponent(message);
}

/**
 * Generate a simple inquiry message
 */
export function generateInquiryMessage(shopName: string): string {
  const message = `Bonjour ${shopName} 👋

Je souhaite obtenir plus d'informations sur vos produits.

Merci !`;

  return encodeURIComponent(message);
}

/**
 * Open WhatsApp with a pre-filled message
 */
export function openWhatsApp(phone: string, message: string): void {
  const formattedPhone = formatWhatsAppNumber(phone);
  
  if (!isValidWhatsAppNumber(phone)) {
    console.error('Invalid WhatsApp number:', phone);
    return;
  }

  const url = `https://wa.me/${formattedPhone}?text=${message}`;
  window.open(url, '_blank');
}

/**
 * Track WhatsApp button clicks in localStorage
 */
export function trackWhatsAppClick(): void {
  const currentCount = parseInt(localStorage.getItem('whatsappClickCount') || '0');
  localStorage.setItem('whatsappClickCount', (currentCount + 1).toString());
}

/**
 * Get WhatsApp click count
 */
export function getWhatsAppClickCount(): number {
  return parseInt(localStorage.getItem('whatsappClickCount') || '0');
}

/**
 * Generate WhatsApp message for abandoned cart recovery with promo code
 */
export function generateAbandonedCartRecoveryMessage(
  cartItems: Array<{ name: string; quantity: number; price: number }>,
  total: number,
  shopName: string,
  promoCode: string,
  discountValue: number
): string {
  const itemsList = cartItems
    .map(item => `🛒 ${item.name} × ${item.quantity} - ${(item.price * item.quantity).toLocaleString()} FCFA`)
    .join('\n');

  const finalTotal = total - (total * discountValue / 100);

  const message = `Bonjour ! 👋

Nous avons remarqué que vous avez laissé des articles dans votre panier chez ${shopName} :

${itemsList}

💰 Total : ${total.toLocaleString()} FCFA

🎁 OFFRE SPÉCIALE : Utilisez le code *${promoCode}* pour bénéficier de *-${discountValue}%* sur votre commande !

✨ Nouveau total : ${finalTotal.toLocaleString()} FCFA

Cette offre est valable pendant 48h. Ne la ratez pas !

Je souhaite finaliser ma commande 🛍️`;

  return encodeURIComponent(message);
}

