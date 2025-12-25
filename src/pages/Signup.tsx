import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Store, Mail, Lock, ArrowRight, User, Sparkles, ShoppingBag, Rocket, Zap, CheckCircle2, Gift } from 'lucide-react';
import signup3dIllustration from '@/assets/signup-3d-illustration.png';
import { motion, AnimatePresence } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, x: 30, scale: 0.98 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -30, scale: 0.98 },
};

const pageTransition = {
  type: "tween" as const,
  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  duration: 0.4,
};
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [shopName, setShopName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    signup
  } = useApp();
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/dashboard', {
        replace: true
      });
    }
  }, [navigate]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    try {
      const success = await signup(email, password, name, shopName);
      if (success) {
        toast({
          title: "Inscription réussie",
          description: "Bienvenue ! Votre boutique a été créée"
        });
        navigate('/onboarding');
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du compte",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const benefits = [{
    icon: Zap,
    text: "Boutique en ligne en 5 minutes"
  }, {
    icon: Gift,
    text: "Gratuit pour démarrer"
  }, {
    icon: CheckCircle2,
    text: "Paiements mobiles intégrés"
  }];
  return <motion.div 
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    transition={pageTransition}
    className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-background text-foreground selection:bg-primary/30 selection:text-primary py-4 sm:py-6">
      
      {/* Background Layer with Floating Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/10 blur-[120px] rounded-full mix-blend-screen" />

        {/* Floating Elements - Hidden on very small screens */}
        <motion.div className="hidden sm:block absolute top-[8%] left-[8%] text-primary/20" animate={{
        y: [0, -20, 0],
        rotate: [-12, -7, -12],
        opacity: [0.2, 0.35, 0.2]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}>
          <Sparkles className="w-20 h-20 md:w-28 md:h-28 lg:w-40 lg:h-40 drop-shadow-[0_0_15px_hsl(var(--primary)/0.3)]" />
        </motion.div>

        <motion.div className="hidden sm:block absolute bottom-[15%] right-[8%] text-primary/15" animate={{
        y: [0, -15, 0],
        rotate: [12, 17, 12],
        opacity: [0.15, 0.3, 0.15]
      }} transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}>
          <ShoppingBag className="w-28 h-28 md:w-36 md:h-36 lg:w-56 lg:h-56 drop-shadow-[0_0_20px_hsl(var(--primary)/0.25)]" />
        </motion.div>

        <motion.div className="hidden md:block absolute top-[20%] right-[12%] text-primary/15" animate={{
        y: [0, -20, 0],
        rotate: [0, 10, 0],
        opacity: [0.15, 0.3, 0.15]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }}>
          <Rocket className="w-20 h-20 lg:w-28 lg:h-28 drop-shadow-[0_0_12px_hsl(var(--primary)/0.3)]" />
        </motion.div>

        <motion.div className="hidden md:block absolute bottom-[25%] left-[5%] text-primary/15" animate={{
        y: [0, -15, 0],
        rotate: [-5, 5, -5],
        opacity: [0.15, 0.28, 0.15]
      }} transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }}>
          <Store className="w-24 h-24 lg:w-32 lg:h-32 drop-shadow-[0_0_15px_hsl(var(--primary)/0.25)]" />
        </motion.div>
      </div>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-[1100px] mx-auto px-2 sm:px-4 lg:px-6 flex items-center">
        <motion.div className="w-full min-h-[500px] lg:min-h-[580px] rounded-2xl sm:rounded-[32px] overflow-hidden grid grid-cols-1 lg:grid-cols-12
            bg-card/70 backdrop-blur-xl border border-border/30 
            shadow-[0_0_0_1px_rgba(0,0,0,0.2),0_20px_60px_-10px_rgba(0,0,0,0.6)]" initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.5,
        ease: "easeOut"
      }}>
          
          {/* Left Column: Signup Form */}
          <div className="lg:col-span-6 flex flex-col justify-between p-4 sm:p-5 lg:p-6 xl:p-8 relative bg-secondary/20">
            
            {/* Header / Logo */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }}>
              <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
                  <Store className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                </div>
                <span className="text-foreground font-semibold tracking-tight text-base sm:text-lg">
                  Burkina<span className="text-primary">Shop</span>
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground tracking-tight leading-tight mb-1 sm:mb-2">
                Créez votre Boutique <br className="hidden xs:block" />
                <span className="text-primary">Gratuitement</span>
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Lancez votre commerce en ligne en quelques minutes.
              </p>
            </motion.div>

            {/* Form */}
            <motion.form className="space-y-2 sm:space-y-3 mt-3 sm:mt-4 mb-3 sm:mb-4" onSubmit={handleSubmit} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3
          }}>
              {/* Name & Shop Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                {/* Name */}
                <div className="space-y-1 sm:space-y-1.5">
                  <Label htmlFor="name" className="text-[10px] sm:text-xs font-medium text-muted-foreground ml-1">
                    Nom complet
                  </Label>
                  <div className="relative group">
                    <Input id="name" type="text" placeholder="Votre nom" value={name} onChange={e => setName(e.target.value)} required className="h-9 sm:h-11 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-secondary/40 border-border/30 text-foreground placeholder:text-muted-foreground/50 text-sm
                        focus:bg-secondary/60 focus:border-primary/50 focus:ring-4 focus:ring-primary/10
                        transition-all duration-300 pr-9 sm:pr-10" />
                    <div className="absolute inset-y-0 right-0 pr-2.5 sm:pr-3 flex items-center pointer-events-none">
                      <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Shop Name */}
                <div className="space-y-1 sm:space-y-1.5">
                  <Label htmlFor="shopName" className="text-[10px] sm:text-xs font-medium text-muted-foreground ml-1">
                    Nom de la boutique
                  </Label>
                  <div className="relative group">
                    <Input id="shopName" type="text" placeholder="Ma Belle Boutique" value={shopName} onChange={e => setShopName(e.target.value)} required className="h-9 sm:h-11 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-secondary/40 border-border/30 text-foreground placeholder:text-muted-foreground/50 text-sm
                        focus:bg-secondary/60 focus:border-primary/50 focus:ring-4 focus:ring-primary/10
                        transition-all duration-300 pr-9 sm:pr-10" />
                    <div className="absolute inset-y-0 right-0 pr-2.5 sm:pr-3 flex items-center pointer-events-none">
                      <Store className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1 sm:space-y-1.5">
                <Label htmlFor="email" className="text-[10px] sm:text-xs font-medium text-muted-foreground ml-1">
                  Adresse Email
                </Label>
                <div className="relative group">
                  <Input id="email" type="email" placeholder="votre@email.com" value={email} onChange={e => setEmail(e.target.value)} required className="h-9 sm:h-11 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-secondary/40 border-border/30 text-foreground placeholder:text-muted-foreground/50 text-sm
                      focus:bg-secondary/60 focus:border-primary/50 focus:ring-4 focus:ring-primary/10
                      transition-all duration-300 pr-9 sm:pr-10" />
                  <div className="absolute inset-y-0 right-0 pr-2.5 sm:pr-3 flex items-center pointer-events-none">
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                  </div>
                </div>
              </div>

              {/* Password Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                {/* Password */}
                <div className="space-y-1 sm:space-y-1.5">
                  <Label htmlFor="password" className="text-[10px] sm:text-xs font-medium text-muted-foreground ml-1">
                    Mot de passe
                  </Label>
                  <div className="relative group">
                    <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required className="h-9 sm:h-11 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-secondary/40 border-border/30 text-foreground placeholder:text-muted-foreground/50 text-sm
                        focus:bg-secondary/60 focus:border-primary/50 focus:ring-4 focus:ring-primary/10
                        transition-all duration-300 pr-9 sm:pr-10" />
                    <div className="absolute inset-y-0 right-0 pr-2.5 sm:pr-3 flex items-center pointer-events-none">
                      <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1 sm:space-y-1.5">
                  <Label htmlFor="confirmPassword" className="text-[10px] sm:text-xs font-medium text-muted-foreground ml-1">
                    Confirmer
                  </Label>
                  <div className="relative group">
                    <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="h-9 sm:h-11 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-secondary/40 border-border/30 text-foreground placeholder:text-muted-foreground/50 text-sm
                        focus:bg-secondary/60 focus:border-primary/50 focus:ring-4 focus:ring-primary/10
                        transition-all duration-300 pr-9 sm:pr-10" />
                    <div className="absolute inset-y-0 right-0 pr-2.5 sm:pr-3 flex items-center pointer-events-none">
                      <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={isLoading} className="group w-full h-10 sm:h-12 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground
                  transition-all duration-300 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.4)] 
                  hover:shadow-[0_0_25px_-5px_hsl(var(--primary)/0.6)] hover:-translate-y-0.5 mt-1 sm:mt-2">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Créer ma Boutique
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
              </Button>

              <p className="text-[9px] sm:text-xs text-center pt-0.5 sm:pt-1 text-popover-foreground">
                En vous inscrivant, vous acceptez nos conditions d'utilisation
              </p>
            </motion.form>

            {/* Footer */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }}>
              <div className="relative mb-2 sm:mb-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-[9px] sm:text-[10px] uppercase tracking-wider">
                  <span className="px-2 sm:px-3 bg-primary-foreground text-accent">Déjà inscrit ?</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-center text-muted-foreground">
                <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Se connecter à mon compte
                </Link>
              </p>
            </motion.div>
          </div>

          {/* Right Column: Visuals */}
          <div className="hidden lg:flex lg:col-span-6 relative bg-black/50 min-h-[580px] overflow-hidden">
            
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />
            
            {/* 3D Illustration */}
            <motion.img 
              src={signup3dIllustration} 
              alt="E-commerce 3D Illustration" 
              className="absolute inset-0 w-full h-full object-cover" 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            
            {/* Overlay Gradient Tone */}
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />

            {/* Floating Benefits Card */}
            <motion.div className="absolute top-10 right-10 z-20" initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.6
          }}>
              <div className="bg-card/70 backdrop-blur-xl border border-border/30 p-5 rounded-2xl shadow-xl max-w-[280px]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Avantages</p>
                </div>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => <motion.div key={index} className="flex items-center gap-3" initial={{
                  opacity: 0,
                  x: 20
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: 0.7 + index * 0.1
                }}>
                      <benefit.icon className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{benefit.text}</span>
                    </motion.div>)}
                </div>
              </div>
            </motion.div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-10 z-20 bg-gradient-to-t from-background via-background/80 to-transparent">
              <motion.div className="max-w-md" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.7
            }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                    <Rocket className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-primary font-semibold tracking-wider">Prêt à vendre ?</p>
                    <p className="text-lg font-bold text-foreground tracking-tight">500+ boutiques créées</p>
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-foreground tracking-tight mb-2">
                  Lancez votre business en ligne aujourd'hui.
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Rejoignez des centaines de vendeurs burkinabè qui utilisent BurkinaShop 
                  pour développer leur commerce avec les paiements mobiles.
                </p>
              </motion.div>
            </div>
          </div>

        </motion.div>
      </main>
    </motion.div>;
};
export default Signup;