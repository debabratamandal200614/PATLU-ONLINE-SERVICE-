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
  Home,
  Users,
  ChevronDown,
  ChevronUp,
  Maximize2,
  X,
  ExternalLink,
  Store
} from 'lucide-react';
import { motion } from 'motion/react';
import { SHOP_INFO } from '../data/servicesData';
import { safeOpenUrl, getWhatsAppUrl } from '../utils/safeNavigation';

interface AadhaarPromoBannerProps {
  onOpenApplyModal: (serviceName?: string) => void;
  onViewChecklist: (serviceName: string) => void;
}

export const AadhaarPromoBanner: React.FC<AadhaarPromoBannerProps> = ({
  onOpenApplyModal,
  onViewChecklist,
}) => {
  const [showDocList, setShowDocList] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleWhatsAppBooking = () => {
    const text = 
      `Hello PATLU ONLINE SERVICE! I saw your ad for *Aadhaar Card Address Change & Father/Husband Name Change for ₹125/-*.\n\n` +
      `I want to update my Aadhaar card details. Please let me know what photos/documents I should send right now.`;
    safeOpenUrl(getWhatsAppUrl(text));
  };

  return (
    <section id="aadhaar-offer" className="py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Container with vibrant gradient border and subtle shadow */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white shadow-2xl border-2 border-amber-400/40">
        {/* Glow ambient background effects */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Promotional Ribbon */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 px-4 py-2 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-between flex-wrap gap-2 shadow-inner">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>OFFICIAL UIDAI PORTAL ASSISTANCE &bull; CYBER SEVA DESK</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-extrabold">
            <span className="bg-slate-950 text-amber-300 px-2 py-0.5 rounded">
              FLAT ₹125/- GUIDED ASSISTANCE
            </span>
            <span className="hidden sm:inline">NO EXTRA HIDDEN CHARGES</span>
          </div>
        </div>

        {/* Main Ad Body: 2 Columns (Content Left, Best Picture Right) */}
        <div className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines, Highlights, Price Tag & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <Home className="w-3.5 h-3.5 text-blue-400" />
                Address Change
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                Father / Husband (C/O, W/O) Name
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Official UIDAI Portal (.gov.in)
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
                Aadhaar Card{' '}
                <motion.span
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300 bg-[length:200%_auto]"
                >
                  Address Change
                </motion.span>{' '}
                &amp; Name Update Assistance
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed"
              >
                Moved to a new place or newly married? Get expert assistance for submitting your online address change and Father/Husband name update on the official UIDAI myAadhaar portal (`myaadhaar.uidai.gov.in`).
              </motion.p>
            </div>

            {/* Statutory Disclaimer Box */}
            <div className="bg-slate-900/95 border border-amber-400/40 rounded-xl p-3 text-xs text-amber-200 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Official Government Portal Notice:</strong> Aadhaar details are issued and processed strictly by UIDAI on its official web portal (<a href="https://myaadhaar.uidai.gov.in" target="_blank" rel="noopener noreferrer" className="underline font-bold text-amber-300 hover:text-white">myaadhaar.uidai.gov.in</a>). Our cyber desk provides document scanning, formatting, and online form filing support.
              </div>
            </div>

            {/* Price Showcase Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-slate-900/90 rounded-2xl border-2 border-amber-400/50 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl"
            >
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  Special Assistance Charge
                </div>
                <div className="flex items-baseline gap-3 mt-1">
                  <motion.span
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                    className="text-3xl sm:text-4xl font-black text-white inline-block"
                  >
                    ₹125/-
                  </motion.span>
                  <span className="text-sm sm:text-base text-slate-400 line-through font-semibold">₹250</span>
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-400/30">
                    SAVE 50%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Includes UIDAI Portal Fee + High-DPI Document Scanning + WhatsApp URN Receipt
                </p>
              </div>

              <div className="text-right">
                <div className="text-xs font-extrabold text-slate-300 flex items-center gap-1.5 justify-end">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Turnaround Time:</span>
                </div>
                <div className="text-sm font-bold text-white mt-0.5">
                  URN Slip in 15-30 Mins
                </div>
                <div className="text-[11px] text-emerald-300 font-medium">
                  Verified by UIDAI in 2-3 Days
                </div>
              </div>
            </motion.div>

            {/* Service Feature Checks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm font-semibold text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Father Name (S/O, D/O) Correction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Husband Name (W/O, C/O) After Marriage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>No Personal Document? HOF / Mukhiya Format Supported</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Official PDF URN Acknowledgment on WhatsApp</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://myaadhaar.uidai.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Visit Official UIDAI Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                id="aadhaar-ad-whatsapp-btn"
                onClick={handleWhatsAppBooking}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-emerald-500/25 transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get ₹125 Assistance on WhatsApp</span>
              </button>

              <button
                type="button"
                id="aadhaar-ad-online-btn"
                onClick={() => onOpenApplyModal('Aadhaar Address & Father/Husband Name Change (₹125 Offer)')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-all active:scale-95 cursor-pointer"
                title="Visit our physical shop counter in Belda"
              >
                <Store className="w-4 h-4" />
                <span>Visit Shop to Update</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Expandable Document Checklist inside the Ad Card */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowDocList(!showDocList)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4 text-amber-400" />
                <span>Required Documents</span>
                {showDocList ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {showDocList && (
              <div className="bg-slate-900/95 rounded-xl p-4 border border-slate-700 text-xs text-slate-300 space-y-2 animate-in fade-in duration-200">
                <div className="font-bold text-white flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <FileCheck2 className="w-4 h-4 text-amber-400" />
                  <span>Valid Proofs for Aadhaar Address &amp; Name Update:</span>
                </div>
                <ul className="space-y-1.5 pl-4 list-disc text-slate-300">
                  <li><strong>Active Linked Mobile Number:</strong> Required for UIDAI OTP authentication.</li>
                  <li><strong>Proof of Address (any 1):</strong> Electricity Bill, Water Bill, Voter ID, Ration Card, Bank Passbook with photo, or Gas Connection Bill.</li>
                  <li><strong>For Husband Name (W/O, C/O):</strong> Marriage Certificate OR Husband’s Aadhaar with Head of Family (HOF) consent.</li>
                  <li><strong>For Father Name (S/O, D/O):</strong> 10th Certificate/Marksheet OR Father’s Aadhaar with HOF consent.</li>
                  <li><strong>No Document?</strong> We provide the official UIDAI Standard Certificate form signed by Mukhiya / Village Panchayat Head / Gazetted Officer!</li>
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Best Picture Showcase */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* Picture Frame with glowing ring */}
            <div className="relative group w-full max-w-md mx-auto rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-2xl bg-slate-900 cursor-pointer">
              {/* Image */}
              <img
                src="/aadhaar_update_ad.jpg"
                alt="Aadhaar Card Address Change and Father Husband Name Change advertisement"
                className="w-full h-auto aspect-video sm:aspect-4/3 object-cover group-hover:scale-103 transition-transform duration-300"
                referrerPolicy="no-referrer"
                onClick={() => setIsImageModalOpen(true)}
              />

              {/* Floating Price Badge on Image */}
              <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs sm:text-sm px-3 py-1 rounded-lg shadow-lg flex items-center gap-1 border border-amber-300">
                <Tag className="w-3.5 h-3.5 fill-slate-950" />
                <span>ASSISTANCE: ₹125/-</span>
              </div>

              {/* Verified Badge on Image */}
              <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-md border border-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Official UIDAI Portal Link</span>
              </div>

              {/* Zoom Trigger */}
              <button
                type="button"
                onClick={() => setIsImageModalOpen(true)}
                className="absolute bottom-3 right-3 p-2 rounded-lg bg-slate-950/80 hover:bg-slate-900 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-md"
                aria-label="Enlarge promotional poster"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="text-[10px]">View Full Ad</span>
              </button>
            </div>

            {/* Sub-caption below picture */}
            <div className="mt-3 text-center">
              <span className="text-xs font-semibold text-amber-300 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Guided Form Assistance by Patlu Online Service
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                WhatsApp: <strong className="text-white">{SHOP_INFO.displayPhone}</strong> &bull; Email: {SHOP_INFO.email}
              </p>
            </div>
          </div>
        </div>

        {/* Subtle Down-Arrow Scroll Indicator */}
        <div className="border-t border-amber-400/20 bg-slate-950/60 px-4 py-2.5 flex justify-center items-center">
          <button
            type="button"
            onClick={() => {
              document.getElementById('pan-offer')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2 text-xs font-semibold text-amber-200/80 hover:text-amber-200 transition-colors cursor-pointer"
            aria-label="Scroll down to PAN Card promotional offer"
          >
            <span>Next Offer: PAN Card Special Ad (₹200/-)</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-5 h-5 rounded-full bg-amber-400/20 group-hover:bg-amber-400/30 border border-amber-400/40 flex items-center justify-center text-amber-300"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </motion.span>
          </button>
        </div>
      </div>

      {/* Full Size Picture Modal Lightbox */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-amber-400/50 shadow-2xl p-2 sm:p-4">
            <button
              type="button"
              onClick={() => setIsImageModalOpen(false)}
              className="absolute right-4 top-4 z-10 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-white transition-colors cursor-pointer"
              aria-label="Close image preview"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src="/aadhaar_update_ad.jpg"
              alt="Aadhaar Card Address Change and Father Husband Name Change advertisement full view"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-2 text-xs">
              <div className="text-white">
                <strong className="text-amber-400 text-sm">Aadhaar Card Address &amp; Father/Husband Name Change</strong>
                <p className="text-slate-300 text-[11px]">Special Offer Price: ₹125/- Only &bull; Patlu Online Service</p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://myaadhaar.uidai.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1 shadow-md cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Official UIDAI Site</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setIsImageModalOpen(false);
                    handleWhatsAppBooking();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Get ₹125 Assistance on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

