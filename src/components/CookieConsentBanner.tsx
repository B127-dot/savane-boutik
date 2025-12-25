import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Settings, Check, X, ChevronDown, ChevronUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Link } from 'react-router-dom';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

export const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay showing banner for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      preferences: prefs,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
  };

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setPreferences(allAccepted);
    savePreferences(allAccepted);
  };

  const rejectNonEssential = () => {
    const essentialOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setPreferences(essentialOnly);
    savePreferences(essentialOnly);
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
  };

  const cookieTypes = [
    {
      id: 'necessary',
      name: 'Cookies Nécessaires',
      description: 'Essentiels au fonctionnement du site. Ils permettent la navigation et l\'accès aux fonctionnalités de base.',
      required: true,
    },
    {
      id: 'analytics',
      name: 'Cookies Analytiques',
      description: 'Nous aident à comprendre comment vous utilisez le site pour améliorer votre expérience.',
      required: false,
    },
    {
      id: 'marketing',
      name: 'Cookies Marketing',
      description: 'Utilisés pour vous proposer des publicités pertinentes et mesurer leur efficacité.',
      required: false,
    },
    {
      id: 'functional',
      name: 'Cookies Fonctionnels',
      description: 'Permettent de mémoriser vos préférences (langue, région) pour personnaliser votre expérience.',
      required: false,
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="p-4 md:p-6 border-b border-border/50">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                    <Cookie className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      🍪 Nous utilisons des cookies
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Pour améliorer votre expérience sur BurkE-Shop, nous utilisons des cookies. 
                      Vous pouvez personnaliser vos préférences ou accepter tous les cookies.{' '}
                      <Link to="/cookies" className="text-primary hover:underline">
                        En savoir plus
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Cookie Details (expandable) */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 md:p-6 bg-muted/30 border-b border-border/50 space-y-4">
                      {cookieTypes.map((cookie) => (
                        <div 
                          key={cookie.id}
                          className="flex items-start gap-4 p-3 bg-background rounded-xl"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-foreground">{cookie.name}</span>
                              {cookie.required && (
                                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                  Requis
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {cookie.description}
                            </p>
                          </div>
                          <Switch
                            checked={preferences[cookie.id as keyof CookiePreferences]}
                            onCheckedChange={(checked) => 
                              setPreferences(prev => ({
                                ...prev,
                                [cookie.id]: checked,
                              }))
                            }
                            disabled={cookie.required}
                            className="shrink-0"
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="p-4 md:p-6 bg-background">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-muted-foreground hover:text-foreground gap-2 order-3 sm:order-1"
                  >
                    <Settings className="w-4 h-4" />
                    Personnaliser
                    {showDetails ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                  
                  <div className="flex-1 sm:order-2" />
                  
                  <div className="flex flex-col sm:flex-row gap-2 order-1 sm:order-3">
                    {showDetails ? (
                      <Button
                        onClick={saveCustomPreferences}
                        className="gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Enregistrer mes choix
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          onClick={rejectNonEssential}
                          className="gap-2"
                        >
                          <X className="w-4 h-4" />
                          Refuser
                        </Button>
                        <Button
                          onClick={acceptAll}
                          className="gap-2 bg-primary hover:bg-primary/90"
                        >
                          <Check className="w-4 h-4" />
                          Tout accepter
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Privacy note */}
                <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-3.5 h-3.5" />
                  <span>
                    Vos données sont protégées conformément au RGPD.{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Politique de confidentialité
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook to access cookie preferences
export const useCookiePreferences = (): CookiePreferences | null => {
  const consent = localStorage.getItem('cookie-consent');
  if (!consent) return null;
  
  try {
    const parsed = JSON.parse(consent);
    return parsed.preferences;
  } catch {
    return null;
  }
};

// Function to reset cookie consent (for testing or user request)
export const resetCookieConsent = () => {
  localStorage.removeItem('cookie-consent');
  window.location.reload();
};
