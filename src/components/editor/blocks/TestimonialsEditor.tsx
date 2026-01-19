import { useState } from 'react';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Star, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';

export interface Testimonial {
  id: string;
  name: string;
  location?: string;
  rating: number;
  text: string;
  avatar?: string;
}

interface TestimonialsEditorProps {
  title: string;
  testimonials: Testimonial[];
  onChange: (config: { title: string; testimonials: Testimonial[] }) => void;
}

const TestimonialsEditor = ({ title, testimonials, onChange }: TestimonialsEditorProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleTitleChange = (newTitle: string) => {
    onChange({ title: newTitle, testimonials });
  };

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: `testimonial_${Date.now()}`,
      name: '',
      location: '',
      rating: 5,
      text: '',
    };
    onChange({ title, testimonials: [...testimonials, newTestimonial] });
    setExpandedId(newTestimonial.id);
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    const updated = testimonials.map(t => 
      t.id === id ? { ...t, ...updates } : t
    );
    onChange({ title, testimonials: updated });
  };

  const removeTestimonial = (id: string) => {
    onChange({ title, testimonials: testimonials.filter(t => t.id !== id) });
  };

  const moveTestimonial = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= testimonials.length) return;
    
    const newList = [...testimonials];
    [newList[index], newList[newIndex]] = [newList[newIndex], newList[index]];
    onChange({ title, testimonials: newList });
  };

  const StarRating = ({ rating, onChange: onRatingChange }: { rating: number; onChange: (r: number) => void }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className="focus:outline-none transition-transform hover:scale-110"
        >
          <Star
            className={`w-5 h-5 ${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground/30'}`}
          />
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Section header settings */}
      <div className="space-y-4 p-4 rounded-xl bg-muted/50 border border-border/50">
        <h4 className="font-medium text-sm text-foreground">Paramètres de la section</h4>
        <div className="space-y-2">
          <Label className="text-xs">Titre de la section</Label>
          <Input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Ce que nos clients disent"
          />
        </div>
      </div>

      {/* Testimonials list */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm text-foreground">Témoignages ({testimonials.length})</h4>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addTestimonial}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </Button>
        </div>

        <AnimatePresence mode="popLayout">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="border border-border/50 rounded-xl bg-card overflow-hidden"
            >
              <div 
                className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setExpandedId(expandedId === testimonial.id ? null : testimonial.id)}
              >
                <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {testimonial.avatar ? (
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {testimonial.name || `Témoignage ${index + 1}`}
                  </p>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-3 h-3 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground/30'}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={(e) => { e.stopPropagation(); moveTestimonial(index, 'up'); }}
                    disabled={index === 0}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={(e) => { e.stopPropagation(); moveTestimonial(index, 'down'); }}
                    disabled={index === testimonials.length - 1}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={(e) => { e.stopPropagation(); removeTestimonial(testimonial.id); }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <AnimatePresence>
                {expandedId === testimonial.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 space-y-4 border-t border-border/50">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label className="text-xs">Nom du client</Label>
                          <Input
                            value={testimonial.name}
                            onChange={(e) => updateTestimonial(testimonial.id, { name: e.target.value })}
                            placeholder="Fatou Traoré"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Localisation</Label>
                          <Input
                            value={testimonial.location || ''}
                            onChange={(e) => updateTestimonial(testimonial.id, { location: e.target.value })}
                            placeholder="Ouagadougou"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Note</Label>
                        <StarRating
                          rating={testimonial.rating}
                          onChange={(rating) => updateTestimonial(testimonial.id, { rating })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Témoignage</Label>
                        <Textarea
                          value={testimonial.text}
                          onChange={(e) => updateTestimonial(testimonial.id, { text: e.target.value })}
                          placeholder="Ce que le client a dit..."
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">URL de l'avatar (optionnel)</Label>
                        <Input
                          value={testimonial.avatar || ''}
                          onChange={(e) => updateTestimonial(testimonial.id, { avatar: e.target.value })}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {testimonials.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            Aucun témoignage. Cliquez sur "Ajouter" pour créer le premier.
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialsEditor;
