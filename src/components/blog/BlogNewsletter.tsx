import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const BlogNewsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setEmail('');
    toast.success('Inscription réussie ! Vous recevrez nos prochains articles.');
  };

  return (
    <section className="py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <div className="relative max-w-4xl mx-auto">
          {/* Background Card */}
          <div className="relative bg-gradient-to-br from-primary/10 via-card/80 to-primary/5 backdrop-blur-sm border border-primary/20 rounded-3xl p-8 sm:p-12 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-6"
              >
                <Mail className="w-8 h-8 text-primary" />
              </motion.div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
                Restez informé des{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  dernières tendances
                </span>
              </h2>

              {/* Description */}
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Recevez nos meilleurs articles, conseils et tutoriels directement 
                dans votre boîte mail. Pas de spam, promis !
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Votre adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-12 bg-background/50 border-border/50 focus:border-primary"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  variant="hero"
                  className="h-12 px-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin">⏳</span>
                  ) : (
                    <>
                      S'inscrire
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Rejoignez +2,000 entrepreneurs</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BlogNewsletter;
