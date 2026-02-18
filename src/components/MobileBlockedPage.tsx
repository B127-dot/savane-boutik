import { Monitor, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileBlockedPageProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const MobileBlockedPage = ({ title, description, children }: MobileBlockedPageProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  if (!isMobile) return <>{children}</>;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      {/* Icon */}
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center mb-6 shadow-inner">
        <Monitor className="w-10 h-10 text-muted-foreground" />
      </div>

      {/* Badge */}
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 border border-primary/20">
        Vue limitée sur mobile
      </span>

      {/* Title */}
      <h1 className="text-2xl font-bold tracking-tight mb-3">
        {title}
      </h1>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-2">
        {description || "Cette fonctionnalité nécessite un écran plus large pour être utilisée confortablement."}
      </p>

      <p className="text-muted-foreground/70 text-xs mb-8">
        Ouvrez votre tableau de bord sur un ordinateur pour y accéder.
      </p>

      {/* Visual hint */}
      <div className="flex items-center gap-3 mb-8">
        {/* Phone */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-14 rounded-lg border-2 border-muted-foreground/30 flex items-end justify-center pb-1">
            <div className="w-3 h-0.5 bg-muted-foreground/40 rounded-full" />
          </div>
          <span className="text-[10px] text-muted-foreground/50">Mobile</span>
        </div>
        {/* Arrow */}
        <div className="text-muted-foreground/30 text-lg">→</div>
        {/* Desktop */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-16 h-11 rounded-lg border-2 border-primary/60 flex items-center justify-center bg-primary/5">
            <Monitor className="w-5 h-5 text-primary/70" />
          </div>
          <div className="w-4 h-1 bg-primary/40 rounded-full mx-auto" />
          <span className="text-[10px] text-primary/70 font-medium">Ordinateur ✓</span>
        </div>
      </div>

      {/* Back button */}
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au tableau de bord
      </Button>
    </div>
  );
};

export default MobileBlockedPage;
