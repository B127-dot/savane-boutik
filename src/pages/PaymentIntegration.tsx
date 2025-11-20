import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ExternalLink, CheckCircle2, XCircle, Shield, Zap, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

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
    <div className="space-y-12 animate-fade-in">
      {/* Hero Header with gradient background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20 p-8 md:p-12">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Paiements Sécurisés</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Configuration des Paiements
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
            Connectez votre compte de paiement pour recevoir l'argent de vos ventes directement. 
            <span className="text-foreground font-medium"> Nous ne prenons aucune commission</span> sur vos transactions. 
            L'argent est transféré de manière sécurisée de votre client à vous via nos partenaires.
          </p>
          
          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium">100% Sécurisé</p>
                <p className="text-xs text-muted-foreground">Chiffrement SSL</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Paiement Instantané</p>
                <p className="text-xs text-muted-foreground">En temps réel</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-medium">0% Commission</p>
                <p className="text-xs text-muted-foreground">Aucun frais caché</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Partners Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Partenaires de Paiement</h2>
            <p className="text-muted-foreground mt-1">Connectez votre agrégateur de paiement préféré</p>
          </div>
        </div>
        
        <Card className={`group relative overflow-hidden transition-all duration-300 ${
          cynetPayConfig.isConnected 
            ? 'border-success/50 shadow-lg shadow-success/10 hover:shadow-xl hover:shadow-success/20' 
            : 'hover:shadow-lg hover:border-primary/30'
        }`}>
          {/* Decorative gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <CardContent className="relative pt-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              {/* Logo and Info */}
              <div className="flex items-start gap-6 flex-1">
                {/* Enhanced Logo */}
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg transform group-hover:scale-105 transition-transform">
                    <span className="text-white font-bold text-2xl">CP</span>
                  </div>
                  {cynetPayConfig.isConnected && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center shadow-lg animate-scale-in">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold">CynetPay</h3>
                      {cynetPayConfig.isConnected ? (
                        <Badge className="bg-success/10 text-success border-success/20">
                          ✓ Actif
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-muted-foreground/30">
                          Non configuré
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Acceptez Orange Money, Moov Money et les paiements par carte bancaire 
                      de vos clients en toute sécurité.
                    </p>
                  </div>
                  
                  {/* Payment methods badges */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-orange-500/10 text-orange-600 border-orange-500/20">
                      🟧 Orange Money
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                      🔵 Moov Money
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 border-purple-500/20">
                      💳 Carte Bancaire
                    </Badge>
                  </div>

                  {/* Show masked API key if connected */}
                  {cynetPayConfig.isConnected && (
                    <div className="flex items-center gap-2 p-3 bg-success/5 border border-success/20 rounded-lg">
                      <Lock className="w-4 h-4 text-success" />
                      <p className="text-sm font-mono text-success">
                        {maskApiKey(cynetPayConfig.apiKey)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 md:min-w-[180px]">
                {cynetPayConfig.isConnected ? (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowForm(!showForm)}
                      className="w-full group/btn"
                    >
                      <span>Modifier</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={handleDisconnect}
                      className="w-full"
                    >
                      Déconnecter
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="hero" 
                    onClick={() => setShowForm(!showForm)}
                    className="w-full text-lg py-6"
                  >
                    <span>Configurer</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                )}
              </div>
            </div>

            {/* Configuration Form */}
            {showForm && (
              <div className="mt-8 pt-8 border-t space-y-6 animate-accordion-down">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Connecter CynetPay</h3>
                    <p className="text-sm text-muted-foreground">Saisissez vos identifiants API en toute sécurité</p>
                  </div>
                </div>
                
                <div className="grid gap-6 p-6 bg-muted/30 rounded-xl border border-border/50">
                  <div className="space-y-3">
                    <Label htmlFor="apiKey" className="text-base font-semibold flex items-center gap-2">
                      <Lock className="w-4 h-4 text-primary" />
                      Clé API (apikey)
                    </Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="Collez votre Clé API ici"
                      value={formData.apiKey}
                      onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                      className="h-12 text-base"
                    />
                    <p className="text-xs text-muted-foreground">Cette clé ne sera jamais visible en clair</p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="siteId" className="text-base font-semibold flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      ID du Site (site_id)
                    </Label>
                    <Input
                      id="siteId"
                      type="text"
                      placeholder="Collez votre ID du Site ici"
                      value={formData.siteId}
                      onChange={(e) => setFormData({ ...formData, siteId: e.target.value })}
                      className="h-12 text-base"
                    />
                    <p className="text-xs text-muted-foreground">Vous trouverez cet ID dans votre tableau de bord CynetPay</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button 
                      variant="success" 
                      onClick={handleSaveConfig}
                      className="flex-1 h-12 text-base font-semibold"
                    >
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Enregistrer et Activer
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleCancel}
                      className="sm:w-32 h-12"
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
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Comment ça marche ?</h2>
          <p className="text-muted-foreground">Suivez ces étapes simples pour configurer votre compte</p>
        </div>
        
        <div className="grid gap-6">
          {[
            {
              step: 1,
              title: "Créez votre compte marchand",
              description: "Inscrivez-vous gratuitement sur CynetPay.com et validez votre compte",
              link: "https://www.cynetpay.com",
              icon: "🚀",
              color: "from-blue-500 to-cyan-500"
            },
            {
              step: 2,
              title: "Accédez à votre tableau de bord",
              description: "Connectez-vous à votre espace marchand CynetPay",
              icon: "📊",
              color: "from-purple-500 to-pink-500"
            },
            {
              step: 3,
              title: "Récupérez vos clés API",
              description: "Trouvez vos identifiants dans la section 'Intégration' ou 'Développeurs'",
              icon: "🔑",
              color: "from-orange-500 to-red-500"
            },
            {
              step: 4,
              title: "Configurez BurkinaShop",
              description: "Collez vos clés API dans le formulaire ci-dessus et activez les paiements",
              icon: "✅",
              color: "from-green-500 to-emerald-500"
            }
          ].map((item) => (
            <Card 
              key={item.step}
              className="group hover:shadow-lg hover:scale-[1.02] transition-all duration-300 overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Step Number with gradient */}
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                      <span className="text-3xl">{item.icon}</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                    {item.link && (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:underline font-medium group/link"
                      >
                        <span>Visitez CynetPay.com</span>
                        <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentIntegration;
