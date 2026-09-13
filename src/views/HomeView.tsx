import React, { useState, useEffect } from 'react';
import { ActivePage, Product, CartItem } from '../types';
import { LOOKBOOK_ITEMS } from '../data/products';
import { FASHION_IMAGES } from '../data/fashionImages';

interface HomeViewProps {
  setActivePage?: (page: ActivePage) => void;
  onNavigateToShop?: () => void;
  onNavigateToReviews?: () => void;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onShowToast: (title: string, subtitle?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setActivePage,
  onNavigateToShop,
  onNavigateToReviews,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onShowToast,
}) => {
  // Navigation helper ensuring Shop is always reachable
  const handleGoToShop = () => {
    if (onNavigateToShop) onNavigateToShop();
    else if (setActivePage) setActivePage('shop');
  };

  const handleGoToReviews = () => {
    if (onNavigateToReviews) onNavigateToReviews();
    else if (setActivePage) setActivePage('reviews');
  };

  // Live flash sale countdown in home section
  const [timerSeconds, setTimerSeconds] = useState(4 * 3600 + 18 * 60 + 32);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 4 * 3600));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hrs = Math.floor(timerSeconds / 3600);
  const mins = Math.floor((timerSeconds % 3600) / 60);
  const secs = timerSeconds % 60;

  // Testimonials Carousel
  const testimonials = [
    {
      quote: '"Putting on Lumière clothes feels like stepping straight into holiday morning sunshine. Everything breathes, drapes softly, and actually makes you smile."',
      author: 'Camille Roux',
      loc: 'Marseille, France • Verified Customer',
      initials: 'CR',
    },
    {
      quote: '"The finest linen stitching I have encountered in two decades of tailoring appreciation. You feel light, graceful, and remarkably confident."',
      author: 'Julian Vane',
      loc: 'Austin, TX • Verified Customer',
      initials: 'JV',
    },
    {
      quote: '"We ordered matching shirts for our Amalfi trip with close friends. Everyone stopped us on the pier to ask about the colors and effortless fit!"',
      author: 'Ananya Sharma',
      loc: 'London, UK • Verified Customer',
      initials: 'AS',
    },
  ];
  const [testIdx, setTestIdx] = useState(0);

  const cycleTestimonial = (direction: number) => {
    setTestIdx((prev) => (prev + direction + testimonials.length) % testimonials.length);
  };

  const currentTest = testimonials[testIdx];

  // Quick buy helper
  const handleQuickBuy = (productName: string, price: number, image: string, variant: string) => {
    onAddToCart({
      productId: productName.toLowerCase().replace(/\s+/g, '-'),
      name: productName,
      variant,
      price,
      quantity: 1,
      imageUrl: image,
    });
    onShowToast(`${productName} Added`, 'Enjoy complimentary priority dispatch');
  };

  return (
    <div className="w-full flex flex-col">
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto px-margin-mobile sm:px-margin pt-space-lg pb-space-xl lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            {/* Left Editorial Copy */}
            <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 z-10">
              <div className="inline-flex items-center gap-2 mb-space-sm">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                  Capsule Nº 08
                </span>
              </div>
              <h1 className="font-display text-display-mobile sm:text-display text-on-surface mb-space-md leading-tight">
                Pure Radiance.<br />
                <span className="italic font-light text-secondary">Summer 2025.</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mb-space-lg">
                Effortless linen silhouettes drenched in golden-hour warmth. Crafted for spontaneous sun-drenched afternoons and collective laughter.
              </p>
              <div className="flex items-center gap-space-md flex-wrap">
                <button
                  onClick={handleGoToShop}
                  className="inline-flex items-center justify-center gap-space-sm bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider px-space-xl py-4 rounded-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer shadow-md"
                >
                  <span>Explore Collection</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
                <a
                  href="#categories"
                  className="inline-flex items-center justify-center font-label-md text-label-md uppercase tracking-wider px-space-lg py-4 rounded-full border border-outline-variant/30 text-on-surface hover:text-secondary hover:bg-surface-container transition-all"
                >
                  Lookbook
                </a>
              </div>
              {/* Micro Metatrend Tag */}
              <div className="mt-space-xl pt-space-md flex items-center gap-space-md">
                <div className="flex -space-x-2">
                  <span className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-[11px] font-bold text-secondary">
                    98%
                  </span>
                  <span className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-[11px] font-bold text-on-tertiary-fixed">
                    ECO
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  100% certified organic European flax linen &amp; regenerative botanical silks.
                </p>
              </div>
            </div>

            {/* Right Visual Mosaic */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative grid grid-cols-12 gap-space-sm sm:gap-space-md">
                {/* Main Hero Image */}
                <div className="col-span-8 overflow-hidden rounded-xl shadow-md aspect-[4/5] relative group">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt="High fashion luxury editorial lookbook photo of models smiling in warm golden Mediterranean sunlight"
                    src={FASHION_IMAGES.heroEditorial}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-md px-space-md py-2 rounded-full shadow-sm border border-outline-variant/20">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold">
                      The Archival Silhouette • Nº 08
                    </span>
                  </div>
                </div>

                {/* Secondary Tile */}
                <div className="col-span-4 flex flex-col gap-space-sm sm:gap-space-md">
                  <div className="overflow-hidden rounded-xl shadow-sm aspect-[3/4] relative group">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      alt="Joyful woman smiling radiantly in canary-yellow organic linen sundress"
                      src={FASHION_IMAGES.sundressLinen}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="bg-surface-container p-space-md rounded-xl flex flex-col justify-between h-full">
                    <span className="material-symbols-outlined text-secondary text-2xl">sunny</span>
                    <p className="font-headline-sm text-headline-sm text-on-surface leading-tight mt-2 font-serif">
                      Sunlight in every weave.
                    </p>
                    <span className="font-label-sm text-label-sm uppercase text-on-surface-variant mt-2 tracking-wider">
                      Ed. 04 / Summer Archive
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Smooth Scroll Anchor Indicator */}
          <div className="w-full flex justify-center mt-space-lg lg:mt-space-xl">
            <a
              aria-label="Scroll Down"
              className="inline-flex flex-col items-center gap-1 text-on-surface-variant hover:text-secondary transition-colors group"
              href="#featured-archive"
            >
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-[10px]">Scroll</span>
              <span className="material-symbols-outlined animate-bounce text-xl">keyboard_arrow_down</span>
            </a>
          </div>
        </div>
      </section>

      {/* LIVE FLASH SALE SPOTLIGHT */}
      <section className="w-full py-space-xl lg:py-28 bg-surface" id="featured-archive">
        <div className="max-w-[1440px] mx-auto px-margin-mobile sm:px-margin">
          {/* Section Header with Interactive Live Countdown */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md pb-space-lg">
            <div>
              <div className="inline-flex items-center gap-space-xs bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full font-label-sm text-xs uppercase tracking-widest mb-2 font-bold">
                <span className="material-symbols-outlined text-sm animate-pulse">local_fire_department</span>
                <span>Archival Flash Event</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface font-serif">
                Summer Radiance Archive
              </h2>
            </div>

            {/* Live Tabular Countdown Timer */}
            <div className="flex items-center gap-3 bg-surface-container-low px-4 sm:px-6 py-3 rounded-2xl shadow-sm">
              <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant hidden sm:inline font-semibold">
                Sale Ends In:
              </span>
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <span className="font-title-lg text-title-lg text-on-surface bg-surface-container-lowest px-3 py-1 rounded-xl shadow-sm tabular-nums font-bold">
                    {String(hrs).padStart(2, '0')}
                  </span>
                  <span className="font-label-sm text-[9px] uppercase tracking-wider text-on-surface-variant mt-1 font-semibold">Hrs</span>
                </div>
                <span className="font-title-lg text-secondary font-bold">:</span>
                <div className="flex flex-col items-center">
                  <span className="font-title-lg text-title-lg text-on-surface bg-surface-container-lowest px-3 py-1 rounded-xl shadow-sm tabular-nums font-bold">
                    {String(mins).padStart(2, '0')}
                  </span>
                  <span className="font-label-sm text-[9px] uppercase tracking-wider text-on-surface-variant mt-1 font-semibold">Min</span>
                </div>
                <span className="font-title-lg text-secondary font-bold">:</span>
                <div className="flex flex-col items-center">
                  <span className="font-title-lg text-title-lg text-secondary bg-surface-container-lowest px-3 py-1 rounded-xl shadow-sm font-semibold tabular-nums">
                    {String(secs).padStart(2, '0')}
                  </span>
                  <span className="font-label-sm text-[9px] uppercase tracking-wider text-on-surface-variant mt-1 font-semibold">Sec</span>
                </div>
              </div>
            </div>
          </div>

          {/* Flash Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Product Card 1 */}
            <div className="bg-surface-container-low rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col group">
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Radiant young smiling woman wearing a breezy ochre-colored relaxed camp-collar linen shirt"
                  src={FASHION_IMAGES.rivieraOvershirt}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                  <span className="bg-secondary text-on-secondary px-3 py-1 rounded-full font-label-sm text-xs font-bold uppercase tracking-wider shadow-sm">
                    35% OFF
                  </span>
                  <span className="bg-surface/90 backdrop-blur text-on-surface font-label-sm text-[10px] uppercase px-2.5 py-0.5 rounded-full tracking-widest font-semibold">
                    Selling Fast
                  </span>
                </div>
                <button
                  aria-label="Add to Wishlist"
                  onClick={() => onToggleWishlist('prod-9')}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-surface/90 backdrop-blur flex items-center justify-center transition-colors shadow-sm cursor-pointer ${
                    wishlistIds.includes('prod-9') ? 'text-secondary' : 'text-on-surface hover:text-secondary'
                  }`}
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-lg"
                    style={{ fontVariationSettings: wishlistIds.includes('prod-9') ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
              </div>
              <div className="p-space-lg flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Unisex Linen Tops
                    </span>
                    <div className="flex items-center gap-1 text-secondary">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                      ))}
                      <span className="font-label-sm text-label-sm text-on-surface font-bold ml-1">4.9</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">(128)</span>
                    </div>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs font-serif">
                    The Riviera Sol Linen Overshirt
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                    Woven in Normandy from zero-waste natural flax. Pre-softened for lived-in comfort from the first wear.
                  </p>
                </div>
                <div className="pt-space-md flex items-center justify-between">
                  <div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant line-through mr-2">$140</span>
                    <span className="font-title-lg text-title-lg text-secondary font-bold">$91</span>
                  </div>
                  <button
                    className="bg-primary hover:bg-on-surface-variant text-on-primary font-label-md text-xs sm:text-sm uppercase tracking-wider px-space-lg py-3 rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-sm font-semibold"
                    onClick={() =>
                      handleQuickBuy(
                        'The Riviera Sol Linen Overshirt',
                        91,
                        FASHION_IMAGES.rivieraOvershirt,
                        'Ochre • Size M'
                      )
                    }
                    type="button"
                  >
                    <span className="material-symbols-outlined text-base">shopping_bag</span>
                    <span>Quick Buy</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="bg-surface-container-low rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col group">
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Handsome joyful man smiling broadly in sage-green tailored camp shirt and relaxed sand-toned trousers"
                  src={FASHION_IMAGES.relaxedTrouserMen}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                  <span className="bg-secondary text-on-secondary px-3 py-1 rounded-full font-label-sm text-xs font-bold uppercase tracking-wider shadow-sm">
                    40% OFF
                  </span>
                  <span className="bg-surface/90 backdrop-blur text-on-surface font-label-sm text-[10px] uppercase px-2.5 py-0.5 rounded-full tracking-widest font-semibold">
                    Archive Exclusive
                  </span>
                </div>
                <button
                  aria-label="Add to Wishlist"
                  onClick={() => onToggleWishlist('prod-10')}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-surface/90 backdrop-blur flex items-center justify-center transition-colors shadow-sm cursor-pointer ${
                    wishlistIds.includes('prod-10') ? 'text-secondary' : 'text-on-surface hover:text-secondary'
                  }`}
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-lg"
                    style={{ fontVariationSettings: wishlistIds.includes('prod-10') ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
              </div>
              <div className="p-space-lg flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Relaxed Tailoring
                    </span>
                    <div className="flex items-center gap-1 text-secondary">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                      ))}
                      <span className="font-label-sm text-label-sm text-on-surface font-bold ml-1">5.0</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">(94)</span>
                    </div>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs font-serif">
                    The Atelier Relaxed Trouser
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                    Double pleated silhouette cut with wide flowing leg in breathable natural sage cotton silk blend.
                  </p>
                </div>
                <div className="pt-space-md flex items-center justify-between">
                  <div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant line-through mr-2">$185</span>
                    <span className="font-title-lg text-title-lg text-secondary font-bold">$111</span>
                  </div>
                  <button
                    className="bg-primary hover:bg-on-surface-variant text-on-primary font-label-md text-xs sm:text-sm uppercase tracking-wider px-space-lg py-3 rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-sm font-semibold"
                    onClick={() =>
                      handleQuickBuy(
                        'The Atelier Relaxed Trouser',
                        111,
                        FASHION_IMAGES.relaxedTrouserMen,
                        'Sage • Size 32'
                      )
                    }
                    type="button"
                  >
                    <span className="material-symbols-outlined text-base">shopping_bag</span>
                    <span>Quick Buy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING CURATED CATEGORIES */}
      <section className="w-full py-space-xl bg-surface-container-low" id="categories">
        <div className="max-w-[1440px] mx-auto px-margin-mobile sm:px-margin">
          <div className="text-center max-w-xl mx-auto mb-space-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary block mb-2">
              Curated Moods
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface font-serif">
              Vibrant Summer Chapters
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Dressing for radiant mornings, open skies, and sunset conviviality.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            {/* Category 1 */}
            <div
              className="flex flex-col items-center text-center group cursor-pointer"
              onClick={handleGoToShop}
            >
              <div className="w-full aspect-square rounded-full overflow-hidden p-2 bg-surface-container shadow-sm group-hover:shadow-md transition-all duration-300">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Exuberant woman in crisp warm-white linen shirt"
                    src={FASHION_IMAGES.linenBlouse}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <h4 className="font-title-md text-title-md text-on-surface mt-space-md group-hover:text-secondary transition-colors">
                Linen Essentials
              </h4>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mt-1">
                32 Styles
              </span>
            </div>

            {/* Category 2 */}
            <div
              className="flex flex-col items-center text-center group cursor-pointer"
              onClick={handleGoToShop}
            >
              <div className="w-full aspect-square rounded-full overflow-hidden p-2 bg-surface-container shadow-sm group-hover:shadow-md transition-all duration-300">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Radiant model wearing sunny-gold habotai silk slip blouse"
                    src={FASHION_IMAGES.silkSlipDress}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <h4 className="font-title-md text-title-md text-on-surface mt-space-md group-hover:text-secondary transition-colors">
                Sunlight Silk
              </h4>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mt-1">
                18 Styles
              </span>
            </div>

            {/* Category 3 */}
            <div
              className="flex flex-col items-center text-center group cursor-pointer"
              onClick={handleGoToShop}
            >
              <div className="w-full aspect-square rounded-full overflow-hidden p-2 bg-surface-container shadow-sm group-hover:shadow-md transition-all duration-300">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Joyful couple laughing together in terracotta and oatmeal fine knit summer cardigans"
                    src={FASHION_IMAGES.capriKnit}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <h4 className="font-title-md text-title-md text-on-surface mt-space-md group-hover:text-secondary transition-colors">
                Warm Knitwear
              </h4>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mt-1">
                24 Styles
              </span>
            </div>

            {/* Category 4 */}
            <div
              className="flex flex-col items-center text-center group cursor-pointer"
              onClick={handleGoToShop}
            >
              <div className="w-full aspect-square rounded-full overflow-hidden p-2 bg-surface-container shadow-sm group-hover:shadow-md transition-all duration-300">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Young person jumping with joy and smiling in park wearing relaxed trousers"
                    src={FASHION_IMAGES.cityShort}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <h4 className="font-title-md text-title-md text-on-surface mt-space-md group-hover:text-secondary transition-colors">
                Everyday Leisure
              </h4>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mt-1">
                40 Styles
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE LOOKBOOK STREET-STYLE STRIP */}
      <section className="w-full py-space-xl bg-surface overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-margin-mobile sm:px-margin mb-space-lg flex items-end justify-between">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary block mb-2">
              Live Community
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface font-serif">
              Street-Style Smiles
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-space-sm text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
            <span>Drag &amp; Hover for stories</span>
            <span className="material-symbols-outlined text-base">east</span>
          </div>
        </div>

        {/* Horizontal Ribbon Carousel */}
        <div className="w-full overflow-x-auto pb-4 no-scrollbar flex gap-space-md px-margin-mobile sm:px-margin snap-x">
          {LOOKBOOK_ITEMS.map((look) => (
            <div
              key={look.id}
              className="shrink-0 w-72 bg-surface-container-lowest p-3 rounded-2xl shadow-md snap-start relative group transition-transform duration-300 hover:-translate-y-2 cursor-pointer border border-outline-variant/20"
              onClick={handleGoToShop}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-xl relative">
                <img className="w-full h-full object-cover" alt={look.altText} src={look.imageUrl} referrerPolicy="no-referrer" />
                {/* Hover Review Bubble */}
                <div className="absolute inset-0 bg-primary/85 backdrop-blur-sm p-space-md flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-on-primary rounded">
                  <div className="flex text-secondary-fixed">
                    {[...Array(look.stars)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>
                  <p className="font-body-sm text-body-sm italic leading-relaxed">
                    "{look.quote}"
                  </p>
                  <span className="font-label-sm text-[10px] tracking-widest uppercase text-surface-container">
                    {look.authorLocation}
                  </span>
                </div>
              </div>
              <div className="pt-3 pb-1 flex justify-between items-center">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface">
                  {look.title}
                </span>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">
                  {look.handle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF & HAPPINESS METRIC */}
      <section className="w-full py-space-xl bg-surface-container-high relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-margin-mobile sm:px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            {/* Metric Visual Card */}
            <div className="lg:col-span-4 bg-surface-container-lowest p-space-xl rounded-xl shadow-sm">
              <div className="flex items-center gap-1 text-secondary mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
              </div>
              <span className="font-display text-display leading-none text-on-surface block font-bold font-serif">
                4.96
              </span>
              <p className="font-title-md text-title-md text-on-surface mt-2 font-semibold">
                Loved by 40,000+ smiling people worldwide
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                Verified orders across 48 countries with an industry-low 3% return rate.
              </p>
              <div className="mt-space-lg pt-space-md flex items-center justify-between border-t border-surface-container-low">
                <div>
                  <span className="font-label-sm text-label-sm uppercase text-on-surface-variant block">
                    Repeat Patronage
                  </span>
                  <span className="font-title-md text-title-md text-on-surface font-semibold">
                    74%
                  </span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm uppercase text-on-surface-variant block">
                    Pure Organic Fiber
                  </span>
                  <span className="font-title-md text-title-md text-on-surface font-semibold">
                    100%
                  </span>
                </div>
              </div>
            </div>

            {/* Carousel Quotes */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              <div className="relative bg-surface-container p-space-xl rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-secondary text-4xl mb-space-sm opacity-40">
                  format_quote
                </span>
                <div className="min-h-[140px] flex flex-col justify-between">
                  <p className="font-headline-sm text-headline-sm text-on-surface italic font-light font-serif">
                    {currentTest.quote}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-4 mt-space-lg pt-space-sm border-t border-surface-container-high">
                    <div className="flex items-center gap-space-sm min-w-0">
                      <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm shrink-0">
                        {currentTest.initials}
                      </div>
                      <div className="min-w-0">
                        <span className="font-title-md text-title-md text-on-surface block font-semibold truncate">
                          {currentTest.author}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant block truncate">
                          {currentTest.loc}
                        </span>
                      </div>
                    </div>
                    {/* Carousel Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        aria-label="Previous review"
                        className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface hover:text-secondary shadow-sm transition-colors cursor-pointer"
                        onClick={() => cycleTestimonial(-1)}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                      </button>
                      <button
                        aria-label="Next review"
                        className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface hover:text-secondary shadow-sm transition-colors cursor-pointer"
                        onClick={() => cycleTestimonial(1)}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
