import React, { useState } from 'react';
import {
  Tag,
  CheckCircle2,
  Clock,
  ShieldCheck,
  MessageCircle,
  ArrowRight,
  FileCheck2,
  Sparkles,
  HeartPulse,
  CreditCard,
  Building2,
  ChevronDown,
  ChevronUp,
  Maximize2,
  X,
  PlusCircle,
  Fingerprint,
  ExternalLink,
  Store
} from 'lucide-react';
import { motion } from 'motion/react';
import { SHOP_INFO } from '../data/servicesData';
import { safeOpenUrl, getWhatsAppUrl } from '../utils/safeNavigation';

interface AyushmanPromoBannerProps {
  onOpenApplyModal: (serviceName?: string) => void;
  onViewChecklist: (serviceName: string) => void;
}

export const AyushmanPromoBanner: React.FC<AyushmanPromoBannerProps> = ({
  onOpenApplyModal,
  onViewChecklist,
}) => {
  const [showDocList, setShowDocList] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleWhatsAppBooking = (planType?: string) => {
    const text = 
      `Hello PATLU ONLINE SERVICE! I saw your ad for *Ayushman Card (PM-JAY ₹5 Lakh Free Treatment)*.\n\n` +
      `I am interested in: ${planType || 'e-KYC (₹50) / PVC Card (₹100)'}.\n` +
      `Please check if my family name is eligible in the Ration Card list and let me know the process.`;
    safeOpenUrl(getWhatsAppUrl(text));
  };

  return (
    <section id="ayushman-offer" className="py-6 md:py-10 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Outer Banner Card with rich emerald green & golden yellow health theme */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950 text-white shadow-2xl border-2 border-emerald-400/50">
        {/* Glow ambient background effects */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Promotional Ribbon */}
        <div className="bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 text-slate-950 px-4 py-2 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-between flex-wrap gap-2 shadow-inner">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>AYUSHMAN BHARAT PM-JAY &bull; ₹5,00,000/- ANNUAL FREE TREATMENT</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-extrabold">
            <span className="bg-slate-950 text-emerald-300 px-2 py-0.5 rounded">
              e-KYC: ₹50/- &bull; PVC CARD: ₹100/-
            </span>
            <span className="hidden sm:inline">OFFICIAL NHA SEVA PORTAL</span>
          </div>
        </div>

        {/* Main Ad Body: 2 Columns */}
        <div className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines, Service Features & Dual Pricing Cards */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
                ₹5 Lakh Cashless Treatment
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30">
                <Fingerprint className="w-3.5 h-3.5 text-amber-400" />
                Instant e-KYC
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-teal-500/20 text-teal-300 border border-teal-400/30">
                <CreditCard className="w-3.5 h-3.5 text-teal-400" />
                Heavy PVC Card Print
              </span>
            </div>

            {/* Ad Headline */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
              >
                Ayushman Card{' '}
                <motion.span
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-amber-300 to-emerald-200 bg-[length:200%_auto]"
                >
                  (PM-JAY ₹5 Lakh Free Treatment)
                </motion.span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed"
              >
                Protect your entire family with government-sponsored <strong>₹5,00,000/- per year</strong> free medical treatment for major illnesses, surgeries, and hospitalizations in government and empanelled private hospitals nationwide!
              </motion.p>
            </div>

            {/* Statutory Disclaimer Box */}
            <div className="bg-slate-900/95 border border-teal-400/40 rounded-xl p-3 text-xs text-teal-200 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <strong>Official Government Portal Notice:</strong> Ayushman PM-JAY eligibility verification and Golden Card downloads are managed on the official NHA portal (<a href="https://beneficiary.nha.gov.in" target="_blank" rel="noopener noreferrer" className="underline font-bold text-teal-300 hover:text-white">beneficiary.nha.gov.in</a>). Patlu Cyber Desk provides form assistance &amp; plastic printing services.
              </div>
            </div>

            {/* Dual Rate Showcase Cards (e-KYC ₹50 & PVC Card ₹100) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: e-KYC at ₹50 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-slate-900/90 rounded-2xl border-2 border-emerald-400/60 p-4 shadow-xl flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                      <Fingerprint className="w-3.5 h-3.5" />
                      Plan 1: Online e-KYC
                    </span>
                    <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-400/30">
                      INSTANT
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <motion.span
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                      className="text-3xl font-black text-white inline-block"
                    >
                      ₹50/-
                    </motion.span>
                    <span className="text-xs text-slate-400 line-through">₹100</span>
                    <span className="text-[11px] text-emerald-400 font-bold">Only</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1 mt-2.5">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Ration Card / Name Search</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Aadhaar Biometric / OTP e-KYC</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Approved Digital Card on WhatsApp</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => handleWhatsAppBooking('Online e-KYC (₹50 Plan)')}
                  className="mt-3.5 w-full py-2 px-3 rounded-xl text-xs font-bold bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white border border-emerald-400/40 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Book e-KYC for ₹50</span>
                </button>
              </motion.div>

              {/* Card 2: PVC Card at ₹100 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-slate-900/90 rounded-2xl border-2 border-amber-400/60 p-4 shadow-xl flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5" />
                      Plan 2: Original PVC Card
                    </span>
                    <span className="text-[10px] font-black uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                      PREMIUM
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <motion.span
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut', delay: 0.5 }}
                      className="text-3xl font-black text-white inline-block"
                    >
                      ₹100/-
                    </motion.span>
                    <span className="text-xs text-slate-400 line-through">₹150</span>
                    <span className="text-[11px] text-amber-400 font-bold">Only</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1 mt-2.5">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Thick Laminated PVC Plastic Card</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>100% Waterproof &amp; Scratchproof</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Instant Hospital QR Code Scan</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => handleWhatsAppBooking('Original PVC Smart Card (₹100 Plan)')}
                  className="mt-3.5 w-full py-2 px-3 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-400/40 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Order PVC Card for ₹100</span>
                </button>
              </motion.div>
            </div>

            {/* Service Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm font-semibold text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>₹5,00,000/- Per Year Free Hospital Treatment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Valid in Govt &amp; Top Empanelled Private Hospitals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>All Family Members (Parents, Spouse, Children) Covered</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Same-Day Card Handover at Our Cyber Cafe Shop</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://beneficiary.nha.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Visit Official NHA Ayushman Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                id="ayushman-ad-whatsapp-btn"
                onClick={() => handleWhatsAppBooking()}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book on WhatsApp</span>
              </button>

              <button
                type="button"
                id="ayushman-ad-online-btn"
                onClick={() => onOpenApplyModal('Ayushman Card (PM-JAY ₹5 Lakh Free Treatment) - e-KYC ₹50 | PVC Card ₹100')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-all active:scale-95 cursor-pointer"
                title="Visit our physical shop counter in Belda"
              >
                <Store className="w-4 h-4" />
                <span>Visit Shop for Card</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Expandable Eligibility & Documents Checklist */}
            {showDocList && (
              <div className="bg-slate-900/95 rounded-xl p-4 border border-slate-700 text-xs text-slate-300 space-y-2 animate-in fade-in duration-200">
                <div className="font-bold text-white flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <FileCheck2 className="w-4 h-4 text-amber-400" />
                  <span>Who is Eligible &amp; What Documents are Needed:</span>
                </div>
                <ul className="space-y-1.5 pl-4 list-disc text-slate-300">
                  <li><strong>Ration Card:</strong> Eligible Digital NFSA Ration Card (PHH / BPL / AAY) or PM-JAY Family ID.</li>
                  <li><strong>Aadhaar Card:</strong> Every family member who needs a card must have their Aadhaar number ready.</li>
                  <li><strong>Mobile OTP or Fingerprint:</strong> Aadhaar-linked phone for instant OTP, or visit our shop for instant biometric thumb verification.</li>
                  <li><strong>Senior Citizens 70+:</strong> Now eligible for universal Ayushman Vay Vandana card with ₹5 Lakh dedicated cover!</li>
                  <li><strong>Unsure if your name is in the list?</strong> Just send your Ration Card photo on WhatsApp, we verify eligibility for free!</li>
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Best Picture Showcase */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* Picture Frame with glowing emerald/golden ring */}
            <div className="relative group w-full max-w-md mx-auto rounded-2xl overflow-hidden border-2 border-emerald-400/60 shadow-2xl bg-slate-900 cursor-pointer">
              {/* Image */}
              <img
                src="/ayushman_card_ad.jpg"
                alt="Ayushman Bharat PM-JAY 5 Lakh Free Treatment card - e-KYC 50 rupees, PVC card 100 rupees advertisement"
                className="w-full h-auto aspect-video sm:aspect-4/3 object-cover group-hover:scale-103 transition-transform duration-300"
                referrerPolicy="no-referrer"
                onClick={() => setIsImageModalOpen(true)}
              />

              {/* Floating Dual Price Badges on Image */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1 border border-emerald-300">
                  <Tag className="w-3 h-3 fill-slate-950" />
                  <span>e-KYC: ₹50/-</span>
                </div>
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1 border border-amber-300">
                  <CreditCard className="w-3 h-3 fill-slate-950" />
                  <span>PVC CARD: ₹100/-</span>
                </div>
              </div>

              {/* Verified Badge on Image */}
              <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-md border border-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>NHA Beneficiary Approved Portal</span>
              </div>

              {/* Zoom Trigger */}
              <button
                type="button"
                onClick={() => setIsImageModalOpen(true)}
                className="absolute bottom-3 right-3 p-2 rounded-lg bg-slate-950/80 hover:bg-slate-900 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-md"
                aria-label="Enlarge promotional Ayushman ad poster"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="text-[10px]">View Full Ad</span>
              </button>
            </div>

            {/* Sub-caption below picture */}
            <div className="mt-3 text-center">
              <span className="text-xs font-semibold text-emerald-300 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Official PM-JAY Golden Card Printing by Patlu Online Service
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                WhatsApp: <strong className="text-white">{SHOP_INFO.displayPhone}</strong> &bull; Email: {SHOP_INFO.email}
              </p>
            </div>
          </div>
        </div>

        {/* Subtle Down-Arrow Scroll Indicator */}
        <div className="border-t border-emerald-400/20 bg-slate-950/60 px-4 py-2.5 flex justify-center items-center">
          <button
            type="button"
            onClick={() => {
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2 text-xs font-semibold text-emerald-200/80 hover:text-emerald-200 transition-colors cursor-pointer"
            aria-label="Scroll down to all 50+ government and digital services"
          >
            <span>Explore All 50+ Digital Services &amp; Form Fillings</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-5 h-5 rounded-full bg-emerald-400/20 group-hover:bg-emerald-400/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </motion.span>
          </button>
        </div>
      </div>

      {/* Full Size Picture Modal Lightbox */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-emerald-400/50 shadow-2xl p-2 sm:p-4">
            <button
              type="button"
              onClick={() => setIsImageModalOpen(false)}
              className="absolute right-4 top-4 z-10 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-white transition-colors cursor-pointer"
              aria-label="Close image preview"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src="/ayushman_card_ad.jpg"
              alt="Ayushman Card PM-JAY 5 Lakh Free Treatment e-KYC 50 rupees PVC Card 100 rupees full view"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-2 text-xs">
              <div className="text-white">
                <strong className="text-emerald-400 text-sm">Ayushman Card (PM-JAY ₹5 Lakh Free Treatment)</strong>
                <p className="text-slate-300 text-[11px]">e-KYC: ₹50/- Only &bull; Original PVC Smart Card: ₹100/- Only &bull; Patlu Online Service</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsImageModalOpen(false);
                    handleWhatsAppBooking('e-KYC ₹50');
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-1 shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>e-KYC (₹50)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsImageModalOpen(false);
                    handleWhatsAppBooking('PVC Card ₹100');
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center gap-1 shadow-md cursor-pointer"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>PVC Card (₹100)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
