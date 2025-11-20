import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  IconComponent: LucideIcon;
  color: string;
  badge?: string;
  link?: string;
  delay?: number;
}

export const StepCard = ({ 
  step, 
  title, 
  description, 
  IconComponent, 
  color, 
  badge,
  link,
  delay = 0 
}: StepCardProps) => {
  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl hover:shadow-primary/20 animate-fade-up border-2 hover:border-primary/50"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      {/* Glow effect ring */}
      <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${color} blur-xl -z-10`} />

      <div className="relative p-6 space-y-4">
        {/* Header with icon and step number */}
        <div className="flex items-start gap-4">
          {/* Icon container with double ring effect */}
          <div className="relative flex-shrink-0">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            
            {/* Step number badge */}
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-sm shadow-md">
              {step}
            </div>
          </div>

          {/* Badge if provided */}
          {badge && (
            <Badge variant="secondary" className="ml-auto">
              {badge}
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Link if provided */}
        {link && (
          <a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all duration-300 font-medium"
          >
            Accéder à CynetPay
            <span className="text-lg">→</span>
          </a>
        )}
      </div>
    </Card>
  );
};
