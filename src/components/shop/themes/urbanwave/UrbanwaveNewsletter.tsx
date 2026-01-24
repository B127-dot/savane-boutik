import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const UrbanwaveNewsletter = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: 'Inscription réussie !',
        description: 'Bienvenue dans la communauté URBANWAVE.',
      });
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-secondary/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 text-primary text-sm tracking-widest font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Restez connecté
          </span>
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            REJOIGNEZ LA COMMUNAUTÉ
          </h2>
          <p className="text-muted-foreground mb-8">
            Inscrivez-vous à notre newsletter et recevez 10% de réduction sur votre première commande,
            plus un accès exclusif aux nouveautés et aux ventes privées.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 bg-background border-border"
              required
            />
            <Button type="submit" size="lg" className="btn-glow">
              S'inscrire
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            En vous inscrivant, vous acceptez notre{' '}
            <a href="#" className="text-primary hover:underline">
              politique de confidentialité
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default UrbanwaveNewsletter;
