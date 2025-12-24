import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AcademyHero from '@/components/academy/AcademyHero';
import AcademyCategories from '@/components/academy/AcademyCategories';
import BlogCard from '@/components/blog/BlogCard';
import CTASection from '@/components/CTASection';

// Tutoriels data
const tutoriels = [
  {
    id: 1,
    title: "5 astuces pour optimiser votre boutique mobile",
    excerpt: "Le mobile représente 80% du trafic e-commerce en Afrique. Voici comment optimiser votre boutique pour convertir ces visiteurs en clients.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    category: "Mobile",
    categoryId: "mobile",
    author: "Ibrahim Koné",
    date: "18 Décembre 2024",
    readTime: "7 min",
    slug: "optimiser-boutique-mobile",
    featured: true,
  },
  {
    id: 2,
    title: "Guide complet : Vendre sur WhatsApp Business",
    excerpt: "WhatsApp est l'application la plus utilisée en Afrique. Apprenez à l'utiliser efficacement pour développer votre activité commerciale.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop",
    category: "WhatsApp",
    categoryId: "whatsapp",
    author: "Ousmane Diallo",
    date: "12 Décembre 2024",
    readTime: "10 min",
    slug: "guide-whatsapp-business",
    featured: false,
  },
  {
    id: 3,
    title: "Photographier vos produits comme un pro avec votre smartphone",
    excerpt: "Pas besoin d'équipement coûteux ! Apprenez à prendre des photos de produits professionnelles avec juste votre téléphone.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop",
    category: "Photo Produit",
    categoryId: "photo",
    author: "Kadiatou Bamba",
    date: "5 Décembre 2024",
    readTime: "5 min",
    slug: "photos-produits-smartphone",
    featured: false,
  },
  {
    id: 4,
    title: "Créer votre première boutique en ligne : Guide pas à pas",
    excerpt: "Un tutoriel complet pour les débutants qui veulent lancer leur boutique e-commerce en moins de 30 minutes.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    category: "Débutant",
    categoryId: "debutant",
    author: "Aminata Ouédraogo",
    date: "1 Décembre 2024",
    readTime: "15 min",
    slug: "creer-premiere-boutique",
    featured: false,
  },
  {
    id: 5,
    title: "Configurer Orange Money et Mobile Money sur votre boutique",
    excerpt: "Apprenez à intégrer les paiements mobiles les plus populaires au Burkina Faso pour faciliter les achats de vos clients.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    category: "Paiement",
    categoryId: "paiement",
    author: "Moussa Traoré",
    date: "28 Novembre 2024",
    readTime: "8 min",
    slug: "configurer-orange-money",
    featured: false,
  },
  {
    id: 6,
    title: "Gérer vos commandes efficacement avec WhatsApp",
    excerpt: "Automatisez la gestion de vos commandes et offrez un service client exceptionnel via WhatsApp.",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop",
    category: "WhatsApp",
    categoryId: "whatsapp",
    author: "Aïcha Sawadogo",
    date: "25 Novembre 2024",
    readTime: "6 min",
    slug: "gerer-commandes-whatsapp",
    featured: false,
  },
  {
    id: 7,
    title: "Les bases de la photographie produit : éclairage et composition",
    excerpt: "Maîtrisez les techniques d'éclairage et de composition pour des photos qui font vendre.",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop",
    category: "Photo Produit",
    categoryId: "photo",
    author: "Kadiatou Bamba",
    date: "20 Novembre 2024",
    readTime: "9 min",
    slug: "bases-photo-eclairage",
    featured: false,
  },
  {
    id: 8,
    title: "Optimiser votre site pour les connexions lentes",
    excerpt: "Techniques essentielles pour que votre boutique charge rapidement même avec une connexion 2G/3G.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    category: "Mobile",
    categoryId: "mobile",
    author: "Ibrahim Koné",
    date: "15 Novembre 2024",
    readTime: "7 min",
    slug: "optimiser-connexion-lente",
    featured: false,
  },
];

const Academy = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter tutoriels based on category
  const filteredTutoriels = useMemo(() => {
    if (activeCategory === 'all') return tutoriels;
    return tutoriels.filter(tuto => tuto.categoryId === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <AcademyHero />

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
              Nos Tutoriels
            </h2>
            <p className="text-muted-foreground font-body">
              Apprenez à votre rythme avec nos guides pratiques
            </p>
          </motion.div>

          {/* Categories Filter */}
          <AcademyCategories 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />

          {/* Tutoriels Grid */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredTutoriels.map((tuto, index) => (
              <BlogCard 
                key={tuto.id}
                {...tuto}
                index={index}
              />
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredTutoriels.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg">
                Aucun tutoriel dans cette catégorie pour le moment.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section (like homepage) */}
      <CTASection />

      <Footer />
    </div>
  );
};

export default Academy;
