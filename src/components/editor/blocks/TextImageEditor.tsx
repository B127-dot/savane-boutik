import { FileText, Image } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TextImageEditorProps {
  title: string;
  text: string;
  imageUrl: string;
  imagePosition: 'left' | 'right';
  buttonText?: string;
  buttonLink?: string;
  onChange: (config: {
    title: string;
    text: string;
    imageUrl: string;
    imagePosition: 'left' | 'right';
    buttonText?: string;
    buttonLink?: string;
  }) => void;
}

const TextImageEditor = ({
  title,
  text,
  imageUrl,
  imagePosition,
  buttonText,
  buttonLink,
  onChange,
}: TextImageEditorProps) => {
  const handleChange = (updates: Partial<TextImageEditorProps>) => {
    onChange({
      title: updates.title !== undefined ? updates.title : title,
      text: updates.text !== undefined ? updates.text : text,
      imageUrl: updates.imageUrl !== undefined ? updates.imageUrl : imageUrl,
      imagePosition: updates.imagePosition !== undefined ? updates.imagePosition : imagePosition,
      buttonText: updates.buttonText !== undefined ? updates.buttonText : buttonText,
      buttonLink: updates.buttonLink !== undefined ? updates.buttonLink : buttonLink,
    });
  };

  return (
    <div className="space-y-6">
      {/* Section header settings */}
      <div className="space-y-4 p-4 rounded-xl bg-muted/50 border border-border/50">
        <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-500" />
          Section Texte + Image
        </h4>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-xs">Titre</Label>
            <Input
              value={title}
              onChange={(e) => handleChange({ title: e.target.value })}
              placeholder="Notre histoire"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Texte</Label>
            <Textarea
              value={text}
              onChange={(e) => handleChange({ text: e.target.value })}
              placeholder="Décrivez votre boutique, votre histoire, vos valeurs..."
              rows={5}
            />
          </div>
        </div>
      </div>

      {/* Image settings */}
      <div className="space-y-4 p-4 rounded-xl bg-muted/50 border border-border/50">
        <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
          <Image className="w-4 h-4 text-blue-500" />
          Image
        </h4>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-xs">URL de l'image</Label>
            <Input
              value={imageUrl}
              onChange={(e) => handleChange({ imageUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>

          {imageUrl && (
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted border border-border/50">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-xs">Position de l'image</Label>
            <Select
              value={imagePosition}
              onValueChange={(value: 'left' | 'right') => handleChange({ imagePosition: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">À gauche</SelectItem>
                <SelectItem value="right">À droite</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Button settings */}
      <div className="space-y-4 p-4 rounded-xl bg-muted/50 border border-border/50">
        <h4 className="font-medium text-sm text-foreground">Bouton (optionnel)</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-xs">Texte du bouton</Label>
            <Input
              value={buttonText || ''}
              onChange={(e) => handleChange({ buttonText: e.target.value })}
              placeholder="En savoir plus"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Lien du bouton</Label>
            <Input
              value={buttonLink || ''}
              onChange={(e) => handleChange({ buttonLink: e.target.value })}
              placeholder="#contact"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextImageEditor;
