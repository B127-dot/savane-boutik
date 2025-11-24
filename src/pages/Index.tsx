import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import ThreePillarsSection from "@/components/ThreePillarsSection";
import ValuePropositionSection from "@/components/ValuePropositionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import SecuritySection from "@/components/SecuritySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

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
        <HeroSection />
        <VideoSection />
        <ThreePillarsSection />
        <ValuePropositionSection />
        <HowItWorksSection />
        <FeaturesSection />
        <SecuritySection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
