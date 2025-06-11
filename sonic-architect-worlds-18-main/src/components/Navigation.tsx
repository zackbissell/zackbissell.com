
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Worlds', path: '#', isDropdown: true },
    { label: 'Watch', path: '/watch' },
    { label: 'Press', path: '/press' },
    { label: 'Booking', path: '/booking' },
  ];

  const worldItems = [
    { label: 'Disco Ascension', path: '/disco-ascension' },
    { label: 'Nostalgia Trap', path: '/nostalgia-trap' },
    { label: 'Role Model', path: '/role-model' },
    { label: 'House Work: Elevation', path: '/house-work' },
    { label: '4:45 Somewhere in Brooklyn', path: '/brooklyn-445' },
    { label: 'Voyage', path: '/voyage' },
    { label: 'Return to Senders', path: '/return-to-senders' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border-secondary">
      <div className="content-container-wide">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-title3 font-bold text-foreground">
            Zack Bissell
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.isDropdown ? (
                  <>
                    <button className="text-subheadline font-medium text-foreground-secondary hover:text-foreground transition-colors">
                      {item.label}
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-border-secondary rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-2">
                        {worldItems.map((world) => (
                          <Link
                            key={world.path}
                            to={world.path}
                            className="block px-4 py-2 text-footnote text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
                          >
                            {world.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-subheadline font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'text-foreground'
                        : 'text-foreground-secondary hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground-secondary hover:text-foreground transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border-secondary">
            <div className="space-y-3">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.isDropdown ? (
                    <>
                      <div className="text-subheadline font-medium text-foreground mb-2">
                        {item.label}
                      </div>
                      <div className="pl-4 space-y-2">
                        {worldItems.map((world) => (
                          <Link
                            key={world.path}
                            to={world.path}
                            onClick={() => setIsOpen(false)}
                            className="block text-footnote text-foreground-secondary hover:text-foreground transition-colors"
                          >
                            {world.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block text-subheadline font-medium transition-colors ${
                        location.pathname === item.path
                          ? 'text-foreground'
                          : 'text-foreground-secondary hover:text-foreground'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
