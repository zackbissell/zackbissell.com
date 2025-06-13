
import React from "react";
import { Instagram, Facebook, Music, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer role="contentinfo" className="mt-auto border-t border-foreground/10 bg-background py-12">
      <div className="container mx-auto grid gap-8 px-4 md:grid-cols-3">
        <div className="space-y-4">
          <h3 className="text-heading-2">ZACK BISSELL</h3>
          <p className="text-body text-foreground-secondary">
            Brooklyn's storytelling DJ & sonic architect. World-class sets, unforgettable journeys.
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="Instagram" className="text-foreground-secondary hover:text-primary">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Facebook" className="text-foreground-secondary hover:text-primary">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Music" className="text-foreground-secondary hover:text-primary">
              <Music className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Email" className="text-foreground-secondary hover:text-primary">
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-heading-2">Quick Links</h4>
          <div className="space-y-2">
            <a href="/booking" className="block text-body text-foreground-secondary hover:text-primary">
              Book Zack
            </a>
            <a href="/about" className="block text-body text-foreground-secondary hover:text-primary">
              EPK/Bio
            </a>
            <a href="/press" className="block text-body text-foreground-secondary hover:text-primary">
              Press Kit
            </a>
            <a href="/lab-obsidian" className="block text-body text-foreground-secondary hover:text-primary">
              Lab Obsidian
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-heading-2">Featured Worlds</h4>
          <div className="space-y-2">
            <a href="/disco-ascension" className="block text-body text-foreground-secondary hover:text-primary">
              Disco Ascension
            </a>
            <a href="/nostalgia-trap" className="block text-body text-foreground-secondary hover:text-primary">
              Nostalgia Trap
            </a>
            <a href="/house-work" className="block text-body text-foreground-secondary hover:text-primary">
              House Work
            </a>
            <a href="/role-model" className="block text-body text-foreground-secondary hover:text-primary">
              Role Model
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-foreground/10 pt-8 text-center">
        <p className="text-sm text-foreground-secondary">© 2024 Zack Bissell. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
