import React, { useState } from 'react';
import { ActivePage } from '../types';

interface FooterProps {
  setActivePage?: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 500);
    }
  };

  return (
    <footer className="w-full bg-surface-container-low mt-space-xl border-t border-outline-variant/20">
      <div className="max-w-[1440px] mx-auto px-margin pt-space-xl pb-space-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-space-xl">
          {/* Brand Left Column */}
          <div className="md:col-span-5 flex flex-col justify-between pr-space-md">
            <div className="mb-space-md">
              <span className="font-headline-sm text-headline-sm text-on-surface block mb-space-xs font-serif">
                LUMIÈRE STUDIO
              </span>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                Refined modern tailoring and archival textiles crafted for deliberate timelessness. A quiet study in silhouette, natural fiber, and effortless presence.
              </p>
            </div>
            <div className="mt-space-md">
              <span className="font-label-sm text-label-sm uppercase text-on-surface block mb-space-xs tracking-wider font-semibold">
                Explore The Atelier
              </span>
              <div className="flex flex-wrap items-center gap-space-md mb-space-md font-label-md text-label-md">
                {setActivePage && (
                  <>
                    <button
                      onClick={() => setActivePage('home')}
                      className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                    >
                      Home Archive
                    </button>
                    <button
                      onClick={() => setActivePage('shop')}
                      className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                    >
                      Catalog Shop
                    </button>
                    <button
                      onClick={() => setActivePage('reviews')}
                      className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                    >
                      Client Testimonials
                    </button>
                    <button
                      onClick={() => setActivePage('contact')}
                      className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                    >
                      Atelier Concierge
                    </button>
                    <button
                      onClick={() => setActivePage('checkout')}
                      className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                    >
                      Secure Checkout
                    </button>
                  </>
                )}
              </div>
              <span className="font-label-sm text-label-sm uppercase text-on-surface block mb-space-xs tracking-wider">
                Follow the Journal
              </span>
              <div className="flex items-center gap-space-md">
                <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#journal" onClick={(e) => e.preventDefault()}>
                  Instagram
                </a>
                <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#journal" onClick={(e) => e.preventDefault()}>
                  Pinterest
                </a>
                <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#journal" onClick={(e) => e.preventDefault()}>
                  TikTok
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Right Column */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div className="bg-surface-container-lowest p-space-lg shadow-[0_1px_8px_rgba(0,0,0,0.02)] mb-space-lg rounded">
              <span className="font-headline-sm text-headline-sm text-on-surface block mb-1 font-serif">
                Join the Archive
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                Receive 10% off your first order, private preview invitations, and curated editorial lookbooks.
              </p>
              {subscribed ? (
                <div className="bg-tertiary-fixed text-on-tertiary-fixed p-space-sm rounded font-body-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span>Welcome to the Archive. Your 10% welcome code has been sent to {email || 'your email'}.</span>
                </div>
              ) : (
                <form className="flex flex-col sm:flex-row gap-space-xs" onSubmit={handleSubmit}>
                  <input
                    className="flex-1 bg-surface-container-low px-5 py-3 font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:bg-surface transition-all rounded-full border border-outline-variant/30"
                    placeholder="Enter your email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    className="bg-primary text-on-primary px-7 py-3 font-label-md text-xs uppercase tracking-wider hover:bg-on-surface-variant transition-colors rounded-full cursor-pointer font-semibold shadow-sm"
                    type="submit"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter pt-space-md">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
                <div>
                  <span className="block font-label-sm text-label-sm text-on-surface uppercase">Safe Checkout</span>
                  <span className="block font-body-sm text-[11px] text-on-surface-variant leading-none">256-Bit SSL Encrypted</span>
                </div>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[20px]">sync</span>
                <div>
                  <span className="block font-label-sm text-label-sm text-on-surface uppercase">30-Day Returns</span>
                  <span className="block font-body-sm text-[11px] text-on-surface-variant leading-none">Complimentary Exchange</span>
                </div>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[20px]">eco</span>
                <div>
                  <span className="block font-label-sm text-label-sm text-on-surface uppercase">Carbon Neutral</span>
                  <span className="block font-body-sm text-[11px] text-on-surface-variant leading-none">Certified Sustainable</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-space-md flex flex-col md:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-body-sm text-body-sm border-t border-surface-container-high">
          <p className="font-label-sm text-[11px] tracking-wider uppercase">
            © 2026 LUMIÈRE STUDIO INC. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-space-md font-label-sm text-[11px] uppercase tracking-wider">
            <a className="hover:text-on-surface transition-colors" href="#terms" onClick={(e) => e.preventDefault()}>
              Terms of Service
            </a>
            <a className="hover:text-on-surface transition-colors" href="#privacy" onClick={(e) => e.preventDefault()}>
              Privacy Policy
            </a>
            <a className="hover:text-on-surface transition-colors" href="#sustainability" onClick={(e) => e.preventDefault()}>
              Sustainability Report
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
