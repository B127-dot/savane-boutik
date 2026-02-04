import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface ExitIntentPopupProps {
  shopName: string;
  discountPercent?: number;
  inactivityDelay?: number; // in milliseconds
  onPhoneCaptured?: (phone: string, name?: string) => void;
}

const ExitIntentPopup = ({
  shopName,
  discountPercent = 10,
  inactivityDelay = 120000, // 2 minutes by default
  onPhoneCaptured
}: ExitIntentPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const { toast } = useToast();

  // Check if popup was already shown in this session
  useEffect(() => {
    const popupShown = sessionStorage.getItem('exitIntentPopupShown');
    if (popupShown === 'true') {
      setHasBeenShown(true);
    }
  }, []);

  // Exit intent detection (mouse leaving viewport)
  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (hasBeenShown || isVisible) return;
    
    // Only trigger when mouse leaves from the top
    if (e.clientY <= 0) {
      setIsVisible(true);
      setHasBeenShown(true);
      sessionStorage.setItem('exitIntentPopupShown', 'true');
    }
  }, [hasBeenShown, isVisible]);

  // Inactivity detection
  useEffect(() => {
    if (hasBeenShown) return;

    let inactivityTimer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (!hasBeenShown && !isVisible) {
          setIsVisible(true);
          setHasBeenShown(true);
          sessionStorage.setItem('exitIntentPopupShown', 'true');
        }
      }, inactivityDelay);
    };

    // Events that reset the inactivity timer
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, resetTimer, { passive: true });
    });

    // Start the timer
    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [hasBeenShown, isVisible, inactivityDelay]);

  // Exit intent listener
  useEffect(() => {
    if (hasBeenShown) return;
    
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseLeave, hasBeenShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone.trim()) {
      toast({
        title: "Numéro requis",
        description: "Veuillez entrer votre numéro WhatsApp",
        variant: "destructive"
      });
      return;
    }

    // Validate phone number (Burkina Faso format)
    const cleanPhone = phone.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 8) {
      toast({
        title: "Numéro invalide",
        description: "Veuillez entrer un numéro WhatsApp valide",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate discount code
      const discountCode = `BIENVENUE${Date.now().toString().slice(-4)}`;
      
      // Save captured lead to localStorage
      const leads = JSON.parse(localStorage.getItem('capturedLeads') || '[]');
      const newLead = {
        id: `lead_${Date.now()}`,
        phone: cleanPhone,
        name: name.trim() || undefined,
        discountCode,
        discountPercent,
        capturedAt: Date.now(),
        source: 'exit_intent_popup'
      };
      leads.push(newLead);
      localStorage.setItem('capturedLeads', JSON.stringify(leads));

      // Callback for parent component
      onPhoneCaptured?.(cleanPhone, name.trim() || undefined);

      // Show success message
      toast({
        title: "🎉 Félicitations !",
        description: `Votre code ${discountCode} (-${discountPercent}%) vous a été envoyé !`,
      });

      // Close popup after short delay
      setTimeout(() => {
        setIsVisible(false);
      }, 1500);

    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue, veuillez réessayer",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const portalTarget = typeof document !== 'undefined' ? document.body : null;
  if (!portalTarget) return null;

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />

          {/* Centering wrapper (prevents layout/transform issues) */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="w-full max-w-md"
            >
              <div className="relative bg-gradient-to-br from-background via-background to-primary/5 rounded-3xl shadow-2xl border border-border/50 overflow-hidden">
                {/* Decorative gradient */}
                <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />

                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-background/80 hover:bg-background transition-colors z-10"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>

                <div className="relative p-5 sm:p-6">
                  {/* Icon */}
                  <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30">
                    <Gift className="w-7 h-7 text-primary-foreground" />
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-center text-foreground mb-1.5">
                    Attendez ! 🎁
                  </h2>

                  {/* Subtitle */}
                  <p className="text-center text-sm text-muted-foreground font-body mb-4">
                    Recevez <span className="text-primary font-semibold">{discountPercent}% de réduction</span> sur votre première commande chez {shopName} !
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="popup-name" className="text-sm font-medium">
                        Votre prénom (optionnel)
                      </Label>
                      <Input
                        id="popup-name"
                        type="text"
                        placeholder="Ex: Aminata"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-11 bg-background/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="popup-phone" className="text-sm font-medium">
                        Votre numéro WhatsApp <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="popup-phone"
                          type="tel"
                          placeholder="Ex: 70 12 34 56"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="h-11 pl-11 bg-background/50"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full h-11 text-sm sm:text-base font-semibold bg-primary hover:bg-primary/90"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Envoi...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Gift className="w-5 h-5" />
                          Recevoir mon code -{discountPercent}%
                        </span>
                      )}
                    </Button>
                  </form>

                  {/* Privacy note */}
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    🔒 Vos données sont sécurisées. Pas de spam, promis !
                  </p>

                  {/* No thanks link */}
                  <button
                    onClick={handleClose}
                    className="block w-full text-center text-sm text-muted-foreground hover:text-foreground mt-2.5 transition-colors"
                  >
                    Non merci, je préfère payer plein tarif
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    portalTarget
  );
};

export default ExitIntentPopup;
