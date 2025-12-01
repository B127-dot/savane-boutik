import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  CreditCard, 
  Shield, 
  Check,
  Trash2,
  Users,
  MessageCircle,
  Calendar,
  Package,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Sparkles,
  Save,
  Lock,
  AlertTriangle,
  Star,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const Settings = () => {
  const { user, products, orders, logout } = useApp();
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userName, setUserName] = useState(user?.name || '');
  const [isSaving, setIsSaving] = useState(false);

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getUserStats = () => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const activeDays = Math.ceil((Date.now() - new Date(user?.id || Date.now()).getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      productsCreated: products.length,
      ordersReceived: orders.length,
      activeDays: activeDays,
      revenueGenerated: totalRevenue
    };
  };

  const stats = getUserStats();

  const handleSaveProfile = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (user) {
      const updatedUser = { ...user, name: userName };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profil mis à jour avec succès');
    }
    setIsSaving(false);
  };

  const handleDeleteAccount = () => {
    // Clear all user data
    localStorage.clear();
    logout();
    toast.success('Compte supprimé avec succès');
    navigate('/');
  };

  const pricingPlans = [
    {
      name: 'Gratuit',
      price: { monthly: 0, annual: 0 },
      description: 'Pour démarrer votre activité',
      icon: Package,
      features: [
        'Jusqu\'à 50 produits',
        'Paiements Orange & Moov Money',
        'WhatsApp Business',
        'Support par email',
        '1 thème de boutique'
      ],
      popular: false,
      current: true
    },
    {
      name: 'Pro',
      price: { monthly: 9900, annual: 99000 },
      description: 'Pour les commerçants actifs',
      icon: Star,
      badge: '82% des vendeurs',
      features: [
        'Produits illimités',
        'Tous les moyens de paiement',
        'Analytics avancés',
        'Support prioritaire 24/7',
        'Tous les thèmes premium',
        'Code promo & réductions',
        'Export des données'
      ],
      popular: true,
      current: false
    },
    {
      name: 'Business',
      price: { monthly: 24900, annual: 249000 },
      description: 'Pour les entreprises établies',
      icon: Zap,
      features: [
        'Tout du plan Pro',
        'Multi-boutiques',
        'API personnalisée',
        'Manager dédié',
        'Formation personnalisée',
        'Intégrations avancées'
      ],
      popular: false,
      current: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2">Paramètres</h1>
            <p className="text-muted-foreground">Gérez votre compte et vos préférences</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-full sm:max-w-2xl h-auto p-1 bg-muted/50">
            <TabsTrigger 
              value="profile" 
              className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm py-3"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profil</span>
            </TabsTrigger>
            <TabsTrigger 
              value="subscription"
              className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm py-3"
            >
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Abonnement</span>
            </TabsTrigger>
            <TabsTrigger 
              value="privacy"
              className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm py-3"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Confidentialité</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid gap-6"
            >
              {/* Profile Card */}
              <Card className="overflow-hidden border-border/50 bg-gradient-to-br from-card via-card to-card/50">
                <div className="p-6 space-y-6">
                  {/* Avatar Section */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-border/50">
                    <div className="relative group">
                      <Avatar className="w-24 h-24 border-4 border-primary/20 shadow-lg shadow-primary/10">
                        <AvatarFallback className="bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground font-bold text-3xl">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-2xl font-bold">{user?.name}</h3>
                      <p className="text-muted-foreground flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5" />
                        {user?.email}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="secondary" className="gap-1.5">
                          <Calendar className="w-3 h-3" />
                          Membre depuis {new Date(user?.id || Date.now()).toLocaleDateString('fr-FR')}
                        </Badge>
                        <Badge className="bg-primary/10 text-primary border-primary/20 gap-1.5">
                          <Sparkles className="w-3 h-3" />
                          Plan Gratuit
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold">Nom complet</Label>
                      <Input
                        id="name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Votre nom"
                        className="h-11 bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold">Adresse email</Label>
                      <div className="relative">
                        <Input
                          id="email"
                          value={user?.email}
                          disabled
                          className="h-11 bg-muted/50 pl-9"
                        />
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">L'email ne peut pas être modifié pour des raisons de sécurité</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4">
                    <Button 
                      onClick={handleSaveProfile} 
                      disabled={isSaving}
                      className="w-full sm:w-auto gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                    >
                      <Save className="w-4 h-4" />
                      {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Statistics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Package, label: 'Produits créés', value: stats.productsCreated, color: 'from-blue-500/10 to-blue-500/5', iconColor: 'text-blue-500' },
                  { icon: ShoppingCart, label: 'Commandes', value: stats.ordersReceived, color: 'from-green-500/10 to-green-500/5', iconColor: 'text-green-500' },
                  { icon: TrendingUp, label: 'Jours actifs', value: stats.activeDays, color: 'from-orange-500/10 to-orange-500/5', iconColor: 'text-orange-500' },
                  { icon: DollarSign, label: 'Revenus', value: `${stats.revenueGenerated.toLocaleString()} F`, color: 'from-primary/10 to-primary/5', iconColor: 'text-primary' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className={`p-5 bg-gradient-to-br ${stat.color} border-border/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2.5 rounded-lg bg-background/50 ${stat.iconColor}`}>
                          <stat.icon className="w-5 h-5" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Current Plan Banner */}
              <Card className="overflow-hidden border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-background shadow-lg shadow-primary/10">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold">Plan actuel : Gratuit</h3>
                        <Badge className="bg-primary text-primary-foreground shadow-sm">
                          <Check className="w-3 h-3 mr-1" />
                          Actif
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">Vous utilisez le plan gratuit de BurkinaShop</p>
                    </div>
                    <Sparkles className="w-16 h-16 text-primary/30" />
                  </div>
                </div>
              </Card>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-4 py-6">
                <span className={`text-sm font-semibold transition-colors ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Mensuel
                </span>
                <Switch
                  checked={isAnnual}
                  onCheckedChange={setIsAnnual}
                  className="data-[state=checked]:bg-primary"
                />
                <span className={`text-sm font-semibold transition-colors ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Annuel
                </span>
                <AnimatePresence>
                  {isAnnual && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                    >
                      <Badge variant="secondary" className="ml-2 shadow-sm">
                        Économisez 20%
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pricingPlans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card 
                      className={`relative h-full flex flex-col p-6 transition-all duration-300 hover:shadow-xl ${
                        plan.popular 
                          ? 'border-2 border-primary bg-gradient-to-br from-primary/5 to-background shadow-lg shadow-primary/20 scale-[1.02]' 
                          : 'border-border/50 hover:border-primary/30'
                      }`}
                    >
                      {plan.popular && plan.badge && (
                        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary shadow-md shadow-primary/50">
                          <Star className="w-3 h-3 mr-1" />
                          {plan.badge}
                        </Badge>
                      )}
                      
                      <div className="mb-6">
                        <div className={`inline-flex p-3 rounded-xl mb-4 ${
                          plan.popular ? 'bg-primary/10' : 'bg-accent'
                        }`}>
                          <plan.icon className={`w-6 h-6 ${
                            plan.popular ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold">
                            {(isAnnual ? plan.price.annual / 12 : plan.price.monthly).toLocaleString()}
                          </span>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-muted-foreground">FCFA</span>
                            <span className="text-xs text-muted-foreground">/mois</span>
                          </div>
                        </div>
                        {isAnnual && plan.price.annual > 0 && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Facturé {plan.price.annual.toLocaleString()} FCFA/an
                          </p>
                        )}
                      </div>

                      <ul className="space-y-3 mb-6 flex-1">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm">
                            <div className="p-0.5 rounded-full bg-primary/10 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <span className="flex-1">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {plan.current ? (
                        <Button variant="outline" className="w-full" disabled>
                          <Check className="w-4 h-4 mr-2" />
                          Plan actuel
                        </Button>
                      ) : (
                        <Button 
                          className={`w-full shadow-lg transition-all duration-300 ${
                            plan.popular 
                              ? 'shadow-primary/30 hover:shadow-primary/50' 
                              : ''
                          }`}
                          variant={plan.popular ? 'default' : 'outline'}
                        >
                          Passer au plan {plan.name}
                        </Button>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Footer Info Cards */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-6 bg-accent/30 border-border/50 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Utilisé par 500+ entreprises</h4>
                      <p className="text-sm text-muted-foreground">
                        Rejoignez notre communauté grandissante de commerçants
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 bg-accent/30 border-border/50 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <MessageCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Des questions ?</h4>
                      <p className="text-sm text-muted-foreground">
                        Rejoignez notre communauté WhatsApp pour obtenir de l'aide
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Data Protection Card */}
              <Card className="overflow-hidden border-border/50">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">Protection des données</h3>
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <p>
                          Vos données sont stockées de manière <strong className="text-foreground">sécurisée</strong> et ne sont jamais partagées avec des tiers sans votre consentement explicite.
                        </p>
                        <p>
                          Conformément au <strong className="text-foreground">RGPD</strong>, vous avez le droit d'accéder, de modifier et de supprimer vos données personnelles à tout moment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Delete Account Section */}
              <Card className="overflow-hidden border-destructive/30 bg-gradient-to-br from-destructive/5 to-background">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-destructive/10">
                      <Trash2 className="w-6 h-6 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-xl font-bold text-destructive">Suppression du compte</h3>
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Irréversible
                        </Badge>
                      </div>
                      <div className="space-y-4 mb-6">
                        <p className="text-sm text-muted-foreground">
                          La suppression de votre compte est <strong className="text-foreground">irréversible</strong>. Cette action entraînera :
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {[
                            'La suppression définitive de tous vos produits',
                            'La suppression de votre historique de commandes',
                            'La fermeture de votre boutique en ligne',
                            'La perte de toutes vos données et statistiques'
                          ].map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="p-1 rounded-full bg-destructive/10 mt-0.5">
                                <AlertTriangle className="w-3 h-3 text-destructive" />
                              </div>
                              <span className="flex-1">{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                          <p className="text-xs text-muted-foreground">
                            <strong className="text-foreground">Conformément au RGPD</strong>, toutes vos données personnelles seront définitivement supprimées de nos serveurs dans les 30 jours suivant votre demande.
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="destructive"
                        onClick={() => setShowDeleteDialog(true)}
                        className="gap-2 shadow-lg shadow-destructive/20 hover:shadow-destructive/30"
                      >
                        <Trash2 className="w-4 h-4" />
                        Supprimer mon compte
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Confirmer la suppression du compte
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                <strong>Cette action est irréversible.</strong> Êtes-vous absolument sûr de vouloir supprimer votre compte ?
              </p>
              <p className="text-sm">
                Toutes vos données (produits, commandes, paramètres) seront définitivement supprimées et ne pourront pas être récupérées.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAccount}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Oui, supprimer définitivement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settings;