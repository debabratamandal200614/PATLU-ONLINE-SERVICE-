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
  CreditCard,
  Truck,
  ChevronDown,
  ChevronUp,
  Maximize2,
  X,
  Mail,
  ExternalLink,
  Store
} from 'lucide-react';
import { motion } from 'motion/react';
import { SHOP_INFO } from '../data/servicesData';
import { safeOpenUrl, getWhatsAppUrl } from '../utils/safeNavigation';

interface PanCardPromoBannerProps {
  onOpenApplyModal: (serviceName?: string) => void;
  onViewChecklist: (serviceName: string) => void;
}

export const PanCardPromoBanner: React.FC<PanCardPromoBannerProps> = ({
  onOpenApplyModal,
  onViewChecklist,
}) => {
  const [showDocList, setShowDocList] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleWhatsAppBooking = () => {
    const text = 
      `Hello PATLU ONLINE SERVICE! I saw your ad for *PAN Card (New / Correction / Minor to Major) for ₹200/-*.\n\n` +
      `I want to apply for my PAN Card. Please let me know what photos and documents I need to send on WhatsApp.`;
    safeOpenUrl(getWhatsAppUrl(text));
  };

  return (
    <section id="pan-offer" className="py-6 md:py-10 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Outer Banner Card with high contrast and emerald/gold accents */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950/80 to-slate-900 text-white shadow-2xl border-2 border-emerald-400/50">
        {/* Glow ambient background effects */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Promotional Ribbon */}
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 px-4 py-2 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-between flex-wrap gap-2 shadow-inner">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>SPECIAL CYBER SEVA AD &bull; NSDL / UTIITSL AUTHORIZED PROCESS</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-extrabold">
            <span className="bg-slate-950 text-emerald-300 px-2 py-0.5 rounded">
              FLAT ₹200/- COMPLETE PACKAGE
            </span>
            <span className="hidden sm:inline">GOVT FEE + SPEED POST INCLUDED</span>
          </div>
        </div>

        {/* Main Ad Body: 2 Columns */}
        <div className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines, Service Features & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                New PAN &amp; Correction
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                Physical Card to Home Doorstep
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                e-PAN in 48 Hrs
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
                New{' '}
                <motion.span
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-300 bg-[length:200%_auto]"
                >
                  PAN Card &amp; Correction
                </motion.span>{' '}
                Form Assistance
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed"
              >
                Need a new PAN card or correction? Get professional form filing assistance for submitting your application on the official NSDL/Income Tax portal, with e-PAN PDF and physical card delivered by Speed Post.
              </motion.p>
            </div>

            {/* Statutory Disclaimer Box */}
            <div className="bg-slate-900/95 border border-emerald-400/40 rounded-xl p-3 text-xs text-emerald-200 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong>Official Government Portal Notice:</strong> Official Tax Identification Numbers (PAN) are processed strictly on official government portals (<a href="https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html" target="_blank" rel="noopener noreferrer" className="underline font-bold text-emerald-300 hover:text-white">onlineservices.nsdl.com</a>). Patlu Cyber Desk provides form submission assistance &amp; document scanning services.
              </div>
            </div>

            {/* Price Showcase Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-slate-900/90 rounded-2xl border-2 border-emerald-400/50 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl"
            >
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  All-Inclusive Package Price
                </div>
                <div className="flex items-baseline gap-3 mt-1">
                  <motion.span
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                    className="text-3xl sm:text-4xl font-black text-white inline-block"
                  >
                    ₹200/-
                  </motion.span>
                  <span className="text-sm sm:text-base text-slate-400 line-through font-semibold">₹300</span>
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-400/30">
                    SAVE 33%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Covers: NSDL/UTIITSL Govt Fee (₹107) + Online Form Filling + India Post Delivery
                </p>
              </div>

              <div className="text-right">
                <div className="text-xs font-extrabold text-slate-300 flex items-center gap-1.5 justify-end">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Delivery Timeline:</span>
                </div>
                <div className="text-sm font-bold text-white mt-0.5">
                  e-PAN PDF in 48-72 Hours
                </div>
                <div className="text-[11px] text-emerald-300 font-medium">
                  Physical Card in 10-14 Days
                </div>
              </div>
            </motion.div>

            {/* Service Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm font-semibold text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>New Form 49A (Age 18+ &amp; Minors)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Name, DOB &amp; Father Name Correction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Minor to Major (Update Photo &amp; Sign)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Lost / Damaged PAN Duplicate Reprint</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Visit Official NSDL Site</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                id="pan-ad-whatsapp-btn"
                onClick={handleWhatsAppBooking}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get ₹200 Assistance on WhatsApp</span>
              </button>

              <button
                type="button"
                id="pan-ad-online-btn"
                onClick={() => onOpenApplyModal('PAN Card (New / Correction / Minor to Major) - ₹200 Offer')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-all active:scale-95 cursor-pointer"
                title="Visit our physical shop counter in Balasundar (Bhowmik Para), Cooch Behar"
              >
                <Store className="w-4 h-4" />
                <span>Visit Shop to Apply</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Expandable Document Checklist */}
            {showDocList && (
              <div className="bg-slate-900/95 rounded-xl p-4 border border-slate-700 text-xs text-slate-300 space-y-2 animate-in fade-in duration-200">
                <div className="font-bold text-white flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <FileCheck2 className="w-4 h-4 text-emerald-400" />
                  <span>Documents Needed for ₹200 PAN Card Application:</span>
                </div>
                <ul className="space-y-1.5 pl-4 list-disc text-slate-300">
                  <li><strong>Aadhaar Card:</strong> Must have active mobile number linked for instant OTP e-KYC.</li>
                  <li><strong>Date of Birth Proof:</strong> 10th Marksheet/Admit Card, Birth Certificate, or Aadhaar.</li>
                  <li><strong>2 Passport Photographs:</strong> Clear front face with white background (or send a clear phone photo, we will resize it free!).</li>
                  <li><strong>Signature:</strong> Clean signature on blank white paper using black or blue pen.</li>
                  <li><strong>For Correction or Reprint:</strong> Copy or photo of existing PAN card or PAN number.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Best Picture Showcase */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* Picture Frame with glowing emerald ring */}
            <div className="relative group w-full max-w-md mx-auto rounded-2xl overflow-hidden border-2 border-emerald-400/60 shadow-2xl bg-slate-900 cursor-pointer">
              {/* Image */}
              <img
                src="/pan_card_ad.jpg"
                alt="PAN Card 200 rupees advertisement - New Apply and Correction"
                className="w-full h-auto aspect-video sm:aspect-4/3 object-cover group-hover:scale-103 transition-transform duration-300"
                referrerPolicy="no-referrer"
                onClick={() => setIsImageModalOpen(true)}
              />

              {/* Floating Price Badge on Image */}
              <div className="absolute top-3 left-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs sm:text-sm px-3 py-1 rounded-lg shadow-lg flex items-center gap-1 border border-emerald-300">
                <Tag className="w-3.5 h-3.5 fill-slate-950" />
                <span>OFFER: ₹200/- ONLY</span>
              </div>

              {/* Verified Badge on Image */}
              <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-md border border-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>NSDL &amp; UTIITSL Official Format</span>
              </div>

              {/* Zoom Trigger */}
              <button
                type="button"
                onClick={() => setIsImageModalOpen(true)}
                className="absolute bottom-3 right-3 p-2 rounded-lg bg-slate-950/80 hover:bg-slate-900 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-md"
                aria-label="Enlarge promotional PAN ad poster"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="text-[10px]">View Full Ad</span>
              </button>
            </div>

            {/* Sub-caption below picture */}
            <div className="mt-3 text-center">
              <span className="text-xs font-semibold text-emerald-300 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                100% Genuine Tax Identification Document Guarantee
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
              document.getElementById('voter-offer')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2 text-xs font-semibold text-emerald-200/80 hover:text-emerald-200 transition-colors cursor-pointer"
            aria-label="Scroll down to Voter ID promotional offer"
          >
            <span>Next Offer: Voter ID Form 6 &amp; 8 (₹50/- Only)</span>
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
              src="/pan_card_ad.jpg"
              alt="PAN Card New Apply and Correction for 200 rupees advertisement full view"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-2 text-xs">
              <div className="text-white">
                <strong className="text-emerald-400 text-sm">PAN Card (New / Correction / Minor to Major)</strong>
                <p className="text-slate-300 text-[11px]">Special Offer Price: ₹200/- Only &bull; Patlu Online Service</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsImageModalOpen(false);
                  handleWhatsAppBooking();
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book This ₹200 Offer on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
