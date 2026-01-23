export interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'modern' | 'elegant' | 'minimal' | 'creative' | 'artisan' | 'aesthetique' | 'y2k';
  isAvailable: boolean;
  components: {
    hero: string;
    productCard: string;
    footer: string;
  };
}

export const THEME_REGISTRY: Record<string, Theme> = {
  modern: {
    id: 'modern',
    name: 'Moderne',
    description: 'Design contemporain avec animations dynamiques et gradients audacieux. Parfait pour une boutique tendance.',
    preview: '/theme-previews/modern.jpg',
    category: 'modern',
    isAvailable: true,
    components: {
      hero: 'modern',
      productCard: 'modern',
      footer: 'modern'
    }
  },
  artisan: {
    id: 'artisan',
    name: 'Artisan',
    description: 'Design organique et naturel avec layouts asymétriques créatifs. Idéal pour les produits artisanaux et faits main.',
    preview: '/theme-previews/artisan.jpg',
    category: 'artisan',
    isAvailable: true,
    components: {
      hero: 'artisan',
      productCard: 'artisan',
      footer: 'artisan'
    }
  },
  aesthetique: {
    id: 'aesthetique',
    name: 'Esthétique',
    description: 'Design sombre et luxueux avec typographie serif élégante. Parfait pour les boutiques premium et design d\'intérieur.',
    preview: '/theme-previews/aesthetique.jpg',
    category: 'aesthetique',
    isAvailable: true,
    components: {
      hero: 'aesthetique',
      productCard: 'aesthetique',
      footer: 'aesthetique'
    }
  },
  minimal: {
    id: 'minimal',
    name: 'Minimaliste',
    description: 'Bientôt disponible - Design épuré avec espaces blancs généreux et typographie moderne.',
    preview: '/theme-previews/minimal.jpg',
    category: 'minimal',
    isAvailable: false,
    components: {
      hero: 'minimal',
      productCard: 'minimal',
      footer: 'minimal'
    }
  },
  creative: {
    id: 'creative',
    name: 'Créatif',
    description: 'Bientôt disponible - Design audacieux avec couleurs vives et animations dynamiques.',
    preview: '/theme-previews/creative.jpg',
    category: 'creative',
    isAvailable: false,
    components: {
      hero: 'creative',
      productCard: 'creative',
      footer: 'creative'
    }
  },
  y2k: {
    id: 'y2k',
    name: 'Y2K / Gen-Z',
    description: 'Design vibrant et audacieux avec des couleurs néon, des dégradés roses/violets/verts et une énergie Gen-Z. Parfait pour le streetwear et les marques jeunes.',
    preview: '/theme-previews/y2k.jpg',
    category: 'y2k',
    isAvailable: true,
    components: {
      hero: 'y2k',
      productCard: 'y2k',
      footer: 'y2k'
    }
  },
};

export const getTheme = (themeId: string): Theme => {
  return THEME_REGISTRY[themeId] || THEME_REGISTRY.modern;
};

export const getAvailableThemes = (): Theme[] => {
  return Object.values(THEME_REGISTRY);
};
