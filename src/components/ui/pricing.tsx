import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star, Gift, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "hsl(var(--primary))",
          "hsl(var(--accent))",
          "hsl(var(--secondary))",
          "hsl(var(--muted))",
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <div className="container py-20">
      {/* Free Trial Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary">
          <Gift className="w-5 h-5" />
          <span className="font-semibold">Essai gratuit de 30 jours</span>
          <span className="text-primary/70">• Sans engagement</span>
        </div>
      </motion.div>

      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h2>
        <p className="text-muted-foreground text-lg whitespace-pre-line max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="flex justify-center items-center gap-3 mb-12">
        <span className={cn("text-sm font-medium transition-colors", isMonthly ? "text-foreground" : "text-muted-foreground")}>
          Mensuel
        </span>
        <Label>
          <Switch
            ref={switchRef as any}
            checked={!isMonthly}
            onCheckedChange={handleToggle}
          />
        </Label>
        <span className={cn("text-sm font-medium transition-colors", !isMonthly ? "text-foreground" : "text-muted-foreground")}>
          Annuel <span className="text-primary font-semibold">(−20%)</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: index * 0.1,
            }}
            whileHover={isDesktop ? { 
              y: -10, 
              transition: { 
                type: "spring",
                stiffness: 400,
                damping: 25
              } 
            } : {}}
            className={cn(
              "rounded-2xl border bg-card text-card-foreground relative flex flex-col",
              plan.isPopular
                ? "border-primary border-2 shadow-[0_0_50px_-12px] shadow-primary/50 md:scale-105 z-10"
                : "border-border hover:border-primary/40 transition-colors"
            )}
          >
            {/* Popular Badge - positioned outside the card */}
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground shadow-lg">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <span className="font-semibold text-xs uppercase tracking-wider">
                    Populaire
                  </span>
                </div>
              </div>
            )}

            {/* Card Content */}
            <div className="p-8 flex flex-col flex-1">
              {/* Plan Name */}
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
                {plan.name}
              </p>

              {/* Price Section */}
              <div className="mb-2">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                    <NumberFlow
                      value={isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)}
                      format={{ minimumFractionDigits: 0, maximumFractionDigits: 0 }}
                      transformTiming={{
                        duration: 500,
                        easing: "ease-out",
                      }}
                      willChange
                      className="tabular-nums"
                    />
                  </span>
                  <span className="text-xl font-bold text-primary">
                    FCFA
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  / {isMonthly ? "mois" : "mois (facturé annuellement)"}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-6 min-h-[40px]">
                {plan.description}
              </p>

              {/* Divider */}
              <hr className="border-border mb-6" />

              {/* Features List */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground/90 text-left">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                to={plan.href}
                className={cn(
                  buttonVariants({
                    variant: plan.isPopular ? "default" : "outline",
                    size: "lg",
                  }),
                  "w-full gap-2 font-semibold text-base group transition-all duration-300",
                  plan.isPopular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
                    : "border-border hover:border-primary hover:bg-primary/5"
                )}
              >
                {plan.buttonText}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
