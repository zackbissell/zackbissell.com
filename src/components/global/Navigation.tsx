
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "EPK", path: "/epk" },
    { label: "Media", path: "/media" },
    { label: "Stage Plot", path: "/stage-plot" },
    { label: "Booking", path: "/booking" },
  ];

  return (
    <nav
      role="navigation"
      className="fixed inset-x-0 top-0 z-50 glass-nav border-b border-foreground/5"
      style={{
        background: 'var(--nav-glass-background)',
        backdropFilter: 'blur(var(--glass-blur))',
        WebkitBackdropFilter: 'blur(var(--glass-blur))',
        borderBottom: '1px solid var(--nav-glass-border)',
        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="container-apple flex items-center justify-between" style={{ height: 'var(--touch-target-min)' }}>
        <Link 
          to="/" 
          className="text-title3 font-bold tracking-tight transition-all duration-300 hover:scale-105"
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-title3)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-text-primary)'
          }}
        >
          Zack Bissell
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-3 py-2 font-medium transition-all duration-300 hover:scale-105 ${
                location.pathname === item.path
                  ? "text-brand-orange"
                  : "text-foreground-secondary hover:text-brand-orange"
              }`}
              style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-body)',
                fontWeight: 'var(--font-weight-medium)',
                minHeight: 'var(--touch-target-min)',
                display: 'flex',
                alignItems: 'center',
                borderRadius: 'var(--border-radius-medium)'
              }}
            >
              {item.label}
              {/* Active indicator */}
              {location.pathname === item.path && (
                <div 
                  className="absolute inset-0 -z-10 rounded-lg"
                  style={{
                    background: 'var(--glass-background)',
                    border: '1px solid var(--glass-border)',
                    boxShadow: '0 2px 8px rgba(204, 101, 68, 0.15)'
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              aria-label="Open navigation menu"
              className="md:hidden p-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                minHeight: 'var(--touch-target-min)',
                minWidth: 'var(--touch-target-min)',
                background: 'var(--glass-background)',
                border: '1px solid var(--glass-border)',
                color: 'var(--color-text-secondary)'
              }}
            >
              <Menu 
                className="h-6 w-6" 
                style={{ color: 'var(--color-text-primary)' }}
              />
            </button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-80 p-6"
            style={{
              background: 'var(--glass-background-strong)',
              backdropFilter: 'blur(var(--glass-blur))',
              WebkitBackdropFilter: 'blur(var(--glass-blur))',
              border: '1px solid var(--glass-border)'
            }}
          >
            <div className="space-y-4 mt-8">
              {/* Mobile Brand */}
              <div 
                className="pb-4 border-b"
                style={{ borderColor: 'var(--glass-border)' }}
              >
                <Link 
                  to="/" 
                  className="text-title2 font-bold tracking-tight"
                  style={{
                    fontFamily: 'var(--font-family-base)',
                    fontSize: 'var(--font-size-title2)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--color-text-primary)'
                  }}
                >
                  Zack Bissell
                </Link>
              </div>
              
              {/* Mobile Navigation Items */}
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative block p-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                    location.pathname === item.path
                      ? "text-brand-orange"
                      : "text-foreground-secondary hover:text-brand-orange"
                  }`}
                  style={{
                    fontFamily: 'var(--font-family-base)',
                    fontSize: 'var(--font-size-body-large)',
                    fontWeight: 'var(--font-weight-medium)',
                    minHeight: 'var(--touch-target-min)',
                    display: 'flex',
                    alignItems: 'center',
                    background: location.pathname === item.path 
                      ? 'rgba(204, 101, 68, 0.1)' 
                      : 'transparent',
                    border: location.pathname === item.path 
                      ? '1px solid rgba(204, 101, 68, 0.2)' 
                      : '1px solid transparent'
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navigation;
