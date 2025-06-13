
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
    { label: "Booking", path: "/booking" },
    { label: "Disco Ascension", path: "/disco-ascension" },
    { label: "Nostalgia Trap", path: "/nostalgia-trap" },
  ];

  return (
    <nav
      role="navigation"
      className="fixed inset-x-0 top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-foreground/10"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="text-heading-2 font-heading">
          Zack Bissell
        </Link>

        <div className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-body transition-colors ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-foreground-secondary hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button
              aria-label="Open menu"
              className="md:hidden p-2 text-foreground-secondary hover:text-foreground"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-6">
            <div className="grid gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-base font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-foreground-secondary hover:text-primary"
                  }`}
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
