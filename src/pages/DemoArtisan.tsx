import { useState, createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import {
  ArtisanHeader,
  ArtisanHero,
  ArtisanCollections,
  ArtisanWhyChoose,
  ArtisanPopularProducts,
  ArtisanFooter
} from '@/components/shop/themes/artisan';

// Types locaux pour la démo
interface DemoProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  stock: number;
  status: 'active' | 'inactive';
  categoryId: string;
  userId?: string;
}

interface DemoCategory {
  id: string;
  name: string;
  description?: string;
  userId?: string;
}

// Données fictives
const demoProducts: DemoProduct[] = [
  {
    id: "1",
    name: "Panier Tressé Naturel",
    price: 25000,
    originalPrice: 35000,
    images: ["https://images.unsplash.com/photo-1595408076683-5d0c693d0627?w=600&h=600&fit=crop"],
    description: "Panier artisanal tressé à la main par les artisans du Burkina Faso",
    stock: 15,
    status: 'active',
    categoryId: "1"
  },
  {
    id: "2",
    name: "Sac en Cuir Sahélien",
    price: 45000,
    images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop"],
    description: "Sac en cuir véritable fait main avec finitions traditionnelles",
    stock: 8,
    status: 'active',
    categoryId: "2"
  },
  {
    id: "3",
    name: "Collier Perles Traditionnelles",
    price: 18000,
    originalPrice: 22000,
    images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop"],
    description: "Collier en perles artisanales multicolores",
    stock: 20,
    status: 'active',
    categoryId: "3"
  },
  {
    id: "4",
    name: "Vase Céramique Terracotta",
    price: 32000,
    images: ["https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&h=600&fit=crop"],
    description: "Vase en céramique artisanale avec motifs traditionnels",
    stock: 5,
    status: 'active',
    categoryId: "4"
  },
  {
    id: "5",
    name: "Écharpe Tissée Bogolan",
    price: 28000,
    images: ["https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=600&fit=crop"],
    description: "Écharpe en tissu bogolan authentique du Mali",
    stock: 12,
    status: 'active',
    categoryId: "5"
  },
  {
    id: "6",
    name: "Bracelet Bronze Ancien",
    price: 15000,
    originalPrice: 20000,
    images: ["https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop"],
    description: "Bracelet en bronze coulé à la cire perdue",
    stock: 25,
    status: 'active',
    categoryId: "3"
  },
  {
    id: "7",
    name: "Coussin Faso Dan Fani",
    price: 22000,
    images: ["https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&h=600&fit=crop"],
    description: "Coussin en tissu traditionnel burkinabè",
    stock: 18,
    status: 'active',
    categoryId: "4"
  },
  {
    id: "8",
    name: "Statue Bois Sculpté",
    price: 65000,
    images: ["https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=600&h=600&fit=crop"],
    description: "Sculpture traditionnelle en bois d'ébène",
    stock: 3,
    status: 'active',
    categoryId: "6"
  }
];

const demoCategories: DemoCategory[] = [
  { id: "1", name: "Vannerie", description: "Paniers et objets tressés" },
  { id: "2", name: "Maroquinerie", description: "Sacs et accessoires en cuir" },
  { id: "3", name: "Bijoux", description: "Bijoux artisanaux" },
  { id: "4", name: "Décoration", description: "Objets déco pour la maison" },
  { id: "5", name: "Textile", description: "Tissus et vêtements" },
  { id: "6", name: "Art", description: "Sculptures et œuvres d'art" },
];

// Contexte de démo
const DemoAppContext = createContext<{
  products: DemoProduct[];
  categories: DemoCategory[];
}>({
  products: demoProducts,
  categories: demoCategories
});

// Hook pour le contexte démo
const useDemoApp = () => useContext(DemoAppContext);

// Composants Artisan adaptés pour la démo
const DemoArtisanCollections = ({ onCategoryClick }: { onCategoryClick?: (name: string) => void }) => {
  const { categories, products } = useDemoApp();

  const categoriesWithProducts = categories
    .map(cat => ({
      ...cat,
      products: products.filter(p => p.categoryId === cat.id && p.status === 'active'),
      image: products.find(p => p.categoryId === cat.id && p.status === 'active')?.images?.[0]
    }))
    .filter(cat => cat.products.length > 0)
    .slice(0, 4);

  const badgeColors = [
    'bg-artisan-olive text-white',
    'bg-artisan-terracotta text-white',
    'bg-artisan-sand text-artisan-charcoal',
    'bg-artisan-sage text-artisan-charcoal',
  ];

  return (
    <section className="py-20 lg:py-32 bg-artisan-cream">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-artisan-charcoal"
            >
              Nos <span className="italic">Collections</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-artisan-charcoal/60 mt-4 max-w-md"
            >
              Explorez notre gamme diversifiée de produits artisanaux, chacun conçu avec soin pour répondre à vos besoins et préférences de style.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {categoriesWithProducts.map((category, index) => {
            const gridClasses = [
              'col-span-12 md:col-span-5 row-span-2',
              'col-span-12 md:col-span-7 row-span-1',
              'col-span-6 md:col-span-4 row-span-1',
              'col-span-6 md:col-span-3 row-span-1',
            ];

            const aspectClasses = [
              'aspect-[3/4]',
              'aspect-[16/10]',
              'aspect-square',
              'aspect-square',
            ];

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${gridClasses[index] || 'col-span-6 md:col-span-3'} group cursor-pointer`}
                onClick={() => onCategoryClick?.(category.name)}
              >
                <div className={`relative ${aspectClasses[index] || 'aspect-square'} rounded-2xl lg:rounded-3xl overflow-hidden bg-artisan-sand`}>
                  {category.image && (
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-medium ${badgeColors[index] || badgeColors[0]}`}>
                    {category.name}
                  </div>
                  {index < 2 && (
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white/90 text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {category.products.length} produit{category.products.length > 1 ? 's' : ''} disponible{category.products.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const DemoArtisanProductCard = ({ 
  product, 
  onAddToCart 
}: { 
  product: DemoProduct; 
  onAddToCart: (product: DemoProduct) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-artisan-sand">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.originalPrice && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-artisan-terracotta text-white text-xs font-medium rounded-full">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-artisan-charcoal mb-2 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-artisan-charcoal">{product.price.toLocaleString()} FCFA</span>
          {product.originalPrice && (
            <span className="text-sm text-artisan-charcoal/40 line-through">{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full py-2.5 bg-artisan-olive text-white rounded-xl font-medium text-sm hover:bg-artisan-olive-dark transition-colors"
        >
          Ajouter au panier
        </button>
      </div>
    </motion.div>
  );
};

const DemoArtisanPopularProducts = ({ 
  onAddToCart 
}: { 
  onAddToCart: (product: DemoProduct) => void;
}) => {
  const { products, categories } = useDemoApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const activeProducts = products.filter(p => p.status === 'active' && p.stock > 0);
  const categoriesWithProducts = categories.filter(cat =>
    activeProducts.some(p => p.categoryId === cat.id)
  );

  const filteredProducts = activeCategory === 'all'
    ? activeProducts
    : activeProducts.filter(p => {
        const cat = categories.find(c => c.id === p.categoryId);
        return cat?.name === activeCategory;
      });

  return (
    <section id="products" className="py-20 lg:py-32 bg-artisan-cream">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-artisan-charcoal"
            >
              Nos Produits <span className="italic">Populaires</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-artisan-charcoal/60 mt-4 max-w-md"
            >
              Explorez notre gamme diversifiée de produits, chacun conçu avec soin pour répondre à vos besoins et préférences de style.
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-10"
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-artisan-charcoal text-white'
                : 'bg-white text-artisan-charcoal border border-artisan-charcoal/10 hover:border-artisan-charcoal/30'
            }`}
          >
            Tous
          </button>
          {categoriesWithProducts.slice(0, 4).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.name
                  ? 'bg-artisan-charcoal text-white'
                  : 'bg-white text-artisan-charcoal border border-artisan-charcoal/10 hover:border-artisan-charcoal/30'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filteredProducts.map((product) => (
            <DemoArtisanProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const DemoArtisan = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const handleAddToCart = (product: DemoProduct) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <DemoAppContext.Provider value={{ products: demoProducts, categories: demoCategories }}>
      <div className="artisan-theme min-h-screen bg-artisan-cream">
        {/* Badge Démo */}
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] bg-artisan-terracotta text-white px-6 py-2 rounded-full shadow-lg font-medium text-sm"
        >
          🎨 Mode Démo - Thème Artisan
        </motion.div>

        <ArtisanHeader 
          shopName="Maison Sahel"
          logo="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=200&h=200&fit=crop"
          cartItemsCount={cartItemCount}
          onCartClick={() => {}}
        />

        <main>
          <ArtisanHero 
            heroImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop"
            heroTitle="L'Artisanat Africain Réinventé"
            heroSubtitle="Découvrez notre collection exclusive de créations artisanales, façonnées avec passion par les maîtres artisans du Burkina Faso."
            heroButtonText="Explorer la Collection"
            heroButtonLink="#products"
          />

          <DemoArtisanCollections />

          <DemoArtisanPopularProducts onAddToCart={handleAddToCart} />

          <ArtisanWhyChoose />
        </main>

        <ArtisanFooter 
          shopName="Maison Sahel"
          logo="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=200&h=200&fit=crop"
          aboutText="Maison Sahel célèbre l'héritage artisanal africain à travers des créations uniques et authentiques, fabriquées avec amour par nos artisans."
          phone="+226 70 00 00 00"
          whatsapp="22670000000"
          facebookUrl="https://facebook.com"
          instagramUrl="https://instagram.com"
          tiktokUrl="https://tiktok.com"
        />
      </div>
    </DemoAppContext.Provider>
  );
};

export default DemoArtisan;
