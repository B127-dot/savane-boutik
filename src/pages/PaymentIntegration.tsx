import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ExternalLink, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PaymentConfig {
  apiKey: string;
  siteId: string;
  isConnected: boolean;
}

const PaymentIntegration = () => {
  const { user } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [cynetPayConfig, setCynetPayConfig] = useState<PaymentConfig>({
    apiKey: '',
    siteId: '',
    isConnected: false,
  });
  const [formData, setFormData] = useState({
    apiKey: '',
    siteId: '',
  });

  // Load saved config from localStorage
  useEffect(() => {
    if (user) {
      const savedConfig = localStorage.getItem(`cynetpay_config_${user.id}`);
      if (savedConfig) {
        const config = JSON.parse(savedConfig);
        setCynetPayConfig(config);
      }
    }
  }, [user]);

  const handleSaveConfig = () => {
    if (!formData.apiKey.trim() || !formData.siteId.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    const newConfig: PaymentConfig = {
      apiKey: formData.apiKey,
      siteId: formData.siteId,
      isConnected: true,
    };

    localStorage.setItem(`cynetpay_config_${user?.id}`, JSON.stringify(newConfig));
    setCynetPayConfig(newConfig);
    setShowForm(false);
    setFormData({ apiKey: '', siteId: '' });

    toast({
      title: "Configuration enregistrée",
      description: "CynetPay a été connecté avec succès",
    });
  };

  const handleDisconnect = () => {
    localStorage.removeItem(`cynetpay_config_${user?.id}`);
    setCynetPayConfig({
      apiKey: '',
      siteId: '',
      isConnected: false,
    });
    setShowForm(false);
    toast({
      title: "Déconnecté",
      description: "CynetPay a été déconnecté",
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({ apiKey: '', siteId: '' });
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return '********';
    return '********...' + key.slice(-4);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">
          Configuration des Paiements
        </h1>
        <p className="text-muted-foreground text-lg">
          Connectez votre compte de paiement pour recevoir l'argent de vos ventes directement. 
          Nous ne prenons aucune commission sur vos transactions. L'argent est transféré de manière 
          sécurisée de votre client à vous via nos partenaires.
        </p>
      </div>

      {/* Payment Partners Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Partenaires de Paiement</h2>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between gap-4">
              {/* Logo and Info */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">CP</span>
                </div>
                
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="text-xl font-semibold">CynetPay</h3>
                    <p className="text-sm text-muted-foreground">
                      Acceptez Orange Money, Moov Money et les paiements par carte.
                    </p>
                  </div>
                  
                  {/* Status */}
                  <div className="flex items-center gap-2">
                    {cynetPayConfig.isConnected ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        <span className="text-sm font-medium text-success">Connecté</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-destructive" />
                        <span className="text-sm font-medium text-destructive">Non connecté</span>
                      </>
                    )}
                  </div>

                  {/* Show masked API key if connected */}
                  {cynetPayConfig.isConnected && (
                    <p className="text-xs text-muted-foreground">
                      Clé API: {maskApiKey(cynetPayConfig.apiKey)}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex gap-2">
                {cynetPayConfig.isConnected ? (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowForm(!showForm)}
                    >
                      Modifier
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={handleDisconnect}
                    >
                      Déconnecter
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="default" 
                    onClick={() => setShowForm(!showForm)}
                  >
                    Configurer
                  </Button>
                )}
              </div>
            </div>

            {/* Configuration Form */}
            {showForm && (
              <div className="mt-6 pt-6 border-t space-y-6 animate-accordion-down">
                <h3 className="text-lg font-semibold">Connecter CynetPay</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">Clé API (apikey)</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="Collez votre Clé API ici"
                      value={formData.apiKey}
                      onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="siteId">ID du Site (site_id)</Label>
                    <Input
                      id="siteId"
                      type="text"
                      placeholder="Collez votre ID du Site ici"
                      value={formData.siteId}
                      onChange={(e) => setFormData({ ...formData, siteId: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button 
                      variant="success" 
                      onClick={handleSaveConfig}
                      className="flex-1"
                    >
                      Enregistrer et Activer la connexion
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleCancel}
                    >
                      Annuler
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instructions Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Comment ça marche ?</h2>
        
        <Card>
          <CardContent className="pt-6">
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold flex-shrink-0">
                  1
                </span>
                <div className="flex-1 pt-1">
                  <p className="text-foreground">
                    Créez un compte marchand sur le site de{' '}
                    <a 
                      href="https://www.cynetpay.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      CynetPay.com
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold flex-shrink-0">
                  2
                </span>
                <div className="flex-1 pt-1">
                  <p className="text-foreground">
                    Une fois votre compte validé, connectez-vous à votre tableau de bord CynetPay.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold flex-shrink-0">
                  3
                </span>
                <div className="flex-1 pt-1">
                  <p className="text-foreground">
                    Trouvez vos clés API dans la section "Intégration" ou "Développeurs" de votre compte.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold flex-shrink-0">
                  4
                </span>
                <div className="flex-1 pt-1">
                  <p className="text-foreground">
                    Cliquez sur "Configurer" ci-dessus et collez les clés dans les champs correspondants.
                  </p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentIntegration;
