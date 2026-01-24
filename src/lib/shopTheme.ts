import { TrustBarItem, HeroStat, HeroFeature, MarqueeItem, FooterLink } from '@/contexts/AppContext';

// Color Palettes - Centralized design system
export const COLOR_PALETTES = [
  { 
    id: 'default', 
    name: 'Défaut', 
    colors: ['#111827', '#6366f1', '#22c55e', '#f59e0b'],
    primary: '#6366f1',
    secondary: '#22c55e',
    accent: '#f59e0b',
    background: '#111827',
    foreground: '#ffffff'
  },
  { 
    id: 'y2k', 
    name: 'Y2K Original', 
    colors: ['#1f0a1a', '#f5428d', '#c861fc', '#9bd212'],
    primary: '#f5428d',    // Hot Pink - HSL(330 90% 60%)
    secondary: '#c861fc',  // Electric Purple - HSL(280 80% 65%)
    accent: '#9bd212',     // Electric Lime - HSL(85 90% 50%)
    background: '#1f0a1a', // Dark magenta background - HSL(280 40% 8%)
    foreground: '#faf5ff'  // Light purple-white
  },
  { 
    id: 'glacier', 
    name: 'Glacier', 
    colors: ['#0f172a', '#06b6d4', '#3b82f6', '#8b5cf6'],
    primary: '#06b6d4',
    secondary: '#3b82f6',
    accent: '#8b5cf6',
    background: '#0f172a',
    foreground: '#ffffff'
  },
  { 
    id: 'harvest', 
    name: 'Harvest', 
    colors: ['#1c1917', '#f59e0b', '#ea580c', '#dc2626'],
    primary: '#f59e0b',
    secondary: '#ea580c',
    accent: '#dc2626',
    background: '#1c1917',
    foreground: '#ffffff'
  },
  { 
    id: 'lavender', 
    name: 'Lavender', 
    colors: ['#1e1b4b', '#a855f7', '#ec4899', '#f43f5e'],
    primary: '#a855f7',
    secondary: '#ec4899',
    accent: '#f43f5e',
    background: '#1e1b4b',
    foreground: '#ffffff'
  },
  { 
    id: 'brutalist', 
    name: 'Brutalist', 
    colors: ['#000000', '#ffffff', '#ff0000', '#ffff00'],
    primary: '#ffffff',
    secondary: '#ff0000',
    accent: '#ffff00',
    background: '#000000',
    foreground: '#ffffff'
  },
  { 
    id: 'obsidian', 
    name: 'Obsidian', 
    colors: ['#09090b', '#71717a', '#a1a1aa', '#e4e4e7'],
    primary: '#71717a',
    secondary: '#a1a1aa',
    accent: '#e4e4e7',
    background: '#09090b',
    foreground: '#ffffff'
  },
  { 
    id: 'orchid', 
    name: 'Orchid', 
    colors: ['#14040d', '#db2777', '#f472b6', '#fce7f3'],
    primary: '#db2777',
    secondary: '#f472b6',
    accent: '#fce7f3',
    background: '#14040d',
    foreground: '#ffffff'
  },
  { 
    id: 'solar', 
    name: 'Solar', 
    colors: ['#1a1302', '#fbbf24', '#f59e0b', '#d97706'],
    primary: '#fbbf24',
    secondary: '#f59e0b',
    accent: '#d97706',
    background: '#1a1302',
    foreground: '#ffffff'
  },
  { 
    id: 'tide', 
    name: 'Tide', 
    colors: ['#042f2e', '#14b8a6', '#2dd4bf', '#5eead4'],
    primary: '#14b8a6',
    secondary: '#2dd4bf',
    accent: '#5eead4',
    background: '#042f2e',
    foreground: '#ffffff'
  },
  { 
    id: 'verdant', 
    name: 'Verdant', 
    colors: ['#052e16', '#22c55e', '#4ade80', '#86efac'],
    primary: '#22c55e',
    secondary: '#4ade80',
    accent: '#86efac',
    background: '#052e16',
    foreground: '#ffffff'
  },
];

// Get palette by ID
export const getPaletteById = (paletteId?: string) => {
  return COLOR_PALETTES.find(p => p.id === paletteId) || COLOR_PALETTES[0];
};

// Font options for shop customization
export const FONT_OPTIONS = [
  { id: 'inter', name: 'Inter', preview: 'Aa', style: 'font-sans' },
  { id: 'switzer', name: 'Switzer', preview: 'Aa', style: 'font-switzer' },
  { id: 'lora', name: 'Lora', preview: 'Aa', style: 'font-serif' },
  { id: 'poppins', name: 'Poppins', preview: 'Aa', style: 'font-poppins' },
  { id: 'playfair', name: 'Playfair', preview: 'Aa', style: 'font-playfair' },
];

// Button style options
export const BUTTON_STYLES = [
  { id: 'rounded', name: 'Arrondi', class: 'rounded-lg' },
  { id: 'pill', name: 'Pilule', class: 'rounded-full' },
  { id: 'square', name: 'Carré', class: 'rounded-none' },
];

// Header style options
export const HEADER_STYLES = [
  { id: 'classic', name: 'Classique', description: 'Simple et efficace' },
  { id: 'gradient', name: 'Gradient Glow', description: 'Moderne avec effets' },
  { id: 'minimal', name: 'Minimal Clean', description: 'Épuré et élégant' },
  { id: 'glass', name: 'Glass Premium', description: 'Glassmorphism chic' },
];

// Section spacing options
export const SECTION_SPACING_OPTIONS = [
  { id: 'compact', label: 'Compact', icon: '⊟' },
  { id: 'normal', label: 'Normal', icon: '⊞' },
  { id: 'airy', label: 'Aéré', icon: '⬜' },
] as const;

// Card border radius options
export const CARD_BORDER_RADIUS_OPTIONS = [
  { id: 'none', label: 'Aucun', radius: '0' },
  { id: 'light', label: 'Léger', radius: '4px' },
  { id: 'medium', label: 'Moyen', radius: '8px' },
  { id: 'strong', label: 'Fort', radius: '16px' },
] as const;

// Trust bar icon options
export const TRUST_BAR_ICONS = [
  { value: 'truck', label: 'Livraison' },
  { value: 'shield', label: 'Sécurité' },
  { value: 'phone', label: 'Téléphone' },
  { value: 'star', label: 'Étoile' },
  { value: 'heart', label: 'Cœur' },
  { value: 'clock', label: 'Horloge' },
  { value: 'check', label: 'Validé' },
  { value: 'wallet', label: 'Paiement' },
  { value: 'headphones', label: 'Support' },
  { value: 'gift', label: 'Cadeau' },
  { value: 'zap', label: 'Éclair' },
  { value: 'package', label: 'Colis' },
] as const;

// Hero badge icon options
export const HERO_BADGE_ICONS = [
  { value: 'sparkles', label: 'Étoiles' },
  { value: 'flame', label: 'Flamme' },
  { value: 'star', label: 'Étoile' },
  { value: 'zap', label: 'Éclair' },
  { value: 'gift', label: 'Cadeau' },
  { value: 'trending', label: 'Tendance' },
  { value: 'none', label: 'Aucun' },
] as const;

// Default trust bar items
export const DEFAULT_TRUST_BAR: TrustBarItem[] = [
  { id: '1', icon: 'wallet', title: 'Paiement Mobile Sécurisé', subtitle: 'Orange Money, Wave, Moov' },
  { id: '2', icon: 'truck', title: 'Livraison Rapide', subtitle: 'Partout au Burkina' },
  { id: '3', icon: 'headphones', title: 'Support 7j/7', subtitle: 'WhatsApp & Appel' },
];

// Default hero stats
export const DEFAULT_HERO_STATS: HeroStat[] = [
  { id: '1', value: '500', suffix: '+', label: 'Produits' },
  { id: '2', value: '1000', suffix: '+', label: 'Clients satisfaits' },
  { id: '3', value: '4.9', suffix: '★', label: 'Note moyenne' },
];

// Default hero features
export const DEFAULT_HERO_FEATURES: HeroFeature[] = [
  { id: '1', text: 'Livraison 24h' },
  { id: '2', text: 'Retour gratuit' },
  { id: '3', text: 'Paiement sécurisé' },
];

// Default marquee items
export const DEFAULT_MARQUEE_ITEMS: MarqueeItem[] = [
  { id: '1', text: 'LIVRAISON GRATUITE', icon: 'truck' },
  { id: '2', text: 'NOUVELLES SORTIES', icon: 'star' },
  { id: '3', text: 'QUALITÉ PREMIUM', icon: 'zap' },
  { id: '4', text: 'SATISFAIT OU REMBOURSÉ', icon: 'heart' },
  { id: '5', text: 'ÉDITION LIMITÉE', icon: 'sparkles' },
];

// Default footer links
export const DEFAULT_FOOTER_LINKS: FooterLink[] = [
  { id: '1', label: 'À propos', url: '#about' },
  { id: '2', label: 'FAQ', url: '#faq' },
  { id: '3', label: 'Conditions de vente', url: '/cgv' },
  { id: '4', label: 'Confidentialité', url: '/privacy' },
];

// Font family CSS mapping
export const FONT_FAMILIES: Record<string, string> = {
  inter: "'Inter', sans-serif",
  switzer: "'Switzer', sans-serif",
  lora: "'Lora', serif",
  poppins: "'Poppins', sans-serif",
  playfair: "'Playfair Display', serif",
};

// Get font family CSS
export const getFontFamily = (fontId?: string): string => {
  return FONT_FAMILIES[fontId || 'inter'] || FONT_FAMILIES.inter;
};

// Get font class for Tailwind
export const getFontClass = (fontId?: string): string => {
  const fontClasses: Record<string, string> = {
    inter: 'font-sans',
    switzer: 'font-switzer',
    lora: 'font-serif',
    poppins: 'font-poppins',
    playfair: 'font-playfair',
  };
  return fontClasses[fontId || 'inter'] || 'font-sans';
};

// Button style mapping
export const getButtonClass = (style?: 'rounded' | 'pill' | 'square'): string => {
  switch(style) {
    case 'pill': return 'rounded-full';
    case 'square': return 'rounded-none';
    default: return 'rounded-lg';
  }
};

// Get section spacing class
export const getSectionSpacingClass = (spacing?: 'compact' | 'normal' | 'airy'): string => {
  switch(spacing) {
    case 'compact': return 'py-8 md:py-12';
    case 'airy': return 'py-20 md:py-32';
    default: return 'py-12 md:py-20';
  }
};

// Get card border radius class
export const getCardBorderRadiusClass = (radius?: 'none' | 'light' | 'medium' | 'strong'): string => {
  switch(radius) {
    case 'none': return 'rounded-none';
    case 'light': return 'rounded';
    case 'strong': return 'rounded-2xl';
    default: return 'rounded-lg';
  }
};

// Convert hex to HSL
export const hexToHsl = (hex: string): string => {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
};

// Generate CSS variables from palette
export const generateCssVariables = (paletteId?: string): Record<string, string> => {
  const palette = getPaletteById(paletteId);
  
  return {
    '--shop-primary': palette.primary,
    '--shop-primary-hsl': hexToHsl(palette.primary),
    '--shop-secondary': palette.secondary,
    '--shop-secondary-hsl': hexToHsl(palette.secondary),
    '--shop-accent': palette.accent,
    '--shop-accent-hsl': hexToHsl(palette.accent),
    '--shop-background': palette.background,
    '--shop-background-hsl': hexToHsl(palette.background),
    '--shop-foreground': palette.foreground,
    '--shop-foreground-hsl': hexToHsl(palette.foreground),
  };
};

// Type exports
export type ColorPalette = typeof COLOR_PALETTES[number];
export type FontOption = typeof FONT_OPTIONS[number];
export type ButtonStyle = typeof BUTTON_STYLES[number];
export type HeaderStyle = typeof HEADER_STYLES[number];
export type SectionSpacing = typeof SECTION_SPACING_OPTIONS[number]['id'];
export type CardBorderRadius = typeof CARD_BORDER_RADIUS_OPTIONS[number]['id'];
export type TrustBarIcon = typeof TRUST_BAR_ICONS[number]['value'];
