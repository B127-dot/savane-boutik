import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HauteFashionNewsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Email invalide",
        description: "Veuillez entrer une adresse email valide",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitted(true);
    toast({
      title: "Inscription réussie !",
      description: "Vous recevrez nos dernières offres par email",
    });

    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70" />
      
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-white">REJOIGNEZ LA</span>
            <br />
            <span className="text-gradient">COMMUNAUTÉ</span>
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Inscrivez-vous à notre newsletter et recevez 10% de réduction sur votre première 
            commande, plus un accès exclusif aux nouveautés et aux ventes privées.
          </p>

          {/* Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-14 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 rounded-full px-6 focus:border-primary focus:ring-primary"
              />
              <Button 
                type="submit"
                className="h-14 px-8 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full shadow-[0_0_20px_rgba(255,107,0,0.4)] hover:shadow-[0_0_30px_rgba(255,107,0,0.6)] transition-all"
              >
                S'inscrire
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-3 p-6 bg-white/10 backdrop-blur-sm rounded-xl animate-fade-in max-w-md mx-auto">
              <CheckCircle className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold text-white">
                Merci pour votre inscription !
              </span>
            </div>
          )}

          {/* Privacy note */}
          <p className="text-xs text-white/50 mt-6">
            En vous inscrivant, vous acceptez notre politique de confidentialité et nos conditions d'utilisation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HauteFashionNewsletter;
