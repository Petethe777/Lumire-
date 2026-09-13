import React, { useState } from 'react';
import { ReviewItem } from '../types';
import { INITIAL_REVIEWS, COMMUNITY_GALLERY } from '../data/reviews';

interface ReviewsViewProps {
  onShowToast: (title: string, subtitle?: string) => void;
  onNavigateToShop: () => void;
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({ onShowToast, onNavigateToShop }) => {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [votedReviews, setVotedReviews] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal form state
  const [modalRating, setModalRating] = useState(5);
  const [modalProduct, setModalProduct] = useState('');
  const [modalFit, setModalFit] = useState<'True to Size' | 'Slightly Small' | 'Slightly Relaxed'>('True to Size');
  const [modalQuality, setModalQuality] = useState('10/10 — Exceptional');
  const [modalHeadline, setModalHeadline] = useState('');
  const [modalComments, setModalComments] = useState('');
  const [modalAuthor, setModalAuthor] = useState('');
  const [modalLocation, setModalLocation] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const starLabels: Record<number, string> = {
    1: '1.0 — Unsatisfactory',
    2: '2.0 — Needs Refinement',
    3: '3.0 — Average',
    4: '4.0 — Very Good',
    5: '5.0 — Flawless',
  };

  const handleHelpfulClick = (id: string) => {
    if (votedReviews[id]) return;
    setVotedReviews((prev) => ({ ...prev, [id]: true }));
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    onShowToast('Feedback Recorded', 'Thank you for helping other clients');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalHeadline.trim() || !modalComments.trim()) return;

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: modalAuthor.trim() || 'Archival Client',
      location: modalLocation.trim() || 'Verified Client',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCp8KxEBu1Ffxwl6HrGxiPkHMwjSGUdzRtB_W5J6In3xlqalw0WNFZTMEoxt4rW9-v-hhZ6CkH4XNcoddUaVpSyY-RLNPKIrwD0YeejVYDeEUx-A0dA68aEkkpVT-rtMdVPkFA2lPGkBbZGXW3pIb-t_yVFmpz7vuqhd_yfFFDgbI5d5mshg3dafkDZurKX5BoyYV-ftnLmkBt26P4aQSJv-XdgpN4ucxfLAwNMgRIfuIRliD-01UQL',
      timeAgo: 'Just now',
      productPurchased: `Purchased: ${modalProduct || 'Riviera Linen Archive Piece'}`,
      rating: modalRating,
      headline: `"${modalHeadline}"`,
      commentary: modalComments,
      photoUrl: uploadedImage || undefined,
      photoAlt: uploadedImage ? 'Customer review photo' : undefined,
      fit: modalFit,
      quality: modalQuality.split('—')[0].trim(),
      helpfulCount: 1,
      isVerified: true,
    };

    setReviews([newReview, ...reviews]);
    setIsModalOpen(false);
    onShowToast('Review Published', 'Thank you for contributing to the Lumière Archive');

    // reset
    setModalHeadline('');
    setModalComments('');
    setModalProduct('');
    setUploadedImage(null);
  };

  // Filter & Search
  const filteredReviews = reviews.filter((rev) => {
    // search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        rev.headline.toLowerCase().includes(q) ||
        rev.commentary.toLowerCase().includes(q) ||
        rev.author.toLowerCase().includes(q) ||
        rev.productPurchased.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (filter === 'all') return true;
    if (filter === 'photo') return !!rev.photoUrl;
    if (filter === '5star') return rev.rating === 5;
    if (filter === 'verified') return rev.isVerified;
    if (filter === 'truetosize') return rev.fit === 'True to Size';
    return true;
  });

  // Sort
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'helpful') return b.helpfulCount - a.helpfulCount;
    if (sortBy === 'rating-high') return b.rating - a.rating;
    if (sortBy === 'photos') return (b.photoUrl ? 1 : 0) - (a.photoUrl ? 1 : 0);
    return 0; // recent
  });

  return (
    <div className="w-full flex flex-col">
      {/* Top Ambient Banner & Header Summary */}
      <section className="relative w-full overflow-hidden bg-surface py-space-xl px-margin border-b border-outline-variant/20">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg mb-space-xl">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-space-xs font-label-sm text-label-sm uppercase tracking-widest text-secondary mb-space-sm bg-secondary-fixed/40 px-space-sm py-1 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                Verified Community Perspectives
              </div>
              <h1 className="font-display text-display text-on-surface tracking-tight leading-none mb-space-sm font-serif">
                Voices of Lumière
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Real individuals living, moving, and finding quiet presence in our archival linens and deliberate silhouettes.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-space-md">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-space-xs bg-primary text-on-primary px-space-lg py-3 rounded-full font-label-md text-label-md uppercase tracking-wider shadow-md hover:bg-on-surface-variant transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">edit_note</span>
                <span>Write a Review</span>
              </button>
              <a
                href="#communityWall"
                className="inline-flex items-center justify-center gap-space-xs bg-surface-container-high text-on-surface px-space-md py-3 rounded-full font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-highest transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">photo_library</span>
                <span>Community Lookbook</span>
              </a>
            </div>
          </div>

          {/* Rating Overview Bento Module */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter bg-surface-container-low p-space-lg rounded-lg shadow-sm">
            {/* Main Score */}
            <div className="md:col-span-4 flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-lg">
              <div>
                <div className="flex items-baseline gap-space-xs">
                  <span className="font-display text-display font-medium text-on-surface font-serif">4.9</span>
                  <span className="font-title-lg text-title-lg text-on-surface-variant">/ 5.0</span>
                </div>
                <div className="flex items-center gap-1 text-secondary mt-space-xs mb-space-sm">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-md text-body-md text-on-surface font-medium">
                  Based on 2,840 verified client testimonials
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Every entry authenticated via blockchain-matched delivery records.
                </p>
              </div>

              <div className="mt-space-lg pt-space-md bg-surface-container-low p-space-sm rounded flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-[22px]">thumb_up</span>
                </div>
                <div>
                  <span className="font-title-md text-title-md text-on-surface block leading-tight font-semibold">
                    98% Recommendation
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                    Buyers who return &amp; recommend
                  </span>
                </div>
              </div>
            </div>

            {/* Rating Distribution Bars */}
            <div className="md:col-span-5 flex flex-col justify-center p-space-md bg-surface-container-lowest rounded-lg">
              <div className="space-y-space-sm">
                {[
                  { star: '5 Stars', pct: 88 },
                  { star: '4 Stars', pct: 9 },
                  { star: '3 Stars', pct: 2 },
                  { star: '2 Stars', pct: 1 },
                  { star: '1 Star', pct: 0 },
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-space-sm text-body-sm font-body-sm">
                    <span className="w-14 text-on-surface font-medium shrink-0">{row.star}</span>
                    <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: `${row.pct}%` }}></div>
                    </div>
                    <span className="w-10 text-right font-semibold text-on-surface">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metric Insights & Quality Scores */}
            <div className="md:col-span-3 flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-lg">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant block mb-space-sm font-bold">
                  Fit &amp; Craft Benchmarks
                </span>
                <div className="space-y-space-md">
                  <div>
                    <div className="flex justify-between text-body-sm font-body-sm mb-1">
                      <span className="text-on-surface font-medium">True to Size</span>
                      <span className="text-secondary font-semibold">96%</span>
                    </div>
                    <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-on-surface rounded-full" style={{ width: '96%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-body-sm font-body-sm mb-1">
                      <span className="text-on-surface font-medium">Material Softness</span>
                      <span className="text-secondary font-semibold">99%</span>
                    </div>
                    <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-on-surface rounded-full" style={{ width: '99%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-body-sm font-body-sm mb-1">
                      <span className="text-on-surface font-medium">Launder Durability</span>
                      <span className="text-secondary font-semibold">94%</span>
                    </div>
                    <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-on-surface rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-space-md pt-space-xs flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant border-t border-surface-container-low">
                <span>AUDITED QUARTERLY</span>
                <span className="text-secondary flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[14px]">verified</span> 100% ORGANIC
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Photo Wall / Dynamic Mosaic */}
      <section className="w-full bg-surface-container-low py-space-xl px-margin" id="communityWall">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary block mb-1">
                #LumiereInLife
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-serif">
                Community Gallery
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Captured by discerning clientele across Mediterranean terraces, Kyoto courtyards, and sun-washed city lofts. Click any frame to inspect the look.
            </p>
          </div>

          {/* Mosaic Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
            {COMMUNITY_GALLERY.map((item, idx) => (
              <div
                key={item.id}
                onClick={onNavigateToShop}
                className={`group relative aspect-[3/4] ${
                  idx % 2 === 1 ? 'md:-mt-4' : ''
                } bg-surface-container-high rounded-lg overflow-hidden cursor-pointer shadow-sm`}
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={item.altText}
                  src={item.imageUrl}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-space-md text-on-primary">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed">
                    {item.user}
                  </span>
                  <span className="font-title-md text-title-md font-medium">{item.itemTitle}</span>
                  <div className="mt-space-xs inline-flex items-center gap-1 text-label-sm font-label-sm underline uppercase tracking-widest">
                    <span>Shop This Look</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Secondary Proof Line */}
          <div className="mt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm bg-surface-container-lowest p-space-md rounded-lg">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-secondary text-[24px]">camera_enhance</span>
              <span className="font-body-md text-body-md text-on-surface">
                Tag <strong>#LumiereInLife</strong> on Instagram or upload in your review to be featured and receive a $40 Studio Credit.
              </span>
            </div>
            <button
              className="font-label-md text-label-md uppercase tracking-wider text-secondary hover:text-on-secondary-container font-semibold inline-flex items-center gap-1 shrink-0 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
              type="button"
            >
              <span>Upload Your Photo</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filter Toolbar */}
      <section className="w-full bg-surface py-space-lg px-margin border-b border-surface-container-high">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-low p-space-md rounded-lg">
            {/* Search Field */}
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                search
              </span>
              <input
                className="w-full bg-surface pl-10 pr-space-md py-2.5 rounded-full font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none shadow-sm"
                placeholder="Search reviews by keyword ('linen', 'comfort', 'tailoring')..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-space-xs">
              {[
                { id: 'all', label: 'All (2,840)' },
                { id: 'photo', label: 'With Photos (642)', icon: 'image' },
                { id: '5star', label: '5 Stars Only', icon: 'star' },
                { id: 'verified', label: 'Verified Buyers', icon: 'verified' },
                { id: 'truetosize', label: 'Fit: True to Size' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setFilter(pill.id)}
                  className={`px-space-md py-2 rounded-full font-label-sm text-label-sm uppercase tracking-wider shadow-sm transition-colors flex items-center gap-1 cursor-pointer ${
                    filter === pill.id
                      ? 'bg-primary text-on-primary font-bold'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                  type="button"
                >
                  {pill.icon && (
                    <span
                      className="material-symbols-outlined text-[16px] text-secondary"
                      style={{ fontVariationSettings: pill.icon === 'star' ? "'FILL' 1" : undefined }}
                    >
                      {pill.icon}
                    </span>
                  )}
                  <span>{pill.label}</span>
                </button>
              ))}
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-space-xs shrink-0 font-body-sm text-body-sm text-on-surface">
              <span className="text-on-surface-variant text-label-sm font-label-sm uppercase">Sort:</span>
              <select
                className="bg-surface px-4 py-2 rounded-full text-on-surface font-body-sm text-body-sm focus:outline-none shadow-sm cursor-pointer border border-outline-variant/30"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="helpful">Most Helpful</option>
                <option value="rating-high">Highest Rating</option>
                <option value="photos">Photos First</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Review Cards Grid */}
      <section className="w-full bg-surface pb-space-xl px-margin pt-space-lg">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {sortedReviews.map((rev) => {
              const hasVoted = votedReviews[rev.id];
              return (
                <div
                  key={rev.id}
                  className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm flex flex-col justify-between border border-outline-variant/20"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-space-sm">
                      <div className="flex items-center gap-space-sm">
                        <img
                          className="w-11 h-11 rounded-full object-cover shadow-sm"
                          alt={rev.author}
                          src={rev.avatarUrl}
                        />
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="font-title-md text-title-md text-on-surface font-semibold">
                              {rev.author}
                            </span>
                            {rev.isVerified && (
                              <span
                                className="material-symbols-outlined text-secondary text-[18px]"
                                title="Verified Buyer"
                              >
                                verified
                              </span>
                            )}
                          </div>
                          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                            Verified Buyer • {rev.location}
                          </span>
                        </div>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">{rev.timeAgo}</span>
                    </div>

                    {/* Tag */}
                    <div className="inline-flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded text-label-sm font-label-sm text-on-surface mb-space-sm">
                      <span className="material-symbols-outlined text-[14px] text-secondary">checkroom</span>
                      <span>{rev.productPurchased}</span>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1 text-secondary mb-space-xs">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`material-symbols-outlined text-[18px] ${
                            i < rev.rating ? 'text-secondary' : 'text-outline-variant'
                          }`}
                          style={{ fontVariationSettings: i < rev.rating ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          star
                        </span>
                      ))}
                    </div>

                    {/* Title & Body */}
                    <h3 className="font-title-lg text-title-lg text-on-surface font-semibold mb-space-xs font-serif">
                      {rev.headline}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
                      {rev.commentary}
                    </p>

                    {/* Embedded User Photo */}
                    {rev.photoUrl && (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-space-md bg-surface-container">
                        <img className="w-full h-full object-cover" alt={rev.photoAlt} src={rev.photoUrl} />
                      </div>
                    )}

                    {/* Indicators */}
                    <div className="flex flex-wrap items-center gap-space-xs text-label-sm font-label-sm text-on-surface mb-space-md">
                      <span className="bg-surface-container-low px-2 py-0.5 rounded">
                        Fit: <strong>{rev.fit}</strong>
                      </span>
                      {rev.fabric && (
                        <span className="bg-surface-container-low px-2 py-0.5 rounded">
                          Fabric: <strong>{rev.fabric}</strong>
                        </span>
                      )}
                      {rev.weight && (
                        <span className="bg-surface-container-low px-2 py-0.5 rounded">
                          Weight: <strong>{rev.weight}</strong>
                        </span>
                      )}
                      {rev.tailoring && (
                        <span className="bg-surface-container-low px-2 py-0.5 rounded">
                          Tailoring: <strong>{rev.tailoring}</strong>
                        </span>
                      )}
                      <span className="bg-secondary-fixed/50 text-on-secondary-fixed-variant px-2 py-0.5 rounded">
                        Quality: <strong>{rev.quality}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Card Footer Helpful Button */}
                  <div className="flex items-center justify-between pt-space-sm bg-surface-container-low/50 -mx-space-lg -mb-space-lg px-space-lg py-space-sm rounded-b-lg border-t border-surface-container-low">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Was this helpful?</span>
                    <button
                      onClick={() => handleHelpfulClick(rev.id)}
                      className={`inline-flex items-center gap-1.5 text-body-sm font-body-sm transition-colors cursor-pointer ${
                        hasVoted ? 'text-secondary font-semibold' : 'text-on-surface hover:text-secondary'
                      }`}
                      type="button"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: hasVoted ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        thumb_up
                      </span>
                      <span>{rev.helpfulCount}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More Feedback */}
          <div className="mt-space-xl flex flex-col items-center justify-center gap-space-sm">
            <button
              onClick={() => onShowToast('Full Archive Loaded', 'Displaying all active community reviews')}
              className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-space-xl py-3 rounded-full font-label-md text-label-md uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-space-xs cursor-pointer font-semibold"
              type="button"
            >
              <span>Load More Verified Reviews</span>
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              Showing {sortedReviews.length} of 2,840 testimonials
            </span>
          </div>
        </div>
      </section>

      {/* Community Values & Trust */}
      <section className="w-full bg-surface-container-low py-space-xl px-margin border-t border-outline-variant/20">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-secondary mb-space-md">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <h3 className="font-title-lg text-title-lg text-on-surface font-semibold mb-space-xs font-serif">
              100% Verified Purchases
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Reviews can only be authored by individuals with confirmed order dispatches. No sponsored reviews or compensated placements.
            </p>
          </div>
          <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-secondary mb-space-md">
              <span className="material-symbols-outlined text-[24px]">swap_horiz</span>
            </div>
            <h3 className="font-title-lg text-title-lg text-on-surface font-semibold mb-space-xs font-serif">
              True-Fit Guarantee
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Unsure of sizing? Enjoy complimentary return shipping and one-on-one virtual tailoring consultations with our studio associates.
            </p>
          </div>
          <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-secondary mb-space-md">
              <span className="material-symbols-outlined text-[24px]">spa</span>
            </div>
            <h3 className="font-title-lg text-title-lg text-on-surface font-semibold mb-space-xs font-serif">
              Responsible Natural Fiber
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Every yard of linen, peace silk, and organic cotton is OEKO-TEX® certified, biodegradable, and spun without harsh synthetic coatings.
            </p>
          </div>
        </div>
      </section>

      {/* Floating Sticky Action Trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center gap-space-xs bg-primary text-on-primary px-4 py-3.5 rounded-full shadow-xl hover:bg-on-surface-variant transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">rate_review</span>
          <span className="font-label-md text-label-md uppercase tracking-wider pr-1">Review</span>
        </button>
      </div>

      {/* Modal: Write a Review */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex items-center justify-center p-space-md animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest max-w-xl w-full rounded-xl shadow-2xl overflow-hidden p-space-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-space-sm mb-space-md border-b border-surface-container-high">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary block font-bold">
                  Lumière Feedback
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-serif">
                  Share Your Perspective
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form className="space-y-space-md" onSubmit={handleSubmitReview}>
              {/* Star Rating Picker */}
              <div>
                <label className="block font-label-md text-label-md text-on-surface uppercase mb-1 font-semibold">
                  Overall Rating
                </label>
                <div className="flex items-center gap-2 text-secondary cursor-pointer">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setModalRating(starVal)}
                      className="cursor-pointer"
                    >
                      <span
                        className={`material-symbols-outlined text-[28px] ${
                          starVal <= modalRating ? 'text-secondary' : 'text-outline-variant'
                        }`}
                        style={{ fontVariationSettings: starVal <= modalRating ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        star
                      </span>
                    </button>
                  ))}
                  <span className="ml-2 font-body-sm text-body-sm text-on-surface font-medium">
                    {starLabels[modalRating]}
                  </span>
                </div>
              </div>

              {/* Author & Location */}
              <div className="grid grid-cols-2 gap-space-sm">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface uppercase mb-1">Your Name</label>
                  <input
                    className="w-full bg-surface-container-low px-space-md py-2.5 rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface"
                    placeholder="e.g. Camille Laurent"
                    value={modalAuthor}
                    onChange={(e) => setModalAuthor(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface uppercase mb-1">City, Country</label>
                  <input
                    className="w-full bg-surface-container-low px-space-md py-2.5 rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface"
                    placeholder="e.g. Paris, France"
                    value={modalLocation}
                    onChange={(e) => setModalLocation(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Purchased Product */}
              <div>
                <label className="block font-label-md text-label-md text-on-surface uppercase mb-1" htmlFor="reviewProduct">
                  Item Reviewed
                </label>
                <input
                  className="w-full bg-surface-container-low px-space-md py-2.5 rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface transition-colors"
                  id="reviewProduct"
                  placeholder="e.g. Riviera Linen Shirt — Terracotta"
                  required
                  type="text"
                  value={modalProduct}
                  onChange={(e) => setModalProduct(e.target.value)}
                />
              </div>

              {/* Sizing / Fit Feedback */}
              <div className="grid grid-cols-2 gap-space-sm">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface uppercase mb-1">Fit Accuracy</label>
                  <select
                    className="w-full bg-surface-container-low px-space-md py-2.5 rounded font-body-sm text-body-sm text-on-surface focus:outline-none"
                    value={modalFit}
                    onChange={(e) => setModalFit(e.target.value as any)}
                  >
                    <option value="True to Size">True to Size</option>
                    <option value="Slightly Small">Runs Slightly Small</option>
                    <option value="Slightly Relaxed">Relaxed / Oversized Cut</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface uppercase mb-1">Fabric Quality</label>
                  <select
                    className="w-full bg-surface-container-low px-space-md py-2.5 rounded font-body-sm text-body-sm text-on-surface focus:outline-none"
                    value={modalQuality}
                    onChange={(e) => setModalQuality(e.target.value)}
                  >
                    <option>10/10 — Exceptional</option>
                    <option>9/10 — Superior</option>
                    <option>8/10 — Good</option>
                  </select>
                </div>
              </div>

              {/* Headline */}
              <div>
                <label className="block font-label-md text-label-md text-on-surface uppercase mb-1" htmlFor="reviewTitle">
                  Review Headline
                </label>
                <input
                  className="w-full bg-surface-container-low px-space-md py-2.5 rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface transition-colors"
                  id="reviewTitle"
                  placeholder="Summarize your experience in one sentence"
                  required
                  type="text"
                  value={modalHeadline}
                  onChange={(e) => setModalHeadline(e.target.value)}
                />
              </div>

              {/* Body */}
              <div>
                <label className="block font-label-md text-label-md text-on-surface uppercase mb-1" htmlFor="reviewComments">
                  Detailed Commentary
                </label>
                <textarea
                  className="w-full bg-surface-container-low px-space-md py-2.5 rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface transition-colors resize-none"
                  id="reviewComments"
                  placeholder="Describe touch, drape, wash durability, styling adaptability..."
                  required
                  rows={3}
                  value={modalComments}
                  onChange={(e) => setModalComments(e.target.value)}
                ></textarea>
              </div>

              {/* Photo Upload Box */}
              <div>
                <label className="block font-label-md text-label-md text-on-surface uppercase mb-1">
                  Attach Community Photo (Optional)
                </label>
                <label className="bg-surface-container-low p-space-md rounded-lg text-center cursor-pointer hover:bg-surface-container transition-colors block border border-dashed border-outline-variant/50">
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  <span className="material-symbols-outlined text-secondary text-[24px]">add_a_photo</span>
                  <span className="block font-body-sm text-body-sm text-on-surface mt-1">
                    {uploadedImage ? 'Photo Attached (Click to change)' : 'Drag & drop your look photo or click to browse'}
                  </span>
                  <span className="block font-label-sm text-[11px] text-on-surface-variant uppercase mt-0.5">
                    JPG, PNG up to 10MB • Qualifying photos receive a $40 Studio Credit
                  </span>
                </label>
                {uploadedImage && (
                  <div className="mt-2 w-20 h-20 rounded overflow-hidden shadow">
                    <img src={uploadedImage} alt="Uploaded preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-space-xs flex items-center justify-end gap-space-sm border-t border-surface-container-high">
                <button
                  className="bg-surface-container hover:bg-surface-container-high px-space-md py-2.5 rounded-full font-label-md text-label-md uppercase text-on-surface tracking-wider transition-colors cursor-pointer"
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="bg-primary hover:bg-on-surface-variant text-on-primary px-space-lg py-2.5 rounded-full font-label-md text-label-md uppercase tracking-wider transition-colors cursor-pointer font-bold"
                  type="submit"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
