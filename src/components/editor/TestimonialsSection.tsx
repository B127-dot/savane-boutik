import { useState } from 'react';
import { MessageSquare, Plus, Trash2, GripVertical, ChevronDown, ChevronUp, User } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { EditorSectionProps } from './types';
import { TestimonialItem } from '@/contexts/AppContext';

interface TestimonialsSectionProps extends EditorSectionProps {
  addTestimonial: () => void;
  updateTestimonial: (id: string, updates: Partial<TestimonialItem>) => void;
  removeTestimonial: (id: string) => void;
}

export function TestimonialsSection({ 
  formData, 
  updateField,
  addTestimonial,
  updateTestimonial,
  removeTestimonial,
}: TestimonialsSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const moveTestimonial = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const testimonials = formData.testimonials || [];
    if (newIndex < 0 || newIndex >= testimonials.length) return;
    
    const newList = [...testimonials];
    [newList[index], newList[newIndex]] = [newList[newIndex], newList[index]];
    updateField('testimonials', newList);
  };

  return (
    <AccordionItem value="testimonials" className="border-0 rounded-2xl bg-gradient-to-br from-amber-500/5 to-orange-500/0 overflow-hidden">
      <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-amber-500/5 transition-colors rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-base">Témoignages</span>
            <p className="text-xs text-muted-foreground">Avis de vos clients</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 space-y-5">
        {/* Toggle visibility */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border/50">
          <div>
            <Label className="text-sm font-medium">Afficher la section</Label>
            <p className="text-xs text-muted-foreground">Témoignages avec effet défilant</p>
          </div>
          <Switch
            checked={formData.showTestimonials}
            onCheckedChange={(checked) => updateField('showTestimonials', checked)}
          />
        </div>

        {formData.showTestimonials && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >
            {/* Section header settings */}
            <div className="space-y-4 p-4 rounded-xl bg-muted/50 border border-border/50">
              <h4 className="font-medium text-sm text-foreground">Paramètres de la section</h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-xs">Titre de la section</Label>
                  <Input
                    value={formData.testimonialsTitle || ''}
                    onChange={(e) => updateField('testimonialsTitle', e.target.value)}
                    placeholder="Ce que nos clients disent"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Description</Label>
                  <Input
                    value={formData.testimonialsDescription || ''}
                    onChange={(e) => updateField('testimonialsDescription', e.target.value)}
                    placeholder="Rejoignez des milliers de clients satisfaits"
                  />
                </div>
              </div>
            </div>

            {/* Testimonials list */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm text-foreground">
                  Témoignages ({(formData.testimonials || []).length})
                </h4>
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
                {(formData.testimonials || []).map((testimonial, index) => (
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
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {testimonial.avatar ? (
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {testimonial.name || `Témoignage ${index + 1}`}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {testimonial.handle || 'Pas de pseudo'}
                        </p>
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
                          disabled={index === (formData.testimonials || []).length - 1}
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
                                <Label className="text-xs">Pseudo (@handle)</Label>
                                <Input
                                  value={testimonial.handle || ''}
                                  onChange={(e) => updateTestimonial(testimonial.id, { handle: e.target.value })}
                                  placeholder="@fatou_style"
                                />
                              </div>
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
                              <Label className="text-xs">URL de la photo (optionnel)</Label>
                              <Input
                                value={testimonial.avatar || ''}
                                onChange={(e) => updateTestimonial(testimonial.id, { avatar: e.target.value })}
                                placeholder="https://images.unsplash.com/..."
                              />
                              <p className="text-xs text-muted-foreground">
                                Utilisez une image carrée (ex: Unsplash avec &fit=crop&crop=face)
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>

              {(formData.testimonials || []).length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm border border-dashed border-border rounded-xl">
                  Aucun témoignage. Cliquez sur "Ajouter" pour créer le premier.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

export default TestimonialsSection;
