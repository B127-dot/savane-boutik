/**
 * Utility functions for image compression and conversion to Base64
 */

const MAX_WIDTH = 800;
const MAX_HEIGHT = 800;
const MAX_SIZE_KB = 200;
const QUALITY = 0.8;

export const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_IMAGES = 5;

/**
 * Compress an image file and convert it to Base64
 */
export const compressImage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Validate file type
    if (!ALLOWED_FORMATS.includes(file.type)) {
      reject(new Error('Format non supporté. Utilisez JPEG, PNG ou WebP.'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let width = img.width;
        let height = img.height;
        
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width > height) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          } else {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }
        
        // Create canvas and compress
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Impossible de créer le contexte canvas'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to Base64 with quality adjustment
        let quality = QUALITY;
        let base64 = canvas.toDataURL('image/jpeg', quality);
        
        // If still too large, reduce quality
        while (base64.length > MAX_SIZE_KB * 1024 * 1.37 && quality > 0.1) {
          quality -= 0.1;
          base64 = canvas.toDataURL('image/jpeg', quality);
        }
        
        resolve(base64);
      };
      
      img.onerror = () => {
        reject(new Error('Erreur lors du chargement de l\'image'));
      };
      
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => {
      reject(new Error('Erreur lors de la lecture du fichier'));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Validate image files
 */
export const validateImages = (files: FileList | File[]): { valid: boolean; error?: string } => {
  const fileArray = Array.from(files);
  
  if (fileArray.length === 0) {
    return { valid: false, error: 'Aucune image sélectionnée' };
  }
  
  if (fileArray.length > MAX_IMAGES) {
    return { valid: false, error: `Maximum ${MAX_IMAGES} images autorisées` };
  }
  
  for (const file of fileArray) {
    if (!ALLOWED_FORMATS.includes(file.type)) {
      return { valid: false, error: `Format non supporté: ${file.name}` };
    }
    
    // Check file size (10MB max before compression)
    if (file.size > 10 * 1024 * 1024) {
      return { valid: false, error: `Image trop volumineuse: ${file.name}` };
    }
  }
  
  return { valid: true };
};

/**
 * Get human-readable file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

/**
 * Calculate total size of Base64 images
 */
export const calculateTotalSize = (images: string[]): number => {
  return images.reduce((total, img) => total + img.length, 0);
};
