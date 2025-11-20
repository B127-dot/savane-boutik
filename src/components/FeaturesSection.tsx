import { 
  Store, 
  Smartphone, 
  CreditCard, 
  MessageCircle, 
  BarChart3,
  Palette,
  Users,
  Shield,
  ArrowRight,
  TrendingUp,
  ShoppingBag,
  Package
} from "lucide-react";
import { AnimatedGroup } from "@/components/ui/animated-group";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 sm:py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <AnimatedGroup preset="fade" className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Column - Animated Mockup */}
          <div className="relative order-2 lg:order-1">
            <div 
              className="relative rounded-[36px] p-5 bg-gradient-to-br from-primary/5 via-background to-background border border-border/50 shadow-2xl"
              style={{
                maskImage: 'linear-gradient(130deg, transparent, black 10%, black 70%, transparent)',
                WebkitMaskImage: 'linear-gradient(130deg, transparent, black 10%, black 70%, transparent)'
              }}
            >
              <article className="group relative overflow-hidden transition-shadow hover:shadow-lg bg-background/70 border-border/50 border rounded-3xl shadow-xl backdrop-blur-xl">
                <div className="p-6 sm:p-10">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                      Tableau de Bord BurkinaShop
                    </h3>
                    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-card border border-border rounded-full px-3 py-1 backdrop-blur-sm">
                      <TrendingUp className="text-primary w-4 h-4" />
                      En Temps Réel
                    </span>
                  </div>

                  {/* Illustration Container */}
                  <div className="relative h-56 sm:h-64 rounded-2xl bg-gradient-to-b from-card/50 to-card ring-1 ring-inset ring-border/50 mb-8 backdrop-blur-sm overflow-hidden">
                    {/* Main Dashboard Window */}
                    <div className="absolute right-3 sm:right-6 top-4 sm:top-6 w-[78%] h-[68%] rounded-2xl bg-card/90 backdrop-blur border border-border shadow-sm">
                      {/* Window Header */}
                      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-destructive/70"></div>
                            <div className="w-2 h-2 rounded-full bg-warning/70"></div>
                            <div className="w-2 h-2 rounded-full bg-success/70"></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] sm:text-xs tracking-tight text-muted-foreground">Dashboard</span>
                        </div>
                      </div>
                      
                      {/* Dashboard Content */}
                      <div className="p-3 space-y-2">
                        {/* Revenue Card - Highlighted */}
                        <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-2 py-1.5">
                          <div className="w-3 h-3 bg-primary rounded flex items-center justify-center">
                            <TrendingUp className="w-2 h-2 text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="h-1.5 w-20 bg-primary/40 rounded"></div>
                          </div>
                          <div className="text-[10px] text-primary font-semibold">+23%</div>
                        </div>
                        
                        {/* Other Stats */}
                        <div className="flex items-center gap-2 bg-card/50 border border-border rounded-lg px-2 py-1.5">
                          <div className="w-3 h-3 bg-muted rounded"></div>
                          <div className="flex-1">
                            <div className="h-1.5 w-16 bg-muted rounded"></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 bg-card/50 border border-border rounded-lg px-2 py-1.5">
                          <div className="w-3 h-3 bg-muted rounded"></div>
                          <div className="flex-1">
                            <div className="h-1.5 w-24 bg-muted rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Shop Preview */}
                    <div className="absolute left-6 sm:left-12 bottom-10 sm:bottom-12 w-[62%] h-[52%] rounded-2xl bg-card/90 backdrop-blur border border-border shadow-sm">
                      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
                        <span className="text-[10px] sm:text-xs tracking-widest text-muted-foreground">BOUTIQUE MOBILE</span>
                      </div>
                      <div className="p-2 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs bg-warning/10 border border-warning/20 rounded px-2 py-1">
                          <div className="w-2 h-2 bg-warning rounded-full"></div>
                          <span className="text-foreground">Orange Money</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs bg-blue-500/10 border border-blue-500/20 rounded px-2 py-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-foreground">Moov Money</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs bg-success/10 border border-success/20 rounded px-2 py-1">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          <span className="text-foreground">À la livraison</span>
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp Panel */}
                    <div className="absolute left-3 sm:left-6 bottom-3 sm:bottom-4 w-[38%] h-[44%] rounded-2xl bg-card/90 backdrop-blur border border-border shadow-sm">
                      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
                        <span className="text-[10px] sm:text-xs tracking-widest text-muted-foreground">WHATSAPP</span>
                      </div>
                      <div className="p-2 space-y-2">
                        <div className="flex items-center gap-1.5">
                          <MessageCircle className="w-3 h-3 text-primary" />
                          <div className="h-1 w-12 bg-primary/40 rounded"></div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <ShoppingBag className="w-3 h-3 text-muted-foreground" />
                          <div className="h-1 w-10 bg-muted rounded"></div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Package className="w-3 h-3 text-muted-foreground" />
                          <div className="h-1 w-14 bg-muted rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 mb-8 gap-x-6 gap-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground tracking-tight">Gestion Simplifiée</h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Tableau de bord intuitif avec toutes vos données en un coup d'œil.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold tracking-tight text-foreground">Paiements Intégrés</h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Orange Money, Moov Money et paiement à la livraison natifs.
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
                    >
                      Explorer toutes les fonctionnalités
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="order-1 lg:order-2">
            <div className="space-y-8 flex flex-col items-center lg:items-center">
              {/* Header */}
              <div className="inline-flex items-center px-4 py-2 bg-card rounded-full border border-border">
                <span className="text-sm text-muted-foreground">
                  ✨ Fonctionnalités pensées pour vous
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-medium text-foreground tracking-tight transition-colors duration-500 text-center lg:text-center max-w-3xl">
                Tout ce dont vous avez besoin pour{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  vendre en ligne
                </span>
              </h2>

              {/* Core Features */}
              <div className="border-t border-border pt-6 w-full max-w-2xl">
                <h4 className="text-lg font-semibold text-foreground mb-4 text-center lg:text-center">Fonctionnalités Principales</h4>
                <div className="space-y-4">
                  {/* Feature 1 */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Store className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground">Boutique Clé en Main</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        Créez votre boutique en ligne en 5 minutes avec des templates adaptés au marché burkinabé.
                      </p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Smartphone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground">100% Mobile Optimisé</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        Interface parfaitement optimisée pour mobile. Vos clients commandent facilement depuis leur téléphone.
                      </p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <CreditCard className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground">Paiements Locaux</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        Orange Money, Moov Money et paiement à la livraison intégrés nativement dans votre boutique.
                      </p>
                    </div>
                  </div>

                  {/* Feature 4 */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <MessageCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground">Vente WhatsApp Intégrée</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        Synchronisez vos produits avec WhatsApp Business et vendez directement dans vos discussions.
                      </p>
                    </div>
                  </div>

                  {/* Feature 5 */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <BarChart3 className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground">Tableau de Bord Analytics</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        Suivez vos ventes, stock et clients en temps réel avec des analytics simples et efficaces.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="border-t border-border pt-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex gap-3 hover:scale-105 transition-transform duration-200 cursor-pointer">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-medium text-foreground">500+</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Vendeurs actifs au Burkina</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-200 cursor-pointer">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-medium text-foreground">24h</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Livraison moyenne à Ouaga</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Features */}
              <div className="border-t border-border pt-6">
                <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                  Et plus encore...
                </h4>
                <div className="flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg text-sm">
                    <Palette className="w-4 h-4 text-primary" />
                    <span className="text-foreground">Personnalisation</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-foreground">Gestion clients</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg text-sm">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-foreground">Sécurité garantie</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="border-t border-border pt-6">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 h-10 hover:bg-primary/90 transition text-sm font-normal text-primary-foreground bg-primary rounded-full px-6 shadow-glow"
                >
                  Commencer gratuitement
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </AnimatedGroup>
      </div>
    </section>
  );
};

export default FeaturesSection;
