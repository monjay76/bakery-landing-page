import { useState } from 'react';
import { Menu, X, Sparkles, Code, Users, Sprout, Leaf } from 'lucide-react';

interface HeaderProps {
  onOpenExporter: () => void;
  onOpenLeads: () => void;
  leadCount: number;
}

export default function Header({ onOpenExporter, onOpenLeads, leadCount }: HeaderProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Our Story', href: '#why-us' },
    { label: 'Hearth Menu', href: '#menu' },
    { label: 'Guest Journal', href: '#testimonials' },
    { label: 'Visit Us', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-espresso/5 transition-all">
      {/* Top Cozy Banner */}
      <div className="bg-[#5C4033] text-cream-light text-[11px] font-medium py-2.5 px-4 text-center tracking-wide flex justify-center items-center gap-2">
        <Leaf size={12} className="text-gold animate-bounce" />
        <span>Freshly baked at dawn: Warm sourdough & golden canelés straight from the hearth! 🌾</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold/20 transition-all">
              <Sprout size={18} />
            </div>
            <span className="text-2xl font-display font-semibold tracking-tight text-espresso group-hover:text-gold transition-colors">
              The Velvet Crumb
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-espresso/80 hover:text-gold transition-colors relative after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:h-[3px] after:w-0 hover:after:w-4 after:bg-gold/60 after:rounded-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* Lead Dashboard Quick Access */}
            <button
              onClick={onOpenLeads}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-espresso/10 bg-cream-light text-[11px] font-medium text-espresso/70 hover:text-espresso hover:border-espresso/30 transition-all relative"
              title="Admin Lead Viewer"
            >
              <Users size={12} className="text-gold" />
              <span>Journal Leads</span>
              {leadCount > 0 && (
                <span className="absolute -top-1.5 -right-1 bg-gold text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-cream animate-pulse">
                  {leadCount}
                </span>
              )}
            </button>

            {/* Standalone HTML Exporter */}
            <button
              onClick={onOpenExporter}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-espresso/10 bg-cream-light text-[11px] font-medium text-espresso/70 hover:text-espresso hover:border-espresso/30 transition-all"
              title="Get GitHub Pages HTML"
            >
              <Code size={12} className="text-gold" />
              <span>Export HTML</span>
            </button>

            {/* Main CTA */}
            <a
              href="#vip-club"
              className="bg-gold hover:bg-[#C29E2E] text-white transition-all px-6 py-2.5 rounded-full text-xs font-semibold shadow-sm hover:shadow-md"
            >
              Join the Hearth Club
            </a>
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOpenExporter}
              className="p-2 text-espresso/70 hover:text-espresso"
              title="Export HTML"
            >
              <Code size={18} />
            </button>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 text-espresso hover:text-gold focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-espresso/5 bg-cream-light px-4 py-6 space-y-4 shadow-lg animate-fade-in rounded-b-3xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="block text-sm font-medium text-espresso/80 hover:text-gold py-3 border-b border-espresso/5"
            >
              {link.label}
            </a>
          ))}
          
          <div className="pt-4 grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setIsMobileOpen(false);
                onOpenLeads();
              }}
              className="flex items-center justify-center gap-1.5 py-3 border border-espresso/10 bg-cream rounded-2xl text-xs font-medium text-espresso"
            >
              <Users size={14} className="text-gold" />
              <span>Leads ({leadCount})</span>
            </button>
            <button
              onClick={() => {
                setIsMobileOpen(false);
                onOpenExporter();
              }}
              className="flex items-center justify-center gap-1.5 py-3 border border-espresso/10 bg-cream rounded-2xl text-xs font-medium text-espresso"
            >
              <Code size={14} className="text-gold" />
              <span>Export HTML</span>
            </button>
          </div>

          <a
            href="#vip-club"
            onClick={() => setIsMobileOpen(false)}
            className="block w-full text-center bg-gold text-white py-3 rounded-2xl text-xs font-semibold"
          >
            Join the Hearth Club
          </a>
        </div>
      )}
    </header>
  );
}
