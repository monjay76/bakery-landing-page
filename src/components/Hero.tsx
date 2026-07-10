import React, { useState } from 'react';
import { Mail, User, Leaf, Sprout, Check, Copy } from 'lucide-react';
import { Lead } from '../types';

interface HeroProps {
  onAddLead: (lead: Omit<Lead, 'id' | 'timestamp' | 'couponCode'>) => void;
}

export default function Hero({ onAddLead }: HeroProps) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;

    // Trigger parent callback
    onAddLead({ firstName: firstName.trim(), email: email.trim() });
    setSubmitted(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('VELVET10VIP');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-b border-espresso/5 bg-gradient-to-b from-cream-light to-cream">
      {/* Background soft organic textures and leaves */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Block: Narrative Copy & Lead Capture Form */}
          <div className="lg:col-span-7 space-y-8 animate-fade-in">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-gold/10 text-[#5C4033] border border-gold/20">
                <Leaf size={12} className="text-gold" />
                <span>Nourished by hand, slow-fermented, woodfired daily</span>
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium tracking-tight text-espresso leading-tight">
                Baked from the Heart,<br />
                <span className="text-gold font-display italic font-semibold relative">
                  Perfected by Time.
                  <span className="absolute left-0 bottom-1 w-full h-[6px] bg-gold-light/40 -z-10 rounded-full"></span>
                </span>
              </h1>
              <p className="text-base text-espresso-muted leading-relaxed max-w-xl">
                Gather around our stone hearth. We bake with organic, heirloom grains, slow-rising wild yeasts, and wholesome creamery butter to bring you honest loaves and flaky morning pastries that nourish the soul.
              </p>
            </div>

            {/* Leads Signup Card */}
            <div id="vip-club" className="bg-[#FAF6F0] p-6 sm:p-8 rounded-3xl border border-dashed border-espresso/15 max-w-xl space-y-6 transition-all shadow-sm hover:shadow-md">
              {!submitted ? (
                <>
                  <div className="space-y-1">
                    <h3 className="text-xl font-display font-medium text-espresso flex items-center gap-2">
                      <Sprout size={18} className="text-gold" />
                      <span>Join our Hearth Club</span>
                    </h3>
                    <p className="text-xs text-espresso-muted leading-relaxed">
                      Unlock <strong className="text-espresso font-semibold">10% off</strong> your first rustic basket, secure pre-order privileges, and get sweet notes when warm loaves leave our woodfired ovens.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="first-name-input" className="block text-[11px] font-medium text-espresso/70 tracking-wide">
                          Your Name
                        </label>
                        <div className="relative">
                          <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-espresso/40" />
                          <input
                            id="first-name-input"
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Amelie"
                            className="w-full bg-white border border-espresso/15 focus:border-gold focus:ring-1 focus:ring-gold rounded-full pl-10 pr-4 py-3 text-xs text-espresso outline-none transition-all placeholder:text-espresso/30"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="email-input" className="block text-[11px] font-medium text-espresso/70 tracking-wide">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-espresso/40" />
                          <input
                            id="email-input"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="amelie@woodland.com"
                            className="w-full bg-white border border-espresso/15 focus:border-gold focus:ring-1 focus:ring-gold rounded-full pl-10 pr-4 py-3 text-xs text-espresso outline-none transition-all placeholder:text-espresso/30"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      id="submit-lead-btn"
                      type="submit"
                      className="w-full bg-gold hover:bg-[#C29E2E] text-white font-medium text-xs py-3.5 px-6 rounded-full transition-all shadow-sm flex items-center justify-center gap-2 group hover:shadow"
                    >
                      <span>Join the Hearth & Get 10% Off</span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-4 space-y-5 animate-scale-up">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/10 text-gold rounded-full border border-gold/20">
                    <Check size={24} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-display font-medium text-espresso">Welcome home, {firstName}! 🌾</h3>
                    <p className="text-xs text-espresso-muted max-w-sm mx-auto">
                      Your sweet voucher has arrived. Bring this secret code on your next visit to receive 10% off our hand-rolled delights.
                    </p>
                  </div>
                  <div className="bg-white border-2 border-dashed border-gold/30 rounded-2xl py-4 px-6 inline-flex flex-col items-center gap-1.5 min-w-[240px] relative overflow-hidden">
                    <span className="text-[10px] text-espresso/60 font-medium tracking-wider uppercase">Secret Coupon Code</span>
                    <span className="text-2xl font-mono font-bold text-espresso tracking-widest select-all">VELVET10VIP</span>
                    <button
                      onClick={handleCopyCode}
                      className="mt-2 text-xs font-semibold text-gold hover:text-[#C29E2E] flex items-center gap-1 hover:underline"
                    >
                      {copied ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                      <span>{copied ? 'Copied code!' : 'Copy Code'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Block: Hero Image Layout */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 animate-fade-in">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-video lg:aspect-[4/5] border border-espresso/10 p-3 bg-white shadow-md group">
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img
                  src="/src/assets/images/bakery_hero_1783650620651.jpg"
                  alt="Warm rustic baking desk with fresh loaves and pastries under morning sun"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent" />
              </div>
              
              {/* Hot oven state banner */}
              <div className="absolute bottom-7 left-7 right-7 bg-[#FAF6F0]/95 backdrop-blur-md px-5 py-3 rounded-2xl flex items-center justify-between border border-espresso/5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
                  </span>
                  <div>
                    <span className="text-[9px] font-medium text-espresso/50 uppercase tracking-wider block">Oven Update</span>
                    <span className="text-xs font-semibold text-espresso">Warm Sourdough & Cardamom Roll</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-medium bg-gold/10 text-[#5C4033] px-2.5 py-1 rounded-full border border-gold/20">
                  15m Left
                </span>
              </div>
            </div>
            
            {/* Decorative organic shapes */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-gold/15 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-gold/10 rounded-full blur-2xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
