
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash navigation
  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      const id = location.hash.substring(1); // Remove the # character
      const element = document.getElementById(id);
      
      if (element) {
        // Add a small delay to ensure the page has fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
  ];

  const handleNavClick = (path: string) => {
    // If it's a hash link on the current page
    if (path.includes('#') && location.pathname === '/') {
      const id = path.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled ? "glass border-b border-white/10 backdrop-blur-lg" : ""
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Attendly
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => handleNavClick(link.path)}
              className={cn(
                "text-foreground/80 hover:text-foreground transition-colors",
                location.pathname === link.path.split('#')[0] && "font-medium text-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button variant="outline">Log in</Button>
          </Link>
          <Link to="/login">
            <Button>Get Started</Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-b border-white/10 animate-fade-in">
          <div className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => handleNavClick(link.path)}
                className={cn(
                  "text-foreground/80 py-2 hover:text-foreground transition-colors",
                  location.pathname === link.path.split('#')[0] && "font-medium text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login">
                <Button variant="outline" className="w-full">Log in</Button>
              </Link>
              <Link to="/login">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
