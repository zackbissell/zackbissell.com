
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
    <nav className="fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-foreground/10">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between p-4">
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
                  ? "text-foreground"
                  : "text-foreground/70 hover:text-foreground"
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
              className="md:hidden p-2 text-foreground/80 hover:text-foreground"
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
                      ? "text-foreground"
                      : "text-foreground/70 hover:text-foreground"
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
