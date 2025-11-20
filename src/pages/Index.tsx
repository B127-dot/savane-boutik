import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import ValuePropositionSection from "@/components/ValuePropositionSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
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
        <ValuePropositionSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
