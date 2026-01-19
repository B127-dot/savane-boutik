import { useState } from 'react';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQEditorProps {
  title: string;
  subtitle: string;
  faqs: FAQItem[];
  onChange: (config: { title: string; subtitle: string; faqs: FAQItem[] }) => void;
}

const FAQEditor = ({ title, subtitle, faqs, onChange }: FAQEditorProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleTitleChange = (newTitle: string) => {
    onChange({ title: newTitle, subtitle, faqs });
  };

  const handleSubtitleChange = (newSubtitle: string) => {
    onChange({ title, subtitle: newSubtitle, faqs });
  };

  const addFAQ = () => {
    const newFAQ: FAQItem = {
      id: `faq_${Date.now()}`,
      question: '',
      answer: '',
    };
    onChange({ title, subtitle, faqs: [...faqs, newFAQ] });
    setExpandedId(newFAQ.id);
  };

  const updateFAQ = (id: string, updates: Partial<FAQItem>) => {
    const updatedFAQs = faqs.map(faq => 
      faq.id === id ? { ...faq, ...updates } : faq
    );
    onChange({ title, subtitle, faqs: updatedFAQs });
  };

  const removeFAQ = (id: string) => {
    onChange({ title, subtitle, faqs: faqs.filter(faq => faq.id !== id) });
  };

  const moveFAQ = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= faqs.length) return;
    
    const newFAQs = [...faqs];
    [newFAQs[index], newFAQs[newIndex]] = [newFAQs[newIndex], newFAQs[index]];
    onChange({ title, subtitle, faqs: newFAQs });
  };

  return (
    <div className="space-y-6">
      {/* Section header settings */}
      <div className="space-y-4 p-4 rounded-xl bg-muted/50 border border-border/50">
        <h4 className="font-medium text-sm text-foreground">Paramètres de la section</h4>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-xs">Titre de la section</Label>
            <Input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Questions fréquentes"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Sous-titre</Label>
            <Input
              value={subtitle}
              onChange={(e) => handleSubtitleChange(e.target.value)}
              placeholder="Tout ce que vous devez savoir"
            />
          </div>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm text-foreground">Questions ({faqs.length})</h4>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addFAQ}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </Button>
        </div>

        <AnimatePresence mode="popLayout">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="border border-border/50 rounded-xl bg-card overflow-hidden"
            >
              <div 
                className="flex items-center gap-2 p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              >
                <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {faq.question || `Question ${index + 1}`}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={(e) => { e.stopPropagation(); moveFAQ(index, 'up'); }}
                    disabled={index === 0}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={(e) => { e.stopPropagation(); moveFAQ(index, 'down'); }}
                    disabled={index === faqs.length - 1}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={(e) => { e.stopPropagation(); removeFAQ(faq.id); }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <AnimatePresence>
                {expandedId === faq.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 space-y-4 border-t border-border/50">
                      <div className="space-y-2">
                        <Label className="text-xs">Question</Label>
                        <Input
                          value={faq.question}
                          onChange={(e) => updateFAQ(faq.id, { question: e.target.value })}
                          placeholder="Entrez la question..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Réponse</Label>
                        <Textarea
                          value={faq.answer}
                          onChange={(e) => updateFAQ(faq.id, { answer: e.target.value })}
                          placeholder="Entrez la réponse..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {faqs.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            Aucune FAQ. Cliquez sur "Ajouter" pour créer votre première question.
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQEditor;
