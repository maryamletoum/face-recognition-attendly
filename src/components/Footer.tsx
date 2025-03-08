
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
              <li><Link to="/#features" className="text-foreground/70 hover:text-foreground text-sm transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-foreground/70 hover:text-foreground text-sm transition-colors">Pricing</Link></li>
              <li><Link to="/security" className="text-foreground/70 hover:text-foreground text-sm transition-colors">Security</Link></li>
              <li><Link to="/enterprise" className="text-foreground/70 hover:text-foreground text-sm transition-colors">Enterprise</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/documentation" className="text-foreground/70 hover:text-foreground text-sm transition-colors">Documentation</Link></li>
              <li><Link to="/guides" className="text-foreground/70 hover:text-foreground text-sm transition-colors">Guides</Link></li>
              <li><Link to="/api" className="text-foreground/70 hover:text-foreground text-sm transition-colors">API Reference</Link></li>
              <li><Link to="/support" className="text-foreground/70 hover:text-foreground text-sm transition-colors">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-foreground/70 hover:text-foreground text-sm transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-foreground/70 hover:text-foreground text-sm transition-colors">Blog</Link></li>
              <li><Link to="/careers" className="text-foreground/70 hover:text-foreground text-sm transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-foreground/70 hover:text-foreground text-sm transition-colors">Contact</Link></li>
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
