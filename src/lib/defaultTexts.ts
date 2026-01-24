/**
 * Textes par défaut en français pour tous les thèmes de boutique
 * Ce fichier centralise tous les textes pour faciliter la localisation
 */

export const DEFAULT_TEXTS = {
  // Section Hero
  hero: {
    badge: "Nouvelle Collection",
    badgeIcon: "sparkles" as const,
    title: "Bienvenue dans notre boutique",
    subtitle: "Découvrez nos produits de qualité, livrés chez vous rapidement.",
    buttonPrimary: "Voir la Collection",
    buttonSecondary: "Nos Catégories",
  },

  // Statistiques du Hero
  stats: [
    { id: 'products', value: '500', suffix: '+', label: 'Produits' },
    { id: 'clients', value: '1000', suffix: '+', label: 'Clients satisfaits' },
    { id: 'rating', value: '4.9', suffix: '★', label: 'Note moyenne' },
  ],

  // Features du Hero
  features: [
    { text: 'Livraison 24h' },
    { text: 'Retour gratuit' },
    { text: 'Paiement sécurisé' },
  ],

  // Barre de confiance (Trust Bar)
  trustBar: [
    { icon: 'truck', text: 'Livraison Rapide' },
    { icon: 'shield', text: 'Paiement Sécurisé' },
    { icon: 'phone', text: 'Support 7j/7' },
  ],

  // Marquee / Ticker items
  marquee: [
    { text: 'LIVRAISON GRATUITE', icon: 'truck' },
    { text: 'NOUVELLES SORTIES', icon: 'star' },
    { text: 'QUALITÉ PREMIUM', icon: 'zap' },
    { text: 'SATISFAIT OU REMBOURSÉ', icon: 'heart' },
    { text: 'ÉDITION LIMITÉE', icon: 'sparkles' },
  ],

  // Footer links
  footerLinks: [
    { label: 'À propos', url: '#about' },
    { label: 'FAQ', url: '#faq' },
    { label: 'Conditions de vente', url: '/cgv' },
    { label: 'Politique de confidentialité', url: '/privacy' },
  ],

  // Cartes produits
  productCard: {
    newBadge: "NOUVEAU",
    hotBadge: "TENDANCE",
    saleBadge: "PROMO",
    limitedBadge: "STOCK LIMITÉ",
    addToCart: "Ajouter au panier",
    quickAdd: "Ajout Rapide",
    quickView: "Aperçu",
    outOfStock: "Rupture",
    viewProduct: "Voir le produit",
  },

  // Grille de produits
  productGrid: {
    title: "Nos Produits",
    subtitle: "Découvrez notre sélection de produits de qualité",
    sectionBadge: "En Vedette",
    viewAll: "Voir tous les produits",
    noProducts: "Aucun produit disponible",
    searchPlaceholder: "Rechercher un produit...",
    allCategories: "Toutes les catégories",
    sortBy: "Trier par",
    sortOptions: {
      default: "Par défaut",
      priceAsc: "Prix croissant",
      priceDesc: "Prix décroissant",
      newest: "Plus récents",
      name: "Nom A-Z",
    },
  },

  // Newsletter
  newsletter: {
    title: "Restez informé",
    subtitle: "Recevez nos offres exclusives et nouveautés directement dans votre boîte mail.",
    placeholder: "Votre email",
    buttonText: "S'inscrire",
    successMessage: "Merci pour votre inscription !",
  },

  // Footer
  footer: {
    aboutDefault: "Votre boutique en ligne de confiance.",
    navigation: "Navigation",
    contact: "Contact",
    followUs: "Suivez-nous",
    paymentMethods: "Moyens de paiement acceptés",
    copyright: "Tous droits réservés.",
    poweredBy: "Propulsé par",
    privacy: "Confidentialité",
    terms: "CGV",
    cookies: "Cookies",
    links: {
      products: "Produits",
      about: "À propos",
      faq: "FAQ",
      cgv: "Conditions de vente",
    },
    help: {
      faq: "FAQ",
      shipping: "Livraison",
      returns: "Retours",
      sizeGuide: "Guide des tailles",
    },
  },

  // Header / Navigation
  header: {
    home: "Accueil",
    products: "Produits",
    new: "Nouveautés",
    about: "À propos",
    contact: "Contact",
    cart: "Panier",
    menu: "Menu",
  },

  // Messages d'état
  status: {
    loading: "Chargement...",
    error: "Une erreur est survenue",
    empty: "Aucun résultat",
    comingSoon: "Bientôt disponible",
  },

  // WhatsApp
  whatsapp: {
    buttonText: "Commander via WhatsApp",
    message: "Bonjour ! Je suis intéressé(e) par vos produits.",
  },
};

// Types pour TypeScript
export type DefaultTexts = typeof DEFAULT_TEXTS;
