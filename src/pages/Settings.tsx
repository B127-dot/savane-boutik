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
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

type TabType = 'profile' | 'subscription' | 'privacy';

const Settings = () => {
  const { user, products, orders, logout } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isAnnual, setIsAnnual] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userName, setUserName] = useState(user?.name || '');

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

  const handleSaveProfile = () => {
    // Update user name in localStorage
    if (user) {
      const updatedUser = { ...user, name: userName };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profil mis à jour avec succès');
    }
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

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'subscription', label: 'Abonnement', icon: CreditCard },
    { id: 'privacy', label: 'Confidentialité & Données', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-64 border-r border-border/50 p-4 space-y-2 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-1">Paramètres</h2>
            <p className="text-sm text-muted-foreground">Gérez votre compte</p>
          </div>
          
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${activeTab === tab.id 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }
              `}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-3xl font-bold mb-2">Profil</h1>
                  <p className="text-muted-foreground">Gérez vos informations personnelles</p>
                </div>

                <Card className="p-6">
                  <div className="flex items-center gap-6 mb-8">
                    <Avatar className="w-20 h-20 border-4 border-border">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground font-bold text-2xl">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{user?.name}</h3>
                      <p className="text-muted-foreground">{user?.email}</p>
                      <Badge variant="outline" className="mt-2">
                        <Calendar className="w-3 h-3 mr-1" />
                        Membre depuis {new Date(user?.id || Date.now()).toLocaleDateString('fr-FR')}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Votre nom"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={user?.email}
                        disabled
                        className="mt-2 bg-muted"
                      />
                      <p className="text-xs text-muted-foreground mt-1">L'email ne peut pas être modifié</p>
                    </div>
                  </div>

                  <Button onClick={handleSaveProfile} className="w-full sm:w-auto">
                    Enregistrer les modifications
                  </Button>
                </Card>

                {/* Statistics */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Statistiques</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-accent/50 border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-4 h-4 text-primary" />
                        <p className="text-xs text-muted-foreground">Produits créés</p>
                      </div>
                      <p className="text-2xl font-bold">{stats.productsCreated}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-accent/50 border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <ShoppingCart className="w-4 h-4 text-primary" />
                        <p className="text-xs text-muted-foreground">Commandes</p>
                      </div>
                      <p className="text-2xl font-bold">{stats.ordersReceived}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-accent/50 border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <p className="text-xs text-muted-foreground">Jours actifs</p>
                      </div>
                      <p className="text-2xl font-bold">{stats.activeDays}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-accent/50 border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <p className="text-xs text-muted-foreground">Revenus</p>
                      </div>
                      <p className="text-2xl font-bold">{stats.revenueGenerated.toLocaleString()} F</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Subscription Tab */}
            {activeTab === 'subscription' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-3xl font-bold mb-2">Abonnement</h1>
                  <p className="text-muted-foreground">Gérez votre plan et facturation</p>
                </div>

                {/* Current Plan */}
                <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold">Plan actuel : Gratuit</h3>
                        <Badge className="bg-primary/20 text-primary border-primary/30">
                          <Check className="w-3 h-3 mr-1" />
                          Actif
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Vous utilisez le plan gratuit</p>
                    </div>
                    <Sparkles className="w-12 h-12 text-primary/40" />
                  </div>
                </Card>

                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-4 py-4">
                  <span className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Mensuel
                  </span>
                  <Switch
                    checked={isAnnual}
                    onCheckedChange={setIsAnnual}
                  />
                  <span className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Annuel
                  </span>
                  {isAnnual && (
                    <Badge variant="secondary" className="ml-2">
                      Économisez 20%
                    </Badge>
                  )}
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                  {pricingPlans.map((plan) => (
                    <Card 
                      key={plan.name}
                      className={`p-6 relative ${plan.popular ? 'border-2 border-primary shadow-lg shadow-primary/20' : ''}`}
                    >
                      {plan.popular && (
                        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                          {plan.badge}
                        </Badge>
                      )}
                      
                      <div className="mb-4">
                        <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold">
                            {(isAnnual ? plan.price.annual / 12 : plan.price.monthly).toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground">FCFA/mois</span>
                        </div>
                        {isAnnual && plan.price.annual > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Facturé {plan.price.annual.toLocaleString()} FCFA/an
                          </p>
                        )}
                      </div>

                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {plan.current ? (
                        <Button variant="outline" className="w-full" disabled>
                          Plan actuel
                        </Button>
                      ) : (
                        <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                          Passer au plan {plan.name}
                        </Button>
                      )}
                    </Card>
                  ))}
                </div>

                {/* Footer Info */}
                <Card className="p-6 bg-accent/50">
                  <div className="flex items-center gap-4 mb-4">
                    <Users className="w-8 h-8 text-primary" />
                    <div>
                      <h4 className="font-semibold">Utilisé par 500+ entreprises</h4>
                      <p className="text-sm text-muted-foreground">Rejoignez notre communauté grandissante</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <MessageCircle className="w-8 h-8 text-primary" />
                    <div>
                      <h4 className="font-semibold">Des questions ?</h4>
                      <p className="text-sm text-muted-foreground">
                        Rejoignez notre communauté WhatsApp pour obtenir de l'aide
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-3xl font-bold mb-2">Confidentialité & Données</h1>
                  <p className="text-muted-foreground">Gérez vos données et la confidentialité de votre compte</p>
                </div>

                <Card className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Shield className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Protection des données</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Vos données sont stockées de manière sécurisée et ne sont jamais partagées avec des tiers sans votre consentement explicite.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Conformément au RGPD, vous avez le droit d'accéder, de modifier et de supprimer vos données personnelles à tout moment.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Delete Account Section */}
                <Card className="p-6 border-destructive/50 bg-destructive/5">
                  <div className="flex items-start gap-4">
                    <Trash2 className="w-6 h-6 text-destructive mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-destructive mb-2">Suppression du compte</h3>
                      <div className="space-y-3 mb-4">
                        <p className="text-sm text-muted-foreground">
                          La suppression de votre compte est <strong>irréversible</strong>. Cette action entraînera :
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                          <li>• La suppression définitive de tous vos produits</li>
                          <li>• La suppression de votre historique de commandes</li>
                          <li>• La fermeture de votre boutique en ligne</li>
                          <li>• La perte de toutes vos données et statistiques</li>
                        </ul>
                        <p className="text-sm text-muted-foreground">
                          Conformément au RGPD, toutes vos données personnelles seront définitivement supprimées de nos serveurs dans les 30 jours suivant votre demande.
                        </p>
                      </div>
                      <Button 
                        variant="destructive"
                        onClick={() => setShowDeleteDialog(true)}
                        className="gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Supprimer mon compte
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
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