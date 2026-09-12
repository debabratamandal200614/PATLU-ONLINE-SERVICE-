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
  Vote,
  Compass,
  ChevronDown,
  ChevronUp,
  Maximize2,
  X,
  Smartphone,
  MapPin,
  ExternalLink,
  Store
} from 'lucide-react';
import { motion } from 'motion/react';
import { SHOP_INFO } from '../data/servicesData';
import { safeOpenUrl, getWhatsAppUrl } from '../utils/safeNavigation';

interface VoterIdPromoBannerProps {
  onOpenApplyModal: (serviceName?: string) => void;
  onViewChecklist: (serviceName: string) => void;
}

export const VoterIdPromoBanner: React.FC<VoterIdPromoBannerProps> = ({
  onOpenApplyModal,
  onViewChecklist,
}) => {
  const [showDocList, setShowDocList] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleWhatsAppBooking = () => {
    const text = 
      `Hello PATLU ONLINE SERVICE! I saw your ad for *Voter ID (New Form 6 / Correction Form 8) for ₹50/-*.\n\n` +
      `I want to apply for Voter ID. Please guide me on what documents I should send on WhatsApp right now.`;
    safeOpenUrl(getWhatsAppUrl(text));
  };

  return (
    <section id="voter-offer" className="py-6 md:py-10 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Outer Banner Card with patriotic Indian Tricolor and rich deep navy accents */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/90 to-slate-900 text-white shadow-2xl border-2 border-orange-400/50">
        {/* Glow ambient background effects */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Promotional Ribbon */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-slate-950 px-4 py-2 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-between flex-wrap gap-2 shadow-inner">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>ECI VOTERS SERVICE PORTAL &bull; SPECIAL AD PROMOTION</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-extrabold">
            <span className="bg-slate-950 text-orange-300 px-2 py-0.5 rounded">
              FLAT ₹50/- SERVICE CHARGE
            </span>
            <span className="hidden sm:inline">ZERO GOVT FEE &bull; OFFICIAL RECEIPT INCLUDED</span>
          </div>
        </div>

        {/* Main Ad Body: 2 Columns */}
        <div className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines, Service Features & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-500/20 text-orange-300 border border-orange-400/30">
                <Vote className="w-3.5 h-3.5 text-orange-400" />
                Form 6: New Voter (18+)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <Compass className="w-3.5 h-3.5 text-blue-400" />
                Form 8: Correction &amp; Shifting
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                Digital e-EPIC Card
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
                Voter ID Card{' '}
                <motion.span
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400 bg-[length:200%_auto]"
                >
                  New Form 6 &amp; Correction Form 8
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
                Turned 18 or missing from the voter list? Get expert form filing assistance for submitting Form 6 (New Voter) or Form 8 (Correction &amp; Address Shifting) on the official Election Commission of India portal (`voters.eci.gov.in`).
              </motion.p>
            </div>

            {/* Statutory Disclaimer Box */}
            <div className="bg-slate-900/95 border border-orange-400/40 rounded-xl p-3 text-xs text-orange-200 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <strong>Official Government Portal Notice:</strong> Voter registrations and corrections are processed strictly on the official ECI Voter Services Portal (<a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="underline font-bold text-orange-300 hover:text-white">voters.eci.gov.in</a>). Patlu Cyber Desk provides form assistance and document scanning.
              </div>
            </div>

            {/* Price Showcase Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-slate-900/90 rounded-2xl border-2 border-orange-400/50 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl"
            >
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  Special Promotional Service Fee
                </div>
                <div className="flex items-baseline gap-3 mt-1">
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                    className="text-3xl sm:text-4xl font-black text-white inline-block"
                  >
                    ₹50/-
                  </motion.span>
                  <span className="text-sm sm:text-base text-slate-400 line-through font-semibold">₹100</span>
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-400/30">
                    FLAT 50% OFF
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Govt Fee: ₹0 (Free) &bull; You only pay ₹50 for professional documentation &amp; mapping
                </p>
              </div>

              <div className="text-right">
                <div className="text-xs font-extrabold text-slate-300 flex items-center gap-1.5 justify-end">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span>Processing Time:</span>
                </div>
                <div className="text-sm font-bold text-white mt-0.5">
                  ECI Slip in 15 Minutes
                </div>
                <div className="text-[11px] text-emerald-300 font-medium">
                  BLO Field Verify in 7-15 Days
                </div>
              </div>
            </motion.div>

            {/* Service Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm font-semibold text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Form 6: New Voter (18+ Young Citizens)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Form 8: Address Shifting &amp; Polling Booth Transfer</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Correction in Name, Photo, DOB &amp; Relation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Official ECI Reference Tracking Slip on WhatsApp</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://voters.eci.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-orange-500 hover:bg-orange-400 text-slate-950 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Visit Official ECI Voter Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                id="voter-ad-whatsapp-btn"
                onClick={handleWhatsAppBooking}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get ₹50 Assistance on WhatsApp</span>
              </button>

              <button
                type="button"
                id="voter-ad-online-btn"
                onClick={() => onOpenApplyModal('Voter ID (New Form 6 / Correction Form 8) - ₹50 Offer')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-all active:scale-95 cursor-pointer"
                title="Visit our physical shop counter in Belda"
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
                  <FileCheck2 className="w-4 h-4 text-orange-400" />
                  <span>Documents Needed for ₹50 Voter ID Application:</span>
                </div>
                <ul className="space-y-1.5 pl-4 list-disc text-slate-300">
                  <li><strong>Proof of Identity:</strong> Aadhaar Card (with active linked mobile for OTP).</li>
                  <li><strong>Current Address Proof:</strong> Electricity/Water bill, Ration card, Bank passbook, or Gas bill.</li>
                  <li><strong>Date of Birth Proof:</strong> 10th Certificate/Marksheet, Birth Certificate, or Aadhaar Card.</li>
                  <li><strong>Family Voter Reference:</strong> Father, Mother, or Spouse EPIC Number (to accurately assign your Polling Booth &amp; Assembly Constituency).</li>
                  <li><strong>Passport Photograph:</strong> Clear color photo with white background (or clear phone portrait).</li>
                  <li><strong>For Form 8 (Correction/Shifting):</strong> Existing EPIC card photo or Voter ID number.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Best Picture Showcase */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* Picture Frame with glowing orange/tricolor ring */}
            <div className="relative group w-full max-w-md mx-auto rounded-2xl overflow-hidden border-2 border-orange-400/60 shadow-2xl bg-slate-900 cursor-pointer">
              {/* Image */}
              <img
                src="/voter_id_ad.jpg"
                alt="Voter ID Card Form 6 and Form 8 for 50 rupees advertisement"
                className="w-full h-auto aspect-video sm:aspect-4/3 object-cover group-hover:scale-103 transition-transform duration-300"
                referrerPolicy="no-referrer"
                onClick={() => setIsImageModalOpen(true)}
              />

              {/* Floating Price Badge on Image */}
              <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-xs sm:text-sm px-3 py-1 rounded-lg shadow-lg flex items-center gap-1 border border-orange-300">
                <Tag className="w-3.5 h-3.5 fill-slate-950" />
                <span>OFFER: ₹50/- ONLY</span>
              </div>

              {/* Verified Badge on Image */}
              <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-md border border-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>ECI National Portal Verified</span>
              </div>

              {/* Zoom Trigger */}
              <button
                type="button"
                onClick={() => setIsImageModalOpen(true)}
                className="absolute bottom-3 right-3 p-2 rounded-lg bg-slate-950/80 hover:bg-slate-900 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-md"
                aria-label="Enlarge promotional Voter ID ad poster"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="text-[10px]">View Full Ad</span>
              </button>
            </div>

            {/* Sub-caption below picture */}
            <div className="mt-3 text-center">
              <span className="text-xs font-semibold text-orange-300 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Official Election Commission Form Filling by Patlu Online Service
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                WhatsApp: <strong className="text-white">{SHOP_INFO.displayPhone}</strong> &bull; Email: {SHOP_INFO.email}
              </p>
            </div>
          </div>
        </div>

        {/* Subtle Down-Arrow Scroll Indicator */}
        <div className="border-t border-orange-400/20 bg-slate-950/60 px-4 py-2.5 flex justify-center items-center">
          <button
            type="button"
            onClick={() => {
              document.getElementById('ayushman-offer')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2 text-xs font-semibold text-orange-200/80 hover:text-orange-200 transition-colors cursor-pointer"
            aria-label="Scroll down to Ayushman Bharat Card promotional offer"
          >
            <span>Next Offer: Ayushman Bharat ₹5 Lakh Card (e-KYC ₹50 / PVC ₹100)</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-5 h-5 rounded-full bg-orange-400/20 group-hover:bg-orange-400/30 border border-orange-400/40 flex items-center justify-center text-orange-300"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </motion.span>
          </button>
        </div>
      </div>

      {/* Full Size Picture Modal Lightbox */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-orange-400/50 shadow-2xl p-2 sm:p-4">
            <button
              type="button"
              onClick={() => setIsImageModalOpen(false)}
              className="absolute right-4 top-4 z-10 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-white transition-colors cursor-pointer"
              aria-label="Close image preview"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src="/voter_id_ad.jpg"
              alt="Voter ID Card Form 6 and Form 8 for 50 rupees advertisement full view"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-2 text-xs">
              <div className="text-white">
                <strong className="text-orange-400 text-sm">Voter ID (New Form 6 / Correction Form 8)</strong>
                <p className="text-slate-300 text-[11px]">Special Offer Price: ₹50/- Only &bull; Patlu Online Service</p>
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
                <span>Book This ₹50 Offer on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
