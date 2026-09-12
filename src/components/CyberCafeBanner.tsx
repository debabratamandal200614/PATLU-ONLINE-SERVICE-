import React, { useState } from 'react';
import {
  Sparkles,
  Maximize2,
  X,
  PhoneCall,
  MessageCircle,
  QrCode,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Laptop,
  Printer,
  FileText,
  Smartphone,
  CreditCard,
  ShieldCheck,
  Zap,
  Award,
  Store
} from 'lucide-react';
import { SHOP_INFO } from '../data/servicesData';
import { safeOpenUrl, getWhatsAppUrl } from '../utils/safeNavigation';

interface CyberCafeBannerProps {
  onOpenApplyModal: (serviceName?: string) => void;
  onOpenPaymentQrModal?: () => void;
  onViewChecklist?: (serviceName: string) => void;
}

export const CyberCafeBanner: React.FC<CyberCafeBannerProps> = ({
  onOpenApplyModal,
  onOpenPaymentQrModal,
  onViewChecklist,
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const bannerServices = [
    {
      title: 'Online Form Fillup',
      subtitle: 'SSC, Railway, UPSC, State Jobs & Exams',
      icon: FileText,
      color: 'from-emerald-500 to-green-600',
      serviceQuery: 'SSC Forms (CGL, CHSL, MTS, GD Constable)'
    },
    {
      title: 'Print & Scan Center',
      subtitle: 'Color/B&W Prints, High-Res Scans & Lamination',
      icon: Printer,
      color: 'from-orange-500 to-amber-600',
      serviceQuery: 'Color Printout & Heavy Lamination'
    },
    {
      title: 'Aadhar & Govt IDs',
      subtitle: 'PAN Card, Voter ID, Ayushman & PVC Cards',
      icon: ShieldCheck,
      color: 'from-purple-500 to-indigo-600',
      serviceQuery: 'Aadhaar Address & Father Name Correction'
    },
    {
      title: 'Exam Form & Admission',
      subtitle: 'College, University, CUET & Board Registrations',
      icon: Laptop,
      color: 'from-blue-500 to-cyan-600',
      serviceQuery: 'University & College Online Admissions'
    },
    {
      title: 'Bills & Recharges',
      subtitle: 'Electricity Bill, Mobile, DTH & FASTag',
      icon: Smartphone,
      color: 'from-pink-500 to-rose-600',
      serviceQuery: 'Utility Bill Payment & FASTag Recharge'
    }
  ];

  const handleWhatsApp = () => {
    const text = 'Hello PATLU ONLINE SERVICE!\n\nI saw your official Cyber Cafe storefront banner and would like assistance with online form fillup / digital services.';
    safeOpenUrl(getWhatsAppUrl(text));
  };

  return (
    <section id="official-banner" className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-blue-500/30 shadow-2xl p-4 sm:p-6 md:p-8 overflow-hidden text-white">
        
        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 relative z-10 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-blue-400 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-400/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Official Cyber Cafe Digital Hub
            </span>
            <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
              Fast &bull; Safe &bull; Reliable
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Click to view full-size banner"
            >
              <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Full Screen View</span>
            </button>
          </div>
        </div>

        {/* Main Banner Image Container */}
        <div className="relative group rounded-2xl overflow-hidden border-2 border-slate-700/60 shadow-2xl bg-slate-950">
          <img
            src="/patlu_official_banner.jpg"
            alt="PATLU ONLINE SERVICE - Official Cyber Cafe Banner - Fast Safe Reliable - Connecting You To The Digital World"
            referrerPolicy="no-referrer"
            className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.01] cursor-pointer"
            onClick={() => setIsLightboxOpen(true)}
          />

          {/* Hover Overlay with Click Prompt */}
          <div 
            onClick={() => setIsLightboxOpen(true)}
            className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer pointer-events-none sm:pointer-events-auto"
          >
            <span className="bg-slate-900/90 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl border border-blue-400/40 shadow-xl flex items-center gap-2 backdrop-blur-xs">
              <Maximize2 className="w-4 h-4 text-blue-400" />
              Click to view high-resolution banner
            </span>
          </div>
        </div>

        {/* Key Banner Highlights Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 relative z-10">
          {bannerServices.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onOpenApplyModal(svc.serviceQuery)}
                className="p-3 sm:p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/50 transition-all text-left group cursor-pointer shadow-md hover:-translate-y-0.5"
              >
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center text-white mb-2 shadow-sm`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                  {svc.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                  {svc.subtitle}
                </p>
                <span className="text-[10px] font-bold text-rose-400 mt-2 block flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Visit Shop &rarr;
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom Action Footer Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black text-white">
                Visit PATLU ONLINE SERVICE Cyber Cafe Today!
              </div>
              <div className="text-[11px] text-slate-400">
                Main Market Chowk &bull; Open Daily: <strong>{SHOP_INFO.timingWeekdays}</strong>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Visit Shop Button */}
            <button
              type="button"
              id="cyber-banner-visit-btn"
              onClick={() => onOpenApplyModal()}
              className="px-4 py-2.5 rounded-xl text-xs font-black bg-rose-600 hover:bg-rose-500 text-white shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              title="Visit our physical shop counter in Belda"
            >
              <Store className="w-4 h-4" />
              <span>Visit Shop</span>
            </button>

            {/* WhatsApp Details */}
            <button
              type="button"
              onClick={handleWhatsApp}
              className="px-4 py-2.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </button>

            {/* Pay QR Modal Trigger */}
            {onOpenPaymentQrModal && (
              <button
                type="button"
                onClick={onOpenPaymentQrModal}
                className="px-4 py-2.5 rounded-xl text-xs font-black bg-purple-700 hover:bg-purple-600 text-white shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <QrCode className="w-4 h-4 text-purple-200" />
                <span>Scan &amp; Pay QR</span>
              </button>
            )}

            {/* Direct Call */}
            <a
              href={`tel:${SHOP_INFO.phone}`}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Call:</span> {SHOP_INFO.displayPhone}
            </a>
          </div>
        </div>

      </div>

      {/* Full-Screen Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div 
            className="relative max-w-6xl w-full bg-slate-900 border-2 border-blue-500/40 rounded-3xl p-3 sm:p-5 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm sm:text-base font-black">
                  PATLU ONLINE SERVICE - Official Cyber Cafe Banner
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Full High-Res Banner View */}
            <div className="rounded-xl overflow-hidden border border-slate-700 max-h-[75vh] flex items-center justify-center bg-black">
              <img
                src="/patlu_official_banner.jpg"
                alt="PATLU ONLINE SERVICE Official Banner Full Size"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>

            {/* Lightbox Footer Actions */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-400">
                Your Digital Needs Our Priority &bull; Fast, Safe &amp; Reliable
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsLightboxOpen(false);
                    onOpenApplyModal();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-black bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Store className="w-4 h-4" />
                  <span>Visit Shop Now</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
