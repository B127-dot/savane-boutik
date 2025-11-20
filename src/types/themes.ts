export interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'modern' | 'elegant' | 'minimal' | 'creative';
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
  elegant: {
    id: 'elegant',
    name: 'Élégant',
    description: 'Design sophistiqué avec typographie raffinée et espaces aérés. Idéal pour les produits haut de gamme.',
    preview: '/theme-previews/elegant.jpg',
    category: 'elegant',
    isAvailable: false,
    components: {
      hero: 'elegant',
      productCard: 'elegant',
      footer: 'elegant'
    }
  }
};

export const getTheme = (themeId: string): Theme => {
  return THEME_REGISTRY[themeId] || THEME_REGISTRY.modern;
};

export const getAvailableThemes = (): Theme[] => {
  return Object.values(THEME_REGISTRY);
};
