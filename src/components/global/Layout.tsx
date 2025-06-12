import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
      <Navigation />
      <main id="main-content" className="container mx-auto px-6 py-10 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
