import React, { Suspense } from 'react';
import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/components/CartProvider";
import { LoginModal } from "@/components/LoginModal";
import { useAuth } from "@/contexts/AuthContext";
import Home from "@/pages/home";
import AboutPage from "@/pages/about";
import PricingPage from "@/pages/pricing";
import ContactPage from "@/pages/contact";

// Lazy-loaded pages — code splits into separate chunks
const ServiceDetail = React.lazy(() => import("@/pages/service-detail"));
const Agriculture = React.lazy(() => import("@/pages/agriculture"));
const CloudComputing = React.lazy(() => import("@/pages/cloud"));
const Cybersecurity = React.lazy(() => import("@/pages/cybersecurity"));
const ML = React.lazy(() => import("@/pages/ml"));
const DataAnalytics = React.lazy(() => import("@/pages/data-analytics"));
const GetStarted = React.lazy(() => import("@/pages/get-started"));
const Login = React.lazy(() => import("@/pages/login"));
const Profile = React.lazy(() => import("@/pages/profile"));
const IntelligenceCorePage = React.lazy(() => import("@/pages/intelligence-core"));
const GlobalIntelligencePage = React.lazy(() => import("@/pages/global-intelligence"));
const DroneAnalyticsPage = React.lazy(() => import("@/pages/drone-analytics"));
const InnovationLabPage = React.lazy(() => import("@/pages/innovation-lab"));
const CareersPage = React.lazy(() => import("@/pages/careers"));
const NotFound = React.lazy(() => import("@/pages/not-found"));
const ClawnAIPage = React.lazy(() => import("@/pages/clawn-ai"));
const ClawnAcademy = React.lazy(() => import("@/pages/clawn-academy"));
const Marketplace = React.lazy(() => import("@/pages/marketplace"));
const ProductDetail = React.lazy(() => import("@/pages/product-detail"));
const VendorDashboard = React.lazy(() => import("@/pages/vendor-dashboard"));
const Cart = React.lazy(() => import("@/pages/cart"));
const Partnerships = React.lazy(() => import("@/pages/partnerships"));
const SolutionsAgriculture = React.lazy(() => import("@/pages/solutions-agriculture"));
const SolutionsBusiness = React.lazy(() => import("@/pages/solutions-business"));
const SolutionsEducation = React.lazy(() => import("@/pages/solutions-education"));
const SolutionsHealthcare = React.lazy(() => import("@/pages/solutions-healthcare"));
const AgricultureDroneScouting = React.lazy(() => import("@/pages/agriculture-drone-scouting"));
const AgricultureCropMonitoring = React.lazy(() => import("@/pages/agriculture-crop-monitoring"));
const AgricultureSoilAnalytics = React.lazy(() => import("@/pages/agriculture-soil-analytics"));
const AgricultureWaterManagement = React.lazy(() => import("@/pages/agriculture-water-management"));
const AgricultureFarmRecords = React.lazy(() => import("@/pages/agriculture-farm-records"));
const CybersecurityThreatDetection = React.lazy(() => import("@/pages/cybersecurity-threat-detection"));
const CybersecurityIdentityProtection = React.lazy(() => import("@/pages/cybersecurity-identity-protection"));
const CybersecurityDataSecurity = React.lazy(() => import("@/pages/cybersecurity-data-security"));
const ResourcesIndex = React.lazy(() => import("@/pages/resources/index"));
const SmartAgricultureGuide = React.lazy(() => import("@/pages/resources/guides/smart-agriculture-guide"));
const CybersecurityGuide = React.lazy(() => import("@/pages/resources/guides/cybersecurity-guide"));
const CloudMigrationGuide = React.lazy(() => import("@/pages/resources/guides/cloud-migration-guide"));
const AIImplementationGuide = React.lazy(() => import("@/pages/resources/guides/ai-implementation"));
const FAQGeneral = React.lazy(() => import("@/pages/resources/faq/general"));
const FAQAgriculture = React.lazy(() => import("@/pages/resources/faq/agriculture"));
const FAQCybersecurity = React.lazy(() => import("@/pages/resources/faq/cybersecurity"));
const FAQCloud = React.lazy(() => import("@/pages/resources/faq/cloud"));
const BlogIndex = React.lazy(() => import("@/pages/blog/index"));
const BlogDronesAgriculture = React.lazy(() => import("@/pages/blog/drones-transforming-agriculture-zimbabwe"));
const BlogCybersecurity = React.lazy(() => import("@/pages/blog/cybersecurity-zimbabwean-businesses"));
const BlogCloudComputing = React.lazy(() => import("@/pages/blog/cloud-computing-zimbabwe-practical-guide"));
const BlogAI = React.lazy(() => import("@/pages/blog/artificial-intelligence-zimbabwe-opportunities"));
const LocationHarare = React.lazy(() => import("@/pages/locations/harare"));
const LocationBulawayo = React.lazy(() => import("@/pages/locations/bulawayo"));
const LocationChitungwiza = React.lazy(() => import("@/pages/locations/chitungwiza"));
const LocationMutare = React.lazy(() => import("@/pages/locations/mutare"));
const LocationVictoriaFalls = React.lazy(() => import("@/pages/locations/victoria-falls"));
const CompareClawnCoreAWS = React.lazy(() => import("@/pages/compare/clawncore-vs-aws"));
const CompareClawnCoreLocalIT = React.lazy(() => import("@/pages/compare/clawncore-vs-local-it"));
const IndustryFinance = React.lazy(() => import("@/pages/industries/finance"));
const IndustryMining = React.lazy(() => import("@/pages/industries/mining"));
const StoreHome = React.lazy(() => import("@/pages/store-home"));
const StoreCategory = React.lazy(() => import("@/pages/store-category"));
const StoreProduct = React.lazy(() => import("@/pages/store-product"));
const StoreCart = React.lazy(() => import("@/pages/store-cart"));
const StoreCheckout = React.lazy(() => import("@/pages/store-checkout"));
const StoreConfirmation = React.lazy(() => import("@/pages/store-confirmation"));
const StoreOrders = React.lazy(() => import("@/pages/store-orders"));

function RouterWrapper() {
  const { loginModalOpen, setLoginModalOpen } = useAuth();

  // Handle GitHub Pages redirect (moved out of render to avoid side effects)
  React.useEffect(() => {
    const redirect = sessionStorage.getItem('redirect');
    if (redirect) {
      sessionStorage.removeItem('redirect');
    }
  }, []);

  return (
    <Router base="">
      <Suspense fallback={<div className="min-h-screen bg-gray-50 dark:bg-cc-darker" />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={AboutPage} />
          <Route path="/pricing" component={PricingPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/service/:serviceId" component={ServiceDetail} />
          <Route path="/agriculture" component={Agriculture} />
          <Route path="/cloud" component={CloudComputing} />
          <Route path="/cybersecurity" component={Cybersecurity} />
          <Route path="/ml" component={ML} />
          <Route path="/data-analytics" component={DataAnalytics} />
          <Route path="/get-started" component={GetStarted} />
          <Route path="/clawn-ai" component={ClawnAIPage} />
          <Route path="/intelligence-core" component={IntelligenceCorePage} />
          <Route path="/global-intelligence" component={GlobalIntelligencePage} />
          <Route path="/drone-analytics" component={DroneAnalyticsPage} />
          <Route path="/innovation-lab" component={InnovationLabPage} />
          <Route path="/careers" component={CareersPage} />
          <Route path="/marketplace" component={Marketplace} />
          <Route path="/marketplace/product/:productId" component={ProductDetail} />
          <Route path="/vendor/dashboard" component={VendorDashboard} />
          <Route path="/cart" component={Cart} />
          <Route path="/clawn-academy" component={ClawnAcademy} />
          <Route path="/partnerships" component={Partnerships} />
          <Route path="/solutions/agriculture" component={SolutionsAgriculture} />
          <Route path="/solutions/business" component={SolutionsBusiness} />
          <Route path="/solutions/education" component={SolutionsEducation} />
          <Route path="/solutions/healthcare" component={SolutionsHealthcare} />
          <Route path="/platforms/smart-agriculture/drone-scouting" component={AgricultureDroneScouting} />
          <Route path="/platforms/smart-agriculture/crop-monitoring" component={AgricultureCropMonitoring} />
          <Route path="/platforms/smart-agriculture/soil-analytics" component={AgricultureSoilAnalytics} />
          <Route path="/platforms/smart-agriculture/water-management" component={AgricultureWaterManagement} />
          <Route path="/platforms/smart-agriculture/farm-records" component={AgricultureFarmRecords} />
          <Route path="/platforms/cybersecurity/threat-detection" component={CybersecurityThreatDetection} />
          <Route path="/platforms/cybersecurity/identity-protection" component={CybersecurityIdentityProtection} />
          <Route path="/platforms/cybersecurity/data-security" component={CybersecurityDataSecurity} />
          <Route path="/resources" component={ResourcesIndex} />
          <Route path="/resources/guides/smart-agriculture-guide" component={SmartAgricultureGuide} />
          <Route path="/resources/guides/cybersecurity-guide" component={CybersecurityGuide} />
          <Route path="/resources/guides/cloud-migration-guide" component={CloudMigrationGuide} />
          <Route path="/resources/guides/ai-implementation" component={AIImplementationGuide} />
          <Route path="/resources/faq/general" component={FAQGeneral} />
          <Route path="/resources/faq/agriculture" component={FAQAgriculture} />
          <Route path="/resources/faq/cybersecurity" component={FAQCybersecurity} />
          <Route path="/resources/faq/cloud" component={FAQCloud} />
          <Route path="/blog" component={BlogIndex} />
          <Route path="/blog/drones-transforming-agriculture-zimbabwe" component={BlogDronesAgriculture} />
          <Route path="/blog/cybersecurity-zimbabwean-businesses" component={BlogCybersecurity} />
          <Route path="/blog/cloud-computing-zimbabwe-practical-guide" component={BlogCloudComputing} />
          <Route path="/blog/artificial-intelligence-zimbabwe-opportunities" component={BlogAI} />
          <Route path="/locations/harare" component={LocationHarare} />
          <Route path="/locations/bulawayo" component={LocationBulawayo} />
          <Route path="/locations/chitungwiza" component={LocationChitungwiza} />
          <Route path="/locations/mutare" component={LocationMutare} />
          <Route path="/locations/victoria-falls" component={LocationVictoriaFalls} />
          <Route path="/compare/clawncore-vs-aws" component={CompareClawnCoreAWS} />
          <Route path="/compare/clawncore-vs-local-it" component={CompareClawnCoreLocalIT} />
          <Route path="/industries/finance" component={IndustryFinance} />
          <Route path="/industries/mining" component={IndustryMining} />
          <Route path="/store" component={StoreHome} />
          <Route path="/store/category/:category" component={StoreCategory} />
          <Route path="/store/product/:productId" component={StoreProduct} />
          <Route path="/store/cart" component={StoreCart} />
          <Route path="/store/checkout" component={StoreCheckout} />
          <Route path="/store/order/:orderId" component={StoreConfirmation} />
          <Route path="/store/orders" component={StoreOrders} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <CartProvider>
            <TooltipProvider>
            <Toaster />
            <RouterWrapper />
          </TooltipProvider>
          </CartProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;