import { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import DynamicThemeStyles from '@/components/shop/DynamicThemeStyles';
import {
  UrbanwaveHeader,
  UrbanwaveHero,
  UrbanwaveFeaturesBar,
  UrbanwaveProductGrid,
  UrbanwaveCategorySection,
  UrbanwaveNewsletter,
  UrbanwaveFooter
} from '@/components/shop/themes/urbanwave';
import { CartSheet } from '@/components/CartSheet';
import BottomNavMobile from '@/components/shop/BottomNavMobile';
import QuickViewModal from '@/components/shop/QuickViewModal';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/contexts/AppContext';

// Import product images
import productHoodie from '@/assets/urbanwave-product-hoodie.jpg';
import productCargo from '@/assets/urbanwave-product-cargo.jpg';
import productTshirt from '@/assets/urbanwave-product-tshirt.jpg';
import productBomber from '@/assets/urbanwave-product-bomber.jpg';
import productBeanie from '@/assets/urbanwave-product-beanie.jpg';
import productSneakers from '@/assets/urbanwave-product-sneakers.jpg';

// Demo products
const demoProducts: Product[] = [
  {
    id: 'uw-hoodie',
    name: 'Hoodie Oversized Essential',
    description: 'Hoodie oversize en coton premium avec logo brodé',
    price: 89990,
    stock: 15,
    categoryId: 'hoodies',
    images: [productHoodie],
    status: 'active',
    createdAt: new Date().toISOString(),
    userId: 'demo',
  },
  {
    id: 'uw-cargo',
    name: 'Cargo Pants Tactical',
    description: 'Pantalon cargo avec multiples poches utilitaires',
    price: 119990,
    stock: 8,
    categoryId: 'pantalons',
    images: [productCargo],
    status: 'active',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'demo',
  },
  {
    id: 'uw-tshirt',
    name: 'T-Shirt Urban Art',
    description: 'T-shirt graphique avec impression street art',
    price: 49990,
    stock: 25,
    categoryId: 'tshirts',
    images: [productTshirt],
    status: 'active',
    createdAt: new Date().toISOString(),
    userId: 'demo',
  },
  {
    id: 'uw-bomber',
    name: 'Bomber Jacket Premium',
    description: 'Veste bomber bicolore avec doublure matelassée',
    price: 189990,
    stock: 5,
    categoryId: 'vestes',
    images: [productBomber],
    status: 'active',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'demo',
  },
  {
    id: 'uw-beanie',
    name: 'Beanie Classic Logo',
    description: 'Bonnet en tricot côtelé avec patch logo',
    price: 34990,
    stock: 30,
    categoryId: 'accessoires',
    images: [productBeanie],
    status: 'active',
    createdAt: new Date().toISOString(),
    userId: 'demo',
  },
  {
    id: 'uw-sneakers',
    name: 'Sneakers Cloud Runner',
    description: 'Baskets montantes avec détails orange',
    price: 159990,
    stock: 12,
    categoryId: 'chaussures',
    images: [productSneakers],
    status: 'active',
    createdAt: new Date().toISOString(),
    userId: 'demo',
  },
];

const DemoUrbanwave = () => {
  const { toast } = useToast();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<number>(0);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => prev + 1);
    toast({
      title: 'Produit ajouté !',
      description: `${product.name} a été ajouté au panier`,
    });
    setIsCartOpen(true);
  };

  const scrollToCategories = () => {
    const element = document.getElementById('categories');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Demo shop settings
  const demoShopSettings = {
    shopName: 'URBANWAVE',
    aboutText: 'Votre destination streetwear premium. Des pièces uniques pour ceux qui osent se démarquer.',
    phone: '+226 70 00 00 00',
    email: 'contact@urbanwave.bf',
    address: 'Ouagadougou, Burkina Faso',
    socialLinks: {
      whatsapp: '+22670000000',
      facebook: 'https://facebook.com/urbanwave',
      instagram: 'https://instagram.com/urbanwave',
    },
  };

  return (
    <ThemeProvider themeId="urbanwave">
      <DynamicThemeStyles />
      <div className="min-h-screen bg-background pb-20 md:pb-0 urbanwave-theme">
        <UrbanwaveHeader 
          shopName="URBANWAVE"
          cartItemCount={cartItems}
          onCartClick={() => setIsCartOpen(true)}
          shopUrl="demo-urbanwave"
        />

        <UrbanwaveHero />

        <UrbanwaveFeaturesBar />

        <div id="products">
          <UrbanwaveProductGrid 
            products={demoProducts}
            shopUrl="demo-urbanwave"
            onAddToCart={handleAddToCart}
            onQuickView={(product) => setQuickViewProduct(product)}
          />
        </div>

        <UrbanwaveCategorySection />

        <UrbanwaveNewsletter />

        <UrbanwaveFooter 
          shopName={demoShopSettings.shopName}
          aboutText={demoShopSettings.aboutText}
          phone={demoShopSettings.phone}
          email={demoShopSettings.email}
          address={demoShopSettings.address}
          facebook={demoShopSettings.socialLinks.facebook}
          instagram={demoShopSettings.socialLinks.instagram}
          shopUrl="demo-urbanwave"
        />

        <BottomNavMobile 
          cartItemsCount={cartItems}
          onCartClick={() => setIsCartOpen(true)}
          onCategoriesClick={scrollToCategories}
          onHomeClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />

        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      </div>
    </ThemeProvider>
  );
};

export default DemoUrbanwave;
