import React, { useState, useEffect } from 'react';
import { ActivePage, CartItem, Product } from './types';
import { ALL_PRODUCTS } from './data/products';
import { FASHION_IMAGES } from './data/fashionImages';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProfileModal } from './components/ProfileModal';
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ReviewsView } from './views/ReviewsView';
import { CheckoutView } from './views/CheckoutView';
import { ContactView } from './views/ContactView';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-1', 'prod-3']);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // If page changes to profile, open profile modal
  useEffect(() => {
    if (activePage === 'profile') {
      setIsProfileModalOpen(true);
    }
  }, [activePage]);

  // Initial cart items matching checkout.png and flash sale items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      productId: 'prod-1',
      name: 'Raw Linen Oversized Blazer',
      variant: 'Oatmeal Sand • Size Medium (38)',
      price: 122.0,
      originalPrice: 188.0,
      discountBadge: '-35%',
      quantity: 1,
      imageUrl: FASHION_IMAGES.linenBlazerCart,
    },
    {
      id: 'cart-2',
      productId: 'prod-2',
      name: 'Pleated Studio Trouser',
      variant: 'Terracotta Clay • Size 30',
      price: 62.0,
      originalPrice: 82.0,
      discountBadge: '-25%',
      quantity: 1,
      imageUrl: FASHION_IMAGES.pleatedTrouserCart,
    },
  ]);

  // Toast system
  const [toast, setToast] = useState<{ visible: boolean; title: string; subtitle?: string }>({
    visible: false,
    title: '',
  });

  const showToast = (title: string, subtitle?: string) => {
    setToast({ visible: true, title, subtitle });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3500);
  };

  // Scroll to top whenever activePage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Cart operations
  const handleAddToCart = (newItem: Omit<CartItem, 'id'>) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.productId === newItem.productId && item.variant === newItem.variant
      );
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
        );
      }
      return [...prev, { ...newItem, id: `cart-${Date.now()}` }];
    });
    showToast(`${newItem.name} Added`, `Added to your atelier selection (${newItem.variant})`);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Piece Removed', 'Item removed from bag');
  };

  // Wishlist operations
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'Piece removed from saved archive');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist', 'Piece added to your private archive');
        return [...prev, productId];
      }
    });
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface selection:bg-secondary-fixed selection:text-on-secondary-fixed font-body">
      {/* Universal Sticky Header with Announcement Ribbon */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        cartItems={cartItems}
        wishlistIds={wishlistIds}
        allProducts={ALL_PRODUCTS}
        onOpenCart={() => setIsCartDrawerOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Main Content Area with offset for fixed header */}
      <main className="flex-1 w-full pt-[96px] md:pt-[104px]">
        {activePage === 'home' && (
          <HomeView
            setActivePage={setActivePage}
            onNavigateToShop={() => setActivePage('shop')}
            onNavigateToReviews={() => setActivePage('reviews')}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onShowToast={showToast}
          />
        )}

        {activePage === 'shop' && (
          <ShopView
            products={ALL_PRODUCTS}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onShowToast={showToast}
            onNavigateToCheckout={() => setActivePage('checkout')}
          />
        )}

        {activePage === 'reviews' && (
          <ReviewsView
            onShowToast={showToast}
            onNavigateToShop={() => setActivePage('shop')}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutView
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onAddToCart={handleAddToCart}
            onShowToast={showToast}
            onNavigateToShop={() => setActivePage('shop')}
          />
        )}

        {activePage === 'contact' && (
          <ContactView onShowToast={showToast} />
        )}
      </main>

      {/* Universal Atelier Footer */}
      <Footer setActivePage={setActivePage} />

      {/* Profile & Sizing Customization Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false);
          if (activePage === 'profile') setActivePage('home');
        }}
        onShowToast={showToast}
        onNavigateToShop={() => {
          setIsProfileModalOpen(false);
          setActivePage('shop');
        }}
      />

      {/* Global Slide-Over Cart Drawer */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartDrawerOpen(false)}
          ></div>

          {/* Drawer Panel */}
          <div className="relative w-full max-w-md bg-surface-container-lowest h-full shadow-2xl z-10 flex flex-col justify-between p-space-lg overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-low mb-space-md">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary block font-bold">
                    Lumière Atelier
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-serif">
                    Your Selection ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* Free shipping progress */}
              <div className="bg-surface-container-low p-space-sm rounded mb-space-md">
                <div className="flex items-center justify-between text-body-sm mb-1">
                  <span className="font-medium text-on-surface">
                    {cartTotal >= 150 ? 'Unlocked Free Carbon Shipping!' : `Add $${(150 - cartTotal).toFixed(0)} more for Free Express Shipping`}
                  </span>
                  <span className="text-secondary font-bold">
                    {Math.min(100, Math.round((cartTotal / 150) * 100))}%
                  </span>
                </div>
                <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (cartTotal / 150) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Items List */}
              {cartItems.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="font-body-md text-on-surface-variant mb-space-sm">Your shopping bag is currently empty.</p>
                  <button
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      setActivePage('shop');
                    }}
                    className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-on-surface-variant transition-colors cursor-pointer shadow-sm"
                  >
                    Browse Archive Pieces
                  </button>
                </div>
              ) : (
                <div className="space-y-space-sm divide-y divide-surface-container-low">
                  {cartItems.map((item) => (
                    <div key={item.id} className="pt-space-sm flex gap-space-sm items-start">
                      <img src={item.imageUrl} alt={item.name} referrerPolicy="no-referrer" className="w-16 h-20 object-cover rounded-xl bg-surface" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h4 className="font-title-md text-sm text-on-surface font-semibold truncate">{item.name}</h4>
                          <span className="font-title-md text-sm font-bold text-on-surface ml-2">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <p className="font-body-sm text-xs text-on-surface-variant truncate">{item.variant}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center bg-surface-container-low rounded-full px-2.5 py-0.5 gap-2 border border-outline-variant/20">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="text-xs text-on-surface-variant hover:text-on-surface cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-xs font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="text-xs text-on-surface-variant hover:text-on-surface cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-[11px] text-on-surface-variant hover:text-secondary underline cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            {cartItems.length > 0 && (
              <div className="pt-space-md border-t border-surface-container-low mt-space-md">
                <div className="flex justify-between items-baseline mb-space-md">
                  <span className="font-label-md text-label-md uppercase text-on-surface-variant">Subtotal</span>
                  <span className="font-headline-sm text-headline-sm font-serif font-bold text-on-surface">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setActivePage('checkout');
                  }}
                  className="w-full bg-primary text-on-primary py-3.5 rounded-full font-label-md text-xs uppercase tracking-wider font-bold hover:bg-on-surface-variant transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
                >
                  <span>Proceed to Checkout</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full mt-2 py-2 text-center text-body-sm text-on-surface-variant hover:text-on-surface font-medium cursor-pointer rounded-full hover:bg-surface-container-low transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global Interactive Floating Toast Notification */}
      {toast.visible && (
        <div className="fixed top-24 right-6 z-50 bg-surface-container-lowest border border-outline-variant/30 text-on-surface px-space-md py-space-sm rounded-lg shadow-2xl flex items-start gap-3 max-w-sm animate-in fade-in slide-in-from-top-3">
          <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">check_circle</span>
          <div className="flex-1">
            <h5 className="font-title-md text-sm font-semibold text-on-surface leading-snug">{toast.title}</h5>
            {toast.subtitle && (
              <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 leading-normal">{toast.subtitle}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
