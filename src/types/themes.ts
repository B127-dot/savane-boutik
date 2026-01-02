export interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'modern' | 'elegant' | 'minimal' | 'creative' | 'haute-fashion';
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
  'noir-luxe': {
    id: 'noir-luxe',
    name: 'Noir Luxe',
    description: 'Thème luxueux dark avec accents dorés. Typographie élégante Cinzel et animations raffinées. Parfait pour le haut de gamme.',
    preview: '/theme-previews/noir-luxe.jpg',
    category: 'elegant',
    isAvailable: true,
    components: {
      hero: 'noir-luxe',
      productCard: 'noir-luxe',
      footer: 'noir-luxe'
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
  'haute-fashion': {
    id: 'haute-fashion',
    name: 'Haute Fashion',
    description: 'Bientôt disponible - Thème streetwear premium avec effets parallax et design sombre élégant.',
    preview: '/theme-previews/haute-fashion.jpg',
    category: 'haute-fashion',
    isAvailable: false,
    components: {
      hero: 'haute-fashion',
      productCard: 'haute-fashion',
      footer: 'haute-fashion'
    }
  }
};

export const getTheme = (themeId: string): Theme => {
  return THEME_REGISTRY[themeId] || THEME_REGISTRY.modern;
};

export const getAvailableThemes = (): Theme[] => {
  return Object.values(THEME_REGISTRY);
};
