
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import FunDiving from "./pages/FunDiving";
import DiveSitesPage from "./pages/DiveSitesPage";
import SailRock from "./pages/SailRock";
import ChumphonPinnacle from "./pages/ChumphonPinnacle";
import JapaneseGardens from "./pages/JapaneseGardens";
import HTMSSattakut from "./pages/HTMSSattakut";
import SharkIsland from "./pages/SharkIsland";
import MangoBay from "./pages/MangoBay";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import "./i18n";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fun-diving-koh-tao" element={<FunDiving />} />
          <Route path="/koh-tao-dive-sites" element={<DiveSitesPage />} />
          <Route path="/dive-sites/sail-rock" element={<SailRock />} />
          <Route path="/dive-sites/chumphon-pinnacle" element={<ChumphonPinnacle />} />
          <Route path="/dive-sites/japanese-gardens" element={<JapaneseGardens />} />
          <Route path="/dive-sites/htms-sattakut" element={<HTMSSattakut />} />
          <Route path="/dive-sites/shark-island" element={<SharkIsland />} />
          <Route path="/dive-sites/mango-bay" element={<MangoBay />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
