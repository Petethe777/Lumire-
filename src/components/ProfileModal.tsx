import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (title: string, subtitle?: string) => void;
  onNavigateToShop: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  firstName: 'Alexandra',
  lastName: 'Vance',
  email: 'alexandra.vance@studio-archive.com',
  phone: '+1 (415) 892-0419',
  salutation: 'Ms.',
  preferredFit: 'Relaxed',
  preferredPalette: 'Earth & Terracotta',
  favoriteFabric: 'French Flax Linen',
  sizeTop: 'M',
  sizeBottom: '30',
  shoeSize: '39',
  street: '742 Evergreen Terrace, Suite 4B',
  city: 'San Francisco',
  state: 'California (CA)',
  zip: '94107',
  country: 'United States',
  newsletterSubscribed: true,
  smsDropAlerts: true,
  membershipTier: 'Private Collector',
  rewardPoints: 2450,
};

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
  onNavigateToShop,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'sizing' | 'orders' | 'vip'>('profile');
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('lumiere_client_profile');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_PROFILE;
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      try {
        localStorage.setItem('lumiere_client_profile', JSON.stringify(profile));
      } catch {
        // error saving
      }
      setIsSaving(false);
      onShowToast('Profile Updated', 'Your atelier preferences and fit specifications are saved');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/30 flex flex-col max-h-[92vh] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-surface-container-high flex items-center justify-between bg-surface-container-low/50">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp8KxEBu1Ffxwl6HrGxiPkHMwjSGUdzRtB_W5J6In3xlqalw0WNFZTMEoxt4rW9-v-hhZ6CkH4XNcoddUaVpSyY-RLNPKIrwD0YeejVYDeEUx-A0dA68aEkkpVT-rtMdVPkFA2lPGkBbZGXW3pIb-t_yVFmpz7vuqhd_yfFFDgbI5d5mshg3dafkDZurKX5BoyYV-ftnLmkBt26P4aQSJv-XdgpN4ucxfLAwNMgRIfuIRliD-01UQL"
                alt="Client Portrait"
                className="w-14 h-14 rounded-full object-cover shadow-sm border-2 border-surface"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-secondary border-2 border-surface" title="VIP Active"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline-sm text-lg sm:text-xl font-serif text-on-surface">
                  {profile.firstName} {profile.lastName}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary text-[11px] font-semibold tracking-wider uppercase">
                  {profile.membershipTier}
                </span>
              </div>
              <p className="text-body-sm text-xs text-on-surface-variant">
                Client ID: #LUM-4982 • {profile.rewardPoints} Archive Points Available
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            aria-label="Close profile modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="px-6 pt-3 pb-2 border-b border-surface-container-low flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'profile', label: 'Personal & Contact', icon: 'person' },
            { id: 'sizing', label: 'Atelier Fit & Sizing', icon: 'straighten' },
            { id: 'orders', label: 'Archive Orders (2)', icon: 'inventory_2' },
            { id: 'vip', label: 'VIP Privileges', icon: 'workspace_premium' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-label-md text-xs sm:text-sm tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-primary text-on-primary font-semibold shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* TAB 1: Personal & Contact */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-3">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1.5">
                    Salutation
                  </label>
                  <select
                    value={profile.salutation}
                    onChange={(e) => setProfile({ ...profile, salutation: e.target.value as any })}
                    className="w-full bg-surface-container-low text-on-surface px-4 py-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:border-primary text-sm"
                  >
                    <option value="Ms.">Ms.</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mx.">Mx.</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                </div>
                <div className="sm:col-span-4">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    className="w-full bg-surface-container-low text-on-surface px-4 py-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:border-primary text-sm"
                  />
                </div>
                <div className="sm:col-span-5">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    className="w-full bg-surface-container-low text-on-surface px-4 py-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:border-primary text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1.5">
                    Primary Email
                  </label>
                  <input
                    type="email"
                    required
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-surface-container-low text-on-surface px-4 py-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:border-primary text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1.5">
                    Mobile Phone (Concierge &amp; Dispatch SMS)
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full bg-surface-container-low text-on-surface px-4 py-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:border-primary text-sm"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-surface-container-low">
                <h3 className="text-xs uppercase tracking-widest font-bold text-secondary mb-3">
                  Default Atelier Shipping Address
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-on-surface-variant mb-1">
                      Street Address &amp; Suite
                    </label>
                    <input
                      type="text"
                      value={profile.street}
                      onChange={(e) => setProfile({ ...profile, street: e.target.value })}
                      className="w-full bg-surface-container-low text-on-surface px-4 py-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:border-primary text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-on-surface-variant mb-1">City</label>
                      <input
                        type="text"
                        value={profile.city}
                        onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                        className="w-full bg-surface-container-low text-on-surface px-4 py-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:border-primary text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-on-surface-variant mb-1">State / Region</label>
                      <input
                        type="text"
                        value={profile.state}
                        onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                        className="w-full bg-surface-container-low text-on-surface px-4 py-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:border-primary text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-on-surface-variant mb-1">Postal Code</label>
                      <input
                        type="text"
                        value={profile.zip}
                        onChange={(e) => setProfile({ ...profile, zip: e.target.value })}
                        className="w-full bg-surface-container-low text-on-surface px-4 py-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:border-primary text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-surface-container-low space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.newsletterSubscribed}
                    onChange={(e) => setProfile({ ...profile, newsletterSubscribed: e.target.checked })}
                    className="w-4 h-4 rounded text-secondary accent-primary"
                  />
                  <span className="text-xs text-on-surface">
                    Receive Private Solstice Capsule Lookbooks &amp; Atelier invitations
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.smsDropAlerts}
                    onChange={(e) => setProfile({ ...profile, smsDropAlerts: e.target.checked })}
                    className="w-4 h-4 rounded text-secondary accent-primary"
                  />
                  <span className="text-xs text-on-surface">
                    Instant SMS notifications for Flash Archive markdown countdowns
                  </span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-outline-variant/40 text-on-surface text-xs uppercase tracking-wider hover:bg-surface-container transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-full bg-primary text-on-primary text-xs uppercase tracking-wider font-bold hover:bg-on-surface-variant transition-all duration-200 shadow-md cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <span className="inline-block w-3.5 h-3.5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
                      <span>Saving Atelier Data...</span>
                    </>
                  ) : (
                    <span>Save Profile Information</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Atelier Fit & Sizing */}
          {activeTab === 'sizing' && (
            <div className="space-y-6">
              <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/20">
                <span className="text-xs uppercase tracking-widest text-secondary font-bold block mb-1">
                  Atelier Sizing Intelligence
                </span>
                <p className="text-xs text-on-surface-variant">
                  Your customized sizing profile auto-selects recommended cuts and informs our Paris concierge team during custom alterations.
                </p>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-2">
                  Drape &amp; Silhouette Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['Relaxed', 'True to Size', 'Tailored / Structured'] as const).map((fit) => (
                    <button
                      key={fit}
                      type="button"
                      onClick={() => setProfile({ ...profile, preferredFit: fit })}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        profile.preferredFit === fit
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'border-outline-variant/30 hover:border-outline-variant/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-xs text-on-surface">{fit}</span>
                        {profile.preferredFit === fit && (
                          <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
                        )}
                      </div>
                      <p className="text-[11px] text-on-surface-variant">
                        {fit === 'Relaxed' && 'Flowing, breezy, effortless Mediterranean volume.'}
                        {fit === 'True to Size' && 'Natural proportions honoring Savile Row ergonomics.'}
                        {fit === 'Tailored / Structured' && 'Nipped silhouette with sharper lapels.'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1.5">
                    Standard Top Size
                  </label>
                  <div className="flex gap-1.5 flex-wrap">
                    {(['XS', 'S', 'M', 'L', 'XL'] as const).map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setProfile({ ...profile, sizeTop: sz })}
                        className={`w-10 h-10 rounded-full font-label-md text-xs font-semibold uppercase transition-all cursor-pointer ${
                          profile.sizeTop === sz
                            ? 'bg-primary text-on-primary shadow-sm'
                            : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1.5">
                    Trouser Waist
                  </label>
                  <div className="flex gap-1.5 flex-wrap">
                    {(['28', '30', '32', '34', '36'] as const).map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setProfile({ ...profile, sizeBottom: sz })}
                        className={`w-10 h-10 rounded-full font-label-md text-xs font-semibold uppercase transition-all cursor-pointer ${
                          profile.sizeBottom === sz
                            ? 'bg-primary text-on-primary shadow-sm'
                            : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1.5">
                    Footwear (EU)
                  </label>
                  <div className="flex gap-1.5 flex-wrap">
                    {(['37', '38', '39', '40', '41', '42'] as const).map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setProfile({ ...profile, shoeSize: sz })}
                        className={`w-10 h-10 rounded-full font-label-md text-xs font-semibold uppercase transition-all cursor-pointer ${
                          profile.shoeSize === sz
                            ? 'bg-primary text-on-primary shadow-sm'
                            : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-2">
                  Preferred Color Spectrum
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(
                    [
                      'Earth & Terracotta',
                      'Monochrome & Noir',
                      'Sunwashed Chalk & Sage',
                    ] as const
                  ).map((pal) => (
                    <button
                      key={pal}
                      type="button"
                      onClick={() => setProfile({ ...profile, preferredPalette: pal })}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        profile.preferredPalette === pal
                          ? 'border-secondary bg-secondary/5 font-semibold text-secondary'
                          : 'border-outline-variant/30 text-on-surface hover:border-outline-variant/60'
                      }`}
                    >
                      <span className="text-xs">{pal}</span>
                      <div className="flex gap-1">
                        {pal === 'Earth & Terracotta' && (
                          <>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#97472E]"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD3]"></span>
                          </>
                        )}
                        {pal === 'Monochrome & Noir' && (
                          <>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#1A1C1A]"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FAF9F6]"></span>
                          </>
                        )}
                        {pal === 'Sunwashed Chalk & Sage' && (
                          <>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#BECAB7]"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#EFEFEB]"></span>
                          </>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.setItem('lumiere_client_profile', JSON.stringify(profile));
                    onShowToast('Fit Profile Saved', 'Recommendations customized');
                  }}
                  className="px-6 py-2.5 rounded-full bg-primary text-on-primary text-xs uppercase tracking-wider font-bold hover:bg-on-surface-variant transition-all duration-200 shadow-md cursor-pointer"
                >
                  Save Sizing Profile
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Archive Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="border border-outline-variant/30 rounded-2xl p-4 bg-surface-container-lowest shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-surface-container-low mb-3">
                  <div>
                    <span className="text-xs uppercase font-bold text-on-surface">Order #LUM-84912</span>
                    <span className="text-[11px] text-on-surface-variant block">Placed September 10, 2026 • 2 pieces</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold tracking-wider uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    Delivered
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-on-surface font-medium">Paloma Tiered Sundress (Terracotta • S)</span>
                    <span className="font-semibold text-on-surface">$115.00</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-on-surface font-medium">Capri Open-Weave Knit (Sage Light • M)</span>
                    <span className="font-semibold text-on-surface">$98.00</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-surface-container-low flex items-center justify-between">
                  <span className="text-xs text-on-surface-variant">Tracking: DHL Express 9400 1118 9956</span>
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToShop();
                    }}
                    className="text-xs font-semibold text-secondary hover:underline cursor-pointer"
                  >
                    View in Shop
                  </button>
                </div>
              </div>

              <div className="border border-outline-variant/30 rounded-2xl p-4 bg-surface-container-lowest shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-surface-container-low mb-3">
                  <div>
                    <span className="text-xs uppercase font-bold text-on-surface">Order #LUM-79401</span>
                    <span className="text-[11px] text-on-surface-variant block">Placed August 14, 2026 • 1 piece</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-bold tracking-wider uppercase">
                    Archived
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-on-surface font-medium">Raw Linen Oversized Blazer (Sand • M)</span>
                  <span className="font-semibold text-on-surface">$122.00</span>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToShop();
                  }}
                  className="px-6 py-2.5 rounded-full bg-primary text-on-primary text-xs uppercase tracking-wider font-bold hover:bg-on-surface-variant transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                  <span>Explore New Archive Arrivals</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: VIP Privileges */}
          {activeTab === 'vip' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-surface-container-high via-surface-container-low to-surface-container-lowest border border-secondary/30">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-secondary font-bold block">
                      Membership Status
                    </span>
                    <h3 className="font-headline-sm text-xl font-serif text-on-surface">Private Collector Tier</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-secondary">{profile.rewardPoints}</span>
                    <span className="block text-[10px] uppercase tracking-wider text-on-surface-variant">Points</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden mb-2">
                  <div className="bg-secondary h-full rounded-full w-[82%]"></div>
                </div>
                <div className="flex justify-between text-[11px] text-on-surface-variant">
                  <span>Current: Private Collector</span>
                  <span>550 points to Lumière Patron Tier</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-surface-container-low rounded-2xl border border-outline-variant/20">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                    <span className="font-semibold text-xs text-on-surface">48-Hour Early Access</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant">
                    Exclusive preview rights on new seasonal capsules before public release.
                  </p>
                </div>

                <div className="p-3.5 bg-surface-container-low rounded-2xl border border-outline-variant/20">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-secondary text-[18px]">local_shipping</span>
                    <span className="font-semibold text-xs text-on-surface">Complimentary Express</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant">
                    Global carbon-neutral air courier on all purchases with no minimum spend.
                  </p>
                </div>

                <div className="p-3.5 bg-surface-container-low rounded-2xl border border-outline-variant/20">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-secondary text-[18px]">support_agent</span>
                    <span className="font-semibold text-xs text-on-surface">Dedicated Stylist</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant">
                    Priority WhatsApp &amp; virtual fitting reservations with Paris atelier directors.
                  </p>
                </div>

                <div className="p-3.5 bg-surface-container-low rounded-2xl border border-outline-variant/20">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-secondary text-[18px]">dry_cleaning</span>
                    <span className="font-semibold text-xs text-on-surface">Lifetime Hem Alterations</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant">
                    Complimentary in-boutique garment tailoring at our New York and Paris ateliers.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
