import React, { useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { ALL_PRODUCTS } from '../data/products';
import { FASHION_IMAGES } from '../data/fashionImages';

interface ShopViewProps {
  products?: Product[];
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onShowToast: (title: string, subtitle?: string) => void;
  onNavigateToCheckout?: () => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products = ALL_PRODUCTS,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onShowToast,
  onNavigateToCheckout,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All Styles');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const [bannerSeconds, setBannerSeconds] = useState<number>(5 * 3600 + 22 * 60 + 41);
  const [addedProductSizes, setAddedProductSizes] = useState<Record<string, string>>({});
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedQuickViewSize, setSelectedQuickViewSize] = useState<string>('M');
  const [selectedQuickViewColor, setSelectedQuickViewColor] = useState<string>('');

  // Synchronized flash countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerSeconds((prev) => (prev > 0 ? prev - 1 : 6 * 3600));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const bHours = Math.floor(bannerSeconds / 3600);
  const bMins = Math.floor((bannerSeconds % 3600) / 60);
  const bSecs = bannerSeconds % 60;

  // Filter products
  const safeProducts = products && products.length > 0 ? products : ALL_PRODUCTS;

  const filteredProducts = safeProducts.filter((p) => {
    if (activeCategory === 'All Styles') return true;
    if (activeCategory === 'Flash Sale (On Discount)') return p.isFlashSale;
    return p.category === activeCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'discount') {
      return (b.discountPercentage || 0) - (a.discountPercentage || 0);
    }
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    }
    if (sortBy === 'price-desc') {
      return b.price - a.price;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return b.reviewCount - a.reviewCount;
  });

  const displayedProducts = sortedProducts.slice(0, visibleCount);

  const handleQuickAdd = (product: Product, size: string, colorName?: string) => {
    const key = `${product.id}-${size}`;
    setAddedProductSizes((prev) => ({ ...prev, [key]: '✓ Added' }));
    const chosenColor = colorName || product.colors[0]?.name || 'Natural';
    onAddToCart({
      productId: product.id,
      name: product.name,
      variant: `${chosenColor} • Size ${size}`,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: 1,
      imageUrl: product.imageUrl,
      discountBadge: product.discountPercentage ? `-${product.discountPercentage}%` : undefined,
    });
    onShowToast(`${product.name} (Size ${size}) Added`, 'Added to your atelier bag with free shipping');

    setTimeout(() => {
      setAddedProductSizes((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }, 1800);
  };

  const openQuickView = (prod: Product) => {
    setQuickViewProduct(prod);
    setSelectedQuickViewSize(prod.sizes[0] || 'M');
    setSelectedQuickViewColor(prod.colors[0]?.name || 'Natural');
  };

  return (
    <div className="w-full flex flex-col">
      {/* ARCHIVE FLASH SALE IMMERSIVE BANNER */}
      <section className="w-full bg-surface-container-high px-4 sm:px-8 py-6 sm:py-8 mb-8 border-b border-outline-variant/20">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2 bg-secondary text-on-secondary px-4 py-1.5 rounded-full shrink-0 shadow-sm mx-auto sm:mx-0">
              <span className="inline-block w-2 h-2 rounded-full bg-on-secondary animate-ping"></span>
              <span className="font-label-sm text-xs uppercase tracking-widest font-bold">Live Archive Event</span>
            </div>
            <div>
              <h1 className="font-headline-md text-xl sm:text-2xl text-on-surface tracking-tight font-serif">
                The Archive Shop: Curated Solstice Capsule
              </h1>
              <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mt-0.5">
                Complimentary express shipping and tiered atelier reductions up to 45% on signature silhouettes.
              </p>
            </div>
          </div>

          {/* Synchronized Monospace Flash Timer */}
          <div className="flex items-center gap-3 bg-surface-container-lowest px-6 py-2.5 rounded-2xl shadow-sm shrink-0 border border-outline-variant/30">
            <div className="text-center">
              <span className="font-headline-sm text-xl text-secondary font-bold tabular-nums block leading-none font-serif">
                {String(bHours).padStart(2, '0')}
              </span>
              <span className="font-label-sm text-[9px] uppercase tracking-wider text-on-surface-variant font-semibold">Hours</span>
            </div>
            <span className="font-headline-sm text-xl text-secondary -mt-1 font-serif">:</span>
            <div className="text-center">
              <span className="font-headline-sm text-xl text-secondary font-bold tabular-nums block leading-none font-serif">
                {String(bMins).padStart(2, '0')}
              </span>
              <span className="font-label-sm text-[9px] uppercase tracking-wider text-on-surface-variant font-semibold">Mins</span>
            </div>
            <span className="font-headline-sm text-xl text-secondary -mt-1 font-serif">:</span>
            <div className="text-center">
              <span className="font-headline-sm text-xl text-secondary font-bold tabular-nums block leading-none font-serif">
                {String(bSecs).padStart(2, '0')}
              </span>
              <span className="font-label-sm text-[9px] uppercase tracking-wider text-on-surface-variant font-semibold">Secs</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CATALOG INTERFACE WRAPPER */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 w-full flex flex-col">
        {/* FILTER & SORT CONTROLS */}
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-surface-container-high mb-8">
          {/* Category Filter Pills (Round Buttons) */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto py-1.5 no-scrollbar">
            {[
              'All Styles',
              'Dresses & Sets',
              'Linen Tops',
              'Relaxed Trousers',
              'Knitwear',
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-label-md text-xs sm:text-sm uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                }`}
                type="button"
              >
                {cat}
              </button>
            ))}

            <button
              onClick={() => setActiveCategory('Flash Sale (On Discount)')}
              className={`px-4 py-2 rounded-full font-label-md text-xs sm:text-sm uppercase tracking-wider transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeCategory === 'Flash Sale (On Discount)'
                  ? 'bg-secondary text-on-secondary font-bold shadow-sm'
                  : 'bg-secondary-fixed text-on-secondary-fixed font-bold hover:bg-secondary-container'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[15px] text-secondary">local_fire_department</span>
              <span>Flash Sale Markdowns</span>
            </button>
          </div>

          {/* Sorting Selector & Results Meta */}
          <div className="flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto shrink-0">
            <span className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant font-medium whitespace-nowrap">
              {displayedProducts.length} of {sortedProducts.length} Silhouettes
            </span>
            <div className="relative inline-flex items-center">
              <label className="sr-only" htmlFor="catalog-sort">
                Sort by
              </label>
              <select
                id="catalog-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-surface-container-low text-on-surface font-label-md text-xs uppercase tracking-wider pl-4 pr-8 py-2 rounded-full cursor-pointer focus:outline-none focus:bg-surface-container-high transition-colors border border-outline-variant/30"
              >
                <option value="popular">Most Popular</option>
                <option value="discount">Biggest Discount</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 pointer-events-none text-[18px] text-on-surface-variant">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* PRODUCT CATALOG EDITORIAL GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {displayedProducts.map((product) => {
            const isFav = wishlistIds.includes(product.id);
            return (
              <article
                key={product.id}
                className="group relative flex flex-col bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg border border-outline-variant/20"
              >
                {/* Product Image Stage */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-container cursor-pointer" onClick={() => openQuickView(product)}>
                  <img
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    alt={product.altText || product.name}
                    src={product.imageUrl}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    {product.badge && (
                      <span className="bg-primary text-on-primary font-label-sm text-[10px] uppercase px-2.5 py-0.5 rounded-full tracking-widest font-semibold shadow-sm">
                        {product.badge}
                      </span>
                    )}
                    {product.discountPercentage && (
                      <span className="bg-secondary text-on-secondary font-label-sm text-[10px] uppercase px-2.5 py-0.5 rounded-full tracking-widest font-bold shadow-sm">
                        {product.discountPercentage}% OFF
                      </span>
                    )}
                  </div>

                  {/* Wishlist toggle (Round Button) */}
                  <div className="absolute top-3 right-3 z-10">
                    <button
                      aria-label="Save to Wishlist"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      className={`w-9 h-9 rounded-full bg-surface/90 backdrop-blur-md flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-110 ${
                        isFav ? 'text-secondary' : 'text-on-surface hover:text-secondary'
                      }`}
                      type="button"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        favorite
                      </span>
                    </button>
                  </div>

                  {/* Quick View Pill Indicator on Hover */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <span className="px-4 py-1.5 rounded-full bg-surface/90 backdrop-blur-md text-on-surface font-label-md text-xs uppercase tracking-wider font-semibold shadow-lg">
                      Quick View
                    </span>
                  </div>

                  {/* Discount Mini Countdown */}
                  {product.flashTimer && (
                    <div className="absolute bottom-12 left-3 z-10 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                      <span className="font-label-sm text-[10px] text-secondary font-bold tabular-nums tracking-wider">
                        {product.flashTimer}
                      </span>
                    </div>
                  )}

                  {/* Quick Add Flyout on Hover (Round Size Buttons) */}
                  <div
                    className="absolute inset-x-0 bottom-0 p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-surface/95 backdrop-blur-md flex items-center justify-center gap-1.5 z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {product.sizes.map((size) => {
                      const btnKey = `${product.id}-${size}`;
                      const isAdded = addedProductSizes[btnKey];
                      return (
                        <button
                          key={size}
                          onClick={() => handleQuickAdd(product, size)}
                          className={`flex-1 py-1.5 font-label-md text-[11px] rounded-full uppercase tracking-wider transition-all duration-200 cursor-pointer font-semibold shadow-sm ${
                            isAdded
                              ? 'bg-secondary text-on-secondary font-bold'
                              : 'bg-primary text-on-primary hover:bg-on-surface-variant'
                          }`}
                        >
                          {isAdded || size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Product Metadata Details */}
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      {/* Color dots */}
                      <div className="flex items-center gap-1.5">
                        {product.colors.map((c) => (
                          <span
                            key={c.name}
                            className="w-3.5 h-3.5 rounded-full border border-outline-variant/30 shadow-sm inline-block"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          ></span>
                        ))}
                      </div>
                      {/* Rating */}
                      <div className="flex items-center gap-1 text-on-surface">
                        <span className="material-symbols-outlined text-[15px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                        <span className="font-label-sm text-xs font-bold">{product.rating}</span>
                        <span className="font-body-sm text-[11px] text-on-surface-variant">({product.reviewCount})</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => openQuickView(product)}
                      className="font-headline-sm text-base text-on-surface leading-snug tracking-tight font-serif hover:text-secondary cursor-pointer transition-colors"
                    >
                      {product.name}
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 line-clamp-1">{product.subtitle}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-surface-container-low flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className={`font-title-md text-base font-bold ${product.originalPrice ? 'text-secondary' : 'text-on-surface'}`}>
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="font-body-sm text-xs text-on-surface-variant line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => openQuickView(product)}
                      className="text-xs font-semibold text-primary hover:text-secondary underline cursor-pointer"
                    >
                      Details &amp; Fit
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CATALOG PAGINATION */}
        <div className="w-full flex flex-col items-center justify-center pt-2 pb-12 text-center">
          <div className="w-full max-w-xs bg-surface-container-high h-1.5 rounded-full mb-4 overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (displayedProducts.length / sortedProducts.length) * 100)}%` }}
            ></div>
          </div>
          <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mb-4">
            Displaying {displayedProducts.length} of {sortedProducts.length} curated archive silhouettes
          </p>
          {displayedProducts.length < sortedProducts.length ? (
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="px-8 py-3 bg-primary text-on-primary font-label-md text-xs sm:text-sm uppercase tracking-widest rounded-full hover:bg-on-surface-variant transition-all duration-300 shadow-md flex items-center gap-2 cursor-pointer font-bold"
              type="button"
            >
              <span>Load More Curated Styles</span>
              <span className="material-symbols-outlined text-[18px]">south</span>
            </button>
          ) : (
            <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
              All {sortedProducts.length} Curated Styles Loaded
            </span>
          )}
        </div>
      </section>

      {/* QUICK VIEW HIGH-DEFINITION PRODUCT MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-primary/60 backdrop-blur-md" onClick={() => setQuickViewProduct(null)}></div>
          <div className="relative w-full max-w-3xl bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/30 z-10 overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
            {/* Left High-Definition Photo Showcase */}
            <div className="md:w-1/2 relative bg-surface-container aspect-[3/4] md:aspect-auto">
              <img
                src={quickViewProduct.imageUrl}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              {quickViewProduct.discountPercentage && (
                <span className="absolute top-4 left-4 bg-secondary text-on-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                  {quickViewProduct.discountPercentage}% OFF ARCHIVE
                </span>
              )}
            </div>

            {/* Right Details Panel */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[11px] uppercase tracking-widest text-secondary font-bold">
                    {quickViewProduct.category}
                  </span>
                  <button
                    onClick={() => setQuickViewProduct(null)}
                    className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>

                <h2 className="font-headline-sm text-2xl font-serif text-on-surface mb-1">
                  {quickViewProduct.name}
                </h2>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center text-secondary">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="text-xs font-bold ml-1 text-on-surface">{quickViewProduct.rating}</span>
                  </div>
                  <span className="text-xs text-on-surface-variant">({quickViewProduct.reviewCount} reviews)</span>
                  <span className="text-xs text-secondary font-semibold">• In Stock</span>
                </div>

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl font-bold font-serif text-on-surface">
                    ${quickViewProduct.price}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-on-surface-variant line-through">
                      ${quickViewProduct.originalPrice}
                    </span>
                  )}
                  <span className="text-xs bg-secondary/15 text-secondary px-2 py-0.5 rounded-full font-bold uppercase">
                    Archive Markdown
                  </span>
                </div>

                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                  {quickViewProduct.description}
                </p>

                {/* Color Selector */}
                <div className="mb-4">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface mb-2">
                    Color: <span className="font-normal text-on-surface-variant">{selectedQuickViewColor}</span>
                  </label>
                  <div className="flex gap-2">
                    {quickViewProduct.colors.map((col) => (
                      <button
                        key={col.name}
                        onClick={() => setSelectedQuickViewColor(col.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                          selectedQuickViewColor === col.name
                            ? 'border-primary scale-110 ring-2 ring-primary/20'
                            : 'border-outline-variant/40 hover:scale-105'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.name}
                      ></button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs uppercase tracking-wider font-semibold text-on-surface">
                      Select Size
                    </label>
                    <span className="text-[11px] text-secondary font-medium">True to size drape</span>
                  </div>
                  <div className="flex gap-2">
                    {quickViewProduct.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedQuickViewSize(sz)}
                        className={`w-11 h-11 rounded-full font-label-md text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                          selectedQuickViewSize === sz
                            ? 'bg-primary text-on-primary shadow-sm ring-2 ring-primary/20'
                            : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-surface-container-low flex flex-col gap-2">
                <button
                  onClick={() => {
                    handleQuickAdd(quickViewProduct, selectedQuickViewSize, selectedQuickViewColor);
                    setQuickViewProduct(null);
                  }}
                  className="w-full bg-primary text-on-primary py-3.5 rounded-full font-label-md text-xs uppercase tracking-widest font-bold hover:bg-on-surface-variant transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                  <span>Add to Bag • ${quickViewProduct.price}</span>
                </button>
                <button
                  onClick={() => {
                    onToggleWishlist(quickViewProduct.id);
                  }}
                  className="w-full py-2.5 rounded-full border border-outline-variant/40 text-on-surface hover:bg-surface-container transition-colors text-xs uppercase tracking-wider font-semibold cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {wishlistIds.includes(quickViewProduct.id) ? 'favorite' : 'favorite_border'}
                  </span>
                  <span>
                    {wishlistIds.includes(quickViewProduct.id) ? 'Saved in Wishlist' : 'Save to Wishlist'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDITORIAL ARTISAN STORY PANEL */}
      <section className="w-full bg-surface-container-low py-12 px-4 sm:px-8 mt-8 border-t border-outline-variant/20">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md">
            <img
              className="w-full h-full object-cover object-center"
              alt="Sunlit atelier textile studio showing joyful artisans cutting raw beige linen"
              src={FASHION_IMAGES.artisanStudio}
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="md:col-span-6 flex flex-col justify-center lg:pl-6">
            <span className="font-label-sm text-xs uppercase tracking-widest text-secondary font-bold block mb-2">
              Conscious Provenance
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface tracking-tight mb-3 font-serif">
              Deliberate Garments. Zero Unnatural Overstock.
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed">
              Each LUMIÈRE piece is batch-dyed in small artisanal facilities using rainwater runoff and non-toxic earthen clays. We only craft what we know has a home.
            </p>
            <div className="flex items-center gap-6">
              <div>
                <span className="font-headline-md text-2xl text-on-surface block font-serif font-bold">100%</span>
                <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
                  Traceable Organic Flax
                </span>
              </div>
              <div className="w-px h-10 bg-surface-container-highest"></div>
              <div>
                <span className="font-headline-md text-2xl text-on-surface block font-serif font-bold">Zero</span>
                <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
                  Synthetic Microplastics
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
