import { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { compressImage, validateImages, MAX_IMAGES, formatFileSize, calculateTotalSize } from '@/lib/imageCompression';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export const ImageUploader = ({ images, onChange, maxImages = MAX_IMAGES }: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Validate
    const validation = validateImages(files);
    if (!validation.valid) {
      toast({
        title: "Erreur",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    // Check if adding these would exceed max
    if (images.length + files.length > maxImages) {
      toast({
        title: "Limite atteinte",
        description: `Vous ne pouvez ajouter que ${maxImages - images.length} image(s) supplémentaire(s)`,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const compressedImages: string[] = [];
      
      for (const file of Array.from(files)) {
        try {
          const compressed = await compressImage(file);
          compressedImages.push(compressed);
        } catch (error) {
          toast({
            title: "Erreur de compression",
            description: `Impossible de compresser ${file.name}`,
            variant: "destructive",
          });
        }
      }

      if (compressedImages.length > 0) {
        const newImages = [...images, ...compressedImages];
        onChange(newImages);
        
        toast({
          title: "Images ajoutées",
          description: `${compressedImages.length} image(s) ajoutée(s) avec succès`,
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'upload",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      e.target.value = ''; // Reset input
    }
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
    toast({
      title: "Image supprimée",
      description: "L'image a été retirée",
    });
  };

  const totalSize = calculateTotalSize(images);

  return (
    <div className="space-y-4">
      <div>
        <Label>Images du produit (max {maxImages})</Label>
        <p className="text-xs text-muted-foreground mt-1">
          Formats acceptés: JPEG, PNG, WebP • Max 10MB par image
        </p>
      </div>

      {/* Upload Button */}
      {images.length < maxImages && (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={isUploading}
            onClick={() => document.getElementById('image-upload')?.click()}
            className="relative"
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? 'Traitement...' : 'Ajouter des images'}
          </Button>
          <span className="text-xs text-muted-foreground">
            {images.length}/{maxImages} images
          </span>
        </div>
      )}

      <input
        id="image-upload"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Images Preview Grid */}
      {images.length > 0 && (
        <div className="space-y-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg border bg-muted overflow-hidden group"
              >
                <img
                  src={img}
                  alt={`Produit ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Badge for first image */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                    Principal
                  </div>
                )}
                
                {/* Remove button */}
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Total size info */}
          <p className="text-xs text-muted-foreground">
            Taille totale: {formatFileSize(totalSize)}
          </p>
        </div>
      )}

      {/* Empty state */}
      {images.length === 0 && (
        <div className="border-2 border-dashed rounded-lg p-8 text-center bg-muted/20">
          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            Aucune image ajoutée
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            Ajouter des images
          </Button>
        </div>
      )}
    </div>
  );
};
