import { useState } from 'react';
import { Settings, Phone, Search, Truck } from 'lucide-react';
import { useShopEditor } from '@/hooks/useShopEditor';
import { ContactSection, SEOSection } from '@/components/editor';
import DeliverySection from '@/components/editor/DeliverySection';
import { Accordion } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'contact', label: 'Contact & Réseaux', icon: Phone, description: 'Téléphone, WhatsApp, réseaux sociaux' },
  { id: 'seo', label: 'SEO & Partage', icon: Search, description: 'Référencement et aperçu social' },
  { id: 'delivery', label: 'Zones de Livraison', icon: Truck, description: 'Quartiers et tarifs de livraison' },
] as const;

type TabId = typeof tabs[number]['id'];

const ShopSettings = () => {
  const [activeTab, setActiveTab] = useState<TabId>('contact');
  const { formData, validationErrors, updateField } = useShopEditor();

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-theme(spacing.12))] -m-6 overflow-hidden pt-16 lg:pt-0">
      {/* Mobile: Horizontal tabs */}
      <div className="lg:hidden border-b border-border bg-card/50 overflow-x-auto">
        <div className="flex p-2 gap-1 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted/50'
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop: Left Navigation */}
      <div className="hidden lg:flex w-[280px] border-r border-border bg-card/50 flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/25">
              <Settings className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Réglages</h1>
              <p className="text-xs text-muted-foreground">Configuration business</p>
            </div>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200',
                  isActive
                    ? 'bg-primary/10 text-primary shadow-sm'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                )}
              >
                <div className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors',
                  isActive ? 'bg-primary text-primary-foreground' : 'bg-muted'
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className={cn('text-sm font-medium truncate', isActive && 'font-semibold')}>{tab.label}</p>
                  <p className="text-xs text-muted-foreground truncate">{tab.description}</p>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8">
        <div className="max-w-2xl mx-auto">
          {activeTab === 'contact' && (
            <Accordion type="multiple" defaultValue={['contact']} className="space-y-4">
              <ContactSection formData={formData} updateField={updateField} validationErrors={validationErrors} />
            </Accordion>
          )}
          {activeTab === 'seo' && (
            <Accordion type="multiple" defaultValue={['seo']} className="space-y-4">
              <SEOSection formData={formData} updateField={updateField} validationErrors={validationErrors} />
            </Accordion>
          )}
          {activeTab === 'delivery' && (
            <Accordion type="multiple" defaultValue={['delivery']} className="space-y-4">
              <DeliverySection />
            </Accordion>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopSettings;
