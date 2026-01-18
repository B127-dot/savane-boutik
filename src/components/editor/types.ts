import { ShopEditorFormData } from '@/hooks/useShopEditor';
import { TrustBarItem, CustomBlock } from '@/contexts/AppContext';
import { SectionConfig } from '@/components/shop/DraggableSectionManager';

export interface EditorSectionProps {
  formData: ShopEditorFormData;
  updateField: <K extends keyof ShopEditorFormData>(field: K, value: ShopEditorFormData[K]) => void;
  validationErrors?: Partial<Record<string, string>>;
}

export interface TrustBarSectionProps extends EditorSectionProps {
  addTrustBarItem: () => void;
  updateTrustBarItem: (id: string, updates: Partial<TrustBarItem>) => void;
  removeTrustBarItem: (id: string) => void;
}

export interface SectionsSectionProps extends EditorSectionProps {
  sectionConfigs: SectionConfig[];
  handleToggleSectionVisibility: (sectionId: string, visible: boolean) => void;
  onAddBlock: () => void;
  onRemoveBlock: (blockId: string) => void;
  onEditBlock: (blockId: string) => void;
}

export interface DesignSectionProps extends EditorSectionProps {
  currentPalette: {
    id: string;
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}
