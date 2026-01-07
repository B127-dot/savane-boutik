// Color Palettes - Same as ShopEditor
export const COLOR_PALETTES = [
  { 
    id: 'default', 
    name: 'Défaut', 
    primary: '#6366f1',
    secondary: '#22c55e',
    accent: '#f59e0b',
    background: '#111827',
    foreground: '#ffffff'
  },
  { 
    id: 'glacier', 
    name: 'Glacier', 
    primary: '#06b6d4',
    secondary: '#3b82f6',
    accent: '#8b5cf6',
    background: '#0f172a',
    foreground: '#ffffff'
  },
  { 
    id: 'harvest', 
    name: 'Harvest', 
    primary: '#f59e0b',
    secondary: '#ea580c',
    accent: '#dc2626',
    background: '#1c1917',
    foreground: '#ffffff'
  },
  { 
    id: 'lavender', 
    name: 'Lavender', 
    primary: '#a855f7',
    secondary: '#ec4899',
    accent: '#f43f5e',
    background: '#1e1b4b',
    foreground: '#ffffff'
  },
  { 
    id: 'brutalist', 
    name: 'Brutalist', 
    primary: '#ffffff',
    secondary: '#ff0000',
    accent: '#ffff00',
    background: '#000000',
    foreground: '#ffffff'
  },
  { 
    id: 'obsidian', 
    name: 'Obsidian', 
    primary: '#71717a',
    secondary: '#a1a1aa',
    accent: '#e4e4e7',
    background: '#09090b',
    foreground: '#ffffff'
  },
  { 
    id: 'orchid', 
    name: 'Orchid', 
    primary: '#db2777',
    secondary: '#f472b6',
    accent: '#fce7f3',
    background: '#14040d',
    foreground: '#ffffff'
  },
  { 
    id: 'solar', 
    name: 'Solar', 
    primary: '#fbbf24',
    secondary: '#f59e0b',
    accent: '#d97706',
    background: '#1a1302',
    foreground: '#ffffff'
  },
  { 
    id: 'tide', 
    name: 'Tide', 
    primary: '#14b8a6',
    secondary: '#2dd4bf',
    accent: '#5eead4',
    background: '#042f2e',
    foreground: '#ffffff'
  },
  { 
    id: 'verdant', 
    name: 'Verdant', 
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

// Font family mapping
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
