import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Lock, 
  Eye, 
  Users, 
  Database, 
  Server, 
  Clock, 
  FileText, 
  MessageCircle,
  Mail,
  MapPin,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
  Globe,
  Smartphone,
  CreditCard,
  UserCheck,
  Trash2,
  Download,
  AlertCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const lastUpdated = "25 Décembre 2025";

  const tableOfContents = [
    { id: "introduction", label: "Introduction", icon: Globe },
    { id: "collecte", label: "Informations Collectées", icon: Database },
    { id: "utilisation", label: "Utilisation des Données", icon: Eye },
    { id: "partage", label: "Partage avec des Tiers", icon: Users },
    { id: "securite", label: "Sécurité des Données", icon: Shield },
    { id: "conservation", label: "Conservation", icon: Clock },
    { id: "droits", label: "Vos Droits", icon: UserCheck },
    { id: "cookies", label: "Cookies", icon: Server },
    { id: "vendeurs-acheteurs", label: "Vendeurs & Acheteurs", icon: Users },
    { id: "modifications", label: "Modifications", icon: FileText },
    { id: "faq", label: "FAQ Confidentialité", icon: MessageCircle },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.08),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Protection des Données</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Politique de{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                Confidentialité
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Votre vie privée est notre priorité. Découvrez comment BurkE-Shop protège vos informations personnelles et respecte vos droits.
            </p>
            
            <p className="text-sm text-muted-foreground">
              Dernière mise à jour : {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            
            {/* Sticky Table of Contents */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="sticky top-24">
                <Card className="bg-card/50 backdrop-blur border-border/50">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Table des matières</h3>
                    <nav className="space-y-1">
                      {tableOfContents.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors text-left"
                        >
                          <item.icon className="w-4 h-4 flex-shrink-0" />
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </div>
            </motion.aside>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-12"
            >
              {/* Introduction */}
              <section id="introduction" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Introduction</h2>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Bienvenue sur <strong className="text-foreground">BurkE-Shop</strong>, la première plateforme e-commerce pensée pour les commerçants du Burkina Faso. Votre confidentialité est d'une importance capitale pour nous. BurkE-Shop, opéré par <strong className="text-foreground">Openweb</strong>, s'engage à protéger vos informations personnelles et votre droit à la vie privée.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Si vous avez des questions ou des préoccupations concernant notre politique de confidentialité ou nos pratiques en matière de protection des données, veuillez nous contacter à <a href="mailto:contact@burkeshop.bf" className="text-primary hover:underline">contact@burkeshop.bf</a>.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Lorsque vous visitez notre plateforme et utilisez nos services, vous nous confiez vos informations personnelles. Nous prenons cette responsabilité très au sérieux. Cette politique vise à vous expliquer clairement quelles informations nous collectons, comment nous les utilisons, avec qui nous les partageons, et quels sont vos droits à cet égard.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Cette politique s'applique à toutes les informations collectées via notre plateforme, que vous soyez <strong className="text-foreground">vendeur</strong> (créateur de boutique) ou <strong className="text-foreground">acheteur</strong> (client des boutiques).
                  </p>
                </div>
              </section>

              {/* Informations Collectées */}
              <section id="collecte" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Database className="w-5 h-5 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Quelles Informations Collectons-nous ?</h2>
                </div>

                <div className="space-y-6">
                  {/* Informations fournies volontairement */}
                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Informations fournies volontairement
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Nous collectons les informations personnelles que vous nous fournissez lors de votre inscription, de la création de votre boutique, ou lorsque vous passez commande. Ces informations peuvent inclure :
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-foreground">Pour les Vendeurs :</h4>
                          <ul className="space-y-1">
                            {["Nom complet", "Adresse e-mail", "Numéro de téléphone (WhatsApp)", "Mot de passe (chiffré)", "Nom de la boutique", "Logo et images de la boutique", "Description de la boutique", "Informations produits (photos, prix, descriptions)", "Numéro Orange Money / Moov Money"].map((item) => (
                              <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <ChevronRight className="w-3 h-3 text-primary" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-foreground">Pour les Acheteurs :</h4>
                          <ul className="space-y-1">
                            {["Nom complet", "Numéro de téléphone", "Adresse de livraison", "Ville / Quartier", "Historique des commandes", "Préférences de paiement"].map((item) => (
                              <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <ChevronRight className="w-3 h-3 text-primary" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Informations collectées automatiquement */}
                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Server className="w-5 h-5 text-blue-500" />
                        Informations collectées automatiquement
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Nous collectons automatiquement certaines informations lorsque vous visitez ou naviguez sur notre plateforme. Ces informations ne permettent pas de vous identifier directement, mais peuvent inclure :
                      </p>
                      <div className="grid md:grid-cols-3 gap-4">
                        {[
                          { icon: Globe, label: "Adresse IP", desc: "Pour la sécurité et l'analyse" },
                          { icon: Smartphone, label: "Type d'appareil", desc: "Mobile, tablette, ordinateur" },
                          { icon: Eye, label: "Données de navigation", desc: "Pages visitées, temps passé" },
                        ].map((item) => (
                          <div key={item.label} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                            <item.icon className="w-5 h-5 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{item.label}</p>
                              <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Utilisation des Données */}
              <section id="utilisation" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-purple-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Comment Utilisons-nous Vos Informations ?</h2>
                </div>

                <p className="text-muted-foreground mb-6">
                  Nous traitons vos informations personnelles pour diverses raisons légitimes, notamment :
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: UserCheck, title: "Gestion de compte", desc: "Faciliter la création de compte, la connexion et la gestion de votre boutique ou profil acheteur" },
                    { icon: CreditCard, title: "Traitement des commandes", desc: "Gérer les commandes, faciliter les paiements via Orange Money/Moov Money, et organiser les livraisons" },
                    { icon: MessageCircle, title: "Communication", desc: "Vous envoyer des notifications WhatsApp, e-mails de confirmation, et informations importantes sur vos commandes" },
                    { icon: Shield, title: "Sécurité", desc: "Protéger nos services contre la fraude, les abus et les accès non autorisés" },
                    { icon: Globe, title: "Amélioration", desc: "Analyser l'utilisation de notre plateforme pour améliorer nos services et votre expérience" },
                    { icon: Mail, title: "Marketing", desc: "Avec votre consentement, vous envoyer des offres promotionnelles et actualités pertinentes" },
                  ].map((item) => (
                    <Card key={item.title} className="bg-card/50 border-border/50">
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Partage avec des Tiers */}
              <section id="partage" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Partage des Données avec des Tiers</h2>
                </div>

                <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20 mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Nous ne vendons jamais vos données</h3>
                        <p className="text-muted-foreground">
                          BurkE-Shop s'engage à ne jamais vendre, louer ou commercialiser vos informations personnelles à des tiers à des fins publicitaires ou marketing. Vos données restent les vôtres.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <p className="text-muted-foreground mb-6">
                  Nous partageons certaines informations uniquement avec des partenaires de confiance nécessaires au fonctionnement de nos services :
                </p>

                <div className="space-y-4">
                  {[
                    { 
                      title: "Prestataires de Paiement", 
                      partners: "Orange Money, Moov Money", 
                      desc: "Pour traiter vos transactions de paiement de manière sécurisée. Nous ne stockons jamais vos codes secrets ou PIN." 
                    },
                    { 
                      title: "Services de Communication", 
                      partners: "WhatsApp Business API", 
                      desc: "Pour faciliter la communication entre vendeurs et acheteurs via WhatsApp. Seuls les numéros de téléphone nécessaires sont partagés." 
                    },
                    { 
                      title: "Infrastructure & Hébergement", 
                      partners: "Supabase, Vercel", 
                      desc: "Pour héberger notre plateforme de manière sécurisée. Ces services respectent les normes de sécurité les plus strictes (SOC 2, GDPR)." 
                    },
                  ].map((item) => (
                    <Card key={item.title} className="bg-card/50 border-border/50">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-foreground">{item.title}</h4>
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{item.partners}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Sécurité des Données */}
              <section id="securite" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Sécurité des Données</h2>
                </div>

                <p className="text-muted-foreground mb-6">
                  La sécurité de vos données est notre priorité absolue. Nous mettons en œuvre des mesures techniques et organisationnelles robustes pour protéger vos informations :
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: Lock, title: "Chiffrement SSL/TLS", desc: "Toutes les communications sont chiffrées en transit avec les derniers protocoles de sécurité" },
                    { icon: Shield, title: "Hashage des mots de passe", desc: "Vos mots de passe sont stockés de manière sécurisée avec des algorithmes de hashage modernes (bcrypt)" },
                    { icon: Server, title: "Pare-feu & Monitoring", desc: "Surveillance 24/7 de nos infrastructures avec détection d'intrusion automatisée" },
                    { icon: UserCheck, title: "Accès restreint", desc: "Seuls les employés autorisés ont accès aux données, sur la base du strict nécessaire" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/50">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Conservation */}
              <section id="conservation" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Conservation des Données</h2>
                </div>

                <p className="text-muted-foreground mb-6">
                  Nous conservons vos données personnelles uniquement aussi longtemps que nécessaire pour les finalités décrites dans cette politique :
                </p>

                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {[
                        { type: "Données de compte", duration: "Jusqu'à la suppression du compte", note: "Vous pouvez demander la suppression à tout moment" },
                        { type: "Historique des commandes", duration: "5 ans", note: "Obligation légale pour la comptabilité" },
                        { type: "Données de paiement", duration: "3 ans après la transaction", note: "Conformité aux régulations financières" },
                        { type: "Logs de connexion", duration: "12 mois", note: "Pour la sécurité et l'analyse" },
                        { type: "Données marketing", duration: "Jusqu'au retrait du consentement", note: "Vous pouvez vous désinscrire à tout moment" },
                      ].map((item) => (
                        <div key={item.type} className="flex items-center justify-between py-3 border-b border-border/30 last:border-0">
                          <div>
                            <p className="font-medium text-foreground">{item.type}</p>
                            <p className="text-xs text-muted-foreground">{item.note}</p>
                          </div>
                          <span className="text-sm font-medium text-primary">{item.duration}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Vos Droits */}
              <section id="droits" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-cyan-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Vos Droits en Matière de Protection des Données</h2>
                </div>

                <p className="text-muted-foreground mb-6">
                  Conformément au Règlement Général sur la Protection des Données (RGPD) et aux lois locales applicables, vous disposez des droits suivants :
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { icon: Eye, title: "Droit d'accès", desc: "Obtenir une copie de toutes les données personnelles que nous détenons sur vous" },
                    { icon: FileText, title: "Droit de rectification", desc: "Corriger les informations inexactes ou incomplètes vous concernant" },
                    { icon: Trash2, title: "Droit à l'effacement", desc: "Demander la suppression de vos données personnelles" },
                    { icon: Download, title: "Droit à la portabilité", desc: "Recevoir vos données dans un format structuré et réutilisable" },
                    { icon: Shield, title: "Droit d'opposition", desc: "Vous opposer au traitement de vos données à des fins de marketing" },
                    { icon: Lock, title: "Droit de limitation", desc: "Limiter le traitement de vos données dans certaines circonstances" },
                  ].map((item) => (
                    <Card key={item.title} className="bg-card/50 border-border/50">
                      <CardContent className="p-4">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-3">
                          <item.icon className="w-5 h-5 text-cyan-500" />
                        </div>
                        <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="mt-6 bg-primary/5 border-primary/20">
                  <CardContent className="p-5">
                    <p className="text-muted-foreground">
                      Pour exercer ces droits, envoyez-nous un email à <a href="mailto:contact@burkeshop.bf" className="text-primary hover:underline font-medium">contact@burkeshop.bf</a>. Nous répondrons à votre demande dans un délai d'un mois conformément à la réglementation.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Cookies */}
              <section id="cookies" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                    <Server className="w-5 h-5 text-pink-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Cookies et Technologies Similaires</h2>
                </div>

                <p className="text-muted-foreground mb-6">
                  Nous utilisons des cookies et technologies similaires pour améliorer votre expérience sur notre plateforme :
                </p>

                <div className="space-y-4">
                  {[
                    { type: "Cookies essentiels", purpose: "Nécessaires au fonctionnement de la plateforme", required: true },
                    { type: "Cookies de session", purpose: "Maintenir votre connexion active pendant votre visite", required: true },
                    { type: "Cookies d'analyse", purpose: "Comprendre comment vous utilisez notre plateforme pour l'améliorer", required: false },
                    { type: "Cookies de préférences", purpose: "Mémoriser vos choix (langue, thème, etc.)", required: false },
                  ].map((item) => (
                    <div key={item.type} className="flex items-center justify-between p-4 rounded-xl bg-card/50 border border-border/50">
                      <div>
                        <p className="font-medium text-foreground">{item.type}</p>
                        <p className="text-sm text-muted-foreground">{item.purpose}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${item.required ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                        {item.required ? 'Requis' : 'Optionnel'}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Vendeurs & Acheteurs */}
              <section id="vendeurs-acheteurs" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-indigo-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Données des Vendeurs vs Acheteurs</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-primary" />
                        Pour les Vendeurs
                      </h3>
                      <ul className="space-y-3">
                        {[
                          "Vos informations de boutique sont publiques (nom, logo, description)",
                          "Votre numéro WhatsApp est partagé avec les acheteurs pour faciliter les commandes",
                          "Vos statistiques de vente sont privées et accessibles uniquement à vous",
                          "Vos informations de paiement (Orange Money/Moov) ne sont jamais partagées",
                          "Vous pouvez exporter toutes vos données à tout moment",
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-blue-500" />
                        Pour les Acheteurs
                      </h3>
                      <ul className="space-y-3">
                        {[
                          "Vos informations de commande sont partagées avec le vendeur concerné uniquement",
                          "Votre numéro de téléphone est utilisé pour les communications WhatsApp liées à vos commandes",
                          "Votre adresse de livraison est partagée avec le vendeur pour la livraison",
                          "Vos informations de paiement restent confidentielles",
                          "Vous pouvez demander la suppression de vos données à tout moment",
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Modifications */}
              <section id="modifications" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-rose-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Modifications de la Politique</h2>
                </div>

                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">
                      Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. La version la plus récente sera toujours disponible sur cette page avec la date de dernière mise à jour.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Pour les changements significatifs, nous vous informerons par :
                    </p>
                    <ul className="space-y-2 mb-4">
                      {["Email à l'adresse associée à votre compte", "Notification dans votre tableau de bord", "Bannière sur notre site web"].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <ChevronRight className="w-3 h-3 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-muted-foreground">
                      En continuant à utiliser BurkE-Shop après ces modifications, vous acceptez la politique mise à jour.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* FAQ */}
              <section id="faq" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Questions Fréquentes sur la Confidentialité</h2>
                </div>

                <Accordion type="single" collapsible className="space-y-3">
                  {[
                    {
                      question: "Comment mes données sont-elles protégées ?",
                      answer: "Nous utilisons des protocoles de sécurité avancés comme le chiffrement SSL/TLS pour toutes les communications, le hashage bcrypt pour les mots de passe, des pare-feu et des contrôles d'accès stricts. Nos serveurs sont hébergés sur des infrastructures certifiées (SOC 2, ISO 27001) et sont surveillés 24/7."
                    },
                    {
                      question: "Comment supprimer mon compte et mes données ?",
                      answer: "Vous pouvez demander la suppression de votre compte en nous contactant à contact@burkeshop.bf. Pour les vendeurs, assurez-vous d'abord d'honorer toutes les commandes en cours. Nous supprimerons vos données dans un délai de 30 jours, sauf celles que nous sommes légalement tenus de conserver."
                    },
                    {
                      question: "BurkE-Shop vend-il mes données à des tiers ?",
                      answer: "Non, absolument jamais. Nous ne vendons, ne louons et ne commercialisons jamais vos informations personnelles à des tiers. Vos données sont utilisées uniquement pour fournir et améliorer nos services."
                    },
                    {
                      question: "Mes informations de paiement sont-elles sécurisées ?",
                      answer: "Oui. Nous ne stockons jamais vos codes PIN ou mots de passe Orange Money/Moov Money. Les transactions sont traitées directement par les prestataires de paiement qui utilisent les standards de sécurité les plus élevés."
                    },
                    {
                      question: "Combien de temps conservez-vous mes données ?",
                      answer: "La durée de conservation dépend du type de données. Les données de compte sont conservées jusqu'à suppression, l'historique des commandes 5 ans (obligation légale), et les logs de connexion 12 mois. Vous pouvez demander la suppression à tout moment."
                    },
                    {
                      question: "Comment exercer mes droits RGPD ?",
                      answer: "Envoyez simplement un email à contact@burkeshop.bf en précisant votre demande (accès, rectification, suppression, etc.). Nous traiterons votre demande dans un délai d'un mois conformément à la réglementation."
                    },
                    {
                      question: "Les acheteurs peuvent-ils voir mes informations personnelles de vendeur ?",
                      answer: "Seules les informations publiques de votre boutique sont visibles (nom, logo, description, produits). Votre numéro WhatsApp est partagé pour faciliter les commandes. Vos informations personnelles et de paiement restent privées."
                    },
                  ].map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="bg-card/50 border border-border/50 rounded-xl px-6 data-[state=open]:bg-card/80"
                    >
                      <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              {/* Contact */}
              <section id="contact" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-teal-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Nous Contacter</h2>
                </div>

                <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-6">
                      Si vous avez des questions ou préoccupations concernant cette politique de confidentialité ou vos données personnelles, n'hésitez pas à nous contacter :
                    </p>

                    <div className="grid md:grid-cols-3 gap-4">
                      <a 
                        href="mailto:contact@burkeshop.bf"
                        className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Email</p>
                          <p className="text-sm text-muted-foreground">contact@burkeshop.bf</p>
                        </div>
                      </a>

                      <a 
                        href="https://wa.me/22671234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-green-500/30 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                          <MessageCircle className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">WhatsApp</p>
                          <p className="text-sm text-muted-foreground">+226 71 23 45 67</p>
                        </div>
                      </a>

                      <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Adresse</p>
                          <p className="text-sm text-muted-foreground">Ouagadougou, Burkina Faso</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mt-6 text-center">
                      En utilisant BurkE-Shop, vous acceptez cette politique de confidentialité.
                    </p>
                  </CardContent>
                </Card>
              </section>

            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
