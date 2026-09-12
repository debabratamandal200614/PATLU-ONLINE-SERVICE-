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
  ChevronDown,
  ChevronUp,
  Maximize2,
  X,
  QrCode,
  Droplets,
  Layers,
  Store,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';
import { SHOP_INFO } from '../data/servicesData';
import { safeOpenUrl, getWhatsAppUrl } from '../utils/safeNavigation';

interface PvcCardPromoBannerProps {
  onOpenApplyModal?: (serviceName?: string) => void;
  onVisitShop?: (serviceName?: string) => void;
  onViewChecklist: (serviceName: string) => void;
}

export const PvcCardPromoBanner: React.FC<PvcCardPromoBannerProps> = ({
  onOpenApplyModal,
  onVisitShop,
  onViewChecklist,
}) => {
  const [selectedCardType, setSelectedCardType] = useState<string>('All (Ration / Aadhaar / Ayushman / Voter)');
  const [showDocList, setShowDocList] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const cardOptions = [
    { id: 'ration', name: 'Ration Card (Digital Khadyasathi)', icon: '🌾', price: '₹100/-' },
    { id: 'aadhaar', name: 'Aadhaar Card (Official UIDAI)', icon: '🆔', price: '₹100/-' },
    { id: 'ayushman', name: 'Ayushman Card (PM-JAY Golden Card)', icon: '🏥', price: '₹100/-' },
    { id: 'voter', name: 'Voter ID Card (EPIC ECI)', icon: '🗳️', price: '₹100/-' },
  ];

  const handleWhatsAppBooking = (cardName?: string) => {
    const card = cardName || selectedCardType;
    const text = 
      `Hello PATLU ONLINE SERVICE! I saw your offer for *PVC SMART CARD ORDER @ ₹100/-*.\n\n` +
      `I want to order PVC Plastic Smart Card for: *${card}*.\n` +
      `Please let me know how to send my card PDF / details.`;
    safeOpenUrl(getWhatsAppUrl(text));
  };

  return (
    <section id="pvc-card-offer" className="py-6 md:py-10 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Outer Banner Card with high-impact purple/violet & emerald theme */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-white shadow-2xl border-2 border-purple-400/50">
        {/* Glow ambient background effects */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Promotional Ribbon */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 text-slate-950 px-4 py-2 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-between flex-wrap gap-2 shadow-inner">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>SPECIAL OFFER: PVC PLASTIC SMART CARD ORDER &bull; FLAT RS 100/- ONLY</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-extrabold">
            <span className="bg-slate-950 text-amber-300 px-2 py-0.5 rounded">
              RATION / AADHAAR / AYUSHMAN / VOTER
            </span>
            <span className="hidden sm:inline">HIGH GLOSS ATM CARD QUALITY</span>
          </div>
        </div>

        {/* Main Ad Body: 2 Columns */}
        <div className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-400/30">
                <CreditCard className="w-3.5 h-3.5 text-purple-400" />
                Heavy PVC Smart Card
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Droplets className="w-3.5 h-3.5 text-emerald-400" />
                100% Waterproof
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                Flat ₹100/- Per Card
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
                PVC Smart Card Order{' '}
                <motion.span
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300 bg-[length:200%_auto]"
                >
                  Ration / Aadhaar / Ayushman / Voter
                </motion.span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed"
              >
                Upgrade your fragile paper certificates into original, durable, waterproof plastic PVC smart cards with high-definition color printing and scannable QR codes! Delivered in just 10 minutes at our shop or ordered via WhatsApp.
              </motion.p>
            </div>

            {/* Card Selection Selector Cards */}
            <div>
              <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">
                Select Card Type To Order (Flat ₹100/- Each):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {cardOptions.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setSelectedCardType(card.name)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                      selectedCardType === card.name
                        ? 'bg-purple-600/30 border-purple-400 ring-2 ring-purple-400/50 text-white shadow-lg'
                        : 'bg-slate-900/80 border-slate-700/80 hover:border-purple-500/50 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{card.icon}</span>
                      <span className="text-[10px] font-black bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded">
                        {card.price}
                      </span>
                    </div>
                    <span className="text-xs font-bold leading-tight line-clamp-2">
                      {card.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Showcase Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-slate-900/90 rounded-2xl border-2 border-amber-400/60 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl"
            >
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  Special Offer Price
                </div>
                <div className="flex items-baseline gap-3 mt-1">
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                    className="text-3xl sm:text-4xl font-black text-white inline-block"
                  >
                    ₹100/-
                  </motion.span>
                  <span className="text-sm sm:text-base text-slate-400 line-through font-semibold">₹150</span>
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-400/30">
                    PER CARD
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Includes HD Color Printing + ATM Thickness PVC Card + Lamination + Scannable Barcode
                </p>
              </div>

              <div className="text-right">
                <div className="text-xs font-extrabold text-slate-300 flex items-center gap-1.5 justify-end">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>Printing Time:</span>
                </div>
                <div className="text-sm font-bold text-white mt-0.5">
                  10 Minutes In-Shop
                </div>
                <div className="text-[11px] text-emerald-300 font-medium">
                  Same-Day WhatsApp Dispatch
                </div>
              </div>
            </motion.div>

            {/* Service Features Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm font-semibold text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Ration Card (Digital Khadyasathi / NFSA)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Official Aadhaar PVC Card Print</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Ayushman PM-JAY ₹5 Lakh Smart Card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Election Voter ID (EPIC) Smart PVC Card</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                id="pvc-ad-whatsapp-btn"
                onClick={() => handleWhatsAppBooking()}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-emerald-500/25 transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order</span>
              </button>

              <button
                type="button"
                id="pvc-ad-apply-online-btn"
                onClick={() => {
                  const svc = `PVC Card Order (Ration/Aadhaar/Ayushman/Voter @ ₹100) - ${selectedCardType}`;
                  if (onOpenApplyModal) onOpenApplyModal(svc);
                }}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all active:scale-95 cursor-pointer"
                title="Order online by uploading card PDF"
              >
                <FileText className="w-4 h-4" />
                <span>Order Online</span>
              </button>

              <button
                type="button"
                id="pvc-ad-online-btn"
                onClick={() => {
                  const svc = `PVC Card Order (Ration/Aadhaar/Ayushman/Voter @ ₹100) - ${selectedCardType}`;
                  if (onVisitShop) onVisitShop(svc);
                  else safeOpenUrl(SHOP_INFO.googleMapsUrl);
                }}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-all active:scale-95 cursor-pointer"
                title="Visit our physical shop counter in Balasundar (Bhowmik Para), Cooch Behar (Opens Google Maps)"
              >
                <Store className="w-4 h-4" />
                <span>Visit Shop to Print</span>
              </button>

              <button
                type="button"
                onClick={() => setShowDocList(!showDocList)}
                className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4 text-amber-400" />
                <span>How To Send PDF / Details</span>
                {showDocList ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Expandable Document Checklist */}
            {showDocList && (
              <div className="bg-slate-900/95 rounded-xl p-4 border border-slate-700 text-xs text-slate-300 space-y-2 animate-in fade-in duration-200">
                <div className="font-bold text-white flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <FileCheck2 className="w-4 h-4 text-amber-400" />
                  <span>How To Order PVC Smart Cards for ₹100/-:</span>
                </div>
                <ul className="space-y-1.5 pl-4 list-disc text-slate-300">
                  <li><strong>Ration Card:</strong> Send your Digital Ration Card PDF or Ration Card Number + Aadhaar.</li>
                  <li><strong>Aadhaar Card:</strong> Send e-Aadhaar PDF or Aadhaar Number with OTP.</li>
                  <li><strong>Ayushman Card:</strong> Send approved Ayushman beneficiary PDF or PM-JAY ID.</li>
                  <li><strong>Voter ID Card:</strong> Send e-EPIC PDF or Voter ID Number.</li>
                  <li><strong>Delivery Option:</strong> Collect immediately from our cyber cafe shop or get it delivered to your home address via post/courier.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* Visual Smart Card Showcase Box */}
            <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden border-2 border-purple-400/60 shadow-2xl bg-slate-900 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-white uppercase tracking-wider">
                      ALL 4 PVC SMART CARDS AT ₹100 EACH
                    </h3>
                    <p className="text-[10px] text-purple-200">Official ATM-Grade Plastic Print</p>
                  </div>
                </div>
                <span className="text-xs font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                  ₹100/- ONLY
                </span>
              </div>

              {/* 4 Cards Grid Preview */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-emerald-900/60 to-slate-900 p-3 rounded-xl border border-emerald-500/40 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-emerald-300">
                    <span>🌾 RATION CARD</span>
                    <QrCode className="w-3 h-3" />
                  </div>
                  <div className="text-[11px] font-extrabold text-white">Khadyasathi Smart Card</div>
                  <div className="text-[9px] text-slate-400">Digital Ration Seva &bull; ₹100</div>
                </div>

                <div className="bg-gradient-to-br from-blue-900/60 to-slate-900 p-3 rounded-xl border border-blue-500/40 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-blue-300">
                    <span>🆔 AADHAAR CARD</span>
                    <QrCode className="w-3 h-3" />
                  </div>
                  <div className="text-[11px] font-extrabold text-white">Official UIDAI PVC</div>
                  <div className="text-[9px] text-slate-400">Heavy Plastic &bull; ₹100</div>
                </div>

                <div className="bg-gradient-to-br from-teal-900/60 to-slate-900 p-3 rounded-xl border border-teal-500/40 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-teal-300">
                    <span>🏥 AYUSHMAN CARD</span>
                    <QrCode className="w-3 h-3" />
                  </div>
                  <div className="text-[11px] font-extrabold text-white">PM-JAY Golden PVC</div>
                  <div className="text-[9px] text-slate-400">₹5 Lakh Free &bull; ₹100</div>
                </div>

                <div className="bg-gradient-to-br from-amber-900/60 to-slate-900 p-3 rounded-xl border border-amber-500/40 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-amber-300">
                    <span>🗳️ VOTER ID CARD</span>
                    <QrCode className="w-3 h-3" />
                  </div>
                  <div className="text-[11px] font-extrabold text-white">ECI EPIC Smart Card</div>
                  <div className="text-[9px] text-slate-400">Official Print &bull; ₹100</div>
                </div>
              </div>

              {/* Quick WhatsApp Action inside card frame */}
              <button
                type="button"
                onClick={() => handleWhatsAppBooking()}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#25D366] hover:bg-[#20ba59] text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Document PDF on WhatsApp for PVC Print</span>
              </button>
            </div>

            {/* Sub-caption below box */}
            <div className="mt-3 text-center">
              <span className="text-xs font-semibold text-purple-300 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Patlu Online Service &bull; ATM Thickness High-Gloss PVC Cards
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Helpline: <strong className="text-white">{SHOP_INFO.displayPhone}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
