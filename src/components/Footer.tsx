
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border/40">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                Attendly
              </span>
            </Link>
            <p className="text-foreground/70 text-sm max-w-xs">
              Revolutionizing attendance management with advanced facial recognition technology.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/#about" className="text-foreground/70 hover:text-foreground text-sm transition-colors">About</Link></li>
              <li><Link to="/login" className="text-foreground/70 hover:text-foreground text-sm transition-colors">Get Started</Link></li>
              <li><Link to="/dashboard" className="text-foreground/70 hover:text-foreground text-sm transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="mailto:support@attendly.com" className="text-foreground/70 hover:text-foreground text-sm transition-colors">Support</a></li>
              <li><a href="tel:+1234567890" className="text-foreground/70 hover:text-foreground text-sm transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/#about" className="text-foreground/70 hover:text-foreground text-sm transition-colors">About Us</Link></li>
              <li><a href="mailto:info@attendly.com" className="text-foreground/70 hover:text-foreground text-sm transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/40 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60">
            &copy; {new Date().getFullYear()} Attendly. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
