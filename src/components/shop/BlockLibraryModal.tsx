import { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Instagram, 
  HelpCircle, 
  Youtube, 
  FileText,
  Check,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import FAQEditor, { FAQItem } from '@/components/editor/blocks/FAQEditor';
import TestimonialsEditor, { Testimonial } from '@/components/editor/blocks/TestimonialsEditor';
import InstagramEditor, { InstagramPost } from '@/components/editor/blocks/InstagramEditor';
import YouTubeEditor from '@/components/editor/blocks/YouTubeEditor';
import TextImageEditor from '@/components/editor/blocks/TextImageEditor';

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

// Default data for new blocks
const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq_1',
    question: 'Comment puis-je passer une commande ?',
    answer: 'Vous pouvez passer commande directement sur notre site en ajoutant des produits au panier, puis en complétant le processus de paiement.',
  },
  {
    id: 'faq_2',
    question: 'Quels sont les modes de paiement acceptés ?',
    answer: 'Nous acceptons Orange Money, Moov Money, Wave et le paiement à la livraison.',
  },
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial_1',
    name: 'Fatou Traoré',
    location: 'Ouagadougou',
    rating: 5,
    text: 'Livraison rapide et produits de qualité ! Je recommande vivement.',
  },
  {
    id: 'testimonial_2',
    name: 'Ibrahim Kaboré',
    location: 'Bobo-Dioulasso',
    rating: 5,
    text: 'Service client exceptionnel. Ils ont répondu à toutes mes questions.',
  },
];

const DEFAULT_INSTAGRAM_POSTS: InstagramPost[] = [
  { id: 'post_1', imageUrl: '/placeholder.svg' },
  { id: 'post_2', imageUrl: '/placeholder.svg' },
  { id: 'post_3', imageUrl: '/placeholder.svg' },
];

const BlockLibraryModal = ({
  isOpen,
  onClose,
  onAddBlock,
  editingBlock
}: BlockLibraryModalProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(editingBlock?.type || null);
  const [blockConfig, setBlockConfig] = useState<Record<string, any>>(editingBlock?.config || {});
  const [blockTitle, setBlockTitle] = useState(editingBlock?.title || '');

  // Reset state when modal opens with different block
  useEffect(() => {
    if (isOpen) {
      if (editingBlock) {
        setSelectedType(editingBlock.type);
        setBlockConfig(editingBlock.config || {});
        setBlockTitle(editingBlock.title);
      } else {
        setSelectedType(null);
        setBlockConfig({});
        setBlockTitle('');
      }
    }
  }, [isOpen, editingBlock]);

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    
    // Initialize with default data based on type
    let initialConfig: Record<string, any> = {};
    let initialTitle = BLOCK_TYPES.find(b => b.type === type)?.name || '';
    
    switch (type) {
      case 'faq':
        initialConfig = {
          title: 'Questions fréquentes',
          subtitle: 'Tout ce que vous devez savoir',
          faqs: DEFAULT_FAQS,
        };
        break;
      case 'testimonials':
        initialConfig = {
          title: 'Ce que nos clients disent',
          testimonials: DEFAULT_TESTIMONIALS,
        };
        break;
      case 'instagram':
        initialConfig = {
          title: 'Suivez-nous sur Instagram',
          instagramHandle: '@maboutique',
          posts: DEFAULT_INSTAGRAM_POSTS,
        };
        break;
      case 'youtube':
        initialConfig = {
          title: 'Découvrez notre histoire',
          subtitle: 'Une vidéo vaut mille mots',
          videoUrl: '',
          thumbnailUrl: '',
        };
        break;
      case 'text-image':
        initialConfig = {
          title: 'Notre histoire',
          text: 'Nous sommes une boutique passionnée par la qualité et le service client.',
          imageUrl: '/placeholder.svg',
          imagePosition: 'right',
          buttonText: '',
          buttonLink: '',
        };
        break;
    }
    
    setBlockConfig(initialConfig);
    setBlockTitle(initialTitle);
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
    handleClose();
  };

  const handleClose = () => {
    onClose();
    // Don't reset state immediately to avoid flash
    setTimeout(() => {
      setSelectedType(null);
      setBlockConfig({});
      setBlockTitle('');
    }, 200);
  };

  const handleBack = () => {
    setSelectedType(null);
    setBlockConfig({});
    setBlockTitle('');
  };

  const renderEditor = () => {
    switch (selectedType) {
      case 'faq':
        return (
          <FAQEditor
            title={blockConfig.title || ''}
            subtitle={blockConfig.subtitle || ''}
            faqs={blockConfig.faqs || []}
            onChange={(config) => setBlockConfig(config)}
          />
        );

      case 'testimonials':
        return (
          <TestimonialsEditor
            title={blockConfig.title || ''}
            testimonials={blockConfig.testimonials || []}
            onChange={(config) => setBlockConfig(config)}
          />
        );

      case 'instagram':
        return (
          <InstagramEditor
            title={blockConfig.title || ''}
            instagramHandle={blockConfig.instagramHandle || ''}
            posts={blockConfig.posts || []}
            onChange={(config) => setBlockConfig(config)}
          />
        );

      case 'youtube':
        return (
          <YouTubeEditor
            title={blockConfig.title || ''}
            subtitle={blockConfig.subtitle || ''}
            videoUrl={blockConfig.videoUrl || ''}
            thumbnailUrl={blockConfig.thumbnailUrl}
            onChange={(config) => setBlockConfig(config)}
          />
        );

      case 'text-image':
        return (
          <TextImageEditor
            title={blockConfig.title || ''}
            text={blockConfig.text || ''}
            imageUrl={blockConfig.imageUrl || ''}
            imagePosition={blockConfig.imagePosition || 'right'}
            buttonText={blockConfig.buttonText}
            buttonLink={blockConfig.buttonLink}
            onChange={(config) => setBlockConfig(config)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle>
            {editingBlock ? 'Modifier le bloc' : selectedType ? 'Configurer le bloc' : 'Bibliothèque de blocs'}
          </DialogTitle>
          <DialogDescription>
            {selectedType 
              ? 'Personnalisez le contenu de votre bloc'
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
                {/* Block type header */}
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

                {/* Block name input */}
                <div className="space-y-2">
                  <Label>Nom du bloc (pour l'éditeur)</Label>
                  <Input
                    value={blockTitle}
                    onChange={(e) => setBlockTitle(e.target.value)}
                    placeholder="Nom de ce bloc"
                  />
                </div>

                {/* Rich editor for the selected type */}
                {renderEditor()}
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t bg-muted/30">
          {selectedType ? (
            <>
              {!editingBlock && (
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour
                </Button>
              )}
              {editingBlock && <div />}
              <div className="flex gap-2 ml-auto">
                <Button variant="outline" onClick={handleClose}>
                  Annuler
                </Button>
                <Button onClick={handleSave} className="gap-2">
                  <Check className="w-4 h-4" />
                  {editingBlock ? 'Mettre à jour' : 'Ajouter le bloc'}
                </Button>
              </div>
            </>
          ) : (
            <Button variant="outline" onClick={handleClose} className="ml-auto">
              Fermer
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlockLibraryModal;
