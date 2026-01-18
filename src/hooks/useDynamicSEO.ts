import { useEffect } from 'react';

interface SEOSettings {
  title?: string;
  description?: string;
  image?: string;
  favicon?: string;
  shopName?: string;
}

/**
 * Hook to dynamically update SEO meta tags and favicon
 * This is used in Shop.tsx to apply the shop's custom SEO settings
 */
export function useDynamicSEO(settings: SEOSettings | null) {
  // Update document title
  useEffect(() => {
    if (!settings) return;
    
    const title = settings.title || settings.shopName || 'Boutique';
    document.title = title;
    
    // Cleanup: restore default title on unmount
    return () => {
      document.title = 'BurkinaShop';
    };
  }, [settings?.title, settings?.shopName]);

  // Update favicon dynamically
  useEffect(() => {
    if (!settings?.favicon) return;

    // Find existing favicon link or create a new one
    let faviconLink = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    
    if (!faviconLink) {
      faviconLink = document.createElement('link');
      faviconLink.rel = 'icon';
      document.head.appendChild(faviconLink);
    }

    const previousFavicon = faviconLink.href;
    faviconLink.href = settings.favicon;

    // Cleanup: restore previous favicon on unmount
    return () => {
      if (previousFavicon) {
        faviconLink.href = previousFavicon;
      }
    };
  }, [settings?.favicon]);

  // Update Open Graph meta tags
  useEffect(() => {
    if (!settings) return;

    const updateMetaTag = (property: string, content: string | undefined) => {
      if (!content) return;
      
      let metaTag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      
      metaTag.content = content;
    };

    const updateNameMetaTag = (name: string, content: string | undefined) => {
      if (!content) return;
      
      let metaTag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.name = name;
        document.head.appendChild(metaTag);
      }
      
      metaTag.content = content;
    };

    // Open Graph tags
    updateMetaTag('og:title', settings.title || settings.shopName);
    updateMetaTag('og:description', settings.description);
    updateMetaTag('og:image', settings.image);
    updateMetaTag('og:type', 'website');

    // Twitter Card tags
    updateNameMetaTag('twitter:card', 'summary_large_image');
    updateNameMetaTag('twitter:title', settings.title || settings.shopName);
    updateNameMetaTag('twitter:description', settings.description);
    updateNameMetaTag('twitter:image', settings.image);

    // Standard meta description
    updateNameMetaTag('description', settings.description);

  }, [settings?.title, settings?.description, settings?.image, settings?.shopName]);
}

export default useDynamicSEO;
