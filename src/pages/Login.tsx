import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Store, Mail, Lock, ArrowRight, ShoppingCart, Package, Coins, Tag, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    login
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
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans votre dashboard"
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      
      {/* Background Layer with Floating Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Deep Radial Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-black" />
        
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/10 blur-[120px] rounded-full mix-blend-screen" />

        {/* Floating Elements */}
        <motion.div className="absolute top-[10%] left-[5%] text-primary/10" animate={{
        y: [0, -20, 0],
        rotate: [-12, -7, -12]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}>
          <ShoppingCart className="w-32 h-32 lg:w-48 lg:h-48 drop-shadow-lg" />
        </motion.div>

        <motion.div className="absolute bottom-[10%] right-[5%] text-primary/5" animate={{
        y: [0, -15, 0],
        rotate: [12, 17, 12]
      }} transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}>
          <Package className="w-40 h-40 lg:w-64 lg:h-64" />
        </motion.div>

        <motion.div className="absolute top-[15%] right-[15%] text-primary/5" animate={{
        y: [0, -20, 0],
        rotate: [45, 50, 45]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }}>
          <Coins className="w-24 h-24 lg:w-32 lg:h-32" />
        </motion.div>

        <motion.div className="absolute bottom-[20%] left-[10%] text-primary/5" animate={{
        y: [0, -15, 0],
        rotate: [-12, -7, -12]
      }} transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }}>
          <Tag className="w-20 h-20 lg:w-28 lg:h-28" />
        </motion.div>
      </div>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-[1100px] mx-auto p-4 lg:p-6 h-full flex items-center">
        <motion.div className="w-full h-[calc(100vh-3rem)] max-h-[700px] rounded-[32px] overflow-hidden grid grid-cols-1 lg:grid-cols-12
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
          
          {/* Left Column: Login Form */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 lg:p-10 relative bg-secondary/20">
            
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
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
                  <Store className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-foreground font-semibold tracking-tight text-lg">
                  Burkina<span className="text-primary">Shop</span>
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-semibold text-foreground tracking-tight leading-tight mb-3">
                Connectez-vous à <br />votre Boutique
              </h1>
              <p className="text-muted-foreground text-sm">
                Bienvenue ! Entrez vos identifiants pour accéder à votre tableau de bord.
              </p>
            </motion.div>

            {/* Form */}
            <motion.form className="space-y-4 mt-6 mb-6" onSubmit={handleSubmit} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3
          }}>
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-medium text-muted-foreground ml-1">
                  Adresse Email
                </Label>
                <div className="relative group">
                  <Input id="email" type="email" placeholder="votre@email.com" value={email} onChange={e => setEmail(e.target.value)} required className="h-12 px-4 rounded-xl bg-secondary/40 border-border/30 text-foreground placeholder:text-muted-foreground/50
                      focus:bg-secondary/60 focus:border-primary/50 focus:ring-4 focus:ring-primary/10
                      transition-all duration-300 pr-10" />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-medium text-muted-foreground ml-1">
                  Mot de passe
                </Label>
                <div className="relative group">
                  <Input id="password" type="password" placeholder="••••••••••••" value={password} onChange={e => setPassword(e.target.value)} required className="h-12 px-4 rounded-xl bg-secondary/40 border-border/30 text-foreground placeholder:text-muted-foreground/50
                      focus:bg-secondary/60 focus:border-primary/50 focus:ring-4 focus:ring-primary/10
                      transition-all duration-300 pr-10" />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                  </div>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember-me" checked={rememberMe} onCheckedChange={checked => setRememberMe(checked as boolean)} className="border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                  <label htmlFor="remember-me" className="text-xs text-muted-foreground select-none cursor-pointer">
                    Se souvenir de moi
                  </label>
                </div>
                <Link to="#" className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={isLoading} className="group w-full h-12 rounded-xl text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground
                  transition-all duration-300 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.4)] 
                  hover:shadow-[0_0_25px_-5px_hsl(var(--primary)/0.6)] hover:-translate-y-0.5 mt-2">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Accéder au Dashboard
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
              </Button>

              <p className="text-xs text-center pt-2 text-secondary-foreground">
                Utilisez n'importe quel email/mot de passe pour tester
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
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
                  <span className="px-3 text-accent bg-primary-foreground">Nouveau vendeur ?</span>
                </div>
              </div>

              <p className="text-sm text-center text-muted-foreground">
                <Link to="/signup" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Créer une boutique gratuitement
                </Link>
              </p>
            </motion.div>
          </div>

          {/* Right Column: Visuals */}
          <div className="hidden lg:block lg:col-span-7 relative bg-black/50 h-full overflow-hidden">
            
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />
            
            {/* Background Image */}
            <motion.img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2670&auto=format&fit=crop" alt="E-commerce Dashboard Analytics" className="absolute inset-0 w-full h-full object-cover opacity-60" initial={{
            scale: 1.1
          }} animate={{
            scale: 1
          }} transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
          }} />
            
            {/* Overlay Gradient Tone */}
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />

            {/* Floating Stats Card */}
            <motion.div className="absolute top-12 right-12 z-20" initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.6
          }}>
              <div className="bg-card/70 backdrop-blur-xl border border-border/30 p-4 rounded-2xl flex items-center gap-4 shadow-xl">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-primary font-semibold tracking-wider">Ventes Totales</p>
                  <p className="text-lg font-bold text-foreground tracking-tight">2.5M XOF</p>
                </div>
              </div>
            </motion.div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-12 z-20 bg-gradient-to-t from-background via-background/80 to-transparent">
              <motion.div className="max-w-lg" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.7
            }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex -space-x-2">
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-background grayscale hover:grayscale-0 transition-all object-cover" src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=64&h=64" alt="Vendeur" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-background grayscale hover:grayscale-0 transition-all object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64" alt="Vendeur" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-background grayscale hover:grayscale-0 transition-all object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64" alt="Vendeur" />
                  </div>
                  <div className="flex items-center gap-1.5 pl-2">
                    <Users className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs text-muted-foreground font-medium">500+ vendeurs actifs</span>
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-foreground tracking-tight mb-2">
                  Gérez votre commerce en temps réel.
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Profitez d'un dashboard performant pour suivre vos ventes, 
                  gérer votre stock et communiquer avec vos clients via WhatsApp.
                </p>
              </motion.div>
            </div>
          </div>

        </motion.div>
      </main>
    </div>;
};
export default Login;