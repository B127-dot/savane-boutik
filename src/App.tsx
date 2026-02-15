import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AppProvider } from "@/contexts/AppContext";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Reviews from "./pages/Reviews";
import Categories from "./pages/Categories";
import ShopSettings from "./pages/ShopSettings";
import ShopEditor from "./pages/ShopEditor";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import Marketing from "./pages/Marketing";
import PaymentIntegration from "./pages/PaymentIntegration";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Academy from "./pages/Academy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import CategoryPage from "./pages/CategoryPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { CookieConsentBanner } from "./components/CookieConsentBanner";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/academy/:slug" element={<BlogArticle />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<ProtectedRoute><PageTransition><Welcome /></PageTransition></ProtectedRoute>} />
        <Route path="/onboarding" element={<ProtectedRoute><PageTransition><Onboarding /></PageTransition></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><PageTransition><Dashboard /></PageTransition></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><PageTransition><Products /></PageTransition></ProtectedRoute>} />
        <Route path="/categories" element={<ProtectedRoute><PageTransition><Categories /></PageTransition></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><PageTransition><Orders /></PageTransition></ProtectedRoute>} />
        <Route path="/reviews" element={<ProtectedRoute><PageTransition><Reviews /></PageTransition></ProtectedRoute>} />
        <Route path="/shop-settings" element={<ProtectedRoute><PageTransition><ShopSettings /></PageTransition></ProtectedRoute>} />
        <Route path="/shop-editor" element={<ProtectedRoute><PageTransition><ShopEditor /></PageTransition></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><PageTransition><Settings /></PageTransition></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><PageTransition><Analytics /></PageTransition></ProtectedRoute>} />
        <Route path="/marketing" element={<ProtectedRoute><PageTransition><Marketing /></PageTransition></ProtectedRoute>} />
        <Route path="/payment-integration" element={<ProtectedRoute><PageTransition><PaymentIntegration /></PageTransition></ProtectedRoute>} />
        {/* Public Shop Routes */}
        <Route path="/shop/:shopUrl" element={<PageTransition><Shop /></PageTransition>} />
        <Route path="/shop/:shopUrl/category/:categorySlug" element={<PageTransition><CategoryPage /></PageTransition>} />
        <Route path="/shop/:shopUrl/product/:productId" element={<PageTransition><ProductDetail /></PageTransition>} />
        <Route path="/shop/:shopUrl/checkout" element={<PageTransition><Checkout /></PageTransition>} />
        <Route path="/shop/:shopUrl/order-success/:orderId" element={<OrderSuccess />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
          <CookieConsentBanner />
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
