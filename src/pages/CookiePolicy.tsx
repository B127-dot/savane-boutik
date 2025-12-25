import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Cookie,
  Shield,
  Settings,
  Eye,
  BarChart3,
  Target,
  Clock,
  ToggleLeft,
  Mail,
  MessageCircle,
  MapPin,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
  Globe,
  Smartphone,
  Info,
  AlertCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";

const CookiePolicy = () => {
  const lastUpdated = "25 Décembre 2025";
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    analytics: true,
    preferences: true,
    marketing: false,
  });

  const tableOfContents = [
    { id: "introduction", label: "Introduction", icon: Globe },
    { id: "definition", label: "Qu'est-ce qu'un Cookie ?", icon: Cookie },
    { id: "types", label: "Types de Cookies", icon: Settings },
    { id: "utilisation", label: "Comment nous les utilisons", icon: Eye },
    { id: "tiers", label: "Cookies Tiers", icon: Target },
    { id: "duree", label: "Durée de Conservation", icon: Clock },
    { id: "gestion", label: "Gérer vos Préférences", icon: ToggleLeft },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const cookieTypes = [
    {
      id: "essential",
      name: "Cookies Essentiels",
      icon: Shield,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      required: true,
      description: "Indispensables au fonctionnement de la plateforme. Ils permettent la navigation, la sécurité et l'accès aux fonctionnalités de base.",
      examples: ["Authentification et session", "Panier d'achat", "Sécurité anti-fraude", "Préférences de langue"],
    },
    {
      id: "analytics",
      name: "Cookies d'Analyse",
      icon: BarChart3,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      required: false,
      description: "Nous aident à comprendre comment les visiteurs interagissent avec notre plateforme pour améliorer nos services.",
      examples: ["Pages les plus visitées", "Temps passé sur le site", "Taux de conversion", "Parcours utilisateur"],
    },
    {
      id: "preferences",
      name: "Cookies de Préférences",
      icon: Settings,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      required: false,
      description: "Permettent de mémoriser vos choix et préférences pour personnaliser votre expérience.",
      examples: ["Thème sombre/clair", "Dernière boutique visitée", "Produits consultés récemment", "Filtres de recherche"],
    },
    {
      id: "marketing",
      name: "Cookies Marketing",
      icon: Target,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      required: false,
      description: "Utilisés pour vous proposer des publicités pertinentes et mesurer l'efficacité de nos campagnes.",
      examples: ["Publicités personnalisées", "Retargeting", "Mesure des conversions", "Réseaux sociaux"],
    },
  ];

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
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Cookie className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-500">Transparence</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Politique de{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent">
                Cookies
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Découvrez comment BurkE-Shop utilise les cookies pour améliorer votre expérience et protéger votre vie privée.
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
                    Cette Politique de Cookies explique comment <strong className="text-foreground">BurkE-Shop</strong> utilise les cookies et technologies similaires lorsque vous visitez notre plateforme. Elle vous informe sur vos droits et choix concernant l'utilisation de ces technologies.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Nous croyons en la transparence totale. C'est pourquoi nous vous expliquons clairement quels cookies nous utilisons, pourquoi nous les utilisons, et comment vous pouvez contrôler vos préférences.
                  </p>
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4 flex items-start gap-3">
                      <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        En continuant à utiliser BurkE-Shop, vous acceptez l'utilisation des cookies conformément à cette politique. Vous pouvez modifier vos préférences à tout moment.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Définition */}
              <section id="definition" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <Cookie className="w-5 h-5 text-amber-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Qu'est-ce qu'un Cookie ?</h2>
                </div>

                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-6">
                      Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, smartphone, tablette) lorsque vous visitez un site web. Les cookies permettent au site de se souvenir de vos actions et préférences sur une période de temps.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-background/50 border border-border/30">
                        <div className="flex items-center gap-3 mb-3">
                          <Smartphone className="w-5 h-5 text-primary" />
                          <h4 className="font-semibold text-foreground">Stockage Local</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Les cookies sont stockés localement sur votre appareil et peuvent être consultés ou supprimés via les paramètres de votre navigateur.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-background/50 border border-border/30">
                        <div className="flex items-center gap-3 mb-3">
                          <Shield className="w-5 h-5 text-green-500" />
                          <h4 className="font-semibold text-foreground">Sécurisés</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Les cookies ne peuvent pas accéder à d'autres informations sur votre appareil et ne contiennent pas de virus.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Types de Cookies */}
              <section id="types" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Types de Cookies que nous utilisons</h2>
                </div>

                <div className="space-y-4">
                  {cookieTypes.map((cookie) => (
                    <Card key={cookie.id} className={`${cookie.bgColor} ${cookie.borderColor} border`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl ${cookie.bgColor} flex items-center justify-center`}>
                              <cookie.icon className={`w-5 h-5 ${cookie.color}`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{cookie.name}</h3>
                              {cookie.required && (
                                <Badge variant="outline" className="mt-1 text-xs border-green-500/30 text-green-400">
                                  Toujours actif
                                </Badge>
                              )}
                            </div>
                          </div>
                          {!cookie.required && (
                            <Switch
                              checked={cookiePreferences[cookie.id as keyof typeof cookiePreferences]}
                              onCheckedChange={(checked) => 
                                setCookiePreferences(prev => ({ ...prev, [cookie.id]: checked }))
                              }
                            />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{cookie.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {cookie.examples.map((example, index) => (
                            <span 
                              key={index}
                              className="text-xs px-2 py-1 rounded-full bg-background/50 text-muted-foreground"
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Comment nous les utilisons */}
              <section id="utilisation" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-purple-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Comment nous utilisons les Cookies</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: Shield, title: "Sécurité", desc: "Protéger votre compte contre les accès non autorisés et la fraude" },
                    { icon: Settings, title: "Personnalisation", desc: "Mémoriser vos préférences pour une expérience sur mesure" },
                    { icon: BarChart3, title: "Analyse", desc: "Comprendre comment vous utilisez notre plateforme pour l'améliorer" },
                    { icon: Globe, title: "Performance", desc: "Optimiser la vitesse et la fiabilité de notre site" },
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

              {/* Cookies Tiers */}
              <section id="tiers" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Cookies Tiers</h2>
                </div>

                <Card className="bg-card/50 border-border/50 mb-4">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-6">
                      Nous travaillons avec des partenaires de confiance qui peuvent placer des cookies sur votre appareil. Ces cookies tiers nous aident à améliorer nos services :
                    </p>

                    <div className="space-y-4">
                      {[
                        { 
                          name: "Google Analytics", 
                          purpose: "Analyse du trafic et comportement utilisateur",
                          privacy: "https://policies.google.com/privacy"
                        },
                        { 
                          name: "Facebook Pixel", 
                          purpose: "Mesure des campagnes publicitaires (si marketing activé)",
                          privacy: "https://www.facebook.com/privacy/explanation"
                        },
                        { 
                          name: "WhatsApp Business", 
                          purpose: "Intégration des boutons de contact WhatsApp",
                          privacy: "https://www.whatsapp.com/legal/privacy-policy"
                        },
                      ].map((partner) => (
                        <div key={partner.name} className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/30">
                          <div>
                            <p className="font-medium text-foreground">{partner.name}</p>
                            <p className="text-sm text-muted-foreground">{partner.purpose}</p>
                          </div>
                          <a 
                            href={partner.privacy}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            Politique
                          </a>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-amber-500/10 border-amber-500/20">
                  <CardContent className="p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Nous sélectionnons soigneusement nos partenaires et nous nous assurons qu'ils respectent des standards élevés de protection des données.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Durée de Conservation */}
              <section id="duree" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-cyan-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Durée de Conservation</h2>
                </div>

                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-6">
                      La durée de conservation des cookies varie selon leur type et leur fonction :
                    </p>

                    <div className="space-y-4">
                      {[
                        { type: "Cookies de session", duration: "Supprimés à la fermeture du navigateur", desc: "Authentification, panier temporaire" },
                        { type: "Cookies persistants", duration: "1 à 12 mois", desc: "Préférences, langue, thème" },
                        { type: "Cookies d'analyse", duration: "26 mois maximum", desc: "Statistiques de visite" },
                        { type: "Cookies marketing", duration: "12 mois maximum", desc: "Publicités ciblées" },
                      ].map((item) => (
                        <div key={item.type} className="flex items-center justify-between py-3 border-b border-border/30 last:border-0">
                          <div>
                            <p className="font-medium text-foreground">{item.type}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                          <span className="text-sm font-medium text-primary">{item.duration}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Gérer vos Préférences */}
              <section id="gestion" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <ToggleLeft className="w-5 h-5 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Gérer vos Préférences</h2>
                </div>

                <div className="space-y-6">
                  {/* Cookie Preferences Card */}
                  <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Vos préférences actuelles</h3>
                      <div className="space-y-4">
                        {cookieTypes.map((cookie) => (
                          <div key={cookie.id} className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                              <cookie.icon className={`w-5 h-5 ${cookie.color}`} />
                              <span className="text-sm text-foreground">{cookie.name}</span>
                              {cookie.required && (
                                <Badge variant="outline" className="text-xs">Requis</Badge>
                              )}
                            </div>
                            <Switch
                              checked={cookiePreferences[cookie.id as keyof typeof cookiePreferences]}
                              onCheckedChange={(checked) => 
                                setCookiePreferences(prev => ({ ...prev, [cookie.id]: checked }))
                              }
                              disabled={cookie.required}
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-4">
                        Ces préférences sont sauvegardées localement sur votre appareil.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Browser Settings */}
                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Via les paramètres de votre navigateur</h3>
                      <p className="text-muted-foreground mb-4">
                        Vous pouvez également gérer les cookies directement depuis votre navigateur :
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          { name: "Google Chrome", url: "chrome://settings/cookies" },
                          { name: "Mozilla Firefox", url: "about:preferences#privacy" },
                          { name: "Safari", url: "Préférences > Confidentialité" },
                          { name: "Microsoft Edge", url: "edge://settings/privacy" },
                        ].map((browser) => (
                          <div key={browser.name} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/30">
                            <span className="text-sm font-medium text-foreground">{browser.name}</span>
                            <span className="text-xs text-muted-foreground">{browser.url}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        <strong className="text-foreground">Note :</strong> Bloquer tous les cookies peut affecter le fonctionnement de certaines fonctionnalités de BurkE-Shop.
                      </p>
                    </CardContent>
                  </Card>
                </div>
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
                      Si vous avez des questions concernant cette Politique de Cookies ou l'utilisation de vos données, contactez-nous :
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
                      En utilisant BurkE-Shop, vous acceptez cette Politique de Cookies.
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

export default CookiePolicy;
