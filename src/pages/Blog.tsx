import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogHero from '@/components/blog/BlogHero';
import BlogCategories from '@/components/blog/BlogCategories';
import BlogCard from '@/components/blog/BlogCard';
import FeaturedArticle from '@/components/blog/FeaturedArticle';
import BlogNewsletter from '@/components/blog/BlogNewsletter';

// Sample blog data
const blogArticles = [
  {
    id: 1,
    title: "Comment augmenter vos ventes avec Orange Money et Mobile Money",
    excerpt: "Découvrez les meilleures pratiques pour intégrer les paiements mobiles dans votre boutique et maximiser vos conversions auprès des clients africains.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    category: "E-commerce",
    categoryId: "ecommerce",
    author: "Aminata Ouédraogo",
    date: "20 Décembre 2024",
    readTime: "5 min",
    slug: "augmenter-ventes-orange-money",
    featured: true,
  },
  {
    id: 2,
    title: "5 astuces pour optimiser votre boutique mobile",
    excerpt: "Le mobile représente 80% du trafic e-commerce en Afrique. Voici comment optimiser votre boutique pour convertir ces visiteurs en clients.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    category: "Tutoriels",
    categoryId: "tutoriels",
    author: "Ibrahim Koné",
    date: "18 Décembre 2024",
    readTime: "7 min",
    slug: "optimiser-boutique-mobile",
    featured: false,
  },
  {
    id: 3,
    title: "Success Story : Fatimata a triplé son chiffre d'affaires en 6 mois",
    excerpt: "Découvrez comment Fatimata, vendeuse de tissus traditionnels, a transformé son petit commerce local en une boutique en ligne prospère.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
    category: "Success Stories",
    categoryId: "success",
    author: "L'équipe BurkinaShop",
    date: "15 Décembre 2024",
    readTime: "4 min",
    slug: "success-story-fatimata",
    featured: false,
  },
  {
    id: 4,
    title: "Guide complet : Vendre sur WhatsApp Business",
    excerpt: "WhatsApp est l'application la plus utilisée en Afrique. Apprenez à l'utiliser efficacement pour développer votre activité commerciale.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop",
    category: "Tutoriels",
    categoryId: "tutoriels",
    author: "Ousmane Diallo",
    date: "12 Décembre 2024",
    readTime: "10 min",
    slug: "guide-whatsapp-business",
    featured: false,
  },
  {
    id: 5,
    title: "Les tendances e-commerce au Burkina Faso en 2025",
    excerpt: "Quelles sont les grandes tendances qui vont façonner le commerce en ligne au Burkina Faso cette année ? Notre analyse complète.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    category: "E-commerce",
    categoryId: "ecommerce",
    author: "Moussa Traoré",
    date: "10 Décembre 2024",
    readTime: "8 min",
    slug: "tendances-ecommerce-2025",
    featured: false,
  },
  {
    id: 6,
    title: "Comment créer des publicités Facebook efficaces avec un petit budget",
    excerpt: "Vous n'avez pas besoin d'un gros budget pour faire de la publicité efficace. Voici nos conseils pour maximiser votre ROI.",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop",
    category: "Marketing",
    categoryId: "marketing",
    author: "Aïcha Sawadogo",
    date: "8 Décembre 2024",
    readTime: "6 min",
    slug: "publicites-facebook-petit-budget",
    featured: false,
  },
  {
    id: 7,
    title: "Photographier vos produits comme un pro avec votre smartphone",
    excerpt: "Pas besoin d'équipement coûteux ! Apprenez à prendre des photos de produits professionnelles avec juste votre téléphone.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop",
    category: "Tutoriels",
    categoryId: "tutoriels",
    author: "Kadiatou Bamba",
    date: "5 Décembre 2024",
    readTime: "5 min",
    slug: "photos-produits-smartphone",
    featured: false,
  },
  {
    id: 8,
    title: "Success Story : De vendeuse ambulante à e-commerçante prospère",
    excerpt: "Mariam vendait des accessoires dans les rues de Ouagadougou. Aujourd'hui, elle livre dans tout le Burkina Faso grâce à sa boutique en ligne.",
    image: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=800&h=600&fit=crop",
    category: "Success Stories",
    categoryId: "success",
    author: "L'équipe BurkinaShop",
    date: "2 Décembre 2024",
    readTime: "4 min",
    slug: "success-story-mariam",
    featured: false,
  },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Get featured article
  const featuredArticle = blogArticles.find(article => article.featured);

  // Filter articles based on category
  const filteredArticles = useMemo(() => {
    const nonFeatured = blogArticles.filter(article => !article.featured);
    if (activeCategory === 'all') return nonFeatured;
    return nonFeatured.filter(article => article.categoryId === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <BlogHero />

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          {/* Featured Article */}
          {featuredArticle && activeCategory === 'all' && (
            <FeaturedArticle {...featuredArticle} />
          )}

          {/* Categories Filter */}
          <BlogCategories 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />

          {/* Articles Grid */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredArticles.map((article, index) => (
              <BlogCard 
                key={article.id}
                {...article}
                index={index}
              />
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg">
                Aucun article dans cette catégorie pour le moment.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <BlogNewsletter />

      <Footer />
    </div>
  );
};

export default Blog;
