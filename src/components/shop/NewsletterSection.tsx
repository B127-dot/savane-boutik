import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewsletterSectionProps {
  buttonStyle?: 'rounded' | 'pill' | 'square';
}

const NewsletterSection = ({ buttonStyle = 'rounded' }: NewsletterSectionProps) => {
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

    // Simulate newsletter subscription
    setIsSubmitted(true);
    toast({
      title: "Inscription réussie !",
      description: "Vous recevrez nos dernières offres par email",
    });

    // Reset after 3 seconds
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 3000);
  };

  // Get button radius class based on style
  const getButtonRadius = () => {
    switch(buttonStyle) {
      case 'pill': return 'rounded-full';
      case 'square': return 'rounded-none';
      default: return 'rounded-lg';
    }
  };

  return (
    <section 
      className="py-16 md:py-20 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, var(--shop-primary, hsl(var(--primary))), color-mix(in srgb, var(--shop-primary, hsl(var(--primary))) 90%, transparent), var(--shop-secondary, hsl(var(--primary))))`
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <Mail className="h-8 w-8 text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Restez Informé de Nos Nouveautés
          </h2>
          <p className="text-lg font-body text-white/90 mb-8">
            Inscrivez-vous à notre newsletter et recevez nos offres exclusives
          </p>

          {/* Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`flex-1 h-14 bg-white text-foreground border-0 text-lg ${getButtonRadius()}`}
              />
              <Button 
                type="submit"
                size="lg"
                className={`h-14 px-8 bg-foreground text-primary-foreground hover:bg-foreground/90 font-semibold text-lg whitespace-nowrap ${getButtonRadius()}`}
              >
                S'abonner
                <Mail className="ml-2 h-5 w-5" />
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-3 p-6 bg-white/20 rounded-lg backdrop-blur-sm animate-fade-in">
              <CheckCircle className="h-8 w-8 text-white" />
              <span className="text-xl font-display font-semibold text-white">
                Merci pour votre inscription !
              </span>
            </div>
          )}

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 font-body text-white/90">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Offres exclusives</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Nouveautés en avant-première</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Codes promo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
