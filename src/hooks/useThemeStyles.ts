import { useMemo } from 'react';
import { getPaletteById, getFontClass, getButtonClass, getSectionSpacingClass, getCardBorderRadiusClass } from '@/lib/shopTheme';

interface ThemeStylesOptions {
  colorPalette?: string;
  buttonStyle?: 'rounded' | 'pill' | 'square';
  fontFamily?: string;
  sectionSpacing?: 'compact' | 'normal' | 'airy';
  cardBorderRadius?: 'none' | 'light' | 'medium' | 'strong';
}

interface ThemeStyles {
  // Color values
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  foregroundColor: string;
  
  // CSS Classes
  fontClass: string;
  buttonClass: string;
  sectionSpacingClass: string;
  cardBorderRadiusClass: string;
  
  // CSS Variable-based classes (for use in components)
  primaryBgClass: string;
  primaryTextClass: string;
  primaryBorderClass: string;
  primaryHoverBgClass: string;
  secondaryBgClass: string;
  secondaryTextClass: string;
  accentBgClass: string;
  accentTextClass: string;
  
  // Button styles
  buttonPrimaryClass: string;
  buttonSecondaryClass: string;
  buttonOutlineClass: string;
  
  // Badge styles
  badgeClass: string;
  discountBadgeClass: string;
  
  // Wishlist button styles
  wishlistActiveClass: string;
  wishlistInactiveClass: string;
  
  // Helper function to get button radius
  getButtonRadius: () => string;
}

/**
 * Hook to get consistent theme styles across all shop themes
 * Uses CSS variables injected by DynamicThemeStyles component
 */
export const useThemeStyles = (options: ThemeStylesOptions = {}): ThemeStyles => {
  return useMemo(() => {
    const palette = getPaletteById(options.colorPalette);
    const buttonClass = getButtonClass(options.buttonStyle);
    const fontClass = getFontClass(options.fontFamily);
    const sectionSpacingClass = getSectionSpacingClass(options.sectionSpacing);
    const cardBorderRadiusClass = getCardBorderRadiusClass(options.cardBorderRadius);
    
    // CSS Variable-based classes that work with DynamicThemeStyles
    const primaryBgClass = 'shop-primary-bg';
    const primaryTextClass = 'shop-primary-text';
    const primaryBorderClass = 'shop-primary-border';
    const primaryHoverBgClass = 'shop-primary-hover-bg';
    const secondaryBgClass = 'shop-secondary-bg';
    const secondaryTextClass = 'shop-secondary-text';
    const accentBgClass = 'shop-accent-bg';
    const accentTextClass = 'shop-accent-text';
    
    // Button styles using CSS variables
    const buttonPrimaryClass = `shop-primary-bg text-white hover:opacity-90 transition-all duration-300 ${buttonClass}`;
    const buttonSecondaryClass = `shop-secondary-bg text-white hover:opacity-90 transition-all duration-300 ${buttonClass}`;
    const buttonOutlineClass = `border-2 shop-primary-border shop-primary-text hover:shop-primary-bg hover:text-white transition-all duration-300 ${buttonClass}`;
    
    // Badge styles
    const badgeClass = `shop-primary-bg text-white ${buttonClass}`;
    const discountBadgeClass = `shop-primary-bg text-white px-3 py-1 text-xs font-medium ${buttonClass}`;
    
    // Wishlist styles
    const wishlistActiveClass = 'shop-primary-bg text-white';
    const wishlistInactiveClass = 'bg-white/90 backdrop-blur-sm text-gray-800 hover:shop-primary-bg hover:text-white';
    
    const getButtonRadius = () => {
      switch (options.buttonStyle) {
        case 'pill': return 'rounded-full';
        case 'square': return 'rounded-none';
        default: return 'rounded-lg';
      }
    };
    
    return {
      // Raw colors from palette
      primaryColor: palette.primary,
      secondaryColor: palette.secondary,
      accentColor: palette.accent,
      backgroundColor: palette.background,
      foregroundColor: palette.foreground,
      
      // Base classes
      fontClass,
      buttonClass,
      sectionSpacingClass,
      cardBorderRadiusClass,
      
      // CSS Variable classes
      primaryBgClass,
      primaryTextClass,
      primaryBorderClass,
      primaryHoverBgClass,
      secondaryBgClass,
      secondaryTextClass,
      accentBgClass,
      accentTextClass,
      
      // Composed button classes
      buttonPrimaryClass,
      buttonSecondaryClass,
      buttonOutlineClass,
      
      // Badge classes
      badgeClass,
      discountBadgeClass,
      
      // Wishlist classes
      wishlistActiveClass,
      wishlistInactiveClass,
      
      // Helper
      getButtonRadius,
    };
  }, [options.colorPalette, options.buttonStyle, options.fontFamily, options.sectionSpacing, options.cardBorderRadius]);
};

export default useThemeStyles;
