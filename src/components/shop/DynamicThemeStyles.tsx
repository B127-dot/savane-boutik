import { useEffect } from 'react';
import { 
  getPaletteById, 
  getFontFamily, 
  hexToHsl
} from '@/lib/shopTheme';

interface DynamicThemeStylesProps {
  colorPalette?: string;
  buttonStyle?: 'rounded' | 'pill' | 'square';
  fontFamily?: 'inter' | 'lora' | 'poppins' | 'switzer' | 'playfair';
}

/**
 * DynamicThemeStyles Component
 * 
 * This component injects CSS custom properties (variables) into the document
 * based on the shop's selected color palette, button style, and font family.
 * 
 * CRITICAL: This component overrides BOTH --shop-* variables AND the base
 * theme variables (--primary, --secondary, etc.) to ensure all components
 * respond to palette changes, including themed components like Y2K.
 */
const DynamicThemeStyles = ({ 
  colorPalette = 'default',
  buttonStyle = 'rounded',
  fontFamily = 'inter'
}: DynamicThemeStylesProps) => {
  
  useEffect(() => {
    const palette = getPaletteById(colorPalette);
    const fontFamilyValue = getFontFamily(fontFamily);
    
    // Convert button radius to CSS value
    const buttonRadiusValue = buttonStyle === 'pill' ? '9999px' 
      : buttonStyle === 'square' ? '0px' 
      : '0.5rem';
    
    // Convert hex colors to HSL for CSS variables
    const primaryHsl = hexToHsl(palette.primary);
    const secondaryHsl = hexToHsl(palette.secondary);
    const accentHsl = hexToHsl(palette.accent);
    const backgroundHsl = hexToHsl(palette.background);
    const foregroundHsl = hexToHsl(palette.foreground);
    
    // Create style element
    const styleId = 'shop-dynamic-theme';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    // Generate CSS - Override BOTH --shop-* AND base theme variables
    // This ensures Y2K, Modern, and all themed components respond to palette changes
    const css = `
      /* Dynamic Shop Theme - Overrides all theme-specific colors */
      .modern-theme,
      .artisan-theme,
      .urbanwave-theme,
      :root {
        /* Override base theme colors with selected palette */
        --primary: ${primaryHsl} !important;
        --primary-foreground: ${foregroundHsl} !important;
        --primary-glow: ${primaryHsl} !important;
        
        --secondary: ${secondaryHsl} !important;
        --secondary-foreground: ${foregroundHsl} !important;
        
        --accent: ${accentHsl} !important;
        --accent-foreground: ${backgroundHsl} !important;
        
        /* Dynamic gradients that respond to palette */
        --gradient-primary: linear-gradient(135deg, ${palette.primary}, ${palette.secondary}) !important;
        --gradient-secondary: linear-gradient(135deg, ${palette.secondary}, ${palette.accent}) !important;
        
        /* Shop-specific variables for explicit usage */
        --shop-primary: ${palette.primary};
        --shop-primary-hsl: ${primaryHsl};
        --shop-secondary: ${palette.secondary};
        --shop-secondary-hsl: ${secondaryHsl};
        --shop-accent: ${palette.accent};
        --shop-accent-hsl: ${accentHsl};
        --shop-background: ${palette.background};
        --shop-background-hsl: ${backgroundHsl};
        --shop-foreground: ${palette.foreground};
        --shop-foreground-hsl: ${foregroundHsl};
        
        /* Dynamic Font */
        --shop-font-family: ${fontFamilyValue};
        
        /* Dynamic Button Radius */
        --shop-button-radius: ${buttonRadiusValue};
      }
      
      /* Shop-specific themed classes */
      .shop-primary-bg {
        background-color: var(--shop-primary) !important;
      }
      
      .shop-primary-text {
        color: var(--shop-primary) !important;
      }
      
      .shop-secondary-bg {
        background-color: var(--shop-secondary) !important;
      }
      
      .shop-secondary-text {
        color: var(--shop-secondary) !important;
      }
      
      .shop-accent-bg {
        background-color: var(--shop-accent) !important;
      }
      
      .shop-accent-text {
        color: var(--shop-accent) !important;
      }
      
      .shop-background {
        background-color: var(--shop-background) !important;
      }
      
      .shop-btn-primary {
        background-color: var(--shop-primary) !important;
        border-radius: var(--shop-button-radius) !important;
      }
      
      .shop-btn-primary:hover {
        filter: brightness(0.9);
      }
      
      .shop-btn-radius {
        border-radius: var(--shop-button-radius) !important;
      }
      
      .shop-font {
        font-family: var(--shop-font-family) !important;
      }
      
      /* Dynamic gradient utilities */
      .shop-gradient-primary,
      .bg-gradient-primary {
        background: linear-gradient(135deg, ${palette.primary}, ${palette.secondary}) !important;
      }
      
      .shop-gradient-overlay {
        background: linear-gradient(to bottom right, var(--shop-background), transparent) !important;
      }
      
      /* Border with primary color */
      .shop-border-primary {
        border-color: var(--shop-primary) !important;
      }
      
      /* Ring with primary color */
      .shop-ring-primary {
        --tw-ring-color: var(--shop-primary) !important;
      }
      
      /* Icon container with primary gradient */
      .shop-icon-container {
        background: linear-gradient(135deg, 
          color-mix(in srgb, var(--shop-primary) 20%, transparent),
          color-mix(in srgb, var(--shop-primary) 10%, transparent)
        ) !important;
      }
      
      .shop-icon-container svg {
        color: var(--shop-primary) !important;
      }
      
    `;
    
    styleElement.textContent = css;
    
    // Cleanup on unmount
    return () => {
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, [colorPalette, buttonStyle, fontFamily]);
  
  return null; // This component doesn't render anything visible
};

export default DynamicThemeStyles;
