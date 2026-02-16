import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'lucide-react';

export type Period = 'today' | 'week' | 'month' | 'all';

interface PeriodSelectorProps {
  value: Period;
  onChange: (value: Period) => void;
}

const PeriodSelector = ({ value, onChange }: PeriodSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <Calendar className="h-4 w-4 text-muted-foreground" />
      <Select value={value} onValueChange={(v) => onChange(v as Period)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sélectionner période" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Aujourd'hui</SelectItem>
          <SelectItem value="week">Cette semaine</SelectItem>
          <SelectItem value="month">Ce mois</SelectItem>
          <SelectItem value="all">Tout</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PeriodSelector;
