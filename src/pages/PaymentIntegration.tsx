import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, XCircle, Shield, Zap, Lock, Sparkles, Rocket, LayoutDashboard, Key, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { StepCard } from '@/components/payment/StepCard';
import { StepConnector } from '@/components/payment/StepConnector';
import { ProgressBar } from '@/components/payment/ProgressBar';

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
      {/* Hero Header - Enhanced Design */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 shadow-2xl">
        {/* Animated gradient background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-background" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-glow/10 via-transparent to-accent/10 animate-pulse" style={{ animationDuration: '4s' }} />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />
        
        {/* Glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-glow/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        
        {/* Content */}
        <div className="relative p-8 md:p-16 space-y-8">
          {/* Badge with shimmer effect */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">Paiements Sécurisés</span>
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          </div>
          
          {/* Title with enhanced gradient */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent animate-gradient-x">
                Configuration des
              </span>
              <br />
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Paiements
              </span>
            </h1>
            
            <p className="text-muted-foreground text-xl md:text-2xl max-w-4xl leading-relaxed">
              Connectez votre compte de paiement pour recevoir l'argent de vos ventes directement.
              <br />
              <span className="text-foreground font-bold bg-gradient-to-r from-success to-primary bg-clip-text text-transparent"> 
                0% de commission
              </span> 
              {' '}· Transferts instantanés et sécurisés via nos partenaires certifiés.
            </p>
          </div>
          
          {/* Enhanced Trust badges */}
          <div className="flex flex-wrap gap-4 pt-6">
            <div className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">100% Sécurisé</p>
                <p className="text-xs text-muted-foreground">Chiffrement SSL 256-bit</p>
              </div>
            </div>
            
            <div className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Instantané</p>
                <p className="text-xs text-muted-foreground">Réception immédiate</p>
              </div>
            </div>
            
            <div className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">0% Commission</p>
                <p className="text-xs text-muted-foreground">100% pour vous</p>
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

      {/* Instructions Section - Redesigned */}
      <div id="how-it-works-section" className="space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Comment ça marche ?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Suivez ces étapes simples pour configurer votre compte et commencer à recevoir des paiements
          </p>
        </div>
        
        {/* Desktop: 2x2 Grid, Mobile: Vertical Stack */}
        <div className="relative">
          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Row 1 */}
            <StepCard 
              step={1}
              title="Créez votre compte marchand"
              description="Inscrivez-vous gratuitement sur CynetPay.com et validez votre compte en quelques minutes. Aucune carte bancaire requise."
              IconComponent={Rocket}
              color="from-blue-500 to-cyan-500"
              badge="⏱️ 5 min"
              link="https://www.cynetpay.com"
              delay={0}
            />
            
            <StepCard 
              step={2}
              title="Accédez à votre tableau de bord"
              description="Connectez-vous à votre espace marchand CynetPay pour accéder à vos paramètres"
              IconComponent={LayoutDashboard}
              color="from-purple-500 to-pink-500"
              delay={150}
            />

            {/* Row 2 */}
            <StepCard 
              step={3}
              title="Récupérez vos clés API"
              description="Trouvez vos identifiants sécurisés dans la section 'Intégration' ou 'Développeurs' de votre dashboard"
              IconComponent={Key}
              color="from-orange-500 to-red-500"
              badge="🔒 Sécurisé"
              delay={300}
            />
            
            <StepCard 
              step={4}
              title="Configurez BurkinaShop"
              description="Collez vos clés API dans le formulaire ci-dessus. Vos paiements seront activés immédiatement !"
              IconComponent={CheckCircle2}
              color="from-green-500 to-emerald-500"
              badge="✨ Dernière étape"
              delay={450}
            />
          </div>

          {/* Connection Lines - Desktop only */}
          <div className="hidden md:block">
            {/* Horizontal line Row 1 */}
            <div className="absolute top-[15%] left-[48%] right-[48%] h-[2px]">
              <StepConnector direction="horizontal" />
            </div>
            
            {/* Horizontal line Row 2 */}
            <div className="absolute bottom-[15%] left-[48%] right-[48%] h-[2px]">
              <StepConnector direction="horizontal" />
            </div>
            
            {/* Vertical lines */}
            <div className="absolute top-[30%] bottom-[30%] left-[25%] w-[2px]">
              <StepConnector direction="vertical" />
            </div>
            
            <div className="absolute top-[30%] bottom-[30%] right-[25%] w-[2px]">
              <StepConnector direction="vertical" />
            </div>
          </div>

          {/* Mobile connectors */}
          <div className="md:hidden flex flex-col items-center">
            <StepConnector direction="vertical" />
          </div>
        </div>

        {/* Progress Bar */}
        <ProgressBar />
      </div>
    </div>
  );
};

export default PaymentIntegration;
