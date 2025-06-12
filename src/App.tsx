
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ComingSoon from "./components/ComingSoon";
import Home from "./pages/Home";
import About from "./pages/About";
import DiscoAscension from "./pages/DiscoAscension";
import NostalgiaTrap from "./pages/NostalgiaTrap";
import RoleModel from "./pages/RoleModel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/disco-ascension" element={<DiscoAscension />} />
            <Route path="/nostalgia-trap" element={<NostalgiaTrap />} />
            <Route path="/role-model" element={<RoleModel />} />
            {/* Placeholder routes for other pages */}
            <Route path="/house-work" element={<ComingSoon title="House Work: Elevation" />} />
            <Route path="/brooklyn-445" element={<ComingSoon title="4:45 Somewhere in Brooklyn" />} />
            <Route path="/voyage" element={<ComingSoon title="Voyage" />} />
            <Route path="/return-to-senders" element={<ComingSoon title="Return to Senders" />} />
            <Route path="/watch" element={<ComingSoon title="Watch" />} />
            <Route path="/press" element={<ComingSoon title="Press & Testimonials" />} />
            <Route path="/lab-obsidian" element={<ComingSoon title="Lab Obsidian" />} />
            <Route path="/booking" element={<ComingSoon title="Booking" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
