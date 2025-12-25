import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Scale, 
  Users, 
  ShoppingCart, 
  CreditCard, 
  Shield, 
  AlertTriangle,
  Ban,
  Gavel,
  Mail,
  MessageCircle,
  MapPin,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
  Globe,
  Store,
  Package,
  Truck,
  RefreshCcw,
  XCircle,
  Clock,
  UserCheck
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  const lastUpdated = "25 Décembre 2025";

  const tableOfContents = [
    { id: "introduction", label: "Introduction", icon: Globe },
    { id: "definitions", label: "Définitions", icon: FileText },
    { id: "inscription", label: "Inscription & Compte", icon: UserCheck },
    { id: "vendeurs", label: "Obligations des Vendeurs", icon: Store },
    { id: "acheteurs", label: "Obligations des Acheteurs", icon: ShoppingCart },
    { id: "commandes", label: "Commandes & Paiements", icon: CreditCard },
    { id: "livraison", label: "Livraison", icon: Truck },
    { id: "retours", label: "Retours & Remboursements", icon: RefreshCcw },
    { id: "propriete", label: "Propriété Intellectuelle", icon: Shield },
    { id: "restrictions", label: "Restrictions d'Usage", icon: Ban },
    { id: "responsabilite", label: "Limitation de Responsabilité", icon: AlertTriangle },
    { id: "resiliation", label: "Résiliation", icon: XCircle },
    { id: "litiges", label: "Règlement des Litiges", icon: Gavel },
    { id: "modifications", label: "Modifications", icon: Clock },
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
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Scale className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-500">Cadre Juridique</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Conditions Générales{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                d'Utilisation
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Les règles qui régissent l'utilisation de BurkE-Shop pour les vendeurs et les acheteurs. Lisez attentivement avant d'utiliser notre plateforme.
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
                    Les présentes Conditions Générales d'Utilisation (ci-après "CGU") régissent l'accès et l'utilisation de la plateforme <strong className="text-foreground">BurkE-Shop</strong>, opérée par <strong className="text-foreground">Openweb</strong>, société basée à Ouagadougou, Burkina Faso.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    BurkE-Shop est une plateforme de commerce électronique permettant aux vendeurs burkinabè de créer leur boutique en ligne et aux acheteurs d'effectuer des achats en toute simplicité.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    En accédant à notre plateforme ou en utilisant nos services, vous acceptez d'être lié par ces CGU. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser BurkE-Shop.
                  </p>
                  <Card className="bg-amber-500/10 border-amber-500/20">
                    <CardContent className="p-4">
                      <p className="text-sm text-amber-200">
                        <strong>Important :</strong> Ces CGU constituent un contrat juridiquement contraignant entre vous et BurkE-Shop. Nous vous recommandons de les lire attentivement.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Définitions */}
              <section id="definitions" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Définitions</h2>
                </div>

                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {[
                        { term: "Plateforme", def: "Le site web et l'application mobile BurkE-Shop, ainsi que tous les services associés." },
                        { term: "Vendeur", def: "Toute personne physique ou morale inscrite sur BurkE-Shop pour vendre des produits via sa boutique en ligne." },
                        { term: "Acheteur", def: "Toute personne physique ou morale qui effectue un achat sur une boutique hébergée par BurkE-Shop." },
                        { term: "Boutique", def: "L'espace de vente en ligne créé par un Vendeur sur la Plateforme." },
                        { term: "Commande", def: "L'acte par lequel un Acheteur achète un ou plusieurs produits auprès d'un Vendeur." },
                        { term: "Services", def: "L'ensemble des fonctionnalités offertes par BurkE-Shop aux Vendeurs et Acheteurs." },
                        { term: "Contenu", def: "Tout texte, image, vidéo, logo ou autre élément publié sur la Plateforme." },
                      ].map((item) => (
                        <div key={item.term} className="flex items-start gap-3 pb-4 border-b border-border/30 last:border-0 last:pb-0">
                          <span className="text-sm font-semibold text-primary min-w-[120px]">{item.term}</span>
                          <span className="text-sm text-muted-foreground">{item.def}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Inscription & Compte */}
              <section id="inscription" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Inscription et Compte</h2>
                </div>

                <div className="space-y-6">
                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Conditions d'inscription</h3>
                      <ul className="space-y-3">
                        {[
                          "Avoir au moins 18 ans ou être émancipé légalement",
                          "Fournir des informations exactes et complètes lors de l'inscription",
                          "Disposer d'un numéro de téléphone valide (pour les communications WhatsApp)",
                          "Accepter les présentes CGU et notre Politique de Confidentialité",
                          "Pour les vendeurs : disposer d'une activité commerciale légale au Burkina Faso",
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Responsabilité du compte</h3>
                      <p className="text-muted-foreground mb-4">
                        Vous êtes responsable de la confidentialité de vos identifiants de connexion et de toutes les activités effectuées depuis votre compte. En cas d'utilisation non autorisée, vous devez nous en informer immédiatement à <a href="mailto:contact@burkeshop.bf" className="text-primary hover:underline">contact@burkeshop.bf</a>.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        BurkE-Shop se réserve le droit de suspendre ou supprimer tout compte en cas de violation des présentes CGU.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Obligations des Vendeurs */}
              <section id="vendeurs" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Store className="w-5 h-5 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Obligations des Vendeurs</h2>
                </div>

                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    En tant que Vendeur sur BurkE-Shop, vous vous engagez à :
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { title: "Produits légaux", desc: "Ne vendre que des produits légaux au Burkina Faso et conformes aux réglementations en vigueur" },
                      { title: "Descriptions exactes", desc: "Fournir des descriptions précises, photos authentiques et prix corrects pour vos produits" },
                      { title: "Stock à jour", desc: "Maintenir votre inventaire à jour et ne pas vendre de produits indisponibles" },
                      { title: "Honorer les commandes", desc: "Traiter et expédier les commandes dans les délais annoncés" },
                      { title: "Service client", desc: "Répondre aux questions des acheteurs dans un délai raisonnable (24-48h)" },
                      { title: "Respect des prix", desc: "Honorer les prix affichés au moment de la commande" },
                    ].map((item) => (
                      <Card key={item.title} className="bg-card/50 border-border/50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className="bg-red-500/10 border-red-500/20 mt-4">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-red-400 mb-2">Produits interdits</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Les produits suivants sont strictement interdits sur BurkE-Shop :
                      </p>
                      <div className="grid md:grid-cols-2 gap-2">
                        {[
                          "Drogues et substances illicites",
                          "Armes et munitions",
                          "Produits contrefaits",
                          "Contenus pour adultes",
                          "Médicaments sans autorisation",
                          "Produits volés",
                          "Animaux protégés",
                          "Données personnelles",
                        ].map((item) => (
                          <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <XCircle className="w-3 h-3 text-red-400" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Obligations des Acheteurs */}
              <section id="acheteurs" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-cyan-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Obligations des Acheteurs</h2>
                </div>

                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">
                      En tant qu'Acheteur sur BurkE-Shop, vous vous engagez à :
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Fournir des informations de contact et de livraison exactes",
                        "Effectuer le paiement des commandes selon les modalités convenues",
                        "Être disponible pour réceptionner vos commandes à l'adresse indiquée",
                        "Communiquer de manière respectueuse avec les vendeurs",
                        "Signaler tout problème dans un délai raisonnable (7 jours après réception)",
                        "Ne pas effectuer de fausses commandes ou de commandes frauduleuses",
                        "Respecter les politiques de retour spécifiques de chaque vendeur",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </section>

              {/* Commandes & Paiements */}
              <section id="commandes" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-amber-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Commandes et Paiements</h2>
                </div>

                <div className="space-y-6">
                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Processus de commande</h3>
                      <ol className="space-y-3">
                        {[
                          "Sélection des produits et ajout au panier",
                          "Validation du panier et saisie des informations de livraison",
                          "Choix du mode de paiement (Orange Money, Moov Money, ou paiement à la livraison)",
                          "Confirmation de la commande via WhatsApp avec le vendeur",
                          "Traitement et expédition par le vendeur",
                          "Livraison et réception par l'acheteur",
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center flex-shrink-0">
                              {index + 1}
                            </span>
                            {item}
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Moyens de paiement acceptés</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {[
                          { name: "Orange Money", desc: "Paiement mobile sécurisé" },
                          { name: "Moov Money", desc: "Transfert mobile instantané" },
                          { name: "Paiement à la livraison", desc: "En espèces à la réception" },
                        ].map((item) => (
                          <div key={item.name} className="p-4 rounded-xl bg-background/50 border border-border/30 text-center">
                            <p className="font-medium text-foreground">{item.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        Les frais de transaction mobile sont à la charge de l'acheteur sauf indication contraire du vendeur.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Livraison */}
              <section id="livraison" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-indigo-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Livraison</h2>
                </div>

                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">
                      La livraison est organisée directement entre le vendeur et l'acheteur. BurkE-Shop facilite la mise en relation mais n'est pas responsable de la livraison elle-même.
                    </p>
                    <div className="space-y-4">
                      {[
                        { title: "Délais", desc: "Les délais de livraison sont indicatifs et dépendent de chaque vendeur. Ils sont généralement de 24h à 72h pour Ouagadougou et 3-7 jours pour les autres villes." },
                        { title: "Frais", desc: "Les frais de livraison sont fixés par chaque vendeur et clairement indiqués avant la validation de la commande." },
                        { title: "Zones", desc: "La couverture de livraison dépend de chaque vendeur. Vérifiez la disponibilité pour votre zone avant de commander." },
                        { title: "Réception", desc: "L'acheteur doit vérifier l'état du colis à la réception et signaler immédiatement tout dommage." },
                      ].map((item) => (
                        <div key={item.title} className="pb-4 border-b border-border/30 last:border-0 last:pb-0">
                          <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Retours & Remboursements */}
              <section id="retours" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                    <RefreshCcw className="w-5 h-5 text-rose-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Retours et Remboursements</h2>
                </div>

                <div className="space-y-4">
                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Politique générale</h3>
                      <p className="text-muted-foreground mb-4">
                        Chaque vendeur définit sa propre politique de retours et remboursements. Consultez les conditions spécifiques de chaque boutique avant d'acheter.
                      </p>
                      <p className="text-muted-foreground">
                        En l'absence de politique spécifique, les règles suivantes s'appliquent :
                      </p>
                    </CardContent>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-green-500/10 border-green-500/20">
                      <CardContent className="p-5">
                        <h4 className="font-semibold text-green-400 mb-3">Retours acceptés</h4>
                        <ul className="space-y-2">
                          {[
                            "Produit non conforme à la description",
                            "Produit défectueux ou endommagé",
                            "Erreur de commande (mauvais produit envoyé)",
                            "Produit contrefait",
                          ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-red-500/10 border-red-500/20">
                      <CardContent className="p-5">
                        <h4 className="font-semibold text-red-400 mb-3">Retours refusés</h4>
                        <ul className="space-y-2">
                          {[
                            "Changement d'avis sans motif valable",
                            "Produit utilisé ou endommagé par l'acheteur",
                            "Délai de signalement dépassé (>7 jours)",
                            "Produits personnalisés sur demande",
                          ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </section>

              {/* Propriété Intellectuelle */}
              <section id="propriete" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-violet-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Propriété Intellectuelle</h2>
                </div>

                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Contenu de BurkE-Shop</h4>
                        <p className="text-sm text-muted-foreground">
                          La marque BurkE-Shop, le logo, le design du site et tous les contenus produits par BurkE-Shop sont protégés par le droit d'auteur et les lois sur la propriété intellectuelle. Toute reproduction non autorisée est interdite.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Contenu des Vendeurs</h4>
                        <p className="text-sm text-muted-foreground">
                          Les vendeurs conservent la propriété de leur contenu (photos, descriptions, logos). En publiant sur BurkE-Shop, ils nous accordent une licence non exclusive pour afficher ce contenu sur notre plateforme.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Signalement de violation</h4>
                        <p className="text-sm text-muted-foreground">
                          Si vous constatez une violation de vos droits de propriété intellectuelle, contactez-nous à <a href="mailto:contact@burkeshop.bf" className="text-primary hover:underline">contact@burkeshop.bf</a>.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Restrictions d'Usage */}
              <section id="restrictions" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <Ban className="w-5 h-5 text-red-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Restrictions d'Usage</h2>
                </div>

                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">
                      Il est strictement interdit de :
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        "Utiliser la plateforme à des fins illégales",
                        "Publier du contenu offensant, diffamatoire ou discriminatoire",
                        "Tenter de pirater ou compromettre la sécurité du site",
                        "Collecter les données des autres utilisateurs sans autorisation",
                        "Créer plusieurs comptes pour contourner une suspension",
                        "Manipuler les avis ou évaluations",
                        "Spammer les vendeurs ou acheteurs",
                        "Utiliser des bots ou scripts automatisés",
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Ban className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Limitation de Responsabilité */}
              <section id="responsabilite" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Limitation de Responsabilité</h2>
                </div>

                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">
                      BurkE-Shop agit en tant qu'intermédiaire technique entre vendeurs et acheteurs. En conséquence :
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Nous ne sommes pas responsables de la qualité des produits vendus par les vendeurs",
                        "Nous ne garantissons pas les délais de livraison annoncés par les vendeurs",
                        "Nous ne sommes pas partie aux transactions entre vendeurs et acheteurs",
                        "Nous ne sommes pas responsables des litiges commerciaux entre utilisateurs",
                        "Nous ne garantissons pas la disponibilité continue de la plateforme",
                        "Notre responsabilité est limitée au montant de l'abonnement payé par le vendeur",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ChevronRight className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </section>

              {/* Résiliation */}
              <section id="resiliation" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gray-500/10 flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-gray-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Résiliation</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-3">Par l'utilisateur</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Vous pouvez supprimer votre compte à tout moment en nous contactant. Pour les vendeurs :
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Honorez toutes les commandes en cours",
                          "Les abonnements payés ne sont pas remboursables",
                          "Vos données seront supprimées sous 30 jours",
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ChevronRight className="w-3 h-3 text-primary mt-1" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-3">Par BurkE-Shop</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Nous pouvons suspendre ou supprimer votre compte en cas de :
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Violation des présentes CGU",
                          "Activité frauduleuse ou illégale",
                          "Plaintes répétées des autres utilisateurs",
                          "Non-paiement de l'abonnement (vendeurs)",
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ChevronRight className="w-3 h-3 text-red-400 mt-1" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Règlement des Litiges */}
              <section id="litiges" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Gavel className="w-5 h-5 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Règlement des Litiges</h2>
                </div>

                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Médiation</h4>
                        <p className="text-sm text-muted-foreground">
                          En cas de litige entre un vendeur et un acheteur, nous encourageons d'abord une résolution à l'amiable. BurkE-Shop peut intervenir comme médiateur si les deux parties le souhaitent.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Juridiction compétente</h4>
                        <p className="text-sm text-muted-foreground">
                          Les présentes CGU sont régies par le droit burkinabè. Tout litige relatif à l'interprétation ou l'exécution de ces CGU sera soumis aux tribunaux compétents de Ouagadougou, Burkina Faso.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Signalement</h4>
                        <p className="text-sm text-muted-foreground">
                          Pour signaler un problème ou un litige, contactez-nous à <a href="mailto:contact@burkeshop.bf" className="text-primary hover:underline">contact@burkeshop.bf</a>. Nous nous engageons à répondre sous 48 heures ouvrées.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Modifications */}
              <section id="modifications" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-teal-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Modifications des CGU</h2>
                </div>

                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">
                      BurkE-Shop se réserve le droit de modifier ces CGU à tout moment. La version en vigueur est celle publiée sur cette page avec la date de dernière mise à jour.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Pour les modifications significatives, nous vous informerons par email et/ou notification sur la plateforme au moins 15 jours avant leur entrée en vigueur.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      En continuant à utiliser BurkE-Shop après l'entrée en vigueur des modifications, vous acceptez les nouvelles CGU.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Contact */}
              <section id="contact" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Nous Contacter</h2>
                </div>

                <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-6">
                      Pour toute question concernant ces Conditions Générales d'Utilisation, contactez-nous :
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
                      En utilisant BurkE-Shop, vous acceptez ces Conditions Générales d'Utilisation.
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

export default TermsOfService;
