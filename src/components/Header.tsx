import React, { useState, useEffect } from 'react';
import { ActivePage, CartItem, Product } from '../types';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  cartItems: CartItem[];
  wishlistIds: string[];
  allProducts: Product[];
  onOpenCart?: () => void;
  onOpenProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  setActivePage,
  cartItems,
  wishlistIds,
  allProducts,
  onOpenCart,
  onOpenProfile,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(5 * 3600 + 22 * 60 + 41);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  // Live timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 6 * 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, '0')}h : ${String(m).padStart(2, '0')}m : ${String(s).padStart(2, '0')}s`;
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const matchedProducts = searchQuery.trim()
    ? allProducts.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const wishlistedProducts = allProducts.filter((p) => wishlistIds.includes(p.id));

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        {/* Flash Sale Top Ribbon */}
        <aside className="w-full bg-surface-container-high py-1 px-3 sm:px-6 text-center overflow-hidden border-b border-outline-variant/20">
          <div className="inline-flex items-center justify-center gap-2 sm:gap-3 text-on-surface tracking-wider text-[10px] sm:text-[11px] uppercase font-semibold">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-ping"></span>
            <span className="truncate max-w-[200px] xs:max-w-[300px] sm:max-w-none">
              FLASH ARCHIVE SALE — Up to 45% Off Selected Styles • Free Express Shipping Over $150
            </span>
            <span className="px-2 py-0.5 bg-surface-container font-mono font-bold rounded-full text-secondary tabular-nums text-[10px]">
              {formatTime(secondsLeft)}
            </span>
          </div>
        </aside>

        {/* Main Navbar */}
        <div className="h-16 sm:h-20 max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-3 sm:gap-6">
          {/* Logo */}
          <div
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 cursor-pointer select-none"
            onClick={() => setActivePage('home')}
          >
            <img
              alt="LUMIÈRE Studio Brand Logo"
              className="h-7 sm:h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1WY1FWDcerjS0Qz5EX3SD29sWgWbZzKozTnHBFQboLEtBXhoOdZDqCC7jWPpeF_jZn6v3N7KzNRcf-Zv4OosG5wm08sTaKjjQuNnjeP47Hn9E49xt3HdDrhfk5vMYSpXX2JhfgnzRN_U-Qbnef5G3LZrUdUFt-LVmWvRMXkVr_UK7VkFgjaInv9qGmeySv0Be4J3Y59VtR0WhcGGpQVi00PQPjQuZXf2Xue1gp6sDuJfLBk556ujvY-Zho"
            />
            <span className="font-headline-sm text-base sm:text-xl tracking-tight text-on-surface font-serif whitespace-nowrap">
              LUMIÈRE STUDIO
            </span>
          </div>

          {/* Desktop & Tablet Nav Links */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-7">
            {(
              [
                { id: 'home', label: 'Home' },
                { id: 'shop', label: 'Shop', badge: 'Sale' },
                { id: 'reviews', label: 'Reviews' },
                { id: 'checkout', label: 'Checkout' },
                { id: 'contact', label: 'Contact' },
              ] as const
            ).map((link) => (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id)}
                className={`uppercase tracking-wider transition-all font-label-md text-xs sm:text-sm cursor-pointer relative py-1 flex items-center gap-1.5 whitespace-nowrap ${
                  activePage === link.id
                    ? 'text-on-surface font-bold border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span>{link.label}</span>
                {'badge' in link && (
                  <span className="px-1.5 py-0.2 bg-secondary text-on-secondary text-[9px] rounded-full font-bold">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Prominent Shop Archive Button for quick visibility */}
            <button
              onClick={() => setActivePage('shop')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm ${
                activePage === 'shop'
                  ? 'bg-secondary text-on-secondary shadow-md ring-2 ring-secondary/30'
                  : 'bg-primary text-on-primary hover:bg-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">storefront</span>
              <span className="whitespace-nowrap">Shop Catalog</span>
            </button>

            {/* Search Button */}
            <button
              aria-label="Search"
              className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
            </button>

            {/* Currency Selector */}
            <div className="hidden lg:flex items-center font-label-sm text-xs text-on-surface-variant hover:text-on-surface transition-colors relative group cursor-pointer">
              <span className="mr-1">{selectedCurrency}</span>
              <span className="font-semibold">{selectedCurrency === 'EUR' ? '€' : selectedCurrency === 'GBP' ? '£' : '$'}</span>
              <div className="absolute top-full right-0 mt-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-1 hidden group-hover:block shadow-lg z-50 min-w-[70px]">
                {['USD', 'EUR', 'GBP'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setSelectedCurrency(curr)}
                    className="w-full text-left px-2 py-1 text-[11px] hover:bg-surface-container rounded-lg"
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            {/* Wishlist Button with Flyout */}
            <div className="relative">
              <button
                aria-label="Wishlist"
                className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer relative"
                type="button"
                onClick={() => setIsWishlistOpen(!isWishlistOpen)}
              >
                <span className="material-symbols-outlined text-[18px]">favorite</span>
                {wishlistIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-on-secondary font-label-sm text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlistIds.length}
                  </span>
                )}
              </button>

              {/* Wishlist Popover */}
              {isWishlistOpen && (
                <div className="absolute top-full right-0 mt-3 w-80 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-surface-container-low mb-2">
                    <span className="font-title-md text-sm font-semibold text-on-surface">Your Saved Archive</span>
                    <span className="text-xs text-on-surface-variant">{wishlistIds.length} pieces</span>
                  </div>
                  {wishlistedProducts.length === 0 ? (
                    <div className="py-4 text-center">
                      <p className="text-xs text-on-surface-variant mb-2">Your wishlist is empty.</p>
                      <button
                        onClick={() => {
                          setActivePage('shop');
                          setIsWishlistOpen(false);
                        }}
                        className="text-xs font-semibold text-secondary hover:underline cursor-pointer"
                      >
                        Explore Shop Pieces &rarr;
                      </button>
                    </div>
                  ) : (
                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {wishlistedProducts.map((item) => (
                        <div key={item.id} className="flex items-center gap-2.5 p-2 bg-surface-container-low rounded-xl">
                          <img src={item.imageUrl} alt={item.name} className="w-11 h-14 object-cover rounded-lg" />
                          <div className="flex-1 min-w-0">
                            <span className="font-medium text-xs text-on-surface truncate block">{item.name}</span>
                            <span className="text-xs font-semibold text-secondary">${item.price}</span>
                          </div>
                          <button
                            onClick={() => {
                              setActivePage('shop');
                              setIsWishlistOpen(false);
                            }}
                            className="text-[11px] bg-primary text-on-primary px-3 py-1 rounded-full uppercase tracking-wider font-semibold cursor-pointer hover:bg-on-surface-variant transition-colors"
                          >
                            View
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              aria-label="Cart"
              className="relative flex items-center gap-2 h-9 px-3 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors cursor-pointer"
              type="button"
              onClick={() => (onOpenCart ? onOpenCart() : setActivePage('checkout'))}
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              <span className="hidden sm:inline font-label-sm text-xs uppercase tracking-wider font-semibold whitespace-nowrap">
                {cartItemCount} • ${cartTotal.toFixed(0)}
              </span>
              <span className="sm:hidden absolute -top-1 -right-1 bg-primary text-on-primary font-label-sm text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            </button>

            {/* Profile Avatar Button (Client Profile Setup) */}
            <button
              onClick={() => onOpenProfile?.()}
              className="flex items-center p-0.5 rounded-full ring-2 ring-outline-variant/30 hover:ring-secondary transition-all cursor-pointer relative group"
              title="Atelier Profile & Sizing Setup"
              type="button"
            >
              <img
                alt="Profile Avatar"
                className="w-8 h-8 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp8KxEBu1Ffxwl6HrGxiPkHMwjSGUdzRtB_W5J6In3xlqalw0WNFZTMEoxt4rW9-v-hhZ6CkH4XNcoddUaVpSyY-RLNPKIrwD0YeejVYDeEUx-A0dA68aEkkpVT-rtMdVPkFA2lPGkBbZGXW3pIb-t_yVFmpz7vuqhd_yfFFDgbI5d5mshg3dafkDZurKX5BoyYV-ftnLmkBt26P4aQSJv-XdgpN4ucxfLAwNMgRIfuIRliD-01UQL"
              />
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-secondary border border-surface"></span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              className="md:hidden w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-surface-container-lowest border-b border-outline-variant/30 px-6 py-4 flex flex-col gap-2 animate-in fade-in duration-200">
            {(
              [
                { id: 'home', label: 'Home Archive', icon: 'home', highlight: false },
                { id: 'shop', label: 'Shop All Silhouettes', icon: 'storefront', highlight: true },
                { id: 'reviews', label: 'Client Reviews & Lookbook', icon: 'rate_review', highlight: false },
                { id: 'checkout', label: `Bag (${cartItemCount}) & Checkout`, icon: 'shopping_bag', highlight: false },
                { id: 'contact', label: 'Concierge & Atelier Care', icon: 'support_agent', highlight: false },
              ] as const
            ).map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActivePage(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-label-md text-sm uppercase tracking-wider text-left transition-all ${
                  activePage === link.id
                    ? 'bg-primary text-on-primary font-bold'
                    : 'text-on-surface hover:bg-surface-container-low'
                } ${link.highlight && activePage !== link.id ? 'text-secondary font-bold' : ''}`}
              >
                <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                <span>{link.label}</span>
              </button>
            ))}

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenProfile?.();
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-label-md text-sm uppercase tracking-wider text-left mt-2 hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[20px] text-secondary">person</span>
              <span>Client Profile &amp; Sizing Setup</span>
            </button>
          </div>
        )}

        {/* Search Overlay Drawer */}
        {isSearchOpen && (
          <div className="w-full bg-surface-container-lowest border-b border-outline-variant/30 px-4 sm:px-8 py-4 shadow-lg animate-in fade-in duration-200">
            <div className="max-w-[1440px] mx-auto">
              <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2.5 rounded-full">
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search silhouettes, linen tunics, slip dresses, trousers..."
                  className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>

              {matchedProducts.length > 0 && (
                <div className="mt-4 pt-3 border-t border-surface-container-low grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {matchedProducts.slice(0, 4).map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        setActivePage('shop');
                        setIsSearchOpen(false);
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-2xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors"
                    >
                      <img src={prod.imageUrl} alt={prod.name} className="w-12 h-14 object-cover rounded-xl" />
                      <div className="min-w-0">
                        <p className="font-medium text-xs text-on-surface truncate">{prod.name}</p>
                        <p className="text-xs text-secondary font-bold">${prod.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Persistent Mobile Bottom Navigation Bar: Guarantees user can always see & tap "Shop" */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-outline-variant/30 py-2 px-3 flex items-center justify-around shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => setActivePage('home')}
          className={`flex flex-col items-center gap-0.5 p-1 transition-colors ${
            activePage === 'home' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">home</span>
          <span className="text-[10px] uppercase font-semibold">Home</span>
        </button>

        <button
          onClick={() => setActivePage('shop')}
          className={`flex flex-col items-center gap-0.5 p-1 relative transition-colors ${
            activePage === 'shop' ? 'text-secondary font-bold' : 'text-on-surface'
          }`}
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[20px]">storefront</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-secondary"></span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider">Shop</span>
        </button>

        <button
          onClick={() => setActivePage('reviews')}
          className={`flex flex-col items-center gap-0.5 p-1 transition-colors ${
            activePage === 'reviews' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">rate_review</span>
          <span className="text-[10px] uppercase font-semibold">Reviews</span>
        </button>

        <button
          onClick={() => (onOpenCart ? onOpenCart() : setActivePage('checkout'))}
          className={`flex flex-col items-center gap-0.5 p-1 relative transition-colors ${
            activePage === 'checkout' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-secondary text-on-secondary font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] uppercase font-semibold">Bag</span>
        </button>

        <button
          onClick={() => onOpenProfile?.()}
          className="flex flex-col items-center gap-0.5 p-1 text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">person</span>
          <span className="text-[10px] uppercase font-semibold">Profile</span>
        </button>
      </div>
    </>
  );
};
