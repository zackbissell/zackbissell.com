
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
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
            <Route path="/house-work" element={<div className="min-h-screen bg-white text-foreground pt-20 flex items-center justify-center"><h1 className="text-title1">House Work: Elevation - Coming Soon</h1></div>} />
            <Route path="/brooklyn-445" element={<div className="min-h-screen bg-white text-foreground pt-20 flex items-center justify-center"><h1 className="text-title1">4:45 Somewhere in Brooklyn - Coming Soon</h1></div>} />
            <Route path="/voyage" element={<div className="min-h-screen bg-white text-foreground pt-20 flex items-center justify-center"><h1 className="text-title1">Voyage - Coming Soon</h1></div>} />
            <Route path="/return-to-senders" element={<div className="min-h-screen bg-white text-foreground pt-20 flex items-center justify-center"><h1 className="text-title1">Return to Senders - Coming Soon</h1></div>} />
            <Route path="/watch" element={<div className="min-h-screen bg-white text-foreground pt-20 flex items-center justify-center"><h1 className="text-title1">Watch - Coming Soon</h1></div>} />
            <Route path="/press" element={<div className="min-h-screen bg-white text-foreground pt-20 flex items-center justify-center"><h1 className="text-title1">Press & Testimonials - Coming Soon</h1></div>} />
            <Route path="/lab-obsidian" element={<div className="min-h-screen bg-white text-foreground pt-20 flex items-center justify-center"><h1 className="text-title1">Lab Obsidian - Coming Soon</h1></div>} />
            <Route path="/booking" element={<div className="min-h-screen bg-white text-foreground pt-20 flex items-center justify-center"><h1 className="text-title1">Booking - Coming Soon</h1></div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
