import { Settings } from 'lucide-react';
import { Accordion } from '@/components/ui/accordion';
import { useShopEditor } from '@/hooks/useShopEditor';
import { ContactSection, SEOSection } from '@/components/editor';
import DeliverySection from '@/components/editor/DeliverySection';

const ShopSettings = () => {
  const {
    formData,
    validationErrors,
    updateField,
  } = useShopEditor();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/25">
          <Settings className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Réglages Boutique</h1>
          <p className="text-sm text-muted-foreground">Contact, SEO et zones de livraison</p>
        </div>
      </div>

      {/* Sections */}
      <Accordion type="multiple" defaultValue={['contact', 'seo', 'delivery']} className="space-y-4">
        <ContactSection formData={formData} updateField={updateField} validationErrors={validationErrors} />
        <SEOSection formData={formData} updateField={updateField} validationErrors={validationErrors} />
        <DeliverySection />
      </Accordion>
    </div>
  );
};

export default ShopSettings;
