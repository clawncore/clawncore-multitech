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