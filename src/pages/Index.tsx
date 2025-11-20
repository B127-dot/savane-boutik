import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import ValuePropositionSection from "@/components/ValuePropositionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import { use3DScroll, getSection3DStyle } from "@/hooks/use3DScroll";

const Index = () => {
  const navigate = useNavigate();
  const { scrollY } = use3DScroll();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <div className="pt-16">
        <div style={getSection3DStyle(scrollY, 0)}>
          <HeroSection />
        </div>
        <div style={getSection3DStyle(scrollY, 1)} className="relative z-10">
          <VideoSection />
        </div>
        <div style={getSection3DStyle(scrollY, 2)} className="relative z-10">
          <ValuePropositionSection />
        </div>
        <div style={getSection3DStyle(scrollY, 3)} className="relative z-10">
          <HowItWorksSection />
        </div>
        <div style={getSection3DStyle(scrollY, 4)} className="relative z-10">
          <FeaturesSection />
        </div>
        <div style={getSection3DStyle(scrollY, 5)} className="relative z-10">
          <TestimonialsSection />
        </div>
        <div style={getSection3DStyle(scrollY, 6)} className="relative z-10">
          <PricingSection />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
