import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { openWhatsApp, trackWhatsAppClick, isValidWhatsAppNumber } from '@/lib/whatsapp';
import { useToast } from '@/hooks/use-toast';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message: string;
  variant?: 'default' | 'floating' | 'inline' | 'outline';
  label?: string;
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const WhatsAppButton = ({
  phoneNumber,
  message,
  variant = 'default',
  label = 'Commander via WhatsApp',
  className,
  size = 'default'
}: WhatsAppButtonProps) => {
  const { toast } = useToast();

  const handleClick = () => {
    if (!isValidWhatsAppNumber(phoneNumber)) {
      toast({
        title: "WhatsApp non configuré",
        description: "Le vendeur n'a pas encore configuré son numéro WhatsApp",
        variant: "destructive"
      });
      return;
    }

    trackWhatsAppClick();
    openWhatsApp(phoneNumber, message);

    toast({
      title: "Ouverture de WhatsApp",
      description: "Votre message est prêt à être envoyé !",
    });
  };

  // Floating variant - circular button
  if (variant === 'floating') {
    return (
      <button
        onClick={handleClick}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95",
          "bg-[#25D366] hover:bg-[#20BA5A] text-white",
          "flex items-center justify-center",
          "animate-pulse hover:animate-none",
          className
        )}
        aria-label="Commander via WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  // Inline variant - minimal button
  if (variant === 'inline') {
    return (
      <Button
        variant="ghost"
        size={size}
        onClick={handleClick}
        className={cn(
          "text-[#25D366] hover:text-[#20BA5A] hover:bg-[#25D366]/10",
          className
        )}
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        {label}
      </Button>
    );
  }

  // Default and outline variants
  return (
    <Button
      variant={variant === 'outline' ? 'outline' : 'default'}
      size={size}
      onClick={handleClick}
      className={cn(
        variant === 'outline'
          ? "border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
          : "bg-[#25D366] hover:bg-[#20BA5A] text-white",
        className
      )}
    >
      <MessageCircle className="h-4 w-4 mr-2" />
      {label}
    </Button>
  );
};
