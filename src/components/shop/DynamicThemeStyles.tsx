import { useEffect } from 'react';
import { 
  generateCssVariables, 
  getFontFamily, 
  getFontClass,
  getButtonClass 
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
 * These variables are then used by shop components to apply dynamic theming.
 */
const DynamicThemeStyles = ({ 
  colorPalette = 'default',
  buttonStyle = 'rounded',
  fontFamily = 'inter'
}: DynamicThemeStylesProps) => {
  
  useEffect(() => {
    // Get CSS variables for the selected palette
    const cssVariables = generateCssVariables(colorPalette);
    const fontFamilyValue = getFontFamily(fontFamily);
    const buttonRadius = getButtonClass(buttonStyle);
    
    // Convert button radius class to actual CSS value
    const buttonRadiusValue = buttonStyle === 'pill' ? '9999px' 
      : buttonStyle === 'square' ? '0px' 
      : '0.5rem';
    
    // Create style element
    const styleId = 'shop-dynamic-theme';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    // Generate CSS
    const css = `
      :root {
        /* Dynamic Shop Colors */
        ${Object.entries(cssVariables).map(([key, value]) => `${key}: ${value};`).join('\n        ')}
        
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
      
      /* Gradient utilities */
      .shop-gradient-primary {
        background: linear-gradient(135deg, var(--shop-primary), var(--shop-secondary)) !important;
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
