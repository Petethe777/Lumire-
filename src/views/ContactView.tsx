import React, { useState } from 'react';

interface ContactViewProps {
  onShowToast: (title: string, subtitle?: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onShowToast }) => {
  // Topic Pill state
  const [selectedTopic, setSelectedTopic] = useState('Order Status');

  // Inquiry Form state
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientOrder, setClientOrder] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // FAQ Accordion state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Virtual Fitting Modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState('Tomorrow — 2:30 PM EST');
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingGarment, setBookingGarment] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Live Chat simulation
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: 'advisor' | 'user'; text: string; time: string }[]>([
    {
      sender: 'advisor',
      text: 'Bonjour! I am Elena Vance from our Paris Concierge desk. How may I assist your styling or sizing journey today?',
      time: 'Just now',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    onShowToast('Inquiry Transmitted', 'Your stylist will respond within 4 hours');
    setTimeout(() => {
      setClientName('');
      setClientEmail('');
      setClientOrder('');
      setClientMessage('');
    }, 1000);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    onShowToast('Appointment Reserved', `Calendar invitation sent to ${bookingEmail}`);
    setTimeout(() => {
      setIsBookingModalOpen(false);
      setBookingSuccess(false);
      setBookingName('');
      setBookingEmail('');
      setBookingGarment('');
    }, 2000);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsg, time: 'Just now' },
    ]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'advisor',
          text: 'Thank you for your note! For our organic European flax garments, we recommend sticking to your exact size for a graceful, relaxed drape. Would you like me to reserve a garment in your size?',
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  const faqData = [
    {
      question: 'How do your linen garments fit?',
      answer:
        'Our organic European linen garments are intentionally tailored with a relaxed, fluid drape that gently relaxes roughly 3-5% over the first few wears. We advise selecting your exact measurement according to our chest and waist metrics. If you prefer a structured architectural fit, our sizing specialists generally recommend sizing down one increment.',
    },
    {
      question: 'What is your 30-day return policy?',
      answer:
        'We offer complimentary worldwide 30-day exchanges and full refunds on all unworn items returned in original packaging with intact security ribbons. Simply visit our digital returns portal or notify our concierge to generate a pre-paid DHL Express label for immediate courier pickup from your doorstep.',
    },
    {
      question: 'How do flash sale discount timers work?',
      answer:
        'Our Archive Flash sales feature limited-edition excess production yards released at special rates for strictly designated periods (tracked by our real-time countdown timer). Once the banner clock strikes zero, promotional pricing automatically terminates to honor sustainable production balances. Items added to your cart are reserved for 15 minutes during active timers.',
    },
    {
      question: 'Where are your clothes crafted?',
      answer:
        'LUMIÈRE Studio garments are cut and sewn in family-run artisanal ateliers in Porto (Portugal) and Biella (Italy). We partner exclusively with certified heritage mills committed to GOTS organic cotton, fair labor wages, zero-hazardous-chemical dying methods, and 100% closed-loop greywater reclamation.',
    },
  ];

  return (
    <div className="w-full flex flex-col bg-surface">
      {/* Top Subtle Notification & Breadcrumb Strip */}
      <section className="w-full bg-surface-container-low px-margin py-space-sm border-b border-surface-container-high">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
          <div className="flex items-center gap-space-xs">
            <span className="text-on-surface font-semibold">Client Service</span>
            <span>/</span>
            <span className="text-secondary font-semibold">Atelier Concierge</span>
          </div>
          <div className="hidden sm:flex items-center gap-space-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
            <span>Concierge Desk Open • Paris &amp; New York Ateliers</span>
          </div>
        </div>
      </section>

      {/* Editorial Hero Section */}
      <section className="w-full px-margin pt-space-xl pb-space-lg">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-7 flex flex-col justify-center pr-0 lg:pr-space-xl">
            <span className="font-label-md text-label-md uppercase text-secondary tracking-widest block mb-space-sm font-bold">
              Personal Attention
            </span>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-space-md leading-tight font-serif">
              We are here to assist your styling journey. Gentle answers, custom sizing, and order care.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-space-lg">
              Whether you require drape recommendations for raw silk, personalized measurement matching, or post-purchase archive maintenance, our dedicated concierge advisers respond with warm attentiveness.
            </p>

            {/* Response Metrics Row */}
            <div className="flex flex-wrap items-center gap-space-lg pt-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-sm text-headline-sm text-on-surface font-serif">1.8</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-[10px] uppercase text-on-surface font-bold tracking-wider">Minutes</span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">Avg Live Chat Response</span>
                </div>
              </div>
              <div className="h-8 w-px bg-outline-variant/30 hidden sm:block"></div>
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-sm text-headline-sm text-secondary font-serif">99.4%</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-[10px] uppercase text-on-surface font-bold tracking-wider">Satisfaction</span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">Client Fit Confidence</span>
                </div>
              </div>
              <div className="h-8 w-px bg-outline-variant/30 hidden sm:block"></div>
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-sm text-headline-sm text-on-surface font-serif">6 Days</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-[10px] uppercase text-on-surface font-bold tracking-wider">A Week</span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">Mon – Sat Consultation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual Composition */}
          <div className="lg:col-span-5 relative mt-space-lg lg:mt-0">
            <div className="relative w-full aspect-[4/5] bg-surface-container overflow-hidden shadow-md rounded">
              <img
                className="w-full h-full object-cover"
                alt="Portrait of friendly female personal fashion stylist in showroom atelier"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfGdekteiLM6JeKSFUdVeWzAlwK19NpFvvkXdI2zr_gwIQlB7rGKBVjIRyNYeVwQiczN_YAdqyztDHyixv0IVHQW53YNoSMKfDfYbAn-S7FZQtqTui4n5o8ptPLp2p7cDtEW-2nyrW8TMb8l4kvWe7iQHD9N5z-KfwGdDGtJsE6rHwufNlRBDU5058Th1X4cvKwY0WeXdgUoy7wx-nFYMyrhrXZcVLjY_o_fWx8Tu_4FEl5EMu3gx9"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent p-space-md flex items-end justify-between text-on-primary">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed block">
                    Lead Client Advisor
                  </span>
                  <span className="font-title-md text-title-md font-semibold">Elena Vance &amp; Concierge Team</span>
                </div>
                <span className="font-label-sm text-[11px] px-space-xs py-0.5 bg-surface/20 backdrop-blur-md rounded text-on-primary">
                  Paris &amp; NYC
                </span>
              </div>
            </div>

            {/* Inset Badge */}
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-space-sm bg-surface-container-lowest p-space-md shadow-xl rounded-lg max-w-xs border border-outline-variant/20">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-[22px]">favorite</span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface block font-bold">
                  Bespoke Fit Promise
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant text-[12px] leading-tight block">
                  Free exchanges on all custom fitting garments.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Concierge Contact Modes Grid */}
      <section className="w-full px-margin py-space-xl bg-surface-container-low border-t border-surface-container-high">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-space-lg flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
            <div>
              <span className="font-label-sm text-label-sm uppercase text-secondary tracking-widest block mb-1 font-bold">
                Direct Channels
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-serif">
                Connect in Real-Time
              </h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
              Choose your preferred conversation space. Our advisors possess complete fabric composition notes and archival silhouette history.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Card 1: Live Chat */}
            <div className="bg-surface-container-lowest p-space-lg rounded flex flex-col justify-between shadow-sm hover:shadow-md transition-all group border border-outline-variant/20">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <div className="w-12 h-12 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[24px]">chat_bubble_outline</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-space-xs py-1 bg-tertiary-fixed rounded">
                    <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                    <span className="font-label-sm text-[10px] uppercase text-on-tertiary-fixed tracking-wider font-bold">
                      Active Now
                    </span>
                  </div>
                </div>
                <h3 className="font-title-lg text-title-lg text-on-surface mb-1 font-semibold">Live Styling Chat</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                  Instant digital dialogue with stylist consultants regarding sizing charts, color tone pairings, and inventory drops.
                </p>
                <div className="bg-surface-container-low p-space-xs rounded mb-space-md">
                  <span className="font-label-sm text-[11px] text-on-surface-variant block uppercase tracking-wider">
                    Average Wait Time
                  </span>
                  <span className="font-title-md text-title-md text-on-surface font-bold">Under 2 minutes</span>
                </div>
              </div>
              <button
                className="w-full bg-primary text-on-primary py-space-sm px-space-md font-label-md text-label-md uppercase tracking-wider flex items-center justify-center gap-space-xs hover:bg-on-surface-variant transition-colors rounded-full cursor-pointer"
                type="button"
                onClick={() => setIsLiveChatOpen(true)}
              >
                <span>Launch Live Chat</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

            {/* Card 2: Email Support */}
            <div className="bg-surface-container-lowest p-space-lg rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all group border border-outline-variant/20">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface">
                    <span className="material-symbols-outlined text-[24px]">mail_outline</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-space-xs py-1 bg-surface-container rounded-full">
                    <span className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-wider">
                      Standard Channel
                    </span>
                  </div>
                </div>
                <h3 className="font-title-lg text-title-lg text-on-surface mb-1 font-semibold">Email Editorial Care</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                  Comprehensive responses for intricate alterations, bespoke orders, press requests, and order modification.
                </p>
                <div className="bg-surface-container-low p-space-xs rounded-xl mb-space-md">
                  <span className="font-label-sm text-[11px] text-on-surface-variant block uppercase tracking-wider">
                    Direct Inbox
                  </span>
                  <a className="font-title-md text-[14px] text-secondary font-bold hover:underline block truncate" href="mailto:concierge@lumierestudio.com">
                    concierge@lumierestudio.com
                  </a>
                </div>
              </div>
              <a
                className="w-full bg-surface-container text-on-surface py-space-sm px-space-md font-label-md text-label-md uppercase tracking-wider flex items-center justify-center gap-space-xs hover:bg-surface-container-highest transition-colors rounded-full cursor-pointer text-center font-semibold"
                href="mailto:concierge@lumierestudio.com"
              >
                <span>Send Formal Email</span>
                <span className="material-symbols-outlined text-[18px]">outgoing_mail</span>
              </a>
            </div>

            {/* Card 3: Phone & WhatsApp */}
            <div className="bg-surface-container-lowest p-space-lg rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all group border border-outline-variant/20">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface">
                    <span className="material-symbols-outlined text-[24px]">call</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-space-xs py-1 bg-surface-container rounded-full">
                    <span className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-wider">
                      Voice &amp; Text
                    </span>
                  </div>
                </div>
                <h3 className="font-title-lg text-title-lg text-on-surface mb-1 font-semibold">Phone &amp; WhatsApp</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                  Speak immediately with a New York or Milan concierge associate or send high-resolution photos of garment fits.
                </p>
                <div className="bg-surface-container-low p-space-xs rounded-xl mb-space-md">
                  <span className="font-label-sm text-[11px] text-on-surface-variant block uppercase tracking-wider">
                    Mon – Sat • 9am – 6pm EST
                  </span>
                  <span className="font-title-md text-title-md text-on-surface font-bold block">+1 800 492 8820</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-space-xs">
                <a
                  className="bg-surface-container text-on-surface py-space-sm px-space-xs font-label-sm text-label-sm uppercase tracking-wider flex items-center justify-center gap-1 hover:bg-surface-container-highest transition-colors rounded-full"
                  href="tel:18004928820"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span>Call Direct</span>
                </a>
                <button
                  onClick={() => onShowToast('WhatsApp Connected', '+1 800 492 8820 styling concierge ready')}
                  className="bg-primary text-on-primary py-space-sm px-space-xs font-label-sm text-label-sm uppercase tracking-wider flex items-center justify-center gap-1 hover:bg-on-surface-variant transition-colors rounded-full cursor-pointer font-semibold"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">forum</span>
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Split Section: Interactive Inquiry Form & Stylist Fitting Spotlight */}
      <section className="w-full px-margin py-space-xl">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left 7 Cols: Inquiry Form */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-space-lg md:p-space-xl rounded shadow-sm border border-outline-variant/20">
            <div className="mb-space-lg">
              <span className="font-label-sm text-label-sm uppercase text-secondary tracking-widest block mb-1 font-bold">
                Direct Submission
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-serif">
                Submit an Atelier Inquiry
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Please designate your inquiry topic below so we can route your ticket directly to the specialized artisan or logistics coordinator.
              </p>
            </div>

            <form className="flex flex-col gap-space-md" onSubmit={handleInquirySubmit}>
              {/* Topic Selector Pills */}
              <div>
                <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface mb-space-xs font-semibold">
                  Select Topic *
                </label>
                <div className="flex flex-wrap gap-space-xs">
                  {['Order Status', 'Fit & Sizing Advice', 'Returns & Exchanges', 'Wholesale & Press'].map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedTopic(topic)}
                      className={`px-space-md py-space-xs rounded-full font-label-sm text-label-sm uppercase tracking-wider transition-all cursor-pointer ${
                        selectedTopic === topic
                          ? 'bg-primary text-on-primary font-bold'
                          : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div>
                  <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface mb-1" htmlFor="client-name">
                    Your Full Name *
                  </label>
                  <input
                    className="w-full bg-surface-container-low px-space-md py-space-sm font-body-md text-body-md text-on-surface rounded-xl placeholder:text-on-surface-variant/50 focus:outline-none focus:bg-surface transition-all border border-outline-variant/30"
                    id="client-name"
                    placeholder="e.g. Camille Laurent"
                    required
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface mb-1" htmlFor="client-email">
                    Email Address *
                  </label>
                  <input
                    className="w-full bg-surface-container-low px-space-md py-space-sm font-body-md text-body-md text-on-surface rounded-xl placeholder:text-on-surface-variant/50 focus:outline-none focus:bg-surface transition-all border border-outline-variant/30"
                    id="client-email"
                    placeholder="e.g. camille@domain.com"
                    required
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Order Identifier */}
              <div>
                <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface mb-1" htmlFor="client-order">
                  Order Identifier <span className="text-on-surface-variant normal-case font-normal">(Optional)</span>
                </label>
                <input
                  className="w-full bg-surface-container-low px-space-md py-space-sm font-body-md text-body-md text-on-surface rounded-xl placeholder:text-on-surface-variant/50 focus:outline-none focus:bg-surface transition-all font-mono text-[14px] border border-outline-variant/30"
                  id="client-order"
                  placeholder="e.g. LUM-88492"
                  type="text"
                  value={clientOrder}
                  onChange={(e) => setClientOrder(e.target.value)}
                />
              </div>

              {/* Message Area */}
              <div>
                <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface mb-1" htmlFor="client-message">
                  Your Inquiry or Measurements *
                </label>
                <textarea
                  className="w-full bg-surface-container-low p-space-md font-body-md text-body-md text-on-surface rounded-xl placeholder:text-on-surface-variant/50 focus:outline-none focus:bg-surface transition-all resize-y border border-outline-variant/30"
                  id="client-message"
                  placeholder="Describe your question, sizing uncertainty, or desired alteration in detail..."
                  required
                  rows={4}
                  value={clientMessage}
                  onChange={(e) => setClientMessage(e.target.value)}
                ></textarea>
              </div>

              {/* Success Feedback */}
              {inquirySubmitted && (
                <div className="p-space-sm rounded-xl bg-tertiary-fixed text-on-tertiary-fixed text-body-sm flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span>Thank you. Your message has been routed to your atelier stylist. Expect a reply within 4 hours.</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                className="bg-primary text-on-primary py-space-sm px-space-lg font-label-md text-label-md uppercase tracking-wider hover:bg-on-surface-variant transition-all self-start flex items-center gap-space-xs rounded-full cursor-pointer font-bold shadow-md"
                type="submit"
              >
                <span>Transmit Message</span>
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          </div>

          {/* Right 5 Cols: Fitting Spotlight & Guarantee */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            {/* Stylist Booking Spotlight Card */}
            <div className="bg-surface-container p-space-lg rounded shadow-sm relative overflow-hidden flex flex-col justify-between flex-1 border border-outline-variant/30">
              <div>
                <div className="flex items-center gap-space-sm mb-space-md">
                  <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm shrink-0 bg-surface">
                    <img
                      className="w-full h-full object-cover"
                      alt="Headshot of friendly male customer care advisor"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBySeJYZkvIlu-o_6MCThKi5EMZ5KUcMRLd8yO1hCQK3UVLVvUXqqCXxNOTNlXyKSQPlt6BSEfDmGh9NJoIMS_8jwDRZnUiM2EZizUsNm0CWEirpCviJAZfBvhwlifDkaw79Cph0ytUwCXdewWhN7p5vdEtICcXb6iSkbjG3AnJ6r2iUpromhbIK7EmKPKP3Aa2nP7EWkexfAa7N8qg6lfcD7OI__erSQUizXK5Z9ww0mYZlPUgJHN_"
                    />
                  </div>
                  <div>
                    <span className="font-label-sm text-[10px] uppercase text-secondary font-bold tracking-wider block">
                      Complimentary Service
                    </span>
                    <h3 className="font-title-lg text-title-lg text-on-surface leading-snug font-serif">
                      Virtual 1-on-1 Fitting
                    </h3>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      With Senior Stylist Julian Miller
                    </span>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                  Unsure which silhouette honors your frame? Reserve a private 15-minute video appointment. We hold garments up to camera, analyze fit on live dress forms, and review fabric stretch.
                </p>
                <div className="space-y-space-xs mb-space-lg">
                  <div className="flex items-center gap-space-xs text-body-sm text-on-surface">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check</span>
                    <span>Personalized bust, waist, and hip calibration</span>
                  </div>
                  <div className="flex items-center gap-space-xs text-body-sm text-on-surface">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check</span>
                    <span>Real-time color matching against skin undertone</span>
                  </div>
                  <div className="flex items-center gap-space-xs text-body-sm text-on-surface">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check</span>
                    <span>Exclusive pre-order access for sold-out runs</span>
                  </div>
                </div>
              </div>

              <div>
                {/* Earliest Slot Card */}
                <div className="bg-surface-container-lowest p-space-sm rounded mb-space-md border border-outline-variant/30">
                  <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant block mb-1">
                    Earliest Available Slot:
                  </span>
                  <div className="flex items-center justify-between font-label-md text-label-md text-on-surface font-semibold">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-secondary text-[16px]">calendar_today</span>
                      <span>Tomorrow, 2:30 PM EST</span>
                    </div>
                    <span className="text-secondary font-label-sm text-[11px] uppercase tracking-wider font-bold">
                      3 Slots Open
                    </span>
                  </div>
                </div>
                <button
                  className="w-full bg-secondary text-on-secondary py-space-sm px-space-md font-label-md text-label-md uppercase tracking-wider hover:bg-on-secondary-container transition-colors text-center block shadow-sm rounded-full cursor-pointer font-bold"
                  type="button"
                  onClick={() => setIsBookingModalOpen(true)}
                >
                  Schedule 15-min Virtual Fitting
                </button>
              </div>
            </div>

            {/* Team Guarantee Note */}
            <div className="bg-surface-container-low p-space-md rounded flex items-center gap-space-md border border-outline-variant/20">
              <div className="w-20 h-20 rounded overflow-hidden shrink-0 bg-surface">
                <img
                  className="w-full h-full object-cover"
                  alt="Two concierge fashion stylists reviewing wool garments"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK88MoDuzANtEWjwpbBPGvN6vHC0n78A0h7GQICj7oGqjc_ovNNA8YpMsIf2TI0cM6-fkOVMjMTLGUqBLV9Hbq5dMScwHObIwsm3d6Q7iJerjxQL3RJ-HRw6iedAlOp6I88wMo8scTx414LyXTlqALQ90c2TXW4rgpeOTZdTzbVDgFrffyN9o7j9hkiYBL_mnzpxbLIZo-0wzEHCuJGHS_OM_BzflN4ZgdFlAeEJL4L3S1sHgkSxIm"
                />
              </div>
              <div>
                <span className="font-label-sm text-[10px] uppercase text-on-surface font-bold tracking-wider block">
                  Human-Centered Atelier
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px] leading-snug mt-0.5">
                  Every message is reviewed by real humans in our Soho and Marais design studios—never automated conversational bots.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="w-full px-margin py-space-xl bg-surface-container-low border-t border-surface-container-high">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-space-xl">
            <span className="font-label-sm text-label-sm uppercase text-secondary tracking-widest block mb-space-xs font-bold">
              Immediate Clarity
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-space-xs font-serif">
              Frequently Addressed Inquiries
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Essential notes regarding our handcrafted textiles, archival preservation, sizing norms, and shipment timelines.
            </p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-space-sm">
            {faqData.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-surface-container-lowest rounded overflow-hidden transition-all shadow-sm border border-outline-variant/20"
                >
                  <button
                    className="w-full px-space-lg py-space-md flex items-center justify-between text-left focus:outline-none cursor-pointer"
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  >
                    <span className="font-title-md text-title-md text-on-surface pr-space-md font-semibold">
                      {item.question}
                    </span>
                    <span
                      className={`material-symbols-outlined text-secondary text-[24px] transform transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-space-lg pb-space-md">
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Physical Showrooms */}
      <section className="w-full px-margin py-space-xl">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-space-lg">
            <span className="font-label-sm text-label-sm uppercase text-secondary tracking-widest block mb-1 font-bold">
              Physical Presences
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface font-serif">
              Private Showrooms
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Walk-in visits welcomed during showroom hours; appointment suggested for dedicated tailor fittings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Showroom 1: New York Soho */}
            <div className="bg-surface-container-low p-space-lg rounded flex flex-col justify-between border border-outline-variant/20">
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
                    Flagship Atelier
                  </span>
                  <span className="font-label-sm text-[11px] text-on-surface-variant">SoHo • Manhattan</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs font-serif">
                  482 Broome Street
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                  4th Floor Loft (Buzzer 4A)
                  <br />
                  New York, NY 10013
                </p>
                <div className="space-y-1 font-body-sm text-body-sm text-on-surface mb-space-md">
                  <p>
                    <span className="font-semibold text-on-surface">Monday – Friday:</span> 10:00 AM – 7:00 PM EST
                  </p>
                  <p>
                    <span className="font-semibold text-on-surface">Saturday:</span> 11:00 AM – 6:00 PM EST
                  </p>
                  <p>
                    <span className="text-on-surface-variant font-normal">Sunday: By Private RSVP Only</span>
                  </p>
                </div>
              </div>
              <a
                className="inline-flex items-center gap-1 font-label-md text-label-md uppercase tracking-wider text-secondary hover:text-on-secondary-container font-semibold"
                href="#map-ny"
                onClick={(e) => {
                  e.preventDefault();
                  onShowToast('Soho Atelier Directions', 'Subway: Spring St (C/E) or Prince St (N/R/W)');
                }}
              >
                <span>View Map &amp; Transit Details</span>
                <span className="material-symbols-outlined text-[16px]">north_east</span>
              </a>
            </div>

            {/* Showroom 2: Paris Le Marais */}
            <div className="bg-surface-container-low p-space-lg rounded flex flex-col justify-between border border-outline-variant/20">
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
                    European Archive
                  </span>
                  <span className="font-label-sm text-[11px] text-on-surface-variant">3ème Arrondissement</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs font-serif">
                  19 Rue de Poitou
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                  Cour Intérieure Droite
                  <br />
                  75003 Paris, France
                </p>
                <div className="space-y-1 font-body-sm text-body-sm text-on-surface mb-space-md">
                  <p>
                    <span className="font-semibold text-on-surface">Mardi – Samedi:</span> 11:00 – 19:30 CET
                  </p>
                  <p>
                    <span className="font-semibold text-on-surface">Dimanche:</span> 14:00 – 18:00 CET
                  </p>
                  <p>
                    <span className="text-on-surface-variant font-normal">Lundi: Studio Fermé pour Création</span>
                  </p>
                </div>
              </div>
              <a
                className="inline-flex items-center gap-1 font-label-md text-label-md uppercase tracking-wider text-secondary hover:text-on-secondary-container font-semibold"
                href="#map-paris"
                onClick={(e) => {
                  e.preventDefault();
                  onShowToast('Marais Atelier Directions', 'Métro: Saint-Sébastien - Froissart (Ligne 8)');
                }}
              >
                <span>View Map &amp; Transit Details</span>
                <span className="material-symbols-outlined text-[16px]">north_east</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex items-center justify-center p-space-md animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded p-space-lg shadow-2xl relative border border-outline-variant/30">
            <button
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface cursor-pointer"
              onClick={() => setIsBookingModalOpen(false)}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
            <div className="mb-space-md">
              <span className="font-label-sm text-[10px] uppercase tracking-wider text-secondary font-bold block">
                15-Minute Concierge Session
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-serif">
                Book Fitting Consultation
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Our lead stylist will join you via private video feed to inspect drape and verify measurements.
              </p>
            </div>

            <form className="flex flex-col gap-space-sm" onSubmit={handleBookingSubmit}>
              <div>
                <label className="block font-label-sm text-[11px] uppercase text-on-surface mb-1 font-semibold">
                  Select Date &amp; Time
                </label>
                <select
                  className="w-full bg-surface-container-low px-space-md py-space-xs font-body-sm rounded text-on-surface focus:outline-none"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                >
                  <option>Tomorrow — 2:30 PM EST</option>
                  <option>Tomorrow — 4:00 PM EST</option>
                  <option>Thursday — 11:00 AM EST</option>
                  <option>Thursday — 3:15 PM EST</option>
                  <option>Friday — 1:00 PM EST</option>
                </select>
              </div>

              <div>
                <label className="block font-label-sm text-[11px] uppercase text-on-surface mb-1 font-semibold">
                  Your Name
                </label>
                <input
                  className="w-full bg-surface-container-low px-space-md py-space-xs font-body-sm rounded text-on-surface focus:outline-none"
                  placeholder="Full name"
                  required
                  type="text"
                  value={bookingName}
                  onChange={(e) => setBookingName(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-label-sm text-[11px] uppercase text-on-surface mb-1 font-semibold">
                  Email for Calendar Invite
                </label>
                <input
                  className="w-full bg-surface-container-low px-space-md py-space-xs font-body-sm rounded text-on-surface focus:outline-none"
                  placeholder="name@domain.com"
                  required
                  type="email"
                  value={bookingEmail}
                  onChange={(e) => setBookingEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-label-sm text-[11px] uppercase text-on-surface mb-1 font-semibold">
                  Garment of Primary Interest
                </label>
                <input
                  className="w-full bg-surface-container-low px-space-md py-space-xs font-body-sm rounded text-on-surface focus:outline-none"
                  placeholder="e.g. Sylvan Relaxed Wool Blazer"
                  type="text"
                  value={bookingGarment}
                  onChange={(e) => setBookingGarment(e.target.value)}
                />
              </div>

              {bookingSuccess && (
                <div className="p-space-xs bg-tertiary-fixed text-on-tertiary-fixed font-body-sm text-center rounded">
                  Appointment reserved! An invite has been dispatched to your email.
                </div>
              )}

              <button
                className="mt-space-xs w-full bg-primary text-on-primary py-space-sm font-label-md text-label-md uppercase tracking-wider hover:bg-on-surface-variant transition-colors rounded-full cursor-pointer font-bold shadow-md"
                type="submit"
              >
                Confirm Virtual Reservation
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Live Chat Drawer / Modal */}
      {isLiveChatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-32px)] bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/30 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6">
          {/* Chat Header */}
          <div className="bg-primary text-on-primary p-space-md flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfGdekteiLM6JeKSFUdVeWzAlwK19NpFvvkXdI2zr_gwIQlB7rGKBVjIRyNYeVwQiczN_YAdqyztDHyixv0IVHQW53YNoSMKfDfYbAn-S7FZQtqTui4n5o8ptPLp2p7cDtEW-2nyrW8TMb8l4kvWe7iQHD9N5z-KfwGdDGtJsE6rHwufNlRBDU5058Th1X4cvKwY0WeXdgUoy7wx-nFYMyrhrXZcVLjY_o_fWx8Tu_4FEl5EMu3gx9"
                  alt="Elena Vance"
                  className="w-9 h-9 rounded-full object-cover border border-surface"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-primary"></span>
              </div>
              <div>
                <span className="font-title-md text-sm font-semibold block leading-tight">Elena Vance</span>
                <span className="font-label-sm text-[10px] text-surface-variant uppercase tracking-wider">
                  Paris Styling Desk • Active
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsLiveChatOpen(false)}
              className="text-on-primary/70 hover:text-on-primary cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-space-md max-h-72 overflow-y-auto space-y-3 bg-surface">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-space-sm rounded-xl text-body-sm max-w-[85%] ${
                    msg.sender === 'user'
                      ? 'bg-primary text-on-primary rounded-br-none'
                      : 'bg-surface-container-high text-on-surface rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="font-label-sm text-[9px] text-on-surface-variant mt-0.5">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendChat} className="p-space-sm bg-surface-container-lowest border-t border-outline-variant/20 flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about drape, fabric, sizing..."
              className="flex-1 bg-surface-container-low px-4 py-2 rounded-full text-body-sm text-on-surface focus:outline-none border border-outline-variant/30"
            />
            <button
              type="submit"
              className="bg-primary text-on-primary px-5 py-2 rounded-full font-label-md text-xs uppercase cursor-pointer font-bold hover:bg-on-surface-variant transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
