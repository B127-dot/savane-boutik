import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import LazySection from "@/components/LazySection";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        {/* Critical above-the-fold content loaded immediately */}
        <HeroSection />
        
        {/* Non-critical sections lazy loaded only when visible (Intersection Observer) */}
        <LazySection 
          importFunc={() => import("@/components/VideoSection")} 
          skeletonHeight="h-[600px]" 
        />
        
        <LazySection 
          importFunc={() => import("@/components/ThreePillarsSection")} 
          skeletonHeight="h-[800px]" 
        />
        
        <LazySection 
          importFunc={() => import("@/components/ValuePropositionSection")} 
          skeletonHeight="h-[600px]" 
        />
        
        <LazySection 
          importFunc={() => import("@/components/HowItWorksSection")} 
          skeletonHeight="h-[900px]" 
        />
        
        <LazySection 
          importFunc={() => import("@/components/FeaturesSection")} 
          skeletonHeight="h-[800px]" 
        />
        
        <LazySection 
          importFunc={() => import("@/components/SecuritySection")} 
          skeletonHeight="h-[600px]" 
        />
        
        <LazySection 
          importFunc={() => import("@/components/TestimonialsSection")} 
          skeletonHeight="h-[700px]" 
        />
        
        <LazySection 
          importFunc={() => import("@/components/PricingSection")} 
          skeletonHeight="h-[800px]" 
        />
        
        <LazySection 
          importFunc={() => import("@/components/FAQSection")} 
          skeletonHeight="h-[700px]" 
        />
        
        <LazySection 
          importFunc={() => import("@/components/CTASection")} 
          skeletonHeight="h-[600px]" 
        />
        
        <LazySection 
          importFunc={() => import("@/components/Footer")} 
          skeletonHeight="h-96" 
        />
      </div>
    </div>
  );
};

export default Index;
