import { ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getTheme } from '@/types/themes';
import { motion } from 'framer-motion';

interface ActiveThemeCardProps {
  currentTheme: string;
  onChangeClick: () => void;
}

export function ActiveThemeCard({ currentTheme, onChangeClick }: ActiveThemeCardProps) {
  const theme = getTheme(currentTheme);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/5 border border-violet-500/20"
    >
      <div className="flex items-center gap-3">
        {/* Theme Preview */}
        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 ring-2 ring-violet-500/30 shadow-lg">
          <img 
            src={theme.preview} 
            alt={theme.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Theme Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-violet-500" />
            <span className="text-xs text-muted-foreground font-medium">Thème actif</span>
          </div>
          <p className="font-semibold text-sm truncate">{theme.name}</p>
        </div>

        {/* Change Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onChangeClick}
          className="gap-1 text-violet-600 hover:text-violet-700 hover:bg-violet-500/10 flex-shrink-0"
        >
          Changer
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}

export default ActiveThemeCard;
