import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  User,
  CreditCard,
  Shield,
  Check,
  Trash2,
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
  Crown,
  Edit2,
  Mail,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type Tab = 'profile' | 'subscription' | 'privacy';

const navItems: { id: Tab; label: string; icon: React.ElementType; description: string }[] = [
  { id: 'profile', label: 'Profil', icon: User, description: 'Vos informations personnelles' },
  { id: 'subscription', label: 'Abonnement', icon: CreditCard, description: 'Gérez votre plan' },
  { id: 'privacy', label: 'Confidentialité & Données', icon: Shield, description: 'Sécurité et suppression' },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: { monthly: 5000, annual: 48000 },
    description: 'Pour les petits vendeurs',
    icon: Star,
    features: [
      '1 boutique en ligne',
      "Jusqu'à 100 produits",
      'WhatsApp Business intégré',
      'Paiements Orange & Moov Money',
      '2 thèmes de boutique',
      'Support prioritaire',
      'Notifications automatiques',
    ],
    popular: false,
    current: true,
    accentColor: 'from-blue-500/20 to-blue-500/5',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
  },
  {
    name: 'Pro',
    price: { monthly: 12500, annual: 120000 },
    description: 'Pour les vendeurs établis',
    icon: Crown,
    badge: '82% des vendeurs',
    features: [
      'Tout du plan Starter',
      'Produits illimités',
      '4 thèmes professionnels',
      'Analytics avancés',
      'Nom de domaine personnalisé',
      'Code promo & réductions',
      'Support WhatsApp prioritaire',
      'Zéro commission sur ventes',
    ],
    popular: true,
    current: false,
    accentColor: 'from-primary/20 to-primary/5',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
  },
  {
    name: 'Business',
    price: { monthly: 25000, annual: 240000 },
    description: 'Pour les PME e-commerce',
    icon: Sparkles,
    features: [
      'Tout du plan Pro',
      'Boutiques multiples illimitées',
      "API développeur complète",
      "Gestion d'équipe avancée",
      'Account manager dédié',
      'Formation dédiée',
      'SLA garanti 99.9%',
    ],
    popular: false,
    current: false,
    accentColor: 'from-purple-500/20 to-purple-500/5',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
} as const;

const Settings = () => {
  const { user, products, orders, logout } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [isAnnual, setIsAnnual] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userName, setUserName] = useState(user?.name || '');
  const [isSaving, setIsSaving] = useState(false);

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const memberSince = new Date(user?.id || Date.now()).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    if (user) {
      localStorage.setItem('user', JSON.stringify({ ...user, name: userName }));
      toast.success('Profil mis à jour avec succès');
    }
    setIsSaving(false);
  };

  const handleDeleteAccount = () => {
    localStorage.clear();
    logout();
    toast.success('Compte supprimé avec succès');
    navigate('/');
  };

  const profileStats = [
    { icon: Package, label: 'Produits créés', value: products.length, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { icon: ShoppingCart, label: 'Commandes reçues', value: orders.length, color: 'text-primary', bg: 'bg-primary/10' },
    { icon: TrendingUp, label: 'Jours actifs', value: 12, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    {
      icon: DollarSign,
      label: 'Revenus générés',
      value: `${totalRevenue.toLocaleString()} F`,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="border-b border-border/50 px-4 sm:px-8 py-5">
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Paramètres</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Gérez votre compte et vos préférences</p>
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-73px)]">
        {/* ─── Left sidebar nav ─── */}
        <aside className="w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-border/50 bg-card/30">
          {/* Mobile: horizontal scrollable row */}
          <div className="flex lg:flex-col gap-1 p-3 overflow-x-auto lg:overflow-x-visible lg:pt-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 shrink-0 lg:shrink lg:w-full',
                    active
                      ? 'bg-primary/10 text-primary shadow-sm'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  )}
                >
                  <div
                    className={cn(
                      'w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors',
                      active ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 hidden lg:block">
                    <p className={cn('text-sm font-medium truncate', active && 'font-semibold')}>{item.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                  </div>
                  <span className="lg:hidden text-sm font-medium whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* ─── Main content ─── */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <AnimatePresence mode="wait">
            {/* ══════════ PROFILE TAB ══════════ */}
            {activeTab === 'profile' && (
              <motion.div key="profile" {...fadeUp} className="max-w-2xl space-y-6">
                {/* Profile Hero Card */}
                <Card className="overflow-hidden border-border/50">
                  {/* Decorative banner */}
                  <div className="h-28 bg-gradient-to-br from-primary/30 via-primary/10 to-purple-500/20 relative">
                    <div className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                      }}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-3 right-3 gap-1.5 bg-background/70 backdrop-blur-sm border-border/50 text-xs"
                    >
                      <Edit2 className="w-3 h-3" />
                      Modifier le profil
                    </Button>
                  </div>

                  <div className="px-6 pb-6">
                    {/* Avatar overlapping banner */}
                    <div className="-mt-12 mb-4">
                      <Avatar className="w-20 h-20 border-4 border-card shadow-xl">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-bold text-2xl">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* User info */}
                    <div className="space-y-1 mb-4">
                      <h2 className="text-2xl font-bold">{user?.name || 'Vendeur'}</h2>
                      <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 shrink-0" />
                          {user?.email}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          Membre depuis {memberSince}
                        </span>
                      </div>
                      <div className="pt-2">
                        <Badge className="bg-primary/10 text-primary border-primary/20 gap-1.5">
                          <Sparkles className="w-3 h-3" />
                          Plan Gratuit · Actif
                        </Badge>
                      </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                      {profileStats.map((s) => (
                        <div
                          key={s.label}
                          className="flex flex-col gap-1.5 p-3 rounded-xl bg-muted/40 border border-border/40 hover:border-border/70 transition-colors"
                        >
                          <div className={cn('p-1.5 rounded-lg w-fit', s.bg)}>
                            <s.icon className={cn('w-4 h-4', s.color)} />
                          </div>
                          <span className="text-xs text-muted-foreground leading-tight">{s.label}</span>
                          <span className="text-lg font-bold leading-none">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Edit form */}
                <Card className="p-6 border-border/50 space-y-5">
                  <div>
                    <h3 className="text-base font-semibold">Informations personnelles</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Modifiez vos données de compte</p>
                  </div>
                  <Separator />
                  <div className="space-y-4">
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
                          className="h-11 bg-muted/50 pl-10"
                        />
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        L'email ne peut pas être modifié pour des raisons de sécurité
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleSaveProfile} disabled={isSaving} className="gap-2 w-full sm:w-auto">
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                  </Button>
                </Card>
              </motion.div>
            )}

            {/* ══════════ SUBSCRIPTION TAB ══════════ */}
            {activeTab === 'subscription' && (
              <motion.div key="subscription" {...fadeUp} className="max-w-4xl space-y-6">
                {/* Current plan */}
                <Card className="overflow-hidden border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
                  <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold">Plan actuel : Gratuit</h3>
                        <Badge className="bg-primary text-primary-foreground">
                          <Check className="w-3 h-3 mr-1" />
                          Actif
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Vous utilisez le plan gratuit de BurkinaShop</p>
                    </div>
                    <Sparkles className="w-12 h-12 text-primary/30 shrink-0" />
                  </div>
                </Card>

                {/* Billing toggle */}
                <div className="flex items-center justify-center gap-4">
                  <span className={cn('text-sm font-semibold', !isAnnual ? 'text-foreground' : 'text-muted-foreground')}>
                    Mensuel
                  </span>
                  <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
                  <span className={cn('text-sm font-semibold', isAnnual ? 'text-foreground' : 'text-muted-foreground')}>
                    Annuel
                  </span>
                  <AnimatePresence>
                    {isAnnual && (
                      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
                        <Badge variant="secondary">Économisez 20%</Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Plans grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pricingPlans.map((plan, i) => (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.35 }}
                    >
                      <Card
                        className={cn(
                          'relative h-full flex flex-col p-6 transition-all duration-300 hover:shadow-xl',
                          plan.popular
                            ? 'border-2 border-primary bg-gradient-to-br from-primary/5 to-background shadow-lg shadow-primary/15 scale-[1.02]'
                            : 'border-border/50 hover:border-primary/30'
                        )}
                      >
                        {plan.popular && plan.badge && (
                          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary shadow-md shadow-primary/40">
                            <Star className="w-3 h-3 mr-1" />
                            {plan.badge}
                          </Badge>
                        )}
                        <div className="mb-5">
                          <div className={cn('inline-flex p-2.5 rounded-xl mb-3', plan.iconBg)}>
                            <plan.icon className={cn('w-5 h-5', plan.iconColor)} />
                          </div>
                          <h3 className="text-xl font-bold mb-0.5">{plan.name}</h3>
                          <p className="text-xs text-muted-foreground mb-3">{plan.description}</p>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-3xl font-bold">
                              {(isAnnual ? plan.price.annual / 12 : plan.price.monthly).toLocaleString()}
                            </span>
                            <span className="text-sm text-muted-foreground">FCFA/mois</span>
                          </div>
                          {isAnnual && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Facturé {plan.price.annual.toLocaleString()} FCFA/an
                            </p>
                          )}
                        </div>
                        <ul className="space-y-2.5 mb-6 flex-1">
                          {plan.features.map((f, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm">
                              <div className="p-0.5 rounded-full bg-primary/10 mt-0.5 shrink-0">
                                <Check className="w-3 h-3 text-primary" />
                              </div>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                        {plan.current ? (
                          <Button variant="outline" className="w-full" disabled>
                            <Check className="w-4 h-4 mr-2" />
                            Plan actuel
                          </Button>
                        ) : (
                          <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                            Passer au plan {plan.name}
                          </Button>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Footer cards */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      icon: MessageCircle,
                      title: 'Des questions ?',
                      desc: 'Rejoignez notre communauté WhatsApp pour obtenir de l\'aide',
                    },
                    {
                      icon: User,
                      title: 'Utilisé par 500+ entreprises',
                      desc: 'Rejoignez notre communauté grandissante de commerçants',
                    },
                  ].map((card) => (
                    <Card key={card.title} className="p-5 bg-muted/30 border-border/50 flex items-start gap-4">
                      <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
                        <card.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-0.5">{card.title}</h4>
                        <p className="text-xs text-muted-foreground">{card.desc}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ══════════ PRIVACY TAB ══════════ */}
            {activeTab === 'privacy' && (
              <motion.div key="privacy" {...fadeUp} className="max-w-2xl space-y-6">
                <Card className="p-6 border-border/50">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold mb-1">Protection des données</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Vos données sont stockées de manière <strong className="text-foreground">sécurisée</strong> et ne sont jamais partagées avec des tiers sans votre consentement explicite.
                        Conformément au <strong className="text-foreground">RGPD</strong>, vous avez le droit d'accéder, de modifier et de supprimer vos données personnelles à tout moment.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-destructive/30 bg-gradient-to-br from-destructive/5 to-background">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-destructive/10 shrink-0">
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-base font-bold text-destructive">Suppression du compte</h3>
                        <Badge variant="destructive" className="gap-1 text-xs">
                          <AlertTriangle className="w-3 h-3" />
                          Irréversible
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Cette action supprimera définitivement tous vos produits, commandes et données. Elle est <strong className="text-foreground">irréversible</strong>.
                      </p>
                      <ul className="space-y-2 mb-5">
                        {[
                          'Suppression définitive de tous vos produits',
                          'Suppression de votre historique de commandes',
                          'Fermeture de votre boutique en ligne',
                          'Perte de toutes vos données et statistiques',
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                            <AlertTriangle className="w-3.5 h-3.5 text-destructive mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="p-3 rounded-lg bg-muted/50 border border-border/40 mb-5">
                        <p className="text-xs text-muted-foreground">
                          <strong className="text-foreground">Conformément au RGPD</strong>, toutes vos données personnelles seront définitivement supprimées de nos serveurs dans les 30 jours suivant votre demande.
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
          </AnimatePresence>
        </main>
      </div>

      {/* Delete confirmation */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Confirmer la suppression
            </AlertDialogTitle>
            <AlertDialogDescription>
              <strong>Cette action est irréversible.</strong> Toutes vos données (produits, commandes, paramètres) seront définitivement supprimées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Oui, supprimer définitivement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settings;
