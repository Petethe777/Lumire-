import React, { useState } from 'react';
import { CartItem } from '../types';
import { FASHION_IMAGES } from '../data/fashionImages';

interface CheckoutViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
  onShowToast: (title: string, subtitle?: string) => void;
  onNavigateToShop: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onAddToCart,
  onShowToast,
  onNavigateToShop,
}) => {
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'cc' | 'installments'>('cc');
  const [promoCode, setPromoCode] = useState('ARCHIVE10');
  const [appliedPromo, setAppliedPromo] = useState('ARCHIVE10');
  const [isUpsellAdded, setIsUpsellAdded] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Form states
  const [email, setEmail] = useState('alexandra.vance@studio-archive.com');
  const [phone, setPhone] = useState('+1 (415) 892-0419');
  const [firstName, setFirstName] = useState('Alexandra');
  const [lastName, setLastName] = useState('Vance');
  const [street, setStreet] = useState('742 Evergreen Terrace, Suite 4B');
  const [city, setCity] = useState('San Francisco');
  const [state, setState] = useState('California (CA)');
  const [zip, setZip] = useState('94107');

  // Credit card inputs
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 9012');
  const [cardExp, setCardExp] = useState('08 / 27');
  const [cardCvv, setCardCvv] = useState('•••');

  // Math calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const originalSubtotal = cartItems.reduce((acc, item) => acc + (item.originalPrice || item.price) * item.quantity, 0);
  const flashSavings = Math.max(0, originalSubtotal - subtotal);
  const promoDiscount = appliedPromo === 'ARCHIVE10' ? Number((subtotal * 0.1).toFixed(2)) : 0;
  const shippingFee = shippingMethod === 'express' ? 12.0 : 0.0;
  const taxableAmount = Math.max(0, subtotal - promoDiscount);
  const salesTax = Number((taxableAmount * 0.0725).toFixed(2));
  const finalTotal = Number((taxableAmount + shippingFee + salesTax).toFixed(2));
  const totalSavings = Number((flashSavings + promoDiscount).toFixed(2));

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'ARCHIVE10') {
      setAppliedPromo('ARCHIVE10');
      onShowToast('Promo Applied', '10% Studio Archive discount applied');
    } else if (promoCode.trim()) {
      onShowToast('Invalid Code', 'Please try ARCHIVE10 for 10% off');
    }
  };

  const handleAddUpsell = () => {
    if (!isUpsellAdded) {
      onAddToCart({
        productId: 'upsell-cedar-mist',
        name: 'Atelier Cedar Garment Mist',
        variant: '50ml Organic Glass Vial',
        price: 18.0,
        quantity: 1,
        imageUrl: FASHION_IMAGES.cedarMist,
      });
      setIsUpsellAdded(true);
      onShowToast('Atelier Cedar Mist Added', 'Pair suggestion added to your order');
    }
  };

  const handleCompleteOrder = () => {
    setOrderComplete(true);
    onShowToast('Order Confirmed', 'Confirmation dispatched to your email');
  };

  return (
    <div className="w-full flex flex-col bg-surface">
      {/* Editorial Progress Tracker */}
      <section className="w-full bg-surface-container-low py-3 px-4 sm:px-8 border-b border-surface-container-high">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 font-label-sm text-xs uppercase tracking-wider text-on-surface-variant flex-wrap">
            <span className="flex items-center gap-1.5 text-primary font-semibold">
              <span className="w-4 h-4 rounded-full bg-primary text-on-primary text-[10px] flex items-center justify-center">
                1
              </span>
              Information
            </span>
            <span className="text-on-surface-variant/40">/</span>
            <span className="flex items-center gap-1.5 text-primary font-semibold">
              <span className="w-4 h-4 rounded-full bg-primary text-on-primary text-[10px] flex items-center justify-center">
                2
              </span>
              Shipping
            </span>
            <span className="text-on-surface-variant/40">/</span>
            <span className="flex items-center gap-1.5 text-on-surface font-semibold">
              <span className="w-4 h-4 rounded-full bg-surface-container-highest text-on-surface text-[10px] flex items-center justify-center">
                3
              </span>
              Payment
            </span>
          </div>

          <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-[11px] sm:text-xs">
            <span className="material-symbols-outlined text-[16px] text-secondary">lock</span>
            <span className="tracking-wider">256-BIT ENCRYPTED LUXURY CHECKOUT</span>
          </div>
        </div>
      </section>

      {/* Main Checkout Grid */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Steps 1, 2, 3 (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Express Payment Strip */}
            <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/20">
              <div className="flex items-center justify-between mb-3">
                <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant">
                  Express Checkout
                </span>
                <span className="font-label-sm text-xs text-secondary uppercase font-semibold">
                  Instant Authenticated
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  onClick={() => onShowToast('Apple Pay Initiated', 'Biometric validation prompted')}
                  className="h-11 bg-primary text-on-primary font-label-md text-xs sm:text-sm rounded-full flex items-center justify-center gap-1.5 shadow-sm hover:bg-primary-container transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">file_download</span>
                  <span>Pay</span>
                </button>
                <button
                  onClick={() => onShowToast('Google Pay Initiated', 'Google account verification')}
                  className="h-11 bg-surface-container-high text-on-surface font-label-md text-xs sm:text-sm rounded-full flex items-center justify-center gap-1.5 hover:bg-surface-container-highest transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="font-bold text-base tracking-tight font-display italic">G</span>
                  <span>Pay</span>
                </button>
                <button
                  onClick={() => onShowToast('ShopPay Initiated', 'Authenticating via SMS code')}
                  className="h-11 bg-[#5A31F4] text-white font-label-md text-xs sm:text-sm rounded-full flex items-center justify-center tracking-wider hover:opacity-95 transition-opacity cursor-pointer"
                  type="button"
                >
                  <span>
                    shop<span className="font-bold">Pay</span>
                  </span>
                </button>
                <button
                  onClick={() => onShowToast('PayPal Initiated', 'Redirecting to PayPal secure checkout')}
                  className="h-11 bg-[#003087] text-white font-label-md text-xs sm:text-sm rounded-full flex items-center justify-center font-bold tracking-tight hover:opacity-95 transition-opacity cursor-pointer"
                  type="button"
                >
                  <span className="italic font-display font-serif">
                    Pay<span className="text-[#0079C1]">Pal</span>
                  </span>
                </button>
              </div>

              <div className="relative flex py-space-sm items-center">
                <div className="flex-grow h-px bg-surface-container-high"></div>
                <span className="flex-shrink mx-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">
                  Or Continue Below
                </span>
                <div className="flex-grow h-px bg-surface-container-high"></div>
              </div>
            </div>

            {/* STEP 1: Contact Information */}
            <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm border border-outline-variant/20">
              <div className="flex items-center justify-between mb-space-md">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="font-title-lg text-title-lg text-on-surface font-semibold">
                    Contact Information
                  </h2>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Already have an account?{' '}
                  <a className="text-primary font-semibold underline underline-offset-2" href="#signin" onClick={(e) => e.preventDefault()}>
                    Sign in
                  </a>
                </span>
              </div>

              <div className="space-y-space-sm">
                <div>
                  <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1" htmlFor="checkout-email">
                    Email Address for Order Confirmation
                  </label>
                  <input
                    className="w-full bg-surface-container-low px-space-md py-3 text-body-md text-on-surface rounded focus:outline-none focus:bg-surface focus:shadow-inner transition-all"
                    id="checkout-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1" htmlFor="checkout-phone">
                      Mobile Phone (Delivery SMS updates)
                    </label>
                    <input
                      className="w-full bg-surface-container-low px-space-md py-3 text-body-md text-on-surface rounded focus:outline-none focus:bg-surface focus:shadow-inner transition-all"
                      id="checkout-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center pt-5">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input defaultChecked className="mt-1 rounded text-primary focus:ring-0 accent-primary" type="checkbox" />
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Send me SMS delivery updates &amp; private lookbook previews.
                      </span>
                    </label>
                  </div>
                </div>

                {/* Perks Callout */}
                <div className="bg-surface-container-low p-space-sm rounded flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[22px]">card_giftcard</span>
                  <div className="text-on-surface">
                    <p className="font-label-md text-label-md font-semibold">Joined LUMIÈRE Archive Club</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      You're earning 140 archive reward points with this deliberate order.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2: Shipping Address & Methods */}
            <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm border border-outline-variant/20">
              <div className="flex items-center justify-between mb-space-md">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="font-title-lg text-title-lg text-on-surface font-semibold">
                    Shipping Address
                  </h2>
                </div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">eco</span>
                  Carbon Neutral
                </span>
              </div>

              <div className="space-y-space-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1" htmlFor="first-name">
                      First Name
                    </label>
                    <input
                      className="w-full bg-surface-container-low px-space-md py-3 text-body-md text-on-surface rounded focus:outline-none focus:bg-surface focus:shadow-inner transition-all"
                      id="first-name"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1" htmlFor="last-name">
                      Last Name
                    </label>
                    <input
                      className="w-full bg-surface-container-low px-space-md py-3 text-body-md text-on-surface rounded focus:outline-none focus:bg-surface focus:shadow-inner transition-all"
                      id="last-name"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1" htmlFor="street-address">
                    Street Address
                  </label>
                  <input
                    className="w-full bg-surface-container-low px-space-md py-3 text-body-md text-on-surface rounded focus:outline-none focus:bg-surface focus:shadow-inner transition-all"
                    id="street-address"
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1" htmlFor="city">
                      City
                    </label>
                    <input
                      className="w-full bg-surface-container-low px-space-md py-3 text-body-md text-on-surface rounded focus:outline-none focus:bg-surface focus:shadow-inner transition-all"
                      id="city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1" htmlFor="state">
                      State / Province
                    </label>
                    <select
                      className="w-full bg-surface-container-low px-space-md py-3 text-body-md text-on-surface rounded focus:outline-none focus:bg-surface focus:shadow-inner transition-all cursor-pointer"
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option>California (CA)</option>
                      <option>New York (NY)</option>
                      <option>Washington (WA)</option>
                      <option>Illinois (IL)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1" htmlFor="zip">
                      Postal Code
                    </label>
                    <input
                      className="w-full bg-surface-container-low px-space-md py-3 text-body-md text-on-surface rounded focus:outline-none focus:bg-surface focus:shadow-inner transition-all"
                      id="zip"
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />
                  </div>
                </div>

                {/* Delivery Method Radios */}
                <div className="pt-space-sm">
                  <span className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-space-xs">
                    Delivery Method
                  </span>
                  <div className="space-y-2">
                    <label
                      onClick={() => setShippingMethod('standard')}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border gap-2.5 ${
                        shippingMethod === 'standard'
                          ? 'bg-surface-container-low border-primary shadow-sm'
                          : 'bg-surface-container-lowest border-outline-variant/30 hover:bg-surface-container-low'
                      }`}
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <input
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                          className="accent-primary w-4 h-4 mt-0.5 sm:mt-0 shrink-0"
                          name="shipping_rate"
                          type="radio"
                          value="standard"
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-title-md text-sm sm:text-base text-on-surface font-semibold">
                              Standard Carbon-Neutral Delivery
                            </span>
                            <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[10px] rounded-full uppercase font-bold shrink-0">
                              Complimentary
                            </span>
                          </div>
                          <span className="font-body-sm text-xs text-on-surface-variant block mt-0.5">
                            3–5 Business Days • 100% Offset Bio-Packaging
                          </span>
                        </div>
                      </div>
                      <span className="font-title-md text-sm sm:text-base font-bold text-on-surface self-end sm:self-center">FREE</span>
                    </label>

                    <label
                      onClick={() => setShippingMethod('express')}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border gap-2.5 ${
                        shippingMethod === 'express'
                          ? 'bg-surface-container-low border-primary shadow-sm'
                          : 'bg-surface-container-lowest border-outline-variant/30 hover:bg-surface-container-low'
                      }`}
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <input
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                          className="accent-primary w-4 h-4 mt-0.5 sm:mt-0 shrink-0"
                          name="shipping_rate"
                          type="radio"
                          value="express"
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-title-md text-sm sm:text-base text-on-surface font-semibold">
                              Express Courier Service
                            </span>
                            <span className="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-[10px] rounded-full uppercase font-bold shrink-0">
                              Priority
                            </span>
                          </div>
                          <span className="font-body-sm text-xs text-on-surface-variant block mt-0.5">
                            1–2 Business Days via DHL Air Courier
                          </span>
                        </div>
                      </div>
                      <span className="font-title-md text-sm sm:text-base font-bold text-on-surface self-end sm:self-center">$12.00</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3: Payment & Klarna Split */}
            <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl shadow-sm border border-outline-variant/20">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center">
                    3
                  </span>
                  <h2 className="font-title-lg text-lg text-on-surface font-semibold">
                    Payment Method
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  <span className="font-label-sm text-xs uppercase tracking-wider">PCI Compliant</span>
                </div>
              </div>

              {/* Payment Tabs */}
              <div className="flex flex-col gap-space-sm">
                <div
                  className={`p-space-md rounded border transition-all ${
                    paymentMethod === 'cc' ? 'bg-surface-container-low border-primary' : 'bg-surface-container-lowest border-outline-variant/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-space-sm">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        checked={paymentMethod === 'cc'}
                        onChange={() => setPaymentMethod('cc')}
                        className="accent-primary w-4 h-4"
                        name="payment_method"
                        type="radio"
                        value="cc"
                      />
                      <span className="font-title-md text-title-md text-on-surface">
                        Credit / Debit Card
                      </span>
                    </label>
                    <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-[10px]">
                      <span className="px-1.5 py-0.5 bg-surface rounded uppercase">VISA</span>
                      <span className="px-1.5 py-0.5 bg-surface rounded uppercase">MC</span>
                      <span className="px-1.5 py-0.5 bg-surface rounded uppercase">AMEX</span>
                    </div>
                  </div>

                  {paymentMethod === 'cc' && (
                    <div className="space-y-space-sm pt-2">
                      <div>
                        <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1" htmlFor="card-num">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            className="w-full bg-surface px-space-md py-3 text-body-md text-on-surface rounded focus:outline-none font-mono"
                            id="card-num"
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                          />
                          <span className="material-symbols-outlined absolute right-3 top-3 text-[20px] text-on-surface-variant">
                            credit_card
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-space-sm">
                        <div>
                          <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1" htmlFor="card-exp">
                            Expiration Date
                          </label>
                          <input
                            className="w-full bg-surface px-space-md py-3 text-body-md text-on-surface rounded focus:outline-none"
                            id="card-exp"
                            type="text"
                            value={cardExp}
                            onChange={(e) => setCardExp(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1" htmlFor="card-cvv">
                            Security Code (CVV)
                          </label>
                          <div className="relative">
                            <input
                              className="w-full bg-surface px-space-md py-3 text-body-md text-on-surface rounded focus:outline-none tracking-widest"
                              id="card-cvv"
                              maxLength={4}
                              type="password"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                            />
                            <span
                              className="material-symbols-outlined absolute right-3 top-3 text-[18px] text-on-surface-variant cursor-help"
                              title="3 or 4 digits on back of card"
                            >
                              help
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Installments Option */}
                <div
                  className={`p-space-md rounded border transition-all ${
                    paymentMethod === 'installments' ? 'bg-surface-container-low border-primary' : 'bg-surface-container-lowest border-outline-variant/30'
                  }`}
                >
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <input
                        checked={paymentMethod === 'installments'}
                        onChange={() => setPaymentMethod('installments')}
                        className="accent-primary w-4 h-4"
                        name="payment_method"
                        type="radio"
                        value="installments"
                      />
                      <div>
                        <span className="font-title-md text-title-md text-on-surface block font-semibold">
                          Pay in 4 interest-free installments
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          4 bi-weekly payments of <strong className="text-on-surface">${(finalTotal / 4).toFixed(2)}</strong> with Klarna. No hidden fees.
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-pink-100 text-pink-900 rounded font-bold font-label-sm text-label-sm uppercase">
                      Klarna.
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Trust Badges Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm text-center pt-space-xs">
              <div className="bg-surface-container p-space-sm rounded">
                <span className="material-symbols-outlined text-primary text-[24px] mb-1">lock</span>
                <span className="block font-label-sm text-label-sm uppercase text-on-surface font-bold">256-Bit SSL</span>
                <span className="block font-body-sm text-[12px] text-on-surface-variant">Encrypted Checkout</span>
              </div>
              <div className="bg-surface-container p-space-sm rounded">
                <span className="material-symbols-outlined text-primary text-[24px] mb-1">published_with_changes</span>
                <span className="block font-label-sm text-label-sm uppercase text-on-surface font-bold">30-Day Returns</span>
                <span className="block font-body-sm text-[12px] text-on-surface-variant">Complimentary Exchanges</span>
              </div>
              <div className="bg-surface-container p-space-sm rounded">
                <span className="material-symbols-outlined text-primary text-[24px] mb-1">support_agent</span>
                <span className="block font-label-sm text-label-sm uppercase text-on-surface font-bold">Concierge Help</span>
                <span className="block font-body-sm text-[12px] text-on-surface-variant">concierge@lumiere.com</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary & Interactive Cart (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-space-md sticky top-28">
            {/* Flash Sale Alert Pill */}
            <div className="bg-secondary-fixed p-space-md rounded flex items-start gap-3 shadow-sm border border-secondary/20">
              <span className="material-symbols-outlined text-secondary text-[24px] shrink-0 mt-0.5">bolt</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-label-md uppercase text-on-secondary-fixed font-bold tracking-wider">
                    Archive Flash Sale Active
                  </span>
                  <span className="px-1.5 py-0.5 bg-secondary text-on-secondary rounded text-[10px] font-bold">
                    SAVED ${totalSavings.toFixed(2)}
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-secondary-fixed-variant mt-0.5">
                  Exclusive 30% reduction applied directly to selected atelier pieces. Free carbon-neutral shipping unlocked!
                </p>
              </div>
            </div>

            {/* Order Breakdown Card */}
            <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm border border-outline-variant/20">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-low mb-space-md">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-serif">Your Bag</h3>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)} Selected Pieces
                </span>
              </div>

              {/* Cart Items List */}
              {cartItems.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-body-md text-on-surface-variant mb-3">Your shopping bag is currently empty.</p>
                  <button
                    onClick={onNavigateToShop}
                    className="bg-primary text-on-primary px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-on-surface-variant transition-colors cursor-pointer shadow-sm"
                  >
                    Browse Archive Pieces
                  </button>
                </div>
              ) : (
                <div className="space-y-space-sm max-h-[380px] overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-space-md items-start py-space-sm border-b border-surface-container-low">
                      <div className="relative w-20 h-24 bg-surface-container rounded overflow-hidden shrink-0">
                        <img className="w-full h-full object-cover" alt={item.name} src={item.imageUrl} />
                        {item.discountBadge && (
                          <span className="absolute top-1 left-1 bg-secondary text-on-secondary font-label-sm text-[9px] px-1 rounded uppercase font-bold">
                            {item.discountBadge}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-title-md text-title-md text-on-surface truncate font-semibold">
                            {item.name}
                          </h4>
                          <div className="text-right">
                            <span className="block font-title-md text-title-md text-on-surface font-bold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            {item.originalPrice && (
                              <span className="block font-body-sm text-[12px] text-on-surface-variant line-through">
                                ${(item.originalPrice * item.quantity).toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{item.variant}</p>
                        <div className="flex items-center justify-between mt-space-xs">
                          <div className="flex items-center bg-surface-container-low rounded px-2 py-0.5 gap-2">
                            <button
                              aria-label="Decrease quantity"
                              className="text-on-surface-variant hover:text-on-surface text-sm cursor-pointer"
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            >
                              -
                            </button>
                            <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              aria-label="Increase quantity"
                              className="text-on-surface-variant hover:text-on-surface text-sm cursor-pointer"
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="font-label-sm text-[11px] text-on-surface-variant hover:text-secondary underline cursor-pointer"
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Promo Code Form */}
              <div className="pt-space-md pb-space-sm">
                <form
                  className="flex gap-space-xs"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleApplyPromo();
                  }}
                >
                  <input
                    className="flex-1 bg-surface-container-low px-4 py-2.5 font-body-sm text-body-sm text-on-surface uppercase tracking-wider rounded-full focus:outline-none focus:bg-surface border border-outline-variant/30"
                    placeholder="Promo code or gift voucher"
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button
                    className="bg-primary px-5 py-2.5 font-label-md text-xs uppercase tracking-wider text-on-primary hover:bg-on-surface-variant rounded-full transition-colors cursor-pointer font-semibold shadow-sm"
                    type="button"
                    onClick={handleApplyPromo}
                  >
                    Apply
                  </button>
                </form>
                {appliedPromo && (
                  <div className="flex items-center gap-1.5 mt-2 text-secondary font-label-sm text-[11px]">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    <span>Code "{appliedPromo}" applied — additional studio discount</span>
                  </div>
                )}
              </div>

              {/* Line Items Calculation */}
              <div className="space-y-space-xs pt-space-sm border-t border-surface-container-low">
                <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                  <span>Original Subtotal</span>
                  <span>${originalSubtotal.toFixed(2)}</span>
                </div>
                {flashSavings > 0 && (
                  <div className="flex justify-between font-body-md text-body-md text-secondary font-semibold">
                    <span className="flex items-center gap-1">
                      <span>Flash Archive Savings</span>
                      <span className="material-symbols-outlined text-[14px]">local_offer</span>
                    </span>
                    <span>-${flashSavings.toFixed(2)}</span>
                  </div>
                )}
                {promoDiscount > 0 && (
                  <div className="flex justify-between font-body-md text-body-md text-secondary font-semibold">
                    <span>Promo Code ({appliedPromo})</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                  <span>Carbon-Neutral Shipping</span>
                  <span className="text-primary font-bold">{shippingFee === 0 ? 'FREE' : '$12.00'}</span>
                </div>
                <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                  <span>Estimated Sales Tax (CA 7.25%)</span>
                  <span>${salesTax.toFixed(2)}</span>
                </div>

                {/* Total Price */}
                <div className="flex justify-between items-baseline pt-space-md border-t border-surface-container-low mt-space-sm">
                  <div>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-serif">Total Due</span>
                    <span className="block font-body-sm text-[11px] text-on-surface-variant">
                      Includes taxes &amp; complimentary shipping
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-headline-lg text-headline-lg text-on-surface font-serif tracking-tight">
                      ${finalTotal.toFixed(2)}
                    </span>
                    <span className="block font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">
                      Saved ${totalSavings.toFixed(2)} in Total
                    </span>
                  </div>
                </div>
              </div>

              {/* Master Order CTA Button */}
              <div className="mt-space-lg space-y-space-sm">
                <button
                  onClick={handleCompleteOrder}
                  disabled={cartItems.length === 0}
                  className="w-full bg-primary text-on-primary py-4 px-space-lg rounded-full font-label-md text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-on-surface-variant shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                  <span>Complete Secure Order • ${finalTotal.toFixed(2)}</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
                <p className="font-body-sm text-[11px] text-center text-on-surface-variant">
                  By confirming your purchase, you accept the LUMIÈRE Studio{' '}
                  <a className="underline hover:text-on-surface" href="#terms" onClick={(e) => e.preventDefault()}>
                    Terms of Service
                  </a>{' '}
                  &amp;{' '}
                  <a className="underline hover:text-on-surface" href="#returns" onClick={(e) => e.preventDefault()}>
                    Return Policies
                  </a>
                  .
                </p>
              </div>

              {/* Micro Security Assurance Box */}
              <div className="mt-4 pt-4 border-t border-surface-container-low flex flex-wrap items-center justify-between gap-2.5 text-on-surface-variant font-label-sm text-[11px] uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
                  <span>Guaranteed Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[16px]">lock_clock</span>
                  <span>Price Locked for 15:00</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[16px]">headset_mic</span>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Curated Atelier Upsell Micro-banner */}
            <div className="bg-surface-container p-4 rounded-2xl flex items-center justify-between gap-3 border border-outline-variant/30">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 bg-surface rounded-xl overflow-hidden shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    alt="Organic cedar and amber wardrobe mist bottle"
                    src={FASHION_IMAGES.cedarMist}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0">
                  <span className="font-label-sm text-[10px] uppercase text-secondary font-bold block truncate">
                    Exclusive Pair Suggestion
                  </span>
                  <span className="font-title-md text-xs sm:text-sm font-medium text-on-surface block truncate">
                    Atelier Cedar Garment Mist
                  </span>
                </div>
              </div>
              <button
                className={`font-label-sm text-[11px] uppercase px-4 py-2 rounded-full transition-all shrink-0 cursor-pointer font-bold shadow-sm whitespace-nowrap ${
                  isUpsellAdded
                    ? 'bg-secondary text-on-secondary'
                    : 'bg-primary text-on-primary hover:bg-on-surface-variant'
                }`}
                onClick={handleAddUpsell}
                type="button"
              >
                {isUpsellAdded ? '✓ Added' : '+ Add $18'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Confirmed Modal */}
      {orderComplete && (
        <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-3xl shadow-2xl p-6 sm:p-8 text-center border border-outline-variant/30">
            <div className="w-16 h-16 bg-secondary/15 rounded-full flex items-center justify-center text-secondary mx-auto mb-4">
              <span className="material-symbols-outlined text-[32px]">verified</span>
            </div>
            <span className="font-label-sm text-xs uppercase tracking-widest text-secondary font-bold block mb-1">
              Order Confirmed #LUM-88492
            </span>
            <h3 className="font-headline-sm text-2xl text-on-surface mb-2 font-serif">
              Thank You, {firstName}!
            </h3>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
              Your deliberate selection is being prepared in our Marais atelier. We have dispatched shipping confirmation and carbon offset tracking to <strong>{email}</strong>.
            </p>
            <div className="bg-surface-container-low p-4 rounded-2xl mb-5 text-left text-xs space-y-1.5 border border-outline-variant/20">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Recipient:</span>
                <span className="font-medium text-on-surface">{firstName} {lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Destination:</span>
                <span className="font-medium text-on-surface">{street}, {city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Total Charged:</span>
                <span className="font-bold text-secondary">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setOrderComplete(false);
                onNavigateToShop();
              }}
              className="w-full bg-primary text-on-primary py-3.5 rounded-full font-label-md text-xs uppercase tracking-wider font-bold hover:bg-on-surface-variant transition-colors cursor-pointer shadow-md"
            >
              Continue Exploring Collection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
