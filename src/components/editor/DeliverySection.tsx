import { Truck } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import DeliveryZonesTab from '@/components/shop/DeliveryZonesTab';

export function DeliverySection() {
  return (
    <AccordionItem value="delivery" className="border-0 rounded-2xl bg-gradient-to-br from-orange-500/5 to-orange-500/0 overflow-hidden">
      <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-orange-500/5 transition-colors rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-base">Zones de Livraison</span>
            <p className="text-xs text-muted-foreground">Quartiers, tarifs, seuil gratuit</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <DeliveryZonesTab />
      </AccordionContent>
    </AccordionItem>
  );
}

export default DeliverySection;
