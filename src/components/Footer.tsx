
import React from 'react';
import { Instagram, Facebook, Music, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-amber-500/20 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-amber-500 mb-4">ZACK BISSELL</h3>
            <p className="text-gray-300 mb-4">
              Brooklyn's storytelling DJ & sonic architect. World-class sets, unforgettable journeys.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Music className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="/booking" className="block text-gray-400 hover:text-amber-500 transition-colors">Book Zack</a>
              <a href="/about" className="block text-gray-400 hover:text-amber-500 transition-colors">EPK/Bio</a>
              <a href="/press" className="block text-gray-400 hover:text-amber-500 transition-colors">Press Kit</a>
              <a href="/lab-obsidian" className="block text-gray-400 hover:text-amber-500 transition-colors">Lab Obsidian</a>
            </div>
          </div>

          {/* Featured Mixes */}
          <div>
            <h4 className="text-white font-semibold mb-4">Featured Worlds</h4>
            <div className="space-y-2">
              <a href="/disco-ascension" className="block text-gray-400 hover:text-amber-500 transition-colors">Disco Ascension</a>
              <a href="/nostalgia-trap" className="block text-gray-400 hover:text-amber-500 transition-colors">Nostalgia Trap</a>
              <a href="/house-work" className="block text-gray-400 hover:text-amber-500 transition-colors">House Work</a>
              <a href="/role-model" className="block text-gray-400 hover:text-amber-500 transition-colors">Role Model</a>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-500/20 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Zack Bissell. All rights reserved. | 
            <span className="text-amber-500 ml-2">Let's build something legendary.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
