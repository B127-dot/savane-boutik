import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Store, Mail, Lock, ArrowRight, User, ShoppingBag, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
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
  return <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      
      {/* Background Layer with Floating Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/10 blur-[120px] rounded-full mix-blend-screen" />

        {/* Floating Elements */}
        <motion.div className="absolute top-[8%] left-[8%] text-primary/10" animate={{
        y: [0, -20, 0],
        rotate: [-12, -7, -12]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}>
          <Store className="w-28 h-28 lg:w-40 lg:h-40 drop-shadow-lg" />
        </motion.div>

        <motion.div className="absolute bottom-[15%] right-[8%] text-primary/5" animate={{
        y: [0, -15, 0],
        rotate: [12, 17, 12]
      }} transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}>
          <ShoppingBag className="w-36 h-36 lg:w-56 lg:h-56" />
        </motion.div>

        <motion.div className="absolute top-[20%] right-[12%] text-primary/5" animate={{
        y: [0, -20, 0],
        rotate: [0, 10, 0]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }}>
          <Rocket className="w-20 h-20 lg:w-28 lg:h-28" />
        </motion.div>
      </div>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-[1000px] mx-auto p-4">
        <motion.div className="w-full lg:h-[560px] rounded-[24px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 
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
          <div className="lg:col-span-6 flex flex-col justify-between p-5 sm:p-6 lg:p-8 relative bg-secondary/20">
            
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
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
                  <Store className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-foreground font-semibold tracking-tight">
                  Burkina<span className="text-primary">Shop</span>
                </span>
              </div>

              <h1 className="text-xl lg:text-2xl font-semibold text-foreground tracking-tight leading-tight mb-1">
                Créez votre Boutique <span className="text-primary">Gratuitement</span>
              </h1>
              <p className="text-muted-foreground text-xs">
                Lancez votre commerce en ligne en quelques minutes.
              </p>
            </motion.div>

            {/* Form */}
            <motion.form className="space-y-3 mt-3" onSubmit={handleSubmit} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3
          }}>
              {/* Name & Shop Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-medium text-muted-foreground ml-1">
                    Nom complet
                  </Label>
                  <div className="relative group">
                    <Input id="name" type="text" placeholder="Votre nom" value={name} onChange={e => setName(e.target.value)} required className="h-9 px-3 rounded-lg bg-secondary/40 border-border/30 text-foreground placeholder:text-muted-foreground/50 text-sm
                        focus:bg-secondary/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/10
                        transition-all duration-300 pr-9" />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Shop Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="shopName" className="text-xs font-medium text-muted-foreground ml-1">
                    Nom de la boutique
                  </Label>
                  <div className="relative group">
                    <Input id="shopName" type="text" placeholder="Ma Belle Boutique" value={shopName} onChange={e => setShopName(e.target.value)} required className="h-9 px-3 rounded-lg bg-secondary/40 border-border/30 text-foreground placeholder:text-muted-foreground/50 text-sm
                        focus:bg-secondary/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/10
                        transition-all duration-300 pr-9" />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Store className="h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-medium text-muted-foreground ml-1">
                  Adresse Email
                </Label>
                <div className="relative group">
                  <Input id="email" type="email" placeholder="votre@email.com" value={email} onChange={e => setEmail(e.target.value)} required className="h-9 px-3 rounded-lg bg-secondary/40 border-border/30 text-foreground placeholder:text-muted-foreground/50 text-sm
                      focus:bg-secondary/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/10
                      transition-all duration-300 pr-9" />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                  </div>
                </div>
              </div>

              {/* Password Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-medium text-muted-foreground ml-1">
                    Mot de passe
                  </Label>
                  <div className="relative group">
                    <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required className="h-9 px-3 rounded-lg bg-secondary/40 border-border/30 text-foreground placeholder:text-muted-foreground/50 text-sm
                        focus:bg-secondary/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/10
                        transition-all duration-300 pr-9" />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" className="text-xs font-medium text-muted-foreground ml-1">
                    Confirmer
                  </Label>
                  <div className="relative group">
                    <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="h-9 px-3 rounded-lg bg-secondary/40 border-border/30 text-foreground placeholder:text-muted-foreground/50 text-sm
                        focus:bg-secondary/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/10
                        transition-all duration-300 pr-9" />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={isLoading} className="group w-full h-9 rounded-lg text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground
                  transition-all duration-300 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.4)] 
                  hover:shadow-[0_0_25px_-5px_hsl(var(--primary)/0.6)] hover:-translate-y-0.5">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Créer ma Boutique
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
              </Button>

              <p className="text-[10px] text-center text-muted-foreground">
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
              <p className="text-xs text-center text-muted-foreground">
                Déjà inscrit ? <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">Se connecter</Link>
              </p>
            </motion.div>
          </div>

          {/* Right Column: Visuals */}
          <div className="hidden lg:block lg:col-span-6 relative bg-black/50 h-full overflow-hidden">
            
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />
            
            {/* Background Image */}
            <motion.img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" alt="E-commerce Success" className="absolute inset-0 w-full h-full object-cover opacity-50" initial={{
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

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-background via-background/80 to-transparent">
              <motion.div className="max-w-sm" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.7
            }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                    <Rocket className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm font-bold text-foreground">500+ boutiques créées</p>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Rejoignez des vendeurs burkinabè qui développent leur commerce avec les paiements mobiles.
                </p>
              </motion.div>
            </div>
          </div>

        </motion.div>
      </main>
    </div>;
};
export default Signup;