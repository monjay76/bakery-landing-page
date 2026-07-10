import { Instagram, Facebook, Twitter, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2B1E1A] text-cream/85 py-16 border-t border-espresso/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Bio */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-2xl font-display font-medium text-cream italic">The Velvet Crumb</h3>
            <p className="text-xs text-cream/70 leading-relaxed max-w-sm">
              Nourishing sourdough breads, laminated butter pastries, and classic heritage sweets baked at dawn using certified stone-milled organic flours.
            </p>
            <p className="text-[10px] text-cream/50">
              © 2026 The Velvet Crumb Bakery. Lovingly crafted for our neighbors.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-gold uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#why-us" className="text-cream/80 hover:text-gold transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#menu" className="text-cream/80 hover:text-gold transition-colors">
                  Hearth Menu
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-cream/80 hover:text-gold transition-colors">
                  Guest Journal
                </a>
              </li>
              <li>
                <a href="#contact" className="text-cream/80 hover:text-gold transition-colors">
                  Visit Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social connections & corporate main site */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-gold uppercase tracking-wider">Connect</h4>
            <div className="flex items-center gap-4 text-cream/80">
              <a href="#" className="hover:text-gold transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="hover:text-gold transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="hover:text-gold transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a
                href="https://velvetcrumb-main-example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors flex items-center gap-1 text-xs"
              >
                <span>Bakery Journal</span>
                <ExternalLink size={12} />
              </a>
            </div>
            <p className="text-[11px] text-cream/60 leading-relaxed">
              123 Crumb Lane, Pastry District<br />
              San Francisco, CA 94103
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
