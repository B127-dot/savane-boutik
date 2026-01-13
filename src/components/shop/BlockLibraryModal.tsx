import { useState } from 'react';
import { 
  MessageSquare, 
  Instagram, 
  HelpCircle, 
  Youtube, 
  FileText,
  X,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';

export interface CustomBlock {
  id: string;
  type: 'testimonials' | 'instagram' | 'faq' | 'youtube' | 'text-image';
  title: string;
  config: Record<string, any>;
}

interface BlockLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBlock: (block: CustomBlock) => void;
  editingBlock?: CustomBlock | null;
}

const BLOCK_TYPES = [
  {
    type: 'testimonials',
    name: 'Témoignages clients',
    description: 'Affichez les avis de vos clients satisfaits',
    icon: MessageSquare,
    color: 'from-amber-500 to-orange-500',
  },
  {
    type: 'instagram',
    name: 'Galerie Instagram',
    description: 'Présentez votre feed Instagram',
    icon: Instagram,
    color: 'from-pink-500 to-purple-500',
  },
  {
    type: 'faq',
    name: 'FAQ Accordéon',
    description: 'Questions fréquemment posées',
    icon: HelpCircle,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    type: 'youtube',
    name: 'Vidéo YouTube',
    description: 'Intégrez une vidéo YouTube',
    icon: Youtube,
    color: 'from-red-500 to-rose-500',
  },
  {
    type: 'text-image',
    name: 'Texte + Image',
    description: 'Section avec texte et image côte à côte',
    icon: FileText,
    color: 'from-emerald-500 to-teal-500',
  },
] as const;

const BlockLibraryModal = ({
  isOpen,
  onClose,
  onAddBlock,
  editingBlock
}: BlockLibraryModalProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(editingBlock?.type || null);
  const [blockConfig, setBlockConfig] = useState<Record<string, any>>(editingBlock?.config || {});
  const [blockTitle, setBlockTitle] = useState(editingBlock?.title || '');

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    setBlockConfig({});
    setBlockTitle(BLOCK_TYPES.find(b => b.type === type)?.name || '');
  };

  const handleSave = () => {
    if (!selectedType) return;

    const block: CustomBlock = {
      id: editingBlock?.id || `custom_${Date.now()}`,
      type: selectedType as CustomBlock['type'],
      title: blockTitle || BLOCK_TYPES.find(b => b.type === selectedType)?.name || 'Bloc personnalisé',
      config: blockConfig,
    };

    onAddBlock(block);
    onClose();
    setSelectedType(null);
    setBlockConfig({});
    setBlockTitle('');
  };

  const renderConfigForm = () => {
    switch (selectedType) {
      case 'testimonials':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Titre de la section</Label>
              <Input
                value={blockConfig.title || ''}
                onChange={(e) => setBlockConfig({ ...blockConfig, title: e.target.value })}
                placeholder="Ce que nos clients disent"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Les témoignages seront affichés avec des données par défaut. Vous pourrez les personnaliser plus tard.
            </p>
          </div>
        );

      case 'instagram':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Titre de la section</Label>
              <Input
                value={blockConfig.title || ''}
                onChange={(e) => setBlockConfig({ ...blockConfig, title: e.target.value })}
                placeholder="Suivez-nous sur Instagram"
              />
            </div>
            <div className="space-y-2">
              <Label>Handle Instagram</Label>
              <Input
                value={blockConfig.instagramHandle || ''}
                onChange={(e) => setBlockConfig({ ...blockConfig, instagramHandle: e.target.value })}
                placeholder="@votreboutique"
              />
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Titre de la section</Label>
              <Input
                value={blockConfig.title || ''}
                onChange={(e) => setBlockConfig({ ...blockConfig, title: e.target.value })}
                placeholder="Questions fréquentes"
              />
            </div>
            <div className="space-y-2">
              <Label>Sous-titre</Label>
              <Input
                value={blockConfig.subtitle || ''}
                onChange={(e) => setBlockConfig({ ...blockConfig, subtitle: e.target.value })}
                placeholder="Tout ce que vous devez savoir"
              />
            </div>
          </div>
        );

      case 'youtube':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Titre de la section</Label>
              <Input
                value={blockConfig.title || ''}
                onChange={(e) => setBlockConfig({ ...blockConfig, title: e.target.value })}
                placeholder="Découvrez notre histoire"
              />
            </div>
            <div className="space-y-2">
              <Label>URL de la vidéo YouTube</Label>
              <Input
                value={blockConfig.videoUrl || ''}
                onChange={(e) => setBlockConfig({ ...blockConfig, videoUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
          </div>
        );

      case 'text-image':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Titre</Label>
              <Input
                value={blockConfig.title || ''}
                onChange={(e) => setBlockConfig({ ...blockConfig, title: e.target.value })}
                placeholder="Notre histoire"
              />
            </div>
            <div className="space-y-2">
              <Label>Texte</Label>
              <Textarea
                value={blockConfig.text || ''}
                onChange={(e) => setBlockConfig({ ...blockConfig, text: e.target.value })}
                placeholder="Décrivez votre boutique..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>URL de l'image</Label>
              <Input
                value={blockConfig.imageUrl || ''}
                onChange={(e) => setBlockConfig({ ...blockConfig, imageUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label>Position de l'image</Label>
              <Select
                value={blockConfig.imagePosition || 'right'}
                onValueChange={(value) => setBlockConfig({ ...blockConfig, imagePosition: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Gauche</SelectItem>
                  <SelectItem value="right">Droite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Texte du bouton (optionnel)</Label>
                <Input
                  value={blockConfig.buttonText || ''}
                  onChange={(e) => setBlockConfig({ ...blockConfig, buttonText: e.target.value })}
                  placeholder="En savoir plus"
                />
              </div>
              <div className="space-y-2">
                <Label>Lien du bouton</Label>
                <Input
                  value={blockConfig.buttonLink || ''}
                  onChange={(e) => setBlockConfig({ ...blockConfig, buttonLink: e.target.value })}
                  placeholder="#"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle>
            {editingBlock ? 'Modifier le bloc' : 'Bibliothèque de blocs'}
          </DialogTitle>
          <DialogDescription>
            {selectedType 
              ? 'Configurez votre bloc personnalisé'
              : 'Choisissez un type de bloc à ajouter à votre boutique'
            }
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="p-6">
            {!selectedType ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BLOCK_TYPES.map((block) => {
                  const Icon = block.icon;
                  return (
                    <motion.button
                      key={block.type}
                      type="button"
                      onClick={() => handleSelectType(block.type)}
                      className="flex items-start gap-4 p-4 rounded-xl border border-border/50 bg-card hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${block.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {block.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {block.description}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                  {(() => {
                    const blockType = BLOCK_TYPES.find(b => b.type === selectedType);
                    if (!blockType) return null;
                    const Icon = blockType.icon;
                    return (
                      <>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${blockType.color} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{blockType.name}</h3>
                          <p className="text-sm text-muted-foreground">{blockType.description}</p>
                        </div>
                      </>
                    );
                  })()}
                </div>

                <div className="space-y-2">
                  <Label>Nom du bloc (pour l'éditeur)</Label>
                  <Input
                    value={blockTitle}
                    onChange={(e) => setBlockTitle(e.target.value)}
                    placeholder="Nom de ce bloc"
                  />
                </div>

                {renderConfigForm()}
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t bg-muted/30">
          {selectedType ? (
            <>
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedType(null);
                  setBlockConfig({});
                }}
              >
                Retour
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose}>
                  Annuler
                </Button>
                <Button onClick={handleSave} className="gap-2">
                  <Check className="w-4 h-4" />
                  {editingBlock ? 'Mettre à jour' : 'Ajouter le bloc'}
                </Button>
              </div>
            </>
          ) : (
            <Button variant="outline" onClick={onClose} className="ml-auto">
              Fermer
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlockLibraryModal;
