import html2canvas from 'html2canvas';

export interface ThemeScreenshotOptions {
  width?: number;
  height?: number;
  quality?: number;
}

const DEFAULT_OPTIONS: ThemeScreenshotOptions = {
  width: 1200,
  height: 800,
  quality: 0.8
};

/**
 * Capture a screenshot of the shop with a specific theme
 */
export const captureThemeScreenshot = async (
  themeId: string,
  shopUrl: string,
  options: ThemeScreenshotOptions = {}
): Promise<string> => {
  const { width, height, quality } = { ...DEFAULT_OPTIONS, ...options };

  return new Promise((resolve, reject) => {
    try {
      // Create an iframe to load the shop with the theme
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.top = '-9999px';
      iframe.style.left = '-9999px';
      iframe.style.width = `${width}px`;
      iframe.style.height = `${height}px`;
      iframe.style.border = 'none';
      
      const shopPreviewUrl = `${window.location.origin}/shop/${shopUrl}?previewTheme=${themeId}`;
      iframe.src = shopPreviewUrl;

      document.body.appendChild(iframe);

      // Wait for iframe to load
      iframe.onload = async () => {
        try {
          // Wait a bit more for all content to render
          await new Promise(resolve => setTimeout(resolve, 2000));

          const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
          if (!iframeDocument) {
            throw new Error('Cannot access iframe document');
          }

          // Capture the screenshot
          const canvas = await html2canvas(iframeDocument.body, {
            width,
            height,
            scale: 1,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
          });

          // Convert to base64
          const screenshot = canvas.toDataURL('image/jpeg', quality);

          // Cleanup
          document.body.removeChild(iframe);

          resolve(screenshot);
        } catch (error) {
          document.body.removeChild(iframe);
          reject(error);
        }
      };

      iframe.onerror = () => {
        document.body.removeChild(iframe);
        reject(new Error('Failed to load shop preview'));
      };

      // Timeout after 10 seconds
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
          reject(new Error('Screenshot capture timeout'));
        }
      }, 10000);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Generate screenshots for all available themes
 */
export const generateAllThemeScreenshots = async (
  shopUrl: string,
  themeIds: string[],
  onProgress?: (themeId: string, index: number, total: number) => void
): Promise<Record<string, string>> => {
  const screenshots: Record<string, string> = {};

  for (let i = 0; i < themeIds.length; i++) {
    const themeId = themeIds[i];
    
    if (onProgress) {
      onProgress(themeId, i + 1, themeIds.length);
    }

    try {
      const screenshot = await captureThemeScreenshot(themeId, shopUrl);
      screenshots[themeId] = screenshot;
      
      // Save to localStorage
      localStorage.setItem(`theme_preview_${themeId}`, screenshot);
    } catch (error) {
      console.error(`Failed to capture screenshot for theme ${themeId}:`, error);
    }
  }

  return screenshots;
};

/**
 * Get cached theme screenshot from localStorage
 */
export const getCachedThemeScreenshot = (themeId: string): string | null => {
  return localStorage.getItem(`theme_preview_${themeId}`);
};

/**
 * Clear all cached theme screenshots
 */
export const clearThemeScreenshotCache = (): void => {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('theme_preview_')) {
      localStorage.removeItem(key);
    }
  });
};
