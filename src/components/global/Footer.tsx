
import React from "react";
import { Instagram, Facebook, Music, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-foreground/10 bg-background py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3">
        <div className="space-y-4">
          <h3 className="text-heading-2">ZACK BISSELL</h3>
          <p className="text-body text-foreground/70">
            Brooklyn's storytelling DJ & sonic architect. World-class sets, unforgettable journeys.
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="Instagram" className="text-foreground/70 hover:text-foreground">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Facebook" className="text-foreground/70 hover:text-foreground">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Music" className="text-foreground/70 hover:text-foreground">
              <Music className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Email" className="text-foreground/70 hover:text-foreground">
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-heading-2">Quick Links</h4>
          <div className="space-y-2">
            <a href="/booking" className="block text-body text-foreground/70 hover:text-foreground">
              Book Zack
            </a>
            <a href="/about" className="block text-body text-foreground/70 hover:text-foreground">
              EPK/Bio
            </a>
            <a href="/press" className="block text-body text-foreground/70 hover:text-foreground">
              Press Kit
            </a>
            <a href="/lab-obsidian" className="block text-body text-foreground/70 hover:text-foreground">
              Lab Obsidian
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-heading-2">Featured Worlds</h4>
          <div className="space-y-2">
            <a href="/disco-ascension" className="block text-body text-foreground/70 hover:text-foreground">
              Disco Ascension
            </a>
            <a href="/nostalgia-trap" className="block text-body text-foreground/70 hover:text-foreground">
              Nostalgia Trap
            </a>
            <a href="/house-work" className="block text-body text-foreground/70 hover:text-foreground">
              House Work
            </a>
            <a href="/role-model" className="block text-body text-foreground/70 hover:text-foreground">
              Role Model
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-foreground/10 pt-8 text-center">
        <p className="text-subtle">© 2024 Zack Bissell. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
